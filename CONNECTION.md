# Storefront Backend API

## Port Numbers

- **Database Port**: 5432 (Postgres)
- **Server Port**: 3000 (Express)

## Environment Variables

Set the following environment variables in a `.env` file:

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store
POSTGRES_TEST_DB=storefront_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_db_password
BCRYPT_PASSWORD=somesecurepassword
SALT_ROUNDS=10
TOKEN_SECRET=mysecretkey
ENV=test
POSTGRES_TEST_DB=store_test
```

put ENV to dev to use development database and put env to test to use test database

## Package Installation

To install the dependencies, run:

```bash
yarn install
```

## Setup Database and Server

1. **Create Databases**:

   - Development Database:
     ```bash
     createdb store
     ```
   - Test Database:
     ```bash
     createdb store_test
     ```

2. **Run Migrations**:

   ```bash
   db-migrate up
   ```

3. **Start the Server**:
   ```bash
   yarn start
   ```

## Database Schema

### Users Table:

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(100),
  lastName VARCHAR(100),
  password VARCHAR(255)
);

```

### Products Table:

```sql
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  price NUMERIC(10, 2),
  category VARCHAR(50)
);

```

### Orders Table:

```sql
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  quantity INT,
  status VARCHAR(50),
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

## Endpoints

### Users:

- `POST /users` - Create a user
- `GET /users` - Get all users
- `GET /users/:id` - Get a single user by id
- `POST /users/authenticated` - login a user

### Products:

- `GET /products` - Get all products
- `GET /products/:id` - Get a single product by id
- `POST /products` - Create a product

### Orders:

- `GET /orders/users` - Get orders by user
- `POST /orders` - Create an order
