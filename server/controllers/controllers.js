const {getAllProductsFromDb, getSingleProductFromDb, getStylesFromDb, getRelatedFromDb} = require('../models/models.js');



module.exports = {

  getProducts: (req, res) => {
    let page = !isNaN(req.query.page) ? req.query.page : 1;
    let count = !isNaN(req.query.count) ? req.query.count : 5;
    if (page > 0 && count > 0) {
      getAllProductsFromDb(page, count)
      .then((response) => {
        const modifiedResponse = response.rows.map((row) => ({
          id: row.id,
          name: row.product_name,
          slogan: row.slogan,
          description: row.product_description,
          category: row.category,
          default_price: `${row.default_price}` //change the price from integer to string integer
        }));
        res.send(modifiedResponse);
      })
        .catch((error) => {
          console.log(error);
          res.status(400).send(error);
        });
    } else {
      res.status(400).send('Please provide a page/count above 0.')
    }
  },

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


