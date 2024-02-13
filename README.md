# Wearit! - An E-Commerce Website for Shoes

## Overview

Wearit! is my personal project, an e-commerce platform dedicated to shoes.

## Features

- **User Authentication:** Sign up and log in functionalities for users.
- **Product Catalog:** Browse and view a list of products available.
- **Shopping Cart:** Add and manage items in the shopping cart.
- **Secure Checkout:** Ensure secure payment processing for purchases.
- **Review:** Allow users to review and rate products they have purchased.

## Technologies Used

- **Frontend:** HTML, CSS, TypeScript, React, Redux (Redux Tookit)
- **Backend:** NodeJS, KoaJS
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Payment Gateway Integration:** Stripe

## Getting Started

To get started with Wearit!, follow these steps:

### Client

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/wearit.git
   ```
2. Install dependencies:

   ```bash
       cd wearit/client
       yarn
   ```

3. Configure the environment variables:

- Create a `.env` file based on the provided `.env.example` file, and put required details in the same

4. Start the development server:
   ```bash
       yarn dev
   ```

### Server

The server folder contains the Node.js backend of the application.

1. Navigate to the server directory:
   ```bash
   cd ../server
   ```
2. Install dependencies:

   ```bash
   yarn
   ```

3. Create a `.env` file based on the provided `.env.example` file, and put required details in the same

4. Start the server:
   ```bash
    yarn dev
   ```
