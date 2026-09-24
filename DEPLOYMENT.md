# Quick Deployment README — 4th Node.js API Server

> **Use this when deploying another backend API to the same EC2 instance.**
> Assumptions: Ubuntu + Docker + Nginx + Certbot + GitHub Actions are already configured.
>
```bash
ssh -i "primeinst.pem" ubuntu@ec2-54-221-61-201.compute-1.amazonaws.com
```
---

## 1. Clone Repository

```bash
cd /opt/apps

git clone <GITHUB_REPO_URL> <APP_NAME>

cd /opt/apps/<APP_NAME>
```

If the repository contains frontend + backend and only backend is required:

```bash
cd /opt/apps/<APP_NAME>

ls -la
cd backend
```

---

## 2. Verify Backend

```bash
cd /opt/apps/<APP_NAME>/backend

grep -nE 'PORT|listen' server.js

cat package.json
```

Find environment variables:

```bash
grep -Rho 'process\.env\.[A-Z0-9_]*' /opt/apps/<APP_NAME>/backend \
| sort -u
```

---

## 3. Add Dockerfile

Create:

```bash
nano /opt/apps/<APP_NAME>/backend/Dockerfile
```

Use:

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

USER node

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -q --spider http://127.0.0.1:3001/ || exit 1

CMD ["npm", "start"]
```

---

## 4. Add .dockerignore

```bash
nano /opt/apps/<APP_NAME>/backend/.dockerignore
```

```text
node_modules
npm-debug.log
.env
.env.*
.git
.gitignore
Dockerfile
.dockerignore
coverage
logs
*.log
```

Commit and push:

```bash
cd /opt/apps/<APP_NAME>

git add backend/Dockerfile backend/.dockerignore

git commit -m "add Docker configuration"

git push origin main
```

---

## 5. Pull on EC2

```bash
cd /opt/apps/<APP_NAME>

git pull origin main
```

Verify:

```bash
ls -la backend | grep -E 'Dockerfile|dockerignore'
```

---

## 6. Create Production Environment

```bash
mkdir -p /opt/apps/<APP_NAME>/env

nano /opt/apps/<APP_NAME>/env/production.env
```

Add the required variables from your backend.

Example:

```env
PORT=3001
NODE_ENV=production
MONGO_URI=...
JWT_SECRET=...
CLIENT_URL=https://<FRONTEND_DOMAIN>
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=...
AWS_S3_BUCKET=...
```

Verify variable names without exposing values:

```bash
grep -E '^[A-Z_]+=' /opt/apps/<APP_NAME>/env/production.env \
| sed 's/=.*$/=***/'
```

---

## 7. Build Docker Image

```bash
cd /opt/apps/<APP_NAME>/backend

docker build -t <APP_NAME>-api:latest .
```

---

## 8. Choose a New Host Port

Existing deployment:

```text
PrimeImpact → 3001
Makhana     → 3002
OwnVibes    → 3003
```

For the **4th API**:

```text
Host port: 3004
Container port: 3001
```

Do **not** change the application's internal port if the Dockerfile/application already uses `3001`.

Check:

```bash
docker ps
```

---

## 9. Start Container

```bash
docker run -d \
  --name <APP_NAME>-api \
  --env-file /opt/apps/<APP_NAME>/env/production.env \
  -p 127.0.0.1:3004:3001 \
  --restart always \
  <APP_NAME>-api:latest
```

Check:

```bash
docker ps
```

Logs:

```bash
docker logs <APP_NAME>-api --tail 20
```

---

## 10. Test Container

```bash
curl -i http://127.0.0.1:3004/
```

Expected:

```text
HTTP/1.1 200 OK
```

---

# 11. Nginx Configuration

Example domain:

```text
api4.ownvibes.in
```

Create:

```bash
sudo nano /etc/nginx/sites-available/api4
```

Use:

```nginx
server {
    listen 80;
    server_name api4.ownvibes.in;

    location / {
        proxy_pass http://127.0.0.1:3004;

        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable:

```bash
sudo ln -s /etc/nginx/sites-available/api4 /etc/nginx/sites-enabled/api4
```

Test:

```bash
sudo nginx -t
```

Reload:

```bash
sudo systemctl reload nginx
```

Test:

```bash
curl -i -H "Host: api4.ownvibes.in" http://127.0.0.1/
```

---

# 12. HTTPS

Make sure DNS for the domain points to the EC2 instance.

Run:

```bash
sudo certbot --nginx -d api4.ownvibes.in
```

Test:

```bash
curl -I https://api4.ownvibes.in/
```

Final expected:

```text
HTTP/1.1 200 OK
```

---

# 13. Final Docker Check

```bash
docker ps
```

Expected pattern:

```text
<APP_NAME>-api    127.0.0.1:3004->3001/tcp
```

Test:

```bash
curl -i http://127.0.0.1:3004/
curl -i https://api4.ownvibes.in/
```

---

# 14. GitHub Actions CI/CD

Create:

```bash
cd /opt/apps/<APP_NAME>

mkdir -p .github/workflows

nano .github/workflows/deploy.yml
```

Use:

```yaml
name: Deploy Backend

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Deploy to EC2
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USERNAME }}
          key: ${{ secrets.EC2_SSH_KEY }}
          port: 22
          script: |
            cd /opt/apps/<APP_NAME>

            git pull origin main

            cd backend

            docker build -t <APP_NAME>-api:latest .

            docker stop <APP_NAME>-api || true
            docker rm <APP_NAME>-api || true

            docker run -d \
              --name <APP_NAME>-api \
              --env-file /opt/apps/<APP_NAME>/env/production.env \
              -p 127.0.0.1:3004:3001 \
              --restart always \
              <APP_NAME>-api:latest

            docker image prune -f

            docker ps
```

---

# 15. GitHub Secrets

Add these repository secrets:

```text
EC2_HOST
EC2_USERNAME
EC2_SSH_KEY
```

Then commit workflow:

```bash
git add .github/workflows/deploy.yml

git commit -m "add backend CI/CD"

git push origin main
```

---

# 16. Verify CI/CD

```bash
docker ps
```

Then:

```bash
curl -i https://api4.ownvibes.in/
```

---

# 17. Future Deployments

After CI/CD is working, **do not manually rebuild/restart the server**.

For future code changes:

```bash
git add .
git commit -m "update backend"
git push origin main
```

GitHub Actions will:

```text
GitHub push
    ↓
GitHub Actions
    ↓
SSH → EC2
    ↓
git pull
    ↓
Docker build
    ↓
Stop old container
    ↓
Start new container
    ↓
API running
```

---

## Port Allocation

| API         | Host Port | Container Port |
| ----------- | --------: | -------------: |
| PrimeImpact |      3001 |           3001 |
| Makhana     |      3002 |           3001 |
| OwnVibes    |      3003 |           3001 |
| **4th API** |  **3004** |       **3001** |
| 5th API     |      3005 |           3001 |

**Rule:** Every new API gets a **new host port**, while the Node.js container can continue using **3001 internally**.
