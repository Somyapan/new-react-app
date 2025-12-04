# 🚀 How to Run Locally - Simple Guide

## Method 1: Using Docker (Easiest - Recommended!)

This is the **fastest and easiest** way to run the application locally.

### Step 1: Start the Application
```bash
cd /home/somya/new-react-app
./start.sh
```

That's it! The script will:
- Check if Docker is installed
- Create .env files if needed
- Start all services (Frontend, Backend, Database)

### Step 2: Access the Application
- **Frontend**: Open your browser to http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

### Useful Docker Commands
```bash
# View logs
docker-compose logs -f

# Stop everything
docker-compose down

# Restart services
docker-compose restart

# Rebuild and restart
docker-compose up -d --build

# Remove everything (fresh start)
docker-compose down -v
```

---

## Method 2: Manual Setup (Without Docker)

If you prefer to run services separately or don't have Docker installed.

### Prerequisites
```bash
# Check Node.js version (need 18.x or higher)
node --version

# Check npm
npm --version
```

### Step 1: Setup Backend

Open **Terminal 1**:

```bash
# Navigate to backend
cd /home/somya/new-react-app/backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit the .env file (you need a database)
nano .env
```

**Edit `.env` file** with these values for local PostgreSQL:
```env
PORT=5000
NODE_ENV=development
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=visitor_user
DB_PASSWORD=visitor_password
DB_NAME=visitor_db
DB_SSL=false
```

**Start the backend:**
```bash
npm run dev
```

You should see: `Server is running on port 5000`

### Step 2: Setup Frontend

Open **Terminal 2** (new terminal window):

```bash
# Navigate to frontend
cd /home/somya/new-react-app/frontend

# Install dependencies
npm install

# Start the frontend
npm start
```

The browser will automatically open to http://localhost:3000

### Step 3: Setup Database (For Manual Setup)

If you're not using Docker, you need a PostgreSQL database.

**Option A: Install PostgreSQL locally**
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL
sudo systemctl start postgresql

# Create database and user
sudo -u postgres psql

# In PostgreSQL prompt, run:
CREATE DATABASE visitor_db;
CREATE USER visitor_user WITH PASSWORD 'visitor_password';
GRANT ALL PRIVILEGES ON DATABASE visitor_db TO visitor_user;
\q
```

**Option B: Use Docker for database only**
```bash
docker run -d \
  --name visitor-postgres \
  -e POSTGRES_DB=visitor_db \
  -e POSTGRES_USER=visitor_user \
  -e POSTGRES_PASSWORD=visitor_password \
  -p 5432:5432 \
  postgres:15-alpine
```

---

## Method 3: Quick Install Script

Use the install script to install all dependencies:

```bash
cd /home/somya/new-react-app
./install.sh
```

Then start services manually (see Method 2).

---

## 🧪 Testing the Application

### 1. Test Backend Health
```bash
curl http://localhost:5000/health
```

**Expected response:**
```json
{"status":"OK","message":"Server is running"}
```

### 2. Test API - Create a Visitor
```bash
curl -X POST http://localhost:5000/api/visitors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "purpose": "Testing the application",
    "company": "Test Company"
  }'
```

### 3. Test API - Get All Visitors
```bash
curl http://localhost:5000/api/visitors
```

### 4. Test Frontend
1. Open http://localhost:3000
2. Fill in the visitor form
3. Click "Add Visitor"
4. See the visitor appear in the list below
5. Try editing and deleting

---

## 🔧 Troubleshooting

### Port 3000 or 5000 Already in Use
```bash
# Find and kill process on port 5000
sudo lsof -ti:5000 | xargs kill -9

# Find and kill process on port 3000
sudo lsof -ti:3000 | xargs kill -9
```

### Database Connection Error

**If using Docker:**
```bash
# Check if database container is running
docker ps

# Check database logs
docker-compose logs postgres

# Restart database
docker-compose restart postgres
```

**If using local PostgreSQL:**
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Start PostgreSQL
sudo systemctl start postgresql

# Check connection
psql -U visitor_user -d visitor_db -h localhost
```

### Frontend Not Connecting to Backend

1. Make sure backend is running on port 5000
2. Check browser console for errors (F12)
3. Verify `proxy` in `frontend/package.json` is set to `http://localhost:5000`

### npm install Fails

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Docker Issues

```bash
# Stop all containers
docker-compose down

# Remove volumes
docker-compose down -v

# Rebuild everything
docker-compose up -d --build

# Check Docker is running
docker --version
sudo systemctl status docker
```

---

## 📊 Verify Everything is Working

### Checklist:
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Database connection successful
- [ ] Can access http://localhost:3000
- [ ] Health check returns OK: http://localhost:5000/health
- [ ] Can create a visitor through UI
- [ ] Visitor appears in the list
- [ ] Can edit and delete visitors

---

## 🎯 Recommended: Use Docker

**Why Docker is recommended:**
- ✅ No need to install PostgreSQL separately
- ✅ All dependencies isolated
- ✅ Consistent environment
- ✅ One command to start everything
- ✅ Easy to clean up and restart
- ✅ Same setup as production

**Just run:**
```bash
./start.sh
```

---

## 📝 Summary of Commands

### Docker Method (Recommended)
```bash
cd /home/somya/new-react-app
./start.sh                      # Start everything
docker-compose logs -f          # View logs
docker-compose down             # Stop everything
```

### Manual Method
```bash
# Terminal 1 - Backend
cd /home/somya/new-react-app/backend
npm install
cp .env.example .env
npm run dev

# Terminal 2 - Frontend
cd /home/somya/new-react-app/frontend
npm install
npm start
```

---

## 🆘 Need More Help?

- Check **README.md** for detailed documentation
- Check **QUICKSTART.md** for a 5-minute guide
- Check **CHECKLIST.md** for step-by-step setup
- View logs: `docker-compose logs -f`
- Check for errors in browser console (F12)

---

**🎉 That's it! Your application should now be running locally!**

Access it at: **http://localhost:3000** 🚀
