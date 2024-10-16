CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  quantity INT,
  status VARCHAR(50),
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
