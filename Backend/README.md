# User Registration & Login Endpoint Documentation

## Endpoints

- `POST /users/register`
- `POST /users/login`
- `GET /users/profile`
- `GET /users/logout`

---

## 1. User Registration

### Endpoint

`POST /users/register`

### Description

Registers a new user in the system. Requires a valid email, a password (minimum 6 characters), and a firstname (minimum 3 characters). Optionally, a lastname (minimum 3 characters) can be provided. On success, returns a JWT token and the created user object.

### Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `fullname.firstname` (string, required): At least 3 characters.
- `fullname.lastname` (string, optional): At least 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): At least 6 characters.

### Responses

#### Success

- **Status Code:** `201 Created`
- **Body:**
    ```json
    {
      "token": "<jwt_token>",
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```

#### Validation Error

- **Status Code:** `422 Unprocessable Entity`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Error message",
          "param": "field",
          "location": "body"
        }
      ]
    }
    ```

#### Missing Required Fields

- **Status Code:** `500 Internal Server Error`
- **Body:**
    ```json
    {
      "message": "All fields are required"
    }
    ```

### Example Request

```bash
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane.smith@example.com",
    "password": "securepassword"
  }'
```

---

## 2. User Login

### Endpoint

`POST /users/login`

### Description

Authenticates a user using their email and password. Returns a JWT token and the user object on successful login.

### Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `email` (string, required): Must be a valid email address.
- `password` (string, required): At least 6 characters.

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "token": "<jwt_token>",
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```

#### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Error message",
          "param": "field",
          "location": "body"
        }
      ]
    }
    ```

#### Invalid Credentials

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "invalid email or password"
    }
    ```

### Example Request

```bash
curl -X POST http://localhost:4000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.smith@example.com",
    "password": "securepassword"
  }'
```

---

## 3. Get User Profile

### Endpoint

`GET /users/profile`

### Description

Retrieves the authenticated user's profile information. This endpoint is protected and requires a valid JWT token (sent via cookie or Authorization header).

### Authentication

- Requires JWT token in `Authorization: Bearer <token>` header or as a cookie named `token`.

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```

#### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "Authentication required"
    }
    ```

### Example Request

```bash
curl -X GET http://localhost:4000/users/profile \
  -H "Authorization: Bearer <jwt_token>"
```

---

## 4. User Logout

### Endpoint

`GET /users/logout`

### Description

Logs out the authenticated user by blacklisting the current JWT token and clearing the authentication cookie. This endpoint is protected and requires a valid JWT token.

### Authentication

- Requires JWT token in `Authorization: Bearer <token>` header or as a cookie named `token`.

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "message": "Logged out successfully"
    }
    ```

#### Already Logged Out

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "message": "Already logged out"
    }
    ```

#### No Token Provided

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "message": "No token provided"
    }
    ```

#### Logout Failed

- **Status Code:** `500 Internal Server Error`
- **Body:**
    ```json
    {
      "message": "Logout failed"
    }
    ```

### Example Request

```bash
curl -X GET http://localhost:3000/users/logout \
  -H "Authorization: Bearer <jwt_token>"
```

---

## 5. Captain Registration

### Endpoint

`POST /captains/register`

### Description

Registers a new captain (driver) in the system. Requires personal details and vehicle information. On success, returns the created captain object.

### Request Body

```json
{
  "fullname": {
    "firstname": "Alex",
    "lastname": "Rider"
  },
  "email": "alex.rider@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Field Requirements

- `fullname.firstname` (string, required): At least 3 characters.
- `fullname.lastname` (string, required): At least 3 characters.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): At least 6 characters.
- `vehicle.color` (string, required): At least 3 characters.
- `vehicle.plate` (string, required): At least 3 characters.
- `vehicle.capacity` (number, required): Must be a number.
- `vehicle.vehicleType` (string, required): Must be one of `"car"`, `"motorcycle"`, or `"auto"`.

### Responses

#### Success

- **Status Code:** `201 Created`
- **Body:**
    ```json
    {
      "captain": {
        "_id": "captain_id",
        "fullname": {
          "firstname": "Alex",
          "lastname": "Rider"
        },
        "email": "alex.rider@example.com",
        "vehicle": {
          "color": "Red",
          "plate": "ABC1234",
          "capacity": 4,
          "vehicleType": "car"
        }
      }
    }
    ```

#### Validation Error

- **Status Code:** `422 Unprocessable Entity`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Error message",
          "param": "field",
          "location": "body"
        }
      ]
    }
    ```

#### Missing Required Fields

- **Status Code:** `500 Internal Server Error`
- **Body:**
    ```json
    {
      "message": "All fields are required"
    }
    ```

### Example Request

```bash
curl -X POST http://localhost:4000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "Alex", "lastname": "Rider" },
    "email": "alex.rider@example.com",
    "password": "yourpassword",
    "vehicle": {
      "color": "Red",
      "plate": "ABC1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

---

## 6. Captain Login

### Endpoint

`POST /captains/login`

### Description

Authenticates a captain using their email and password. Returns a JWT token and the captain object on successful login.

### Request Body

```json
{
  "email": "alex.rider@example.com", // required, must be a valid email
  "password": "yourpassword"         // required, at least 6 characters
}
```

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "token": "<jwt_token>",
      "captain": {
        "_id": "captain_id",
        "fullname": {
          "firstname": "Alex",
          "lastname": "Rider"
        },
        "email": "alex.rider@example.com",
        "vehicle": {
          "color": "Red",
          "plate": "ABC1234",
          "capacity": 4,
          "vehicleType": "car"
        }
      }
    }
    ```

#### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Error message",
          "param": "field",
          "location": "body"
        }
      ]
    }
    ```

#### Invalid Credentials

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

### Example Request

```bash
curl -X POST http://localhost:4000/captains/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alex.rider@example.com",
    "password": "yourpassword"
  }'
```

---

## 7. Get Captain Profile

### Endpoint

`GET /captains/profile`

### Description

Retrieves the authenticated captain's profile information. This endpoint is protected and requires a valid JWT token (sent via cookie or Authorization header).

### Authentication

- Requires JWT token in `Authorization: Bearer <token>` header or as a cookie named `token`.

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "captain": {
        "_id": "captain_id",
        "fullname": {
          "firstname": "Alex",
          "lastname": "Rider"
        },
        "email": "alex.rider@example.com",
        "vehicle": {
          "color": "Red",
          "plate": "ABC1234",
          "capacity": 4,
          "vehicleType": "car"
        }
      }
    }
    ```

#### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "Authentication required"
    }
    ```

### Example Request

```bash
curl -X GET http://localhost:4000/captains/profile \
  -H "Authorization: Bearer <jwt_token>"
```

---

## 8. Captain Logout

### Endpoint

`GET /captains/logout`

### Description

Logs out the authenticated captain by blacklisting the current JWT token and clearing the authentication cookie. This endpoint is protected and requires a valid JWT token.

### Authentication

- Requires JWT token in `Authorization: Bearer <token>` header or as a cookie named `token`.

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "message": "Logged out successfully"
    }
    ```

#### No Token Provided

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "message": "No token provided"
    }
    ```

#### Logout Failed

- **Status Code:** `500 Internal Server Error`
- **Body:**
    ```json
    {
      "message": "Logout failed"
    }
    ```

### Example Request

```bash
curl -X GET http://localhost:4000/captains/logout \
  -H "Authorization: Bearer <jwt_token>"
```

---