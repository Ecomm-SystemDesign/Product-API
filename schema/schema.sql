DROP DATABASE IF EXISTS products

CREATE DATABASE products;

\c products

CREATE TABLE product (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  product_name VARCHAR(50) NOT NULL,
  slogan TEXT,
  product_description TEXT,
  category VARCHAR(25) NOT NULL,
  default_price INTEGER NOT NULL
);

CREATE TABLE features (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  product_id INTEGER NOT NULL REFERENCES product(id),
  feature VARCHAR(255) NOT NULL,
  feature_value VARCHAR(255)
);

CREATE TABLE styles (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  product_id INTEGER NOT NULL REFERENCES product(id),
  style_name VARCHAR(50) NOT NULL,
  sale_price TEXT,
  original_price INTEGER NOT NULL CHECK (original_price >= 0),
  isDefault BOOLEAN NOT NULL
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  style_id INTEGER NOT NULL REFERENCES styles(id),
  regular_url TEXT,
  thumbnail_url TEXT
);

CREATE TABLE skus (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  style_id INTEGER NOT NULL REFERENCES styles(id),
  size VARCHAR(10) NOT NULL,
  quantity INTEGER NOT NULL
);

CREATE TABLE related (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  current_product_id INTEGER NOT NULL REFERENCES product(id),
  related_product_id INTEGER NOT NULL
);

