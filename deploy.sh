#!/bin/bash

set -e

echo "🚀 Starting deployment process..."

# Step 1: Terraform Infrastructure
echo "📦 Provisioning infrastructure with Terraform..."
cd terraform
terraform init
terraform plan -var-file="terraform.tfvars"
terraform apply -var-file="terraform.tfvars" -auto-approve

# Get outputs
WEB_IP=$(terraform output -raw web_instance_ip)
cd ..

# Step 2: Wait for EC2 to be ready
echo "⏳ Waiting for EC2 instance to be ready..."
sleep 60

# Step 3: Ansible Configuration
echo "🔧 Configuring server with Ansible..."
cd ansible
ansible-playbook -i inventory.yml playbook.yml \
  --extra-vars "web_instance_ip=$WEB_IP" \
  --extra-vars "ecr_registry=$ECR_REGISTRY" \
  --extra-vars "app_name=news-app" \
  --extra-vars "db_host=$DB_HOST" \
  --extra-vars "db_user=$DB_USER" \
  --extra-vars "db_password=$DB_PASSWORD" \
  --extra-vars "db_name=$DB_NAME" \
  --extra-vars "news_api_key=$NEWS_API_KEY"

echo "✅ Deployment completed! Application available at: http://$WEB_IP"

