# Deployment Guide

## Production Deployment

### Prerequisites
- Docker & Docker Compose installed
- PostgreSQL database (managed or self-hosted)
- Node.js runtime or container platform
- Git for version control
- Domain name (optional)

## Deployment Options

### Option 1: Docker (Recommended)

#### Deploy to Your Server
```bash
# 1. SSH into server
ssh user@server-ip

# 2. Clone repository
git clone <repository-url>
cd IKYA-gig-workers-app

# 3. Configure environment
cp backend/.env.example backend/.env
nano backend/.env  # Edit with production values

cp database/.env.example database/.env
nano database/.env  # Edit with production values

# 4. Pull latest code
git pull origin main

# 5. Build and start
docker-compose -f docker-compose.yml up -d --build

# 6. Verify deployment
curl http://localhost:3000/health
```

#### Environment Variables (Production)
```env
# backend/.env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:password@postgres-host:5432/gig_workers_db
CORS_ORIGIN=https://yourdomain.com

# database/.env
DB_USER=prod_user
DB_PASSWORD=strong_password_here
DB_NAME=gig_workers_prod
DB_PORT=5432
DB_HOST=postgres-host
```

### Option 2: Heroku Deployment

```bash
# 1. Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# 2. Login to Heroku
heroku login

# 3. Create Heroku app
heroku create your-app-name

# 4. Add PostgreSQL add-on
heroku addons:create heroku-postgresql:standard-0 -a your-app-name

# 5. Set environment variables
heroku config:set NODE_ENV=production -a your-app-name
heroku config:set CORS_ORIGIN=https://your-app-name.herokuapp.com -a your-app-name

# 6. Deploy
git push heroku main

# 7. Run migrations
heroku run npx prisma migrate deploy -a your-app-name

# 8. Verify
heroku logs --tail -a your-app-name
```

### Option 3: AWS Deployment

#### Using ECS (Elastic Container Service)
```bash
# 1. Create ECR repository
aws ecr create-repository --repository-name gig-workers-backend

# 2. Login to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# 3. Build and push image
docker build -t gig-workers-backend backend/
docker tag gig-workers-backend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/gig-workers-backend:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/gig-workers-backend:latest

# 4. Create ECS task definition
aws ecs register-task-definition --cli-input-json file://task-definition.json

# 5. Create ECS service
aws ecs create-service --cluster default --service-name gig-workers --task-definition gig-workers:1
```

#### Using RDS for PostgreSQL
```bash
# Create RDS instance via AWS Console or CLI
aws rds create-db-instance \
  --db-instance-identifier gig-workers-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password <password> \
  --allocated-storage 20
```

### Option 4: Google Cloud Run

```bash
# 1. Build and push to Google Cloud Registry
gcloud builds submit --tag gcr.io/PROJECT_ID/gig-workers-backend backend/

# 2. Deploy to Cloud Run
gcloud run deploy gig-workers-backend \
  --image gcr.io/PROJECT_ID/gig-workers-backend \
  --platform managed \
  --region us-central1 \
  --set-env-vars NODE_ENV=production,DATABASE_URL=<cloud_sql_url>

# 3. Setup Cloud SQL proxy
gcloud sql connect gig-workers-db --user=postgres
```

## Database Migration (Production)

### Running Migrations
```bash
# Inside container
docker exec gig-workers-api npx prisma migrate deploy

# Or locally
npx prisma migrate deploy
```

### Backup Before Migration
```bash
docker exec gig-workers-db pg_dump -U gigworker gig_workers_db > backup.sql
```

### Restore from Backup
```bash
docker exec -i gig-workers-db psql -U gigworker gig_workers_db < backup.sql
```

## SSL/HTTPS Setup

### Using Let's Encrypt with Nginx
```bash
# 1. Install Nginx
sudo apt-get install nginx

# 2. Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# 3. Configure Nginx reverse proxy
sudo nano /etc/nginx/sites-available/default

# Add this configuration:
server {
    server_name yourdomain.com www.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# 4. Test Nginx configuration
sudo nginx -t

# 5. Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# 6. Enable auto-renewal
sudo systemctl enable certbot.timer
```

## Monitoring & Logging

### Using CloudWatch (AWS)
```bash
# Configure CloudWatch logging in docker-compose
environment:
  - awslogs-group=/ecs/gig-workers
  - awslogs-region=us-east-1
  - awslogs-stream-prefix=ecs
```

### Using DataDog
```bash
# Add DataDog agent
DD_API_KEY=<your-key> docker run -d \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc:/host/proc:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  datadog/agent:latest
```

### Using ELK Stack (Elasticsearch, Logstash, Kibana)
```yaml
# Add to docker-compose
elk:
  image: docker.elastic.co/elasticsearch/elasticsearch:8.0.0
  # ... configuration
```

## Load Balancing

### Using HAProxy
```bash
# Install HAProxy
sudo apt-get install haproxy

# Configure /etc/haproxy/haproxy.cfg
global
    maxconn 4096

frontend http_front
    bind *:80
    stats uri /stats
    default_backend http_back

backend http_back
    balance roundrobin
    server backend1 localhost:3000
    server backend2 localhost:3001
```

### Using Kubernetes
```bash
# Deploy using Kubernetes manifests
kubectl apply -f k8s/deployment.yml
kubectl apply -f k8s/service.yml
kubectl apply -f k8s/ingress.yml

# Scale replicas
kubectl scale deployment/gig-workers --replicas=3
```

## Performance Optimization

### Database Connection Pooling
```env
# Add connection string params
DATABASE_URL=postgresql://user:pass@host/db?schema=public&pool_size=20
```

### Caching with Redis
```bash
# Add Redis to docker-compose
redis:
  image: redis:7-alpine
  ports:
    - "6379:6379"
  command: redis-server --appendonly yes
```

### CDN Configuration
Configure CloudFront (AWS) or Cloudflare for static assets

## Security Hardening

### Update Security Headers
```typescript
// backend/src/index.ts
import helmet from 'helmet';

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
  },
}));
```

### Configure CORS
```typescript
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || ['https://yourdomain.com'],
  credentials: true
}));
```

### Add Rate Limiting
```bash
npm install express-rate-limit
```

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api/', limiter);
```

## Health Checks & Auto-Recovery

### Kubernetes Liveness Probe
```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 10
```

### Docker Health Check
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"
```

## Backup Strategy

### Automated Daily Backups (AWS RDS)
```bash
# Configure automated backups
aws rds modify-db-instance \
  --db-instance-identifier gig-workers-db \
  --backup-retention-period 30 \
  --preferred-backup-window "03:00-04:00"
```

### Manual Backup
```bash
pg_dump -h host -U user -d database > backup_$(date +%Y%m%d).sql
```

## Post-Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations completed
- [ ] SSL certificates installed
- [ ] Domain DNS configured
- [ ] Backups configured
- [ ] Monitoring enabled
- [ ] Logging enabled
- [ ] Health checks verified
- [ ] API endpoints tested
- [ ] CI/CD pipeline active
- [ ] Error tracking configured (Sentry)
- [ ] Performance monitoring active

## Rollback Procedure

```bash
# Check deployment history
docker ps -a

# Rollback to previous version
git checkout previous-commit
docker-compose down
docker-compose up -d --build

# Or use git tags
git tag v1.0.0
git checkout v1.0.0
docker-compose up -d --build
```

## Monitoring Dashboard

### Key Metrics to Monitor
1. API response time
2. Database query time
3. CPU usage
4. Memory usage
5. Disk usage
6. Error rates
7. Request throughput

### Recommended Tools
- **Prometheus** - Metrics collection
- **Grafana** - Visualization
- **AlertManager** - Alerting
- **Sentry** - Error tracking
- **New Relic** - APM
- **DataDog** - Full monitoring

## Support & Troubleshooting

### Common Issues

**502 Bad Gateway**
```bash
# Check backend is running
docker ps | grep backend

# Check logs
docker logs gig-workers-api
```

**Database Connection Timeout**
```bash
# Verify database is accessible
psql -h host -U user -d database

# Check network connectivity
curl -v telnet://db-host:5432
```

**Out of Memory**
```bash
# Increase memory limits
docker-compose.yml:
  services:
    backend:
      mem_limit: 1g
      memswap_limit: 2g
```

## Contact & Support

For issues or questions:
- GitHub Issues: [project-url]/issues
- Email: support@example.com
- Slack: #deployment-channel
