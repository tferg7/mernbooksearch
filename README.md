# mernbooksearch

## Description
A Google Books search app built with the MERN stack and GraphQL. Search for books, sign up or log in, and save books to your account.

## Table of Contents
* [Technologies](#technologies)
* [Installation](#installation)
* [Usage](#usage)

## Technologies
MongoDB · Mongoose · Express · React · Node.js · Apollo Server and Client (GraphQL) · JSON Web Tokens · React Bootstrap

## Installation
1. Install [Node.js](https://nodejs.org) and run MongoDB locally (or set `MONGODB_URI` to a MongoDB Atlas connection string).
2. From the `mernbooksearch` folder, run `npm install` (installs both server and client).
3. Optional: set `JWT_SECRET` in your environment to change the token secret.

## Usage
* Development: `npm run develop` — the API runs on port 3001 and the React app on port 3000.
* Production: `npm run build`, then `NODE_ENV=production npm start`.
