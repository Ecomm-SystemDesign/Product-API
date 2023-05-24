const products = new Schema({
  id: {type: Number, unique: true},
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  features: [{feature: String, value: String}],
  styles: [
    {
      style_id: {type: Number, unique: true},
      name: String,
      original_price: Number,
      sale_price: Number,
      default: Boolean,
      photos: [{thumbnail_url: String, url: String}]
      skus: [
        {
          sku_id: {type: Number, unique: true},
          quantity: Number,
          size: String
        }
      ]
    }
  ],
  related: [Number]
})
