#  Flight Information Manager

This repository contain Frontend app for the Flight  Information Manager App


#  React Redux Toolkit Frontend

## Project structure

flight-management-app/

├── src/

   ├── components/

      ├── common/
         ├── Footer
         ├── Header
         └── SideBar

      ├── FlightsComponents/
         ├── Cards
         ├── Form
         ├── Search
         ├── Table
         └── Pagination

  ├── pages/

     ├── auth/
        ├── Login
        └── Register

   ├── Flights/

      ├── FlightCard
      └── FlightList

  ├── context/

      └── TheamContext

  ├── service/

      ├── header/
        └── apiHeader

      ├── user/
        └── userService
        
      ├── Flights/
        └── FlightService

  ├── store/

      ├── flights/
        ├── flightSclice
        └── flightThunk

     ├── user/
        ├── userSclice
        └── userThunk
    └── index

   ├── App

   ├── index

├── public/

   ├── index
   └── App

├── package.json


## Tech used

- React-strap (Bootstrap) CSS framework for styling
- React
- Redux Toolkit
- React Router
- Formik
- Eslint

## How to run locally

Clone or download project go to the Front-end
Inside Front-end open node console

Then type  `npm install`
Run `npm start` if you have node installed locally.

### Run Api server

Need to run serve Run `npm run server` if you have node installed locally.
Open your browse to `localhost:5000`

Open Swagger Documentations Open your browse to `localhost:5000/api-docs/`


## Rest api structure

### User api

Methods | Urls | Action	
--- | --- | ---
**GET** | `/api/authors` |  list All Authors
**GET**| `/api/author/:id` |  list single Author
**POST** | `/auth/login`    | login to app
**POST** | `/auth/register` | create new user
**POST** | `/auth/refresh`  | create New token 
**PUT** | `/api/author/:id` | Edit Author 
**DELETE** | `/api/author/:id` |  delete Author 

### Flight api

Methods | Urls | Action	
--- | --- | ---
**GET** | `/flight`              |  List flights
**GET** | `/flight/:id/photo`    |  flight with photo
**POST** | `/flights`            | create new flight without photo
**POST** | `/flights/withPhoto`  | create new flight with photo
**PUT** | `/flight/:id`          | Edit flight 
**PUT** | `/flight/:id/withPhot` | Edit flight with photo
**DELETE** | `/flights/:id`      |  delete flight 


## Tests 

Open Project

Open node console run `npm test` to have jest start and watch the tests.