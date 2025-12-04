# GitHub Actions CI/CD Setup Guide

Complete guide to set up continuous integration and deployment for the Visitor Form Application.

## Overview

This project includes two GitHub Actions workflows:

1. **ci-cd.yml**: Automated testing, building, and Docker image creation
2. **deploy-aws.yml**: AWS deployment for backend (ECS) and frontend (S3/CloudFront)

## Prerequisites

- GitHub repository
- Docker Hub account (for Docker images)
- AWS account (for deployment)
- Repository admin access

## Step 1: Repository Setup

### 1.1 Create GitHub Repository

```bash
# Initialize git
git init

# Add remote
git remote add origin https://github.com/yourusername/visitor-form-app.git

# Add all files
git add .

# Commit
git commit -m "Initial commit: Visitor Form Application"

# Push to GitHub
git push -u origin main
```

### 1.2 Enable GitHub Actions

- Go to your repository on GitHub
- Navigate to "Settings" > "Actions" > "General"
- Ensure "Allow all actions and reusable workflows" is selected

## Step 2: Configure Repository Secrets

Navigate to: **Settings** > **Secrets and variables** > **Actions** > **New repository secret**

### 2.1 Docker Hub Secrets

```
DOCKER_USERNAME=your_dockerhub_username
DOCKER_PASSWORD=your_dockerhub_password_or_token
```

**How to get Docker Hub token:**
1. Go to Docker Hub > Account Settings > Security
2. Click "New Access Token"
3. Give it a name and select "Read, Write, Delete"
4. Copy the token

### 2.2 AWS Secrets

```
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=us-east-1  # or your preferred region
```

**How to create AWS access keys:**
1. Go to AWS Console > IAM > Users
2. Select your user (or create a new one)
3. Go to "Security credentials" tab
4. Click "Create access key"
5. Choose "Application running outside AWS"
6. Save the access key ID and secret access key

### 2.3 Deployment Secrets

#### For EC2 Deployment

```
EC2_HOST=your-ec2-public-ip-or-domain
EC2_USERNAME=ubuntu  # or ec2-user for Amazon Linux
EC2_SSH_KEY=your_private_ssh_key_content
APP_URL=https://your-app-domain.com
```

**How to get SSH key:**
```bash
# Display your private key
cat ~/.ssh/your-ec2-key.pem

# Copy the entire content including:
# -----BEGIN RSA PRIVATE KEY-----
# ... key content ...
# -----END RSA PRIVATE KEY-----
```

#### For Frontend Deployment (S3/CloudFront)

```
S3_BUCKET_NAME=your-s3-bucket-name
CLOUDFRONT_DISTRIBUTION_ID=your-cloudfront-distribution-id
REACT_APP_API_URL=https://api.your-domain.com
```

### 2.4 Database Secrets (for testing)

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=test_user
DB_PASSWORD=test_password
DB_NAME=test_db
```

## Step 3: Workflow Configuration

### 3.1 CI/CD Workflow (ci-cd.yml)

This workflow runs on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**What it does:**
1. Runs backend tests
2. Runs frontend tests
3. Builds Docker images (on main branch only)
4. Pushes images to Docker Hub
5. Deploys to production server

**Customize workflow:**

Edit `.github/workflows/ci-cd.yml` to match your needs:

```yaml
env:
  NODE_VERSION: '18.x'  # Change Node version if needed

on:
  push:
    branches: [ main, develop ]  # Add/remove branches
```

### 3.2 AWS Deployment Workflow (deploy-aws.yml)

This workflow runs on:
- Manual trigger (workflow_dispatch)
- Push to `main` branch with changes in backend/frontend

**What it does:**
1. Builds and pushes backend image to Amazon ECR
2. Updates ECS service
3. Builds and deploys frontend to S3
4. Invalidates CloudFront cache

## Step 4: AWS Infrastructure Setup

### 4.1 Create ECR Repositories

```bash
# Create backend repository
aws ecr create-repository \
    --repository-name visitor-form-backend \
    --region us-east-1

# Create frontend repository (optional)
aws ecr create-repository \
    --repository-name visitor-form-frontend \
    --region us-east-1
```

### 4.2 Create S3 Bucket for Frontend

```bash
# Create S3 bucket
aws s3 mb s3://visitor-form-frontend --region us-east-1

# Enable static website hosting
aws s3 website s3://visitor-form-frontend \
    --index-document index.html \
    --error-document index.html

# Set bucket policy for public access
aws s3api put-bucket-policy \
    --bucket visitor-form-frontend \
    --policy file://s3-bucket-policy.json
```

**s3-bucket-policy.json:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::visitor-form-frontend/*"
    }
  ]
}
```

### 4.3 Create CloudFront Distribution

```bash
# Create distribution (use AWS Console for easier setup)
# Or use AWS CLI with a distribution config file

aws cloudfront create-distribution \
    --origin-domain-name visitor-form-frontend.s3.amazonaws.com \
    --default-root-object index.html
```

**Note the Distribution ID** for GitHub secrets.

### 4.4 Create ECS Cluster and Service

```bash
# Create ECS cluster
aws ecs create-cluster \
    --cluster-name visitor-form-cluster \
    --region us-east-1

# Create task definition and service
# (Use AWS Console or see ECS setup guide)
```

## Step 5: EC2 Server Setup (Alternative to ECS)

### 5.1 Launch EC2 Instance

1. Go to EC2 Console
2. Launch instance:
   - AMI: Ubuntu 22.04 LTS
   - Instance type: t2.micro (free tier) or larger
   - Key pair: Create or use existing
   - Security group: Allow HTTP (80), HTTPS (443), SSH (22)

### 5.2 Install Docker on EC2

```bash
# SSH into your EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group
sudo usermod -aG docker ubuntu

# Verify installation
docker --version
docker-compose --version
```

### 5.3 Prepare Application Directory

```bash
# Create application directory
mkdir -p /home/ubuntu/visitor-form-app
cd /home/ubuntu/visitor-form-app

# Clone repository (or pull later via GitHub Actions)
git clone https://github.com/yourusername/visitor-form-app.git .

# Create .env file
nano .env
# Add your production environment variables
```

## Step 6: Test Workflows

### 6.1 Test CI/CD Workflow

1. Make a small change to your code
2. Commit and push to `develop` or `main`
3. Go to GitHub > Actions tab
4. Watch the workflow run

### 6.2 Manual Deployment Test

1. Go to GitHub > Actions
2. Select "Deploy to AWS" workflow
3. Click "Run workflow"
4. Select branch and run

## Step 7: Monitoring and Troubleshooting

### 7.1 Check Workflow Logs

- Go to Actions tab in GitHub
- Click on a workflow run
- Click on individual jobs to see logs

### 7.2 Common Issues

**Docker login fails:**
- Verify Docker Hub credentials
- Check if token has correct permissions

**AWS deployment fails:**
- Verify AWS credentials
- Check IAM permissions
- Ensure ECR repository exists

**SSH connection fails:**
- Verify EC2 security group allows SSH from GitHub IPs
- Check SSH key format (must include header/footer)
- Verify EC2 instance is running

**Build fails:**
- Check Node version compatibility
- Verify all dependencies are in package.json
- Check for syntax errors

### 7.3 Enable Debug Logging

Add to workflow file:

```yaml
env:
  ACTIONS_STEP_DEBUG: true
  ACTIONS_RUNNER_DEBUG: true
```

## Step 8: Optional Enhancements

### 8.1 Branch Protection Rules

1. Go to Settings > Branches
2. Add rule for `main` branch:
   - Require pull request reviews
   - Require status checks (CI tests)
   - Require branches to be up to date

### 8.2 Slack Notifications

Add to your workflow:

```yaml
- name: Slack Notification
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    text: Deployment completed
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
  if: always()
```

### 8.3 Environment Staging

Create separate environments:

```yaml
environment:
  name: production
  url: https://your-app.com
```

## Step 9: Continuous Monitoring

### 9.1 GitHub Actions Usage

- Check Actions tab for build history
- Monitor workflow run times
- Check for failed builds

### 9.2 AWS Monitoring

- CloudWatch for logs and metrics
- S3 for frontend hosting
- ECS/EC2 for backend status

## Best Practices

1. **Use Secrets**: Never commit credentials
2. **Test Locally**: Test Docker builds before pushing
3. **Small Changes**: Make incremental changes
4. **Review Logs**: Always check workflow logs
5. **Branch Strategy**: Use feature branches
6. **Version Tags**: Tag releases in Docker images
7. **Rollback Plan**: Keep previous Docker images
8. **Monitor Costs**: Check AWS billing regularly

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com/)
- [AWS ECS Documentation](https://docs.aws.amazon.com/ecs/)
- [AWS CLI Documentation](https://docs.aws.amazon.com/cli/)

## Support

For issues with the CI/CD pipeline:
1. Check workflow logs in GitHub Actions
2. Review AWS CloudWatch logs
3. Create an issue in the repository
