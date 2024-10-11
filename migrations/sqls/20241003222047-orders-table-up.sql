CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  product_id INT REFERENCES products(id),
  quantity INT,
  status VARCHAR(50),
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
