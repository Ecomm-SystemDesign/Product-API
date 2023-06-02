# System Design Capstone

A backend server application that provides an API for managing product information in an ecommerce system. This API supports an existing retail web application with a modernized system able to withstand web scale traffic loads up to 3000 requests per second.

## Table of Contents

1. [Description](#description)
2. [Technologies](#technologies)
3. [API Endpoints](#api-endpoints)
4. [Getting Started](#getting-started)
5. [Contributing](#contributing)
6. [License](#license)


## Description

This API is built using the Node.js and Express.js frameworks and utilizes a PostgreSQL database to serve a legacy codebase inherited by my team. As part of our strategy, we decomposed the pre-existing API into three separate services: Products, Questions/Answers, and Reviews. The focus of this portion of the project is the Product section, which serves four distinct endpoints and retrieves data from six PostgreSQL tables.


## Technologies

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [nginx](https://nginx.org/)
- [k6](https://k6.io/)
- [Artillery](https://www.artillery.io/)
- [Loader.io](https://loader.io/)


## API Endpoints

The following API endpoints are available for interacting with the ProductAPI Server:

- `GET /api/products`: Retrieves a list of all products.
- `GET /api/products/:productId`: Retrieves details of a specific product.
- `GET /api/products/:productId/styles`: Retrieves details of a specific product's styles.
- `GET /api/products/:productId/related`: Retrieves details of a specific product's related product IDs.

## Getting Started

To run the ProductAPI Server locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/productapi-server.git`.
2. Configure a PostgreSQL user.
3. Install dependencies: `npm install`.
4. Rename the `.env.example` file to `.env` and update the configuration settings.
5. Start the server in development mode: `npm run server-dev`.
6. The server should now be running on `http://localhost:3000`.

You can use tools like cURL or Postman to test the API endpoints.



