const db = require('../database/database.js');

module.exports = {

  getAllProductsFromDb: (page, count) => {
    const currentId = (count * (page - 1)) + 1;
    const lastId = currentId + (count - 1);
    const query = {
      text: 'SELECT * FROM product WHERE id >= $1 and id <= $2',
      values: [currentId, lastId]
    }
    return db.query(query);
  },

  getSingleProductFromDb: async (productId) => {
    const productQuery = `
      SELECT
        p.id AS id,
        p.product_name AS name,
        p.slogan,
        p.product_description AS description,
        p.category,
        p.default_price::text AS default_price,
        jsonb_agg(jsonb_build_object('feature', f.feature, 'value', f.feature_value)) AS features
      FROM
        product p
        LEFT JOIN features f ON p.id = f.product_id
      WHERE
        p.id = $1
      GROUP BY
        p.id, p.product_name, p.product_description, p.slogan, p.category, p.default_price
    `;

    try {
      const productResult = await db.query(productQuery, [productId]);
      const productRow = productResult.rows[0];

      return productRow;
    } catch (error) {
      throw error;
    }
  },

  getStylesFromDb: async (productId) => {
    const stylesQuery = `
      SELECT
        s.id AS style_id,
        s.style_name AS name,
        s.original_price,
        s.sale_price,
        s.isdefault AS "default?",
        (
          SELECT jsonb_agg(DISTINCT jsonb_build_object(
            'thumbnail_url', p.thumbnail_url,
            'url', p.regular_url
          ))
          FROM photos p
          WHERE p.style_id = s.id
        ) AS photos,
        jsonb_object_agg(
          sku.id,
          jsonb_build_object(
            'quantity', sku.quantity,
            'size', sku.size
          )
        ) AS skus
      FROM
        styles s
        JOIN skus sku ON s.id = sku.style_id
        LEFT JOIN photos p ON p.style_id = s.id
      WHERE
        s.product_id = $1
      GROUP BY
        s.id
      ORDER BY
        s.id ASC
    `;

    try {
      const stylesResults = await db.query(stylesQuery, [productId]);
      const styles = stylesResults.rows;
      return { product_id: productId, results: styles };
    } catch (error) {
      throw error;
    }
  },

  getRelatedFromDb: async (productId) => {
    const queryString = `SELECT jsonb_agg(related_product_id) FROM related WHERE current_product_id = $1`;

    try {
      const relatedResults = await db.query(queryString, [productId]);
      return relatedResults.rows[0].jsonb_agg;
    } catch (error) {
      throw error;
    }
  }
}


