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

        const product = productResults.rows[0]; // productResults is an object with a row's property

        db.query(featuresQuery, [productId], (error, featuresResults) => {
          if (error) {
            reject(error);
          } else {
            console.log('success from getSingleProductFromDb')
            const features = featuresResults.rows;
            product.features = features; //adds the features as a property to match shape
            resolve(product);
          }
        });
      });
    });
  },

  getStylesFromDb: () => {},
  getRelatedFromDb: () => {}

}