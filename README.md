# Login and Registration Application with Docker

This is a sample application that provides a login and registration functionality with authentication using JWT tokens and password hashing using the bcrypt crypto library. The application is Dockerized, allowing for easy deployment and scalability.

# Setup and Running the Application

To set up and run the application, follow these steps:

- Clone the repository:

  ```bash
  git clone <repository_url>
  ```

- Navigate to the project directory:

  ```bash
  cd sylvr-internship-project
  ```

- Start the application using Docker Compose:
  `bash
docker compose up -d
`
  **if the command shows any error try the below one**

```bash
docker-compose up -d
```

The Docker Compose file will orchestrate the building and running of both the backend and frontend services. The services will be automatically connected and the application will be available at `http://localhost:3001`

# API

### User Registration:

| Method | Endpoint         | Authentication |
| ------ | ---------------- | -------------- |
| POST   | `/auth/register` | Not needed     |

| Parameter | type   | required |
| --------- | ------ | -------- |
| firstName | string | true     |
| lastName  | string | true     |
| email     | string | true     |
| password  | string | true     |

### User Login:

| Method | Endpoint      | Authentication |
| ------ | ------------- | -------------- |
| POST   | `/auth/login` | Not needed     |

| Parameter | type   | required |
| --------- | ------ | -------- |
| email     | string | true     |
| password  | string | true     |

### Refresh Token:

| Method | Endpoint        | Authentication |
| ------ | --------------- | -------------- |
| POST   | `/auth/refresh` | Not needed     |

| Parameter    | type   | required |
| ------------ | ------ | -------- |
| refreshToken | string | true     |

### Details of Logged in user:

| Method | Endpoint | Authentication |
| ------ | -------- | -------------- |
| GET    | `/user/` | Needed         |

| Parameter | type | required |
| --------- | ---- | -------- |
| none      | none | false    |

### Details of Logged in user:

| Method | Endpoint | Authentication |
| ------ | -------- | -------------- |
| PATCH  | `/user/` | Needed         |

| Parameter | type   | required |
| --------- | ------ | -------- |
| firstName | string | false    |
| lastName  | string | false    |
| email     | string | false    |
