# DataFlow Backend

Backend API for DataFlow - Simple and intuitive record management system.

## Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: Microsoft SQL Server
- **Architecture**: REST API

## Project Structure

```
src/
├── api/                    # API route handlers
│   └── v1/                 # API Version 1
│       ├── external/       # Public endpoints
│       └── internal/       # Authenticated endpoints
├── routes/                 # Route definitions
│   ├── v1/                 # Version 1 routes
│   └── index.ts            # Main router
├── middleware/             # Express middleware
├── services/               # Business logic
├── utils/                  # Utility functions
├── constants/              # Application constants
├── instances/              # Service instances
├── tests/                  # Global test utilities
└── server.ts               # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Microsoft SQL Server
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and configure your environment variables:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your database credentials and configuration

### Development

Run the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000/api/v1`

### Building for Production

```bash
npm run build
```

### Running in Production

```bash
npm start
```

## API Documentation

### Health Check

```
GET /health
```

Returns the health status of the API.

### API Versioning

All API endpoints are versioned:
- Version 1: `/api/v1/`

## Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Linting

Run ESLint:
```bash
npm run lint
```

Fix linting issues:
```bash
npm run lint:fix
```

## Environment Variables

See `.env.example` for all available configuration options.

## License

ISC