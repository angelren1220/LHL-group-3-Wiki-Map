# Wiki Map Project

Wiki Map is a web app that allows users to collaboratively create maps which list multiple pins.

## Final Product

!["description"](url)
!["description"](url)
!["description"](url)


## Getting Started

1. Start psql services: `brew services start postgresql`
2. Connect to database: `psql -d midterm -U labber`
  - if this is the first time, need to create a datbase with user role first: 
  `psql -U vagrant -d template1`
  `CREATE ROLE labber WITH LOGIN password 'labber';`
  `CREATE DATABASE midterm OWNER labber;`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies
- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- bcrypt
- chalk
- cookie-session
- dotenv
- ejs
- express
- morgan
- sass
- nodemon
