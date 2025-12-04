# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites Check
```bash
node --version    # Should be 18.x or higher
docker --version  # Should be installed
git --version     # Should be installed
```

## Option 1: Docker (Recommended - Fastest)

```bash
# 1. Navigate to project
cd /home/somya/new-react-app

# 2. Run startup script
./start.sh

# 3. Access application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

## Option 2: Manual Setup

### Backend

```bash
# 1. Go to backend
cd backend

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env

# 4. Edit .env with your database credentials
nano .env

# 5. Start server
npm run dev
```

### Frontend (New Terminal)

```bash
# 1. Go to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Start application
npm start
```

## 🗄️ Database Setup

### Local PostgreSQL
```bash
# Install PostgreSQL
sudo apt install postgresql

# Create database
sudo -u postgres psql
CREATE DATABASE visitor_db;
CREATE USER visitor_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE visitor_db TO visitor_user;
```

### AWS RDS
See `docs/AWS_RDS_SETUP.md` for detailed instructions.

## 🔧 Common Commands

### Docker Commands
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and restart
docker-compose up -d --build

# Remove everything
docker-compose down -v
```

### Development Commands

**Backend:**
```bash
cd backend
npm run dev      # Start with nodemon
npm start        # Start production
npm test         # Run tests
```

**Frontend:**
```bash
cd frontend
npm start        # Start dev server
npm run build    # Production build
npm test         # Run tests
```

## 📝 Testing the API

### Create a Visitor
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

### Get All Visitors
```bash
curl http://localhost:5000/api/visitors
```

### Health Check
```bash
curl http://localhost:5000/health
```

## 🚀 Deployment

### GitHub
```bash
# Initialize git
git init

# Add remote
git remote add origin https://github.com/yourusername/visitor-form-app.git

# Commit and push
git add .
git commit -m "Initial commit"
git push -u origin main
```

### Setup CI/CD
1. Add secrets to GitHub repository (see `docs/GITHUB_ACTIONS_SETUP.md`)
2. Push to main branch
3. GitHub Actions will automatically build and deploy

## 🔍 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
sudo lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
sudo lsof -ti:3000 | xargs kill -9
```

### Database Connection Failed
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Check Docker database
docker-compose logs postgres
```

### Clear Everything and Start Fresh
```bash
# Stop and remove containers
docker-compose down -v

# Remove node_modules
rm -rf backend/node_modules frontend/node_modules

# Reinstall
./install.sh

# Restart
./start.sh
```

## 📚 Documentation

- **Full README**: `README.md`
- **AWS RDS Setup**: `docs/AWS_RDS_SETUP.md`
- **GitHub Actions Setup**: `docs/GITHUB_ACTIONS_SETUP.md`
- **Contributing**: `CONTRIBUTING.md`

## 🆘 Need Help?

1. Check documentation files
2. Review error logs: `docker-compose logs`
3. Check GitHub Issues
4. Create a new issue with details

## ✅ Verify Installation

After starting the application, verify everything works:

1. **Backend Health**: http://localhost:5000/health
   - Should return: `{"status":"OK","message":"Server is running"}`

2. **Frontend**: http://localhost:3000
   - Should show the visitor form

3. **Database**: Create a test visitor through the UI
   - Should successfully save and appear in the list

## 🎯 Next Steps

1. **Configure Database**: Update `.env` with your RDS credentials
2. **Setup GitHub**: Push code to GitHub repository
3. **Configure CI/CD**: Add GitHub secrets for deployment
4. **Deploy**: Push to main branch to trigger deployment

---

**Ready to go!** 🎉

For detailed information, see the complete `README.md` file.
