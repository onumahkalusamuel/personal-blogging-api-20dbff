# personal-blogging-api-20dbff
Day 1 of 20 days backend for fun

## Project Overview
Personal Blogging API is a basic API showcasing Create, Read, Update and Delete (`CRUD`) operations. 


## Project Structure
The project (monorepo) has two folders:
* `backend`: Contains the code for the backend api.
* `frontend`: Contains the code for the user-facing webapp.

## Setup
To run the project, kindly clone the repository.
* At the root folder, run `yarn install` to install all dependencies.
* Then `yarn dev` to load the app in dev mode.
* The API is live at http://localhost:3000, while the frontend can be accessed at http://localhost:5173.
* The database is in-memory. It is created on project startup.
* To load the app in production mode, run `yarn start`. The whole app will be available at http://localhost:3000

## Recommendations for update
* The project can be converted to a mono repo to further simplify package management. ✅
* Add notification libraries to the frontend.
* Add rich text editing for the blog content.
