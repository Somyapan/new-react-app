# AWS RDS Database Setup Guide

This guide will help you set up an AWS RDS database for the Visitor Form Application.

## Prerequisites

- AWS Account
- AWS CLI installed and configured
- Basic understanding of VPC and Security Groups

## Step 1: Create RDS Instance

### Using AWS Console

1. **Navigate to RDS Console**
   - Go to AWS Console > RDS
   - Click "Create database"

2. **Choose Database Engine**
   - Select **PostgreSQL** or **MySQL**
   - Version: PostgreSQL 15.x or MySQL 8.x

3. **Templates**
   - For production: Choose "Production"
   - For testing: Choose "Free tier"

4. **Settings**
   - DB instance identifier: `visitor-form-db`
   - Master username: `admin` (or your choice)
   - Master password: Create a strong password

5. **Instance Configuration**
   - DB instance class: 
     - Free tier: db.t3.micro
     - Production: db.t3.small or larger

6. **Storage**
   - Storage type: General Purpose SSD (gp3)
   - Allocated storage: 20 GB (minimum)
   - Enable storage autoscaling

7. **Connectivity**
   - VPC: Default VPC or create new
   - Public access: Yes (for testing) or No (for production with VPN)
   - VPC security group: Create new or use existing
   - Availability Zone: No preference

8. **Database Authentication**
   - Password authentication

9. **Additional Configuration**
   - Initial database name: `visitor_db`
   - Enable automated backups
   - Backup retention period: 7 days
   - Enable encryption (recommended)

10. **Create Database**
    - Review settings and click "Create database"
    - Wait 5-10 minutes for creation

### Using AWS CLI

```bash
# PostgreSQL
aws rds create-db-instance \
    --db-instance-identifier visitor-form-db \
    --db-instance-class db.t3.micro \
    --engine postgres \
    --engine-version 15.3 \
    --master-username admin \
    --master-user-password YourStrongPassword123! \
    --allocated-storage 20 \
    --db-name visitor_db \
    --backup-retention-period 7 \
    --port 5432 \
    --no-multi-az \
    --publicly-accessible \
    --storage-type gp3 \
    --storage-encrypted

# MySQL
aws rds create-db-instance \
    --db-instance-identifier visitor-form-db \
    --db-instance-class db.t3.micro \
    --engine mysql \
    --engine-version 8.0.33 \
    --master-username admin \
    --master-user-password YourStrongPassword123! \
    --allocated-storage 20 \
    --db-name visitor_db \
    --backup-retention-period 7 \
    --port 3306 \
    --no-multi-az \
    --publicly-accessible \
    --storage-type gp3 \
    --storage-encrypted
```

## Step 2: Configure Security Group

1. **Navigate to Security Groups**
   - Go to EC2 Console > Security Groups
   - Find the security group associated with your RDS instance

2. **Add Inbound Rules**
   
   For PostgreSQL:
   ```
   Type: PostgreSQL
   Protocol: TCP
   Port: 5432
   Source: Your IP address or 0.0.0.0/0 (not recommended for production)
   ```
   
   For MySQL:
   ```
   Type: MySQL/Aurora
   Protocol: TCP
   Port: 3306
   Source: Your IP address or 0.0.0.0/0 (not recommended for production)
   ```

3. **Best Practice for Production**
   - Only allow access from your application server's security group
   - Example: sg-xxxxxxxxx (your EC2/ECS security group)

## Step 3: Get Connection Details

1. **Navigate to RDS Console**
   - Click on your database instance
   - Go to "Connectivity & security" tab

2. **Note the following:**
   - **Endpoint**: `visitor-form-db.xxxxxxxxxx.us-east-1.rds.amazonaws.com`
   - **Port**: 5432 (PostgreSQL) or 3306 (MySQL)
   - **Master username**: admin (or what you set)
   - **Password**: (the one you created)

## Step 4: Test Connection

### Using psql (PostgreSQL)

```bash
psql -h visitor-form-db.xxxxxxxxxx.us-east-1.rds.amazonaws.com \
     -p 5432 \
     -U admin \
     -d visitor_db
```

### Using mysql client (MySQL)

```bash
mysql -h visitor-form-db.xxxxxxxxxx.us-east-1.rds.amazonaws.com \
      -P 3306 \
      -u admin \
      -p \
      visitor_db
```

## Step 5: Configure Application

1. **Update Backend .env**

```env
# PostgreSQL
DB_TYPE=postgres
DB_HOST=visitor-form-db.xxxxxxxxxx.us-east-1.rds.amazonaws.com
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=YourStrongPassword123!
DB_NAME=visitor_db
DB_SSL=true

# MySQL
# DB_TYPE=mysql
# DB_HOST=visitor-form-db.xxxxxxxxxx.us-east-1.rds.amazonaws.com
# DB_PORT=3306
# DB_USER=admin
# DB_PASSWORD=YourStrongPassword123!
# DB_NAME=visitor_db
# DB_SSL=true
```

2. **Update GitHub Secrets**
   - Add database credentials to GitHub repository secrets
   - Never commit credentials to the repository

## Step 6: Initialize Database Schema

The application will automatically create the necessary table on first run. Alternatively, you can manually create it:

### PostgreSQL

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

-- Create index for better performance
CREATE INDEX idx_visitors_email ON visitors(email);
CREATE INDEX idx_visitors_created_at ON visitors(created_at DESC);
```

### MySQL

```sql
CREATE TABLE visitors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    purpose TEXT NOT NULL,
    company VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create index for better performance
CREATE INDEX idx_visitors_email ON visitors(email);
CREATE INDEX idx_visitors_created_at ON visitors(created_at DESC);
```

## Cost Optimization

### Free Tier
- db.t3.micro instance
- 20 GB storage
- Limited to 750 hours/month
- Free for 12 months

### Production Optimization
1. **Right-size instances**: Start small, scale as needed
2. **Reserved Instances**: Save up to 60% for predictable workloads
3. **Automated backups**: Keep retention period minimal
4. **Delete unused snapshots**: Clean up old backups
5. **Multi-AZ**: Only enable if you need high availability

## Security Best Practices

1. **Use SSL/TLS**
   - Always enable SSL for connections
   - Download RDS certificate bundle

2. **Least Privilege**
   - Create separate database users for applications
   - Grant only necessary permissions

3. **Network Security**
   - Use private subnets in production
   - Configure VPC Security Groups properly
   - Use VPN or AWS PrivateLink

4. **Password Management**
   - Use AWS Secrets Manager for credentials
   - Rotate passwords regularly
   - Use strong passwords (16+ characters)

5. **Monitoring**
   - Enable Enhanced Monitoring
   - Set up CloudWatch alarms
   - Monitor slow queries

6. **Backups**
   - Enable automated backups
   - Test restore procedures
   - Consider cross-region backups

## Troubleshooting

### Cannot Connect to Database

1. Check security group rules
2. Verify public accessibility setting
3. Check VPC settings
4. Verify credentials
5. Check if database is available

### Connection Timeout

1. Check security group inbound rules
2. Verify network connectivity
3. Check if RDS instance is running

### SSL Connection Issues

1. Download RDS certificate bundle
2. Update connection string to use SSL
3. Verify SSL is enabled on RDS instance

## Monitoring and Maintenance

### CloudWatch Metrics

Monitor these key metrics:
- CPUUtilization
- DatabaseConnections
- FreeableMemory
- ReadLatency / WriteLatency
- FreeStorageSpace

### Set Up Alarms

```bash
aws cloudwatch put-metric-alarm \
    --alarm-name visitor-db-cpu-high \
    --alarm-description "Alert when CPU exceeds 80%" \
    --metric-name CPUUtilization \
    --namespace AWS/RDS \
    --statistic Average \
    --period 300 \
    --threshold 80 \
    --comparison-operator GreaterThanThreshold \
    --dimensions Name=DBInstanceIdentifier,Value=visitor-form-db \
    --evaluation-periods 2
```

## Backup and Recovery

### Manual Snapshot

```bash
aws rds create-db-snapshot \
    --db-instance-identifier visitor-form-db \
    --db-snapshot-identifier visitor-db-snapshot-$(date +%Y%m%d)
```

### Restore from Snapshot

```bash
aws rds restore-db-instance-from-db-snapshot \
    --db-instance-identifier visitor-form-db-restored \
    --db-snapshot-identifier visitor-db-snapshot-20231204
```

## Resources

- [AWS RDS Documentation](https://docs.aws.amazon.com/rds/)
- [PostgreSQL on RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_PostgreSQL.html)
- [MySQL on RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_MySQL.html)
- [RDS Best Practices](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_BestPractices.html)
