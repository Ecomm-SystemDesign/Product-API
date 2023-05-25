const {getAllProductsFromDb, getSingleProductFromDb} = require('../models/models.js');



module.exports = {

  getProducts: () => {},
  getProduct: (req, res) => {
    const { productId } = req.params;
    getSingleProductFromDb(productId)
      .then((product) => {
        if (product === null) {
          res.status(404).json({ error: 'Product not found' });
          return;
        } else {
          console.log('success from getProduct in controllers')
          res.status(200).json(product);
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'Internal server error' });
      });
  },
  getStyles: () => {},
  getRelated: () => {}

}


