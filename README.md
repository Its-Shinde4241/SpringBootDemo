# Exploring spring boot 
Job Post application built with:

- Backend: Spring Boot 3.5 (Java 21), Spring Web, Spring Security (HTTP Basic), Spring Data JPA, PostgreSQL
- Frontend: React 19 + Vite, MUI, Axios, React Router

The app lets you create, edit, delete, list, and search job posts. The backend protects APIs with HTTP Basic auth and stores users in PostgreSQL. The frontend calls the backend directly from the browser.

## Repository layout

- `springBootLearn/` — Spring Boot REST API and security
- `JobPost/` — React + Vite frontend

## Prerequisites

- Java 21 (JDK)
- Node.js 18+ and npm
- PostgreSQL 13+ running locally

## Backend setup (springBootLearn)

1) Configure database in `springBootLearn/src/main/resources/application.properties`:

```
spring.datasource.url=jdbc:postgresql://localhost:5432/demo
spring.datasource.username=postgres
spring.datasource.password=<your_password>
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

2) Create database and seed a login user (uses pgcrypto to generate a BCrypt hash compatible with Spring Security):

```sql
-- In psql
CREATE DATABASE demo;
\c demo
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create the users table will be handled automatically by JPA on first run (ddl-auto=update).
-- Insert a user with username 'shubham' and password 'shinde'
INSERT INTO users(id, name, password)
VALUES (1, 'shubham', crypt('shinde', gen_salt('bf', 12)));
```

3) Run the backend on port 8080:

```
cd springBootLearn
mvnw.cmd spring-boot:run
```

Optional build + run:

```
cd springBootLearn
mvnw.cmd -DskipTests clean package
java -jar target\springBootLearn-0.0.1-SNAPSHOT.jar
```

4) (Optional) Load sample job posts

Open the URL and authenticate with the user created above:

```
http://localhost:8080/load
```

## Frontend setup (JobPost)

1) Install and start Vite dev server (defaults to http://localhost:5173):

```
cd JobPost
npm install
npm run dev
```

The backend CORS policy allows `http://localhost:5173` by default.

2) Credentials used by the frontend

The example components call the API with HTTP Basic auth using:

- username: `shubham`
- password: `shinde`

These are hardcoded in `src/components/*.jsx`. Either create this user in the DB (see above) or update the credentials in the components to match your own user.

## API overview

Base URL: `http://localhost:8080`

All endpoints require HTTP Basic authentication.

- GET `jobPosts` — list all job posts
- GET `/jobPost/{postId}` — get a single job post
- GET `jobPosts/keyword/{keyword}` — search posts by keyword
- POST `jobPost` — create a new job post
- PUT `jobPost` — update an existing post
- DELETE `jobPost/{postId}` — delete by id
- GET `/load` — seed sample data

JobPost JSON schema:

```
{
	"postId": number,
	"postProfile": string,
	"postDesc": string,
	"reqExperience": number,
	"postTechStack": string[]
}
```

Notes:

- The backend maps `postTechStack` to PostgreSQL `text[]`. Use PostgreSQL for this schema.
- Spring Security is stateless and uses BCrypt for password hashing.

## Troubleshooting

- 401 Unauthorized: ensure the DB user exists and the stored password is BCrypt-hashed (use `pgcrypto` as shown above).
- CORS error: the backend only allows `http://localhost:5173`. Adjust in `springBootLearn/src/main/java/.../config/SecurityConfig.java` if needed.
- DB connection errors: verify `application.properties` points to a running PostgreSQL instance and credentials are correct.

## License

This project is for learning/demo purposes.
