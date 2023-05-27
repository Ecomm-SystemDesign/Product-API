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

  getSingleProductFromDb: (productId) => {
    return new Promise((resolve, reject) => {
      const productQuery = 'SELECT * FROM product WHERE id = $1';
      const featuresQuery = 'SELECT feature, feature_value FROM features WHERE product_id = $1';

      db.query(productQuery, [productId], (error, productResults) => {
        if (error) {
          reject(error);
          return;
        }

        const productRow = productResults.rows[0]; // productResults is an object with a row's property

        db.query(featuresQuery, [productId], (error, featuresResults) => {
          if (error) {
            reject(error);
          } else {
            console.log('success from getSingleProductFromDb')
            const features = featuresResults.rows.map((row) => ({
              feature: row.feature,
              value: row.feature_value,
            }));

            //construct shape to send back to client
            const product = {
              id: productRow.id,
              name: productRow.product_name,
              description: productRow.product_description,
              slogan: productRow.slogan,
              category: productRow.category,
              default_price: productRow.default_price,
              features: features,
            };

            resolve(product);
          }
        });
      });
    });
  },

  getStylesFromDb: (productId) => {
    return new Promise((resolve, reject) => {
      const stylesQuery = `
      SELECT
        s.id AS style_id,
        s.style_name AS name,
        s.original_price,
        s.sale_price,
        s.isdefault AS "default?",
        (
          SELECT json_agg(
            json_build_object(
              'thumbnail_url', p.thumbnail_url,
              'url', p.regular_url
            )
          )
          FROM photos p
          WHERE p.style_id = s.id
        ) AS photos,
        json_object_agg(
          sku.id,
          json_build_object(
            'quantity', sku.quantity,
            'size', sku.size
          )
        ) AS skus
      FROM
        styles s
        JOIN skus sku ON s.id = sku.style_id
      WHERE
        s.product_id = $1
      GROUP BY
        s.id
      ORDER BY
        s.id ASC
      `;

      db.query(stylesQuery, [productId], (error, stylesResults) => {
        if (error) {
          reject(error);
          return;
        }

        const styles = stylesResults.rows;
        resolve(styles);
      });
    });
  },

  getRelatedFromDb: (productId) => {
    return new Promise((resolve, reject) => {
      const relatedQuery = 'SELECT related_product_id FROM related WHERE current_product_id = $1';
      db.query(relatedQuery, [productId], (err, relatedResults) => {
        if (err) {
          reject(err);
          return;
        }

        const relatedProducts = relatedResults.rows.map((row) => row.related_product_id);
        resolve(relatedProducts);

      })
    })
  }

}