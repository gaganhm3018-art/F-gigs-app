# API Documentation

## Base URL
```
http://localhost:3000/api/v1
```

## Authentication
Currently not implemented. Add JWT authentication in future versions.

## Response Format

### Success Response
```json
{
  "data": {},
  "status": "success"
}
```

### Error Response
```json
{
  "error": "Error message",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/v1/endpoint"
}
```

## HTTP Status Codes
- `200` - OK
- `201` - Created
- `204` - No Content
- `400` - Bad Request
- `404` - Not Found
- `409` - Conflict (duplicate)
- `500` - Server Error

---

## User Endpoints

### Create User
```
POST /users
```

**Request Body**
```json
{
  "email": "user@example.com",
  "phone": "+1234567890",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201)**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "phone": "+1234567890",
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

**Error (400)**
```json
{
  "error": "Valid email is required"
}
```

---

### Get All Users
```
GET /users
```

**Response (200)**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "_count": {
      "incomes": 5,
      "expenses": 3
    }
  }
]
```

---

### Get User Details
```
GET /users/:id
```

**Parameters**
- `id` (string, required) - User ID

**Response (200)**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "phone": "+1234567890",
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z",
  "incomes": [
    {
      "id": "income-id",
      "amount": 150.50,
      "source": "Uber",
      "date": "2024-01-15"
    }
  ],
  "expenses": [
    {
      "id": "expense-id",
      "amount": 25.00,
      "category": "fuel",
      "date": "2024-01-15"
    }
  ],
  "goals": [],
  "_count": {
    "incomes": 1,
    "expenses": 1
  }
}
```

**Error (404)**
```json
{
  "error": "User not found"
}
```

---

### Update User
```
PUT /users/:id
```

**Parameters**
- `id` (string, required) - User ID

**Request Body** (all fields optional)
```json
{
  "email": "newemail@example.com",
  "phone": "+1987654321",
  "firstName": "Jane",
  "lastName": "Smith"
}
```

**Response (200)**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "newemail@example.com",
  "phone": "+1987654321",
  "firstName": "Jane",
  "lastName": "Smith",
  "updatedAt": "2024-01-15T10:45:00Z"
}
```

---

### Delete User
```
DELETE /users/:id
```

**Parameters**
- `id` (string, required) - User ID

**Response (200)**
```json
{
  "message": "User deleted successfully"
}
```

---

## Income Endpoints

### Create Income Entry
```
POST /income
```

**Request Body**
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "amount": 150.50,
  "source": "Uber",
  "category": "gig_work",
  "date": "2024-01-15",
  "notes": "Evening shift",
  "tags": ["tag-id-1", "tag-id-2"]
}
```

**Response (201)**
```json
{
  "id": "income-id-123",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "amount": 150.50,
  "source": "Uber",
  "category": "gig_work",
  "date": "2024-01-15",
  "notes": "Evening shift",
  "tags": [],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

**Error (400)**
```json
{
  "error": "Missing required fields"
}
```

---

### Get User Income Entries
```
GET /income/user/:userId
```

**Parameters**
- `userId` (string, required) - User ID
- `startDate` (optional) - Filter by date range (YYYY-MM-DD)
- `endDate` (optional) - Filter by date range (YYYY-MM-DD)

**Query Example**
```
GET /income/user/550e8400-e29b-41d4-a716-446655440000?startDate=2024-01-01&endDate=2024-01-31
```

**Response (200)**
```json
[
  {
    "id": "income-id-123",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "amount": 150.50,
    "source": "Uber",
    "category": "gig_work",
    "date": "2024-01-15",
    "notes": "Evening shift",
    "tags": [],
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

---

### Get Income Summary
```
GET /income/user/:userId/summary
```

**Parameters**
- `userId` (string, required) - User ID
- `startDate` (optional) - Filter start date
- `endDate` (optional) - Filter end date

**Response (200)**
```json
{
  "totalIncome": 1500.75,
  "averageIncome": 250.13,
  "maxIncome": 400.00,
  "minIncome": 50.00,
  "count": 6
}
```

---

### Get Income Entry
```
GET /income/:id
```

**Parameters**
- `id` (string, required) - Income entry ID

**Response (200)**
```json
{
  "id": "income-id-123",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "amount": 150.50,
  "source": "Uber",
  "category": "gig_work",
  "date": "2024-01-15",
  "notes": "Evening shift",
  "tags": [],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

---

### Update Income Entry
```
PUT /income/:id
```

**Parameters**
- `id` (string, required) - Income entry ID

**Request Body** (all fields optional)
```json
{
  "amount": 200.00,
  "source": "Lyft",
  "notes": "Updated notes",
  "tags": ["tag-id-1"]
}
```

**Response (200)**
```json
{
  "id": "income-id-123",
  "amount": 200.00,
  "source": "Lyft",
  "notes": "Updated notes",
  "updatedAt": "2024-01-15T10:45:00Z"
}
```

---

### Delete Income Entry
```
DELETE /income/:id
```

**Parameters**
- `id` (string, required) - Income entry ID

**Response (200)**
```json
{
  "message": "Income entry deleted successfully"
}
```

---

## Expense Endpoints

### Create Expense Entry
```
POST /expenses
```

**Request Body**
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "amount": 25.00,
  "category": "fuel",
  "date": "2024-01-15",
  "description": "Gas for car"
}
```

**Response (201)**
```json
{
  "id": "expense-id-456",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "amount": 25.00,
  "category": "fuel",
  "date": "2024-01-15",
  "description": "Gas for car",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

---

### Get User Expenses
```
GET /expenses/user/:userId
```

**Parameters**
- `userId` (string, required) - User ID
- `startDate` (optional) - Filter by date range
- `endDate` (optional) - Filter by date range

**Response (200)**
```json
[
  {
    "id": "expense-id-456",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "amount": 25.00,
    "category": "fuel",
    "date": "2024-01-15",
    "description": "Gas for car",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

---

### Get Expense Entry
```
GET /expenses/:id
```

**Response (200)**
```json
{
  "id": "expense-id-456",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "amount": 25.00,
  "category": "fuel",
  "date": "2024-01-15",
  "description": "Gas for car",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

### Update Expense Entry
```
PUT /expenses/:id
```

**Request Body** (all fields optional)
```json
{
  "amount": 30.00,
  "category": "maintenance",
  "description": "Oil change"
}
```

**Response (200)**
```json
{
  "id": "expense-id-456",
  "amount": 30.00,
  "category": "maintenance",
  "description": "Oil change",
  "updatedAt": "2024-01-15T10:45:00Z"
}
```

---

### Delete Expense Entry
```
DELETE /expenses/:id
```

**Response (200)**
```json
{
  "message": "Expense deleted successfully"
}
```

---

## Report Endpoints

### Generate Financial Report
```
POST /reports/generate
```

**Request Body**
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "startDate": "2024-01-01",
  "endDate": "2024-01-31"
}
```

**Response (201)**
```json
{
  "id": "report-id-789",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "totalIncome": 1500.75,
  "totalExpenses": 150.00,
  "netIncome": 1350.75,
  "averageDailyEarnings": 43.57,
  "reportData": {
    "incomeBySource": {
      "Uber": 800.00,
      "DoorDash": 700.75
    },
    "expenseByCategory": {
      "fuel": 100.00,
      "maintenance": 50.00
    },
    "incomeCount": 6,
    "expenseCount": 2
  },
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

### Get User Reports
```
GET /reports/user/:userId
```

**Parameters**
- `userId` (string, required) - User ID

**Response (200)**
```json
[
  {
    "id": "report-id-789",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "startDate": "2024-01-01",
    "endDate": "2024-01-31",
    "totalIncome": 1500.75,
    "totalExpenses": 150.00,
    "netIncome": 1350.75,
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

---

### Get Report Details
```
GET /reports/:id
```

**Parameters**
- `id` (string, required) - Report ID

**Response (200)**
```json
{
  "id": "report-id-789",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "totalIncome": 1500.75,
  "totalExpenses": 150.00,
  "netIncome": 1350.75,
  "averageDailyEarnings": 43.57,
  "reportData": {
    "incomeBySource": {
      "Uber": 800.00,
      "DoorDash": 700.75
    },
    "expenseByCategory": {
      "fuel": 100.00,
      "maintenance": 50.00
    }
  }
}
```

---

### Delete Report
```
DELETE /reports/:id
```

**Response (200)**
```json
{
  "message": "Report deleted successfully"
}
```

---

## Common Error Responses

### 400 Bad Request
```json
{
  "error": "Missing required fields",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/v1/income"
}
```

### 404 Not Found
```json
{
  "error": "User not found",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/v1/users/invalid-id"
}
```

### 409 Conflict
```json
{
  "error": "Unique constraint violation",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/v1/users"
}
```

### 500 Server Error
```json
{
  "error": "Internal Server Error",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/v1/endpoint"
}
```

---

## Rate Limiting (Future)
Not currently implemented. Recommended to add for production.

## Pagination (Future)
Currently returns all results. Add `limit` and `offset` parameters for production.

## Authentication (Future)
Add JWT token-based authentication in future versions.
