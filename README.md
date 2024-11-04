
# Movie Review REST API

A REST API built with Node.js and Express that allows users to add movies, post reviews, and rate movies. The API is secured using JSON Web Tokens (JWT) for authentication, ensuring that only registered users can post reviews and rate movies. Admin users have additional privileges to manage movies.

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Testing](#testing)

## Project Overview
This REST API supports:
- Registering and logging in users
- Adding, updating, and deleting movies (admin access only)
- Posting, retrieving, and deleting movie reviews

## Tech Stack
- **Backend Framework**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Features
- **User Authentication**: Users can register, log in, and receive a JWT for secure access.
- **Movie Management**: Admins can add, update, and delete movies.
- **Review System**: Registered users can post and view reviews for movies.

## Installation

1. Clone this repository:
    ```bash
    git clone <repository-url>
    cd movie-review-api
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables (see below).

4. Start the server:
    ```bash
    npm start
    ```

## Environment Variables
Create a `.env` file in the root of the project and configure the following environment variables:

```plaintext
PORT=5000
MONGODB_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret Key>
```

## API Endpoints

### User Authentication
- **POST /api/register**: Register a new user.
- **POST /api/login**: Log in and receive a JWT token.
- **GET /api/profile**: View the authenticated user’s profile (JWT required).

### Movies
- **GET /api/movies**: List all movies.
- **POST /api/movies**: Add a new movie (admin-only access).
- **GET /api/movies/:id**: Retrieve details of a specific movie.
- **PUT /api/movies/:id**: Update details of a specific movie (admin-only access).
- **DELETE /api/movies/:id**: Delete a movie (admin-only access).

### Reviews
- **POST /api/movies/:movieId/reviews**: Post a review for a specific movie.
- **GET /api/movies/:movieId/reviews**: Get all reviews for a specific movie.
- **DELETE /api/movies/:movieId/reviews/:reviewId**: Delete a specific review (user-only access).


## Authentication
- **JWT** is used to secure endpoints.
- Only registered users can add reviews and rate movies.
- Admin users can add, update, and delete movies.

## Testing
- **Manual Testing**: Use [Postman](https://www.postman.com/) to test each endpoint and check:
  - CRUD operations for users, movies, and reviews.
  - JWT-protected endpoints for user authentication.

## Future Improvements
- **Favorites Feature**: Allow users to mark movies as favorites.
- **Admin Management**: Enable admin users to manage user reviews.
- **Enhanced Filtering**: Add advanced search features to filter movies by additional criteria.
- **Comprehensive Unit Tests**: Improve test coverage for all endpoints and scenarios.

