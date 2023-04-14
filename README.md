# Wiki Map Project

Wiki Map is a web app that allows users to collaboratively create maps which list multiple pins.

## Final Product

![login page](https://github.com/angelren1220/LHL-group-3-Wiki-Map/blob/master/docs/6_login.png?raw=true)
![register page](https://github.com/angelren1220/LHL-group-3-Wiki-Map/blob/master/docs/7_register.png?raw=true)
![user maps list](https://github.com/angelren1220/LHL-group-3-Wiki-Map/blob/master/docs/5_usermaps.png?raw=true)
![view map](https://github.com/angelren1220/LHL-group-3-Wiki-Map/blob/master/docs/2_viewmap.png?raw=true)
![pins list of_map](https://github.com/angelren1220/LHL-group-3-Wiki-Map/blob/master/docs/3_pinsupper.png?raw=true)
![add pins](https://github.com/angelren1220/LHL-group-3-Wiki-Map/blob/master/docs/4_pinslower.png?raw=true)
![eidt pin in map eidtmode](https://github.com/angelren1220/LHL-group-3-Wiki-Map/blob/master/docs/1_editmode.png?raw=true)


## Getting Started

1. Start psql services: `brew services start postgresql`
2. Set up database for the first time: 
  - `psql -U vagrant -d template1`
  - `CREATE ROLE labber WITH LOGIN password 'labber';`
  - `CREATE DATABASE midterm OWNER labber;`
3. Connect to database: `psql -d midterm -U labber`
4. Install dependencies: `npm i`
5. Fix to binaries for sass: `npm rebuild node-sass`
6. Reset database: `npm run db:reset`
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
