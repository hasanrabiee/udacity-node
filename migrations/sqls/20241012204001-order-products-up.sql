CREATE TABLE IF NOT EXISTS product_order (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products(id) ON DELETE CASCADE,
  order_id INT REFERENCES orders(id) ON DELETE CASCADE,
  quantity INT NOT NULL,
  UNIQUE (product_id, order_id) 
);
