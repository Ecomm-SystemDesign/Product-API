COPY product(id, product_name, slogan, product_description, category, default_price)
FROM '/home/jerryrenn/product.csv'
DELIMITER ','
CSV HEADER;

COPY features(id, product_id, feature, feature_value)
FROM '/home/jerryrenn/features.csv'
DELIMITER ','
CSV HEADER;

COPY styles(id, product_id, style_name, sale_price, original_price, isDefault)
FROM '/home/jerryrenn/styles.csv'
DELIMITER ','
CSV HEADER;

COPY photos(id, style_id, regular_url, thumbnail_url)
FROM '/home/jerryrenn/photos.csv'
DELIMITER ','
CSV HEADER;

COPY skus(id, style_id, size, quantity)
FROM '/home/jerryrenn/skus.csv'
DELIMITER ','
CSV HEADER;

COPY related(id, current_product_id, related_product_id)
FROM '/home/jerryrenn/related.csv'
DELIMITER ','
CSV HEADER;



