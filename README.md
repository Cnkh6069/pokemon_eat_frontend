# pokemon_eat_frontend
front end application for Rocket Bootcamp Project 3 using SQL 

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


- Pokemon Eat: Food Review App: Application to record food places visited by a user and for the user to leave ratings.
  - Features to include: 
    - Auth0 login to record users
    - One landing page for user to search for restaurants by (Geography (N,S,E,W), Cuisine and Rating) 
      - [READ and Filter function, Pagination Sorting]
      - Map of Restaurants
      - Users can search/create new restaurants if they are not able to find the restaurant (READ / CREATE) 
    - On the Specific Restaurant page, User is able to 
      - (1) Read all the reviews for that Restaurant [READ] and 
      - (2) leave a review [CREATE/UPDATE/DELETE]
      - Upon submitting a review, Users can collect Pokemons and accumulate levels for the amount of reviews they give or the places they have visited.
    - User can view and update their own profile [READ / CREATE/ UPDATE/ DELETE] 


    Setting up
    - npm install
    - npm install axios react-router-dom
    - npm install @auth0/auth0-react