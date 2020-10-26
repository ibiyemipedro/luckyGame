# LuckyShine Game Backend

LuckyShine is a game where users can collect treasures in a given latitude and longitude. Every treasure that
is collected will have points based on the monetary value. A treasure may have more than one money value, it
depends on the user’s luck. Lucky users may get the highest money from the treasure that has been collected.

*Author:* Ibiyemi Sanni


## Requirements
- NodeJS
- PostgreSQL

## Installation
### Node.JS

Ensure you have node installed on your system, visit [node.org](https://nodejs.org/en/download/) to install. Once installed, open a terminal and run the command to confirm node is installed and see the current version

```bash
node -v
```

### PostgreSQL

Ensure you have PostgreSQL installed on your system, visit [postgresql.org](https://www.postgresql.org/download/) to install. Once installed, open a terminal and run the command to confirm PostgreSQL is installed

```bash
sudo pg_isready
```

## Project Structure
The code base is structured in a modular way, following a Model - Controller - Service Architecture. An overview of the code base:
- CONFIG - containing config data and files 
- CONTROLLER - contains the files that receives data from the routes and call the services 
- DATA - containing data for seeding  
- MIGRATION - containing database migrations files
- ROUTES - containing files that handles the request routes and forward to appropriate controller
- SEEDERS - containing database seeding files 
- SERVICES - containing services files that handles requests functionalities 
- TESTS - containing test files 
- UTILS - containing classes, middlewares and other utilities 

## Set - Up

Clone the source file from github the github repo [https://github.com/yemipedro07/luckyGame.](https://github.com/yemipedro07/luckyGame) or unzip the source file to your project folder

### Create a database

Create a database name : DB_NAME, username : DB_USERNAME and password : DB_PASSWORD for the database. run the following command to create them accordingly


To enter the PostgreSQL terminal


```bash
$ sudo su - postgres
$ psql
postgres=#

```
To create DB, USERNAME and PASSWORD, replace DB_USERNAME with your desired username, DB_PASSWORD with your desired password and DB_NAME with desired name for your DB
```bash
postgres=# CREATE USER DB_USERNAME WITH PASSWORD 'DB_PASSWORD';
postgres=# CREATE DATABASE DB_NAME;
postgres=# GRANT ALL PRIVILEGES ON DATABASE DB_NAME to DB_USERNAME;
postgres=# \q
```

### Create a database

Update the details in the config/dbConfig.js file with the details you just used in creating the database.

For Production, the details are set in the .env file .
### NOTE: For actual production environment save your dbdetails to somewhere safe and not the .env in your root folder.

### Install Dependencies

To install the dependencies of the project 

Navigate to the root folder of the project, open a terminal and run the following command

```bash
npm install

```

### Run Migrations and Seeders

After the database is set and properly configured, and dependencies installed. Run all migrations and then seeders to set up the database tables and demo data.

Still in the root folder of the project, and in the terminal, run the following command

```bash
npx sequelize-cli db:migrate

npx sequelize-cli db:seed:all
```
These commands should return successful

### Serve the project

At this point, everything should be set and project ready to run. 

Run the following command

```bash
npm run start
```
If everything runs fine, navigate to your browser and open http://localhost:3800. The project will be running on the endpoint.

## EndPoints

### Register a User -

*Endpoint*  ` http://localhost:3800/register` - method (POST)

- Creates a user

*Payload*

#### application/json

```bash
{
	"name" : "Demo User",
	"password" : "12345678",
	"email" : "a@a.com",
	"age": 17
}
```


*Response format*

```bash
{
    "status": true,
    "message": "User registration successful",
    "data": null
}
```


### User Login -

*Endpoint*  ` http://localhost:3800/login` - method (POST)

- Login to play game

*Payload*

#### application/json

```bash
{
	"email" : "a@a.com",
	"password" : "12345678"
}
```


*Response format*

```bash
{
    "status": true,
    "message": "User login successful",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYS5jb20iLCJpYXQiOjE2MDM1NjcyMDcsImV4cCI6MTYwMzY1MzYwN30.b4KOKwXFNm57CdhY4gcSkxxElhjmaRhVfaIol-KcNl8",
        "user": {
            "id": 1,
            "name": "Demo User",
            "email": "a@a.com",
            "password": "$2b$12$fccxgHrB3Ux1pxW9KzmDQ.Q9JLYkJ8QiKz3ys81PjMQ1Uf5zeHZFC",
            "age": 17,
            "createdAt": "2020-10-23T18:36:16.509Z",
            "updatedAt": "2020-10-23T18:36:16.509Z"
        }
    }
}
```

### Play Game -

*Endpoint*  `http://localhost:3800/game/play` - method (POST)

-Get Treasure points within a distance (1 or 10 allowed)

*Headers*
#### "Authorization" : "Bearer {token}"

*Payload*
#### application/json

```bash
{
	"latitude" : 1.3273451,
	"longitude" : 103.8756757,
	"distance" : 1
}
```


*Response format*

```bash
{
    "status": true,
    "message": "User hunt success",
    "data": [
        {
            "id": 105,
            "name": "T6",
            "latitude": 1.33616189,
            "longitude": 103.87708662,
            "createdAt": "2020-10-23T18:13:01.082Z",
            "updatedAt": "2020-10-23T18:13:01.082Z",
            "MoneyValues": [
                {
                    "id": 31,
                    "treasureId": 105,
                    "amount": 15,
                    "createdAt": "2020-10-23T18:13:01.145Z",
                    "updatedAt": "2020-10-23T18:13:01.145Z"
                }
            ]
        },
        {
            "id": 106,
            "name": "T7",
            "latitude": 1.32552844,
            "longitude": 103.86910143,
            "createdAt": "2020-10-23T18:13:01.082Z",
            "updatedAt": "2020-10-23T18:13:01.082Z",
            "MoneyValues": [
                {
                    "id": 32,
                    "treasureId": 106,
                    "amount": 15,
                    "createdAt": "2020-10-23T18:13:01.145Z",
                    "updatedAt": "2020-10-23T18:13:01.145Z"
                }
            ]
        },
        {
            "id": 107,
            "name": "T8",
            "latitude": 1.32303589,
            "longitude": 103.87748154,
            "createdAt": "2020-10-23T18:13:01.082Z",
            "updatedAt": "2020-10-23T18:13:01.082Z",
            "MoneyValues": [
                {
                    "id": 33,
                    "treasureId": 107,
                    "amount": 10,
                    "createdAt": "2020-10-23T18:13:01.145Z",
                    "updatedAt": "2020-10-23T18:13:01.145Z"
                },
                {
                    "id": 48,
                    "treasureId": 107,
                    "amount": 30,
                    "createdAt": "2020-10-23T18:13:01.145Z",
                    "updatedAt": "2020-10-23T18:13:01.145Z"
                }
            ]
        },
        {
            "id": 108,
            "name": "T9",
            "latitude": 1.33465304,
            "longitude": 103.87044897,
            "createdAt": "2020-10-23T18:13:01.082Z",
            "updatedAt": "2020-10-23T18:13:01.082Z",
            "MoneyValues": [
                {
                    "id": 34,
                    "treasureId": 108,
                    "amount": 15,
                    "createdAt": "2020-10-23T18:13:01.145Z",
                    "updatedAt": "2020-10-23T18:13:01.145Z"
                },
                {
                    "id": 49,
                    "treasureId": 108,
                    "amount": 30,
                    "createdAt": "2020-10-23T18:13:01.145Z",
                    "updatedAt": "2020-10-23T18:13:01.145Z"
                }
            ]
        },
        {
            "id": 109,
            "name": "T10",
            "latitude": 1.32606138,
            "longitude": 103.87930069,
            "createdAt": "2020-10-23T18:13:01.082Z",
            "updatedAt": "2020-10-23T18:13:01.082Z",
            "MoneyValues": [
                {
                    "id": 35,
                    "treasureId": 109,
                    "amount": 15,
                    "createdAt": "2020-10-23T18:13:01.145Z",
                    "updatedAt": "2020-10-23T18:13:01.145Z"
                },
                {
                    "id": 50,
                    "treasureId": 109,
                    "amount": 30,
                    "createdAt": "2020-10-23T18:13:01.145Z",
                    "updatedAt": "2020-10-23T18:13:01.145Z"
                }
            ]
        },
        {
            "id": 113,
            "name": "T14",
            "latitude": 1.32960595,
            "longitude": 103.88079366,
            "createdAt": "2020-10-23T18:13:01.082Z",
            "updatedAt": "2020-10-23T18:13:01.082Z",
            "MoneyValues": [
                {
                    "id": 39,
                    "treasureId": 113,
                    "amount": 10,
                    "createdAt": "2020-10-23T18:13:01.145Z",
                    "updatedAt": "2020-10-23T18:13:01.145Z"
                }
            ]
        }
    ]
}
```

### Play Game with an amount filter-

*Endpoint*  `http://localhost:3800/game/play` - method (POST)

*Headers*
#### "Authorization" : "Bearer {token}"

-Get Treasure points within a distance (1 or 10 allowed)

*Payload*

#### application/json

```bash
{
	"latitude" : 1.3273451,
	"longitude" : 103.8756757,
	"distance" : 10,
	"amountValue": 15
}
```

*Response format*
```
{
    "status": true,
    "message": "User hunt success",
    "data": [
        {
            "id": 105,
            "name": "T6",
            "latitude": 1.33616189,
            "longitude": 103.87708662,
            "createdAt": "2020-10-23T18:13:01.082Z",
            "updatedAt": "2020-10-23T18:13:01.082Z",
            "MoneyValues": [
                {
                    "id": 31,
                    "treasureId": 105,
                    "amount": 15,
                    "createdAt": "2020-10-23T18:13:01.145Z",
                    "updatedAt": "2020-10-23T18:13:01.145Z"
                }
            ]
        },
        {
            "id": 106,
            "name": "T7",
            "latitude": 1.32552844,
            "longitude": 103.86910143,
            "createdAt": "2020-10-23T18:13:01.082Z",
            "updatedAt": "2020-10-23T18:13:01.082Z",
            "MoneyValues": [
                {
                    "id": 32,
                    "treasureId": 106,
                    "amount": 15,
                    "createdAt": "2020-10-23T18:13:01.145Z",
                    "updatedAt": "2020-10-23T18:13:01.145Z"
                }
            ]
        },
        {
            "id": 108,
            "name": "T9",
            "latitude": 1.33465304,
            "longitude": 103.87044897,
            "createdAt": "2020-10-23T18:13:01.082Z",
            "updatedAt": "2020-10-23T18:13:01.082Z",
            "MoneyValues": [
                {
                    "id": 34,
                    "treasureId": 108,
                    "amount": 15,
                    "createdAt": "2020-10-23T18:13:01.145Z",
                    "updatedAt": "2020-10-23T18:13:01.145Z"
                },
                {
                    "id": 49,
                    "treasureId": 108,
                    "amount": 30,
                    "createdAt": "2020-10-23T18:13:01.145Z",
                    "updatedAt": "2020-10-23T18:13:01.145Z"
                }
            ]
        },
        {
            "id": 109,
            "name": "T10",
            "latitude": 1.32606138,
            "longitude": 103.87930069,
            "createdAt": "2020-10-23T18:13:01.082Z",
            "updatedAt": "2020-10-23T18:13:01.082Z",
            "MoneyValues": [
                {
                    "id": 35,
                    "treasureId": 109,
                    "amount": 15,
                    "createdAt": "2020-10-23T18:13:01.145Z",
                    "updatedAt": "2020-10-23T18:13:01.145Z"
                },
                {
                    "id": 50,
                    "treasureId": 109,
                    "amount": 30,
                    "createdAt": "2020-10-23T18:13:01.145Z",
                    "updatedAt": "2020-10-23T18:13:01.145Z"
                }
            ]
        }
    ]
}
```