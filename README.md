# Credit Engine API

A simple credit management system that handles user enrollments and credit calculations.

## Features

- User credit enrollment
- Credit calculation based on action types
- Credit balance checking
- RESTful API endpoints

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd credit-engine
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will run on port 3000 by default or use the PORT environment variable.

## API Endpoints

### Enroll Credits

Enroll a user for credits based on their actions.

```http
POST /api/enroll
```

**Request Body:**
```json
{
  "userId": "string",
  "actionType": "string",
  "referrerId": "string",
  "spend": number
}
```

**Response:**
```json
{
  "userId": "string",
  "creditsAwarded": number,
  "totalCredits": number
}
```

### Check Credits Balance

Get the total credits for a specific user.

```http
GET /api/credits/:userId
```

**Response:**
```json
{
  "userId": "string",
  "totalCredits": number
}
```

## Deployment

The project is configured for deployment on Vercel. Simply push to your repository and connect it to Vercel for automatic deployments.

## Tech Stack

- Node.js
- Express.js
- Vercel for deployment

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License
