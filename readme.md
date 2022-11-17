# Description
These are the code snippets of the frontend and backend where we are fetching the blogs, blog count, updating the blog views in the backend, and implementing the login in frontend.


# About
This project is created using the **NextJS** with **TypeScript** in the frontend and **Strapi** with **GraphQL** in the backend and implementing the following tasks,
#### -  **Mutation**
-  Fetching the id of the blogs and storing the results in a variable.
-  Setting up views for the blogs and incrementing the views according to blog views
-  Creating a query to fetch the blogs of the Author


#### -  **Query**
-  Fetching the count of blogs


#### -  **Frontend**
-  Login functionality with email, password, and google login
-  Token check in the cookies and then login the user


# Concepts
-  Used the strapi query engine to get the count of blogs
-  Used the strapi resolver to fetch the blogs related to a specific user which are published and associated with the given type
- Used the knex raw query to update the views of blogs
- Used the react-oauth/google library to log in with google authentication


# Tools
-  NextJS
-  Typescript
-  Strapi
-  GraphQL