const {getAllProductsFromDb, getSingleProductFromDb, getStylesFromDb, getRelatedFromDb} = require('../models/models.js');



module.exports = {

  getProducts: () => {},
  getProduct: (req, res) => {
    const { product_id } = req.params;
    getSingleProductFromDb(product_id)
    .then((product) => {
      if (product === null) {
        res.status(404).json({ error: 'Product not found' });
        return;
      } else {
        res.status(200).json(product);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    });
  },

  getStyles: (req, res) => {
    const { product_id } = req.params;

    getStylesFromDb(product_id)
    .then((styles) => {
      res.status(200).json({
        product_id,
        results: styles
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    });
  },

  getRelated: (req, res) => {
    const { product_id } = req.params;
    getRelatedFromDb(product_id)
    .then((relatedProducts) => {
      res.status(200).json(relatedProducts);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    });
  }
}


