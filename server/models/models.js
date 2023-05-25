const db = require('../database/database.js');

module.exports = {

  getAllProductsFromDb: () => {},
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
      const stylesQuery = 'SELECT * FROM styles WHERE product_id = $1';
      const photosQuery = 'SELECT regular_url, thumbnail_url FROM photos WHERE style_id = $1';
      const skusQuery = 'SELECT * FROM skus WHERE style_id = $1';

      db.query(stylesQuery, [productId], (error, stylesResults) => {
        if (error) {
          reject(error);
          return;
        }

        // console.log('what are these styles: ', stylesResults)
        const styles = stylesResults.rows;
        const stylePromises = styles.map((style) => {
          const styleId = style.id;
          return new Promise((resolve, reject) => {
            db.query(photosQuery, [styleId], (error, photosResults) => {
              if (error) {
                reject(error);
                return;
              }

              const photos = photosResults.rows.map((photo) => ({
                thumbnail_url: photo.thumbnail_url,
                url: photo.regular_url
              }));

              db.query(skusQuery, [styleId], (error, skusResults) => {
                if (error) {
                  reject(error);
                } else {
                  const skus = {};
                  skusResults.rows.forEach((sku) => {
                    skus[sku.id] = {
                      quantity: sku.quantity,
                      size: sku.size,
                    };
                  });

                  resolve({
                    style_id: styleId,
                    name: style.style_name,
                    original_price: style.original_price,
                    sale_price: style.sale_price,
                    'default?': style.isdefault,
                    photos,
                    skus
                  });
                }
              });
            });
          });
        });

        Promise.all(stylePromises)
          .then((stylesData) => {
            resolve(stylesData);
          })
          .catch((error) => {
            reject(error);
          });
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