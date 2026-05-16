# API Documentation - Smart Leads Dashboard

Base URL: `http://localhost:5001/api`

## Authentication

### Register User
- **URL**: `/auth/register`
- **Method**: `POST`
- **Auth required**: No
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response**: `201 Created` with user data and JWT token.

### Login User
- **URL**: `/auth/login`
- **Method**: `POST`
- **Auth required**: No
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response**: `200 OK` with user data and JWT token.

---

## Leads Management
*All routes require a `Authorization: Bearer <token>` header.*

### Create Lead
- **URL**: `/leads`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "status": "New",
    "source": "Website"
  }
  ```
- **Success Response**: `201 Created`

### Get All Leads (with Search/Filter/Pagination)
- **URL**: `/leads`
- **Method**: `GET`
- **Query Params**:
  - `page`: Page number (default: 1)
  - `search`: Search string for name/email
  - `status`: Filter by status (New, Contacted, Qualified, Lost)
  - `source`: Filter by source (Website, Instagram, Referral)
  - `sort`: Sort order (Latest, Oldest)
- **Success Response**: `200 OK` with list of leads and pagination metadata.

### Get Lead Details
- **URL**: `/leads/:id`
- **Method**: `GET`

### Update Lead
- **URL**: `/leads/:id`
- **Method**: `PUT`
- **Body**: Any lead fields (name, email, status, source)

### Delete Lead (Admin Only)
- **URL**: `/leads/:id`
- **Method**: `DELETE`
- **Permissions**: Requires user role to be `Admin`.

### Export Leads to CSV
- **URL**: `/leads/export`
- **Method**: `GET`
- **Success Response**: `200 OK` with a downloadable `.csv` file.
