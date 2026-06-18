# Assignment 2 Helper

## 1. MongoDB connection string

Create a MongoDB Atlas database named `Portfolio`, then copy the driver connection string and paste it into:

- `config/config.js`

Replace:

```js
'YOUR_MONGODB_CONNECTION_STRING'
```

with a real URI like:

```js
'mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/Portfolio?retryWrites=true&w=majority&appName=Cluster0'
```

## 2. Run the app concurrently

From the `client` folder run:

```bash
npm run dev
```

This starts:

- frontend on `http://localhost:5173`
- backend on `http://localhost:3000`

## 3. Thunder Client sample requests

### Contacts

POST `http://localhost:3000/api/contacts`

```json
{
  "firstname": "Amir",
  "lastname": "Saad",
  "email": "Amir.Saad1@hotmail.com"
}
```

### Projects

POST `http://localhost:3000/api/projects`

```json
{
  "title": "Portfolio Backend",
  "firstname": "Amir",
  "lastname": "Saad",
  "email": "Amir.Saad1@hotmail.com",
  "completionDate": "2026-06-18",
  "description": "Node.js, Express, MongoDB, and Mongoose backend for the portfolio application."
}
```

### Qualifications

POST `http://localhost:3000/api/qualifications`

```json
{
  "title": "Software Engineering Technology - Artificial Intelligence",
  "firstname": "Amir",
  "lastname": "Saad",
  "email": "Amir.Saad1@hotmail.com",
  "completionDate": "2027-04-01",
  "description": "Current Centennial College qualification."
}
```

### Users

POST `http://localhost:3000/api/users`

```json
{
  "name": "Amir Saad",
  "email": "asaad10@my.centennialcollege.ca",
  "password": "portfolio123"
}
```

### Sign in

POST `http://localhost:3000/auth/signin`

```json
{
  "email": "asaad10@my.centennialcollege.ca",
  "password": "portfolio123"
}
```

### Protected route

GET `http://localhost:3000/api/users/protected`

Add header:

```text
Authorization: Bearer YOUR_TOKEN_HERE
```

## 4. Main routes list

- `GET/POST/DELETE http://localhost:3000/api/contacts`
- `GET/PUT/DELETE http://localhost:3000/api/contacts/:contactId`
- `GET/POST/DELETE http://localhost:3000/api/projects`
- `GET/PUT/DELETE http://localhost:3000/api/projects/:projectId`
- `GET/POST/DELETE http://localhost:3000/api/qualifications`
- `GET/PUT/DELETE http://localhost:3000/api/qualifications/:qualificationId`
- `GET/POST/DELETE http://localhost:3000/api/users`
- `GET/PUT/DELETE http://localhost:3000/api/users/:userId`
- `POST http://localhost:3000/auth/signin`
- `GET http://localhost:3000/auth/signout`
