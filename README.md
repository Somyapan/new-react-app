# Visitor Form Application

A full-stack web application for managing visitor information with a React frontend, Node.js/Express backend, and AWS RDS database support.

## 🚀 Features

- **Modern React Frontend**: Beautiful, responsive visitor form with real-time validation
- **RESTful API Backend**: Express.js server with comprehensive visitor management endpoints
- **Database Support**: Compatible with both PostgreSQL and MySQL (AWS RDS ready)
- **Docker Support**: Fully containerized application with docker-compose
- **CI/CD Pipeline**: GitHub Actions workflows for automated testing and deployment
- **Production Ready**: Health checks, error handling, and security best practices

## 📋 Prerequisites

- Node.js 18.x or higher
- Docker and Docker Compose (optional)
- PostgreSQL or MySQL database (local or AWS RDS)
- Git

## 🏗️ Project Structure

```
new-react-app/
├── backend/                # Node.js Express API
│   ├── config/            # Database configuration
│   ├── controllers/       # Request handlers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── server.js         # Entry point
│   ├── package.json
│   └── Dockerfile
├── frontend/              # React application
│   ├── public/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── Dockerfile
│   └── nginx.conf
├── .github/
│   └── workflows/        # CI/CD pipelines
│       ├── ci-cd.yml
│       └── deploy-aws.yml
├── docker-compose.yml    # Local development
├── docker-compose.prod.yml  # Production deployment
└── README.md
```

## 🚀 Quick Start

### Option 1: Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd new-react-app
   ```

2. **Start the application**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env if needed
   ```

4. **Start the application**
   ```bash
   # Development
   npm start
   
   # Production build
   npm run build
   ```

## 🗄️ Database Configuration

### AWS RDS Setup

1. **Create RDS Instance**
   - Choose PostgreSQL or MySQL
   - Note the endpoint, port, username, and password
   - Configure security group to allow connections

2. **Update Backend .env**
   ```env
   DB_TYPE=postgres  # or mysql
   DB_HOST=your-rds-endpoint.region.rds.amazonaws.com
   DB_PORT=5432  # 3306 for MySQL
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=visitor_db
   DB_SSL=true
   ```

3. **Database Schema**
   The application automatically creates the required table on startup:
   ```sql
   CREATE TABLE visitors (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     phone VARCHAR(20),
     purpose TEXT NOT NULL,
     company VARCHAR(255),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

## 🔧 API Endpoints

### Visitor Management

- `POST /api/visitors` - Create a new visitor
- `GET /api/visitors` - Get all visitors
- `GET /api/visitors/:id` - Get visitor by ID
- `PUT /api/visitors/:id` - Update visitor
- `DELETE /api/visitors/:id` - Delete visitor

### Health Check

- `GET /health` - Server health status

### Example Request

```bash
curl -X POST http://localhost:5000/api/visitors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "purpose": "Business Meeting",
    "company": "Acme Corp"
  }'
```

## 🚢 Deployment

### GitHub Actions Setup

1. **Configure Repository Secrets**
   
   Go to Repository Settings > Secrets and add:
   
   ```
   # Docker Hub
   DOCKER_USERNAME=your_docker_username
   DOCKER_PASSWORD=your_docker_password
   
   # AWS Credentials
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=us-east-1
   
   # Deployment
   EC2_HOST=your-ec2-ip
   EC2_USERNAME=ubuntu
   EC2_SSH_KEY=your_private_key
   APP_URL=https://your-app-url.com
   
   # Frontend
   REACT_APP_API_URL=https://api.your-domain.com
   
   # S3 and CloudFront (for frontend)
   S3_BUCKET_NAME=your-bucket-name
   CLOUDFRONT_DISTRIBUTION_ID=your-distribution-id
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **GitHub Actions will automatically:**
   - Run tests for backend and frontend
   - Build Docker images
   - Push images to Docker Hub
   - Deploy to your server

### Manual Deployment with Docker

1. **Build and push images**
   ```bash
   docker-compose -f docker-compose.prod.yml build
   docker-compose -f docker-compose.prod.yml push
   ```

2. **Deploy on server**
   ```bash
   # On your production server
   git pull origin main
   docker-compose -f docker-compose.prod.yml pull
   docker-compose -f docker-compose.prod.yml up -d
   ```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🔒 Security

- Helmet.js for HTTP security headers
- CORS configured for specific origins
- Input validation with express-validator
- SQL injection prevention with parameterized queries
- SSL/TLS for database connections in production
- Environment variables for sensitive data

## 🌍 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
DB_TYPE=postgres
DB_HOST=your-rds-endpoint
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=visitor_db
DB_SSL=true
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
```

## 📊 Monitoring

- Backend health check: `GET /health`
- Docker health checks configured
- Logging to console (can be extended to CloudWatch)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Support

For issues and questions:
- Create an issue in the repository
- Contact: your-email@example.com

## 🎯 Roadmap

- [ ] Add authentication/authorization
- [ ] Implement search and filtering
- [ ] Add export to CSV/PDF
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] Mobile app

---

Made with ❤️ using React, Node.js, and AWS
