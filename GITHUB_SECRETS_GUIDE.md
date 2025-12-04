# GitHub Secrets Configuration Guide

## 📋 Complete List of Required Secrets

Add these secrets in your GitHub repository:  
**Settings → Secrets and variables → Actions → New repository secret**

---

## 🐳 Docker Hub Secrets (REQUIRED)

### DOCKER_USERNAME
```
Your Docker Hub username
Example: johnsmith
```

### DOCKER_PASSWORD
```
Your Docker Hub password or access token (recommended)

How to get token:
1. Go to https://hub.docker.com
2. Account Settings → Security
3. Click "New Access Token"
4. Name: "GitHub Actions"
5. Permissions: Read, Write, Delete
6. Copy the token
```

---

## ☁️ AWS Credentials (REQUIRED)

### AWS_ACCESS_KEY_ID
```
Your AWS access key ID
Example: AKIAIOSFODNN7EXAMPLE

How to get:
1. AWS Console → IAM → Users → Your User
2. Security credentials → Create access key
3. Choose "Application running outside AWS"
4. Copy Access Key ID
```

### AWS_SECRET_ACCESS_KEY
```
Your AWS secret access key
Example: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

Note: This is shown only once when creating the access key
```

### AWS_REGION
```
Your AWS region
Example: us-east-1

Options:
- us-east-1 (N. Virginia)
- us-west-2 (Oregon)
- eu-west-1 (Ireland)
- ap-south-1 (Mumbai)
```

---

## 🗄️ MySQL RDS Database Secrets (REQUIRED)

### DB_HOST
```
Your RDS endpoint (without port)
Example: visitor-db.c1abc2defghi.us-east-1.rds.amazonaws.com

How to find:
AWS Console → RDS → Databases → Your DB → Connectivity & security → Endpoint
```

### DB_USER
```
Your RDS master username
Example: admin

Default: admin (or what you set during RDS creation)
```

### DB_PASSWORD
```
Your RDS master password
Example: YourSecurePassword123!

This is the password you set when creating the RDS instance
```

### DB_NAME
```
Database name to use
Example: visitor_db

Note: The application will create tables automatically
```

---

## 🖥️ EC2 Server Secrets (REQUIRED)

### EC2_HOST
```
Your EC2 public IP or domain
Example: 54.123.45.67

How to find:
AWS Console → EC2 → Instances → Your Instance → Public IPv4 address

Or use domain: example.com
```

### EC2_USERNAME
```
Your EC2 SSH username
Example: ubuntu

Common values:
- ubuntu (for Ubuntu AMI)
- ec2-user (for Amazon Linux AMI)
```

### EC2_SSH_KEY
```
Your EC2 private key content (entire file)

Example format:
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
...entire key content...
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
-----END RSA PRIVATE KEY-----

How to get:
1. Locate your .pem file (used when creating EC2)
2. Copy entire content including BEGIN and END lines
3. Paste into GitHub secret

Command to view:
cat ~/.ssh/your-ec2-key.pem

⚠️ Important:
- Include the BEGIN and END lines
- Keep all line breaks intact
- Don't add extra spaces
```

---

## 🌐 Frontend Configuration (OPTIONAL)

### REACT_APP_API_URL
```
Backend API URL
Example: http://54.123.45.67:5000

Format: http://[EC2_HOST]:5000

If using domain: https://api.yourdomain.com
```

---

## 📊 Summary of All Secrets

| Secret Name | Example | Required | Description |
|------------|---------|----------|-------------|
| DOCKER_USERNAME | johnsmith | ✅ Yes | Docker Hub username |
| DOCKER_PASSWORD | dckr_pat_xxx | ✅ Yes | Docker Hub token |
| AWS_ACCESS_KEY_ID | AKIAIOSFODNN7 | ✅ Yes | AWS access key |
| AWS_SECRET_ACCESS_KEY | wJalrXUtnFEMI | ✅ Yes | AWS secret key |
| AWS_REGION | us-east-1 | ✅ Yes | AWS region |
| DB_HOST | xxx.rds.amazonaws.com | ✅ Yes | RDS endpoint |
| DB_USER | admin | ✅ Yes | RDS username |
| DB_PASSWORD | SecurePass123 | ✅ Yes | RDS password |
| DB_NAME | visitor_db | ✅ Yes | Database name |
| EC2_HOST | 54.123.45.67 | ✅ Yes | EC2 IP or domain |
| EC2_USERNAME | ubuntu | ✅ Yes | EC2 SSH user |
| EC2_SSH_KEY | -----BEGIN RSA... | ✅ Yes | EC2 private key |
| REACT_APP_API_URL | http://54.123.45.67:5000 | ⚪ Optional | Backend URL |

---

## 🚀 Quick Setup Commands

### 1. Add Secrets via GitHub Web Interface

```
1. Go to your GitHub repository
2. Click Settings
3. Go to Secrets and variables → Actions
4. Click "New repository secret"
5. Add each secret from the list above
```

**Direct URL format:**
```
https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions
```

### 2. Verify Secrets Are Added

After adding all secrets, you should see:
- ✅ 12-13 secrets configured
- All marked with green checkmarks
- No red warning icons

---

## 🔍 How to Get Each Value

### Docker Hub Token
```bash
# Visit https://hub.docker.com
# Settings → Security → New Access Token
# Copy the generated token
```

### AWS Access Keys
```bash
# Using AWS CLI
aws iam create-access-key --user-name your-username

# Or via AWS Console
# IAM → Users → Your User → Security credentials → Create access key
```

### RDS Endpoint
```bash
# Using AWS CLI
aws rds describe-db-instances \
  --db-instance-identifier your-db-name \
  --query 'DBInstances[0].Endpoint.Address' \
  --output text

# Or via AWS Console
# RDS → Databases → Your DB → Connectivity & security tab
```

### EC2 Public IP
```bash
# Using AWS CLI
aws ec2 describe-instances \
  --instance-ids i-1234567890abcdef0 \
  --query 'Reservations[0].Instances[0].PublicIpAddress' \
  --output text

# Or via AWS Console
# EC2 → Instances → Your Instance → Public IPv4 address
```

### EC2 Private Key
```bash
# Display your key
cat ~/.ssh/your-ec2-key.pem

# Copy entire output including BEGIN and END lines
```

---

## ✅ Verification Checklist

Before pushing to GitHub, verify:

- [ ] All 12-13 secrets are added in GitHub
- [ ] Docker Hub credentials are correct
- [ ] AWS credentials have proper permissions
- [ ] RDS endpoint is accessible
- [ ] RDS security group allows EC2 connection
- [ ] EC2 instance is running
- [ ] EC2 security group allows ports 80, 5000, 22
- [ ] SSH key is correct and complete
- [ ] Database credentials match RDS setup

---

## 🧪 Test Your Setup

After adding secrets, test by:

```bash
# 1. Push to GitHub
git add .
git commit -m "Test CI/CD pipeline"
git push origin main

# 2. Check GitHub Actions
# Go to: https://github.com/YOUR_USERNAME/YOUR_REPO/actions

# 3. Watch the workflow run
# All jobs should turn green ✅
```

---

## 🆘 Troubleshooting

### Secret Not Found Error
```
Error: Secret DOCKER_USERNAME not found
Solution: Check secret name spelling (case-sensitive)
```

### Invalid Credentials
```
Error: Login failed
Solution: Verify credentials are correct, regenerate if needed
```

### SSH Connection Failed
```
Error: Permission denied (publickey)
Solution: 
1. Ensure entire private key is copied (including BEGIN/END)
2. Check EC2 security group allows SSH (port 22)
3. Verify EC2_USERNAME is correct (ubuntu vs ec2-user)
```

### Database Connection Failed
```
Error: Can't connect to MySQL server
Solution:
1. Check RDS security group allows EC2 IP
2. Verify DB_HOST is correct endpoint
3. Check DB credentials (username/password)
4. Ensure RDS is publicly accessible or in same VPC as EC2
```

---

## 📝 Security Best Practices

1. **Never commit secrets to git**
   - Use .gitignore for .env files
   - Use GitHub Secrets for CI/CD

2. **Rotate credentials regularly**
   - Change passwords every 90 days
   - Regenerate access tokens

3. **Use least privilege**
   - Grant only necessary AWS permissions
   - Use IAM roles when possible

4. **Monitor access**
   - Review AWS CloudTrail logs
   - Check Docker Hub access logs

5. **Use environment-specific secrets**
   - Different secrets for dev/staging/prod
   - Use GitHub Environments feature

---

## 🎯 Next Steps

1. ✅ Add all secrets to GitHub
2. ✅ Push code to trigger pipeline
3. ✅ Monitor GitHub Actions workflow
4. ✅ Verify deployment on EC2
5. ✅ Test application: http://YOUR_EC2_IP

---

**Need Help?**
- Check the workflow logs in GitHub Actions
- Review the TROUBLESHOOTING section
- Create an issue in the repository

**🎉 Once all secrets are added, your CI/CD pipeline will work automatically!**
