# Uber Clone Backend API Documentation

## Endpoints

### User Registration

#### POST `/user/register`

Register a new user account in the system.

---

### Description

This endpoint creates a new user account with the provided credentials. The password is hashed before being stored in the database, and a JWT authentication token is generated upon successful registration.

---

### Request Body

The request must be sent as JSON with the following fields:

```json
{
  "fullname": {
    "firstname": "string (required, min 3 characters)",
    "lastname": "string (optional, min 3 characters if provided)"
  },
  "email": "string (required, valid email format)",
  "password": "string (required, min 6 characters)"
}
```

#### Required Fields:
- **fullname.firstname** - First name of the user (minimum 3 characters)
- **email** - Valid email address (minimum 5 characters)
- **password** - Password (minimum 6 characters)

#### Optional Fields:
- **fullname.lastname** - Last name of the user (minimum 3 characters if provided)

---

### Validation Rules

| Field | Validation | Error Message |
|-------|-----------|---------------|
| email | Must be a valid email format | "Invalid Email" |
| fullname.firstname | Must be at least 3 characters long | "First name must be atleast 3 characters long" |
| password | Must be at least 6 characters long | "Password must be atleast 6 characters long" |

---

### Response

#### Success Response (Status Code: 201 Created)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null,
    "__v": 0
  }
}
```

#### Error Response (Status Code: 400 Bad Request)

```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "value": "ab",
      "msg": "First name must be atleast 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

---

### Status Codes

| Status Code | Description |
|-------------|-------------|
| **201** | Created - User account successfully created and token generated |
| **400** | Bad Request - Validation errors (invalid email, insufficient password length, etc.) |

---

### Example Requests

#### Valid Request

```bash
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

#### Invalid Request (Missing Required Field)

```bash
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "Jo"
    },
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

Response: 400 Bad Request - "First name must be atleast 3 characters long"

---

## User Login

### POST `/user/login`

Authenticate an existing user and receive a JWT access token.

### Request Body

```json
{
  "email": "string (required, valid email format)",
  "password": "string (required, min 6 characters)"
}
```

#### Required Fields:
- **email** - Valid email address
- **password** - Password (minimum 6 characters)

### Validation Rules

| Field | Validation | Error Message |
|-------|-----------|---------------|
| email | Must be a valid email format | "Invalid Email" |
| password | Must be at least 6 characters long | "Password must be atleast 6 characters long" |

### Success Response (Status Code: 200 OK)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null,
    "__v": 0
  }
}
```

### Error Response (Status Code: 401 Unauthorized)

```json
{
  "message": "Invalid email or password"
}
```

### Example Request

```bash
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

---

### Notes

- The password is securely hashed using bcrypt before storage
- A JWT token is automatically generated upon successful registration
- The token can be used for subsequent authenticated requests
- Email addresses must be unique (duplicate emails will be rejected at the database level)
