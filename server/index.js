require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const {getProducts, getProduct, getStyles, getRelated} = require('./controllers/controllers.js')


const app = express();
app.use(morgan('dev'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = express.Router();
app.use(router);

//set up routes here
router.get('/products', getProducts);
router.get('/products/:productId', getProduct); // Use :productId instead of :product_id
router.get('/products/:productId/styles', getStyles); // Use :productId instead of :product_id
router.get('/products/:productId/related', getRelated); // Use :productId instead of :product_id

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server available at http://localhost:${PORT}`);
});
