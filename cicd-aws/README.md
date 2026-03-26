# React SPA on AWS — Terraform CI/CD

Automated infrastructure for deploying a React Single Page Application to AWS using:

- **Terraform** — All infrastructure as code
- **AWS CodePipeline** — Orchestrates the CI/CD flow
- **AWS CodeBuild** — Builds the React app (`npm run build`)
- **AWS S3** — Hosts the static build output (private)
- **AWS CloudFront** — CDN that serves the app globally over HTTPS
- **GitHub Webhook** — Triggers the pipeline on every push

---

## Project Structure

```
.
├── buildspec.yml          # CodeBuild instructions (install → build)
├── react-app/             # The React Single Page Application
│   ├── public/
│   ├── src/
│   └── package.json
└── terraform/             # All AWS infrastructure code
    ├── main.tf            # Core resources (S3, CloudFront, CodePipeline...)
    ├── variables.tf       # Input variables
    ├── outputs.tf         # Useful outputs after apply
    └── terraform.tfvars.example  ← copy to terraform.tfvars
```

---

## Prerequisites

| Tool | Version |
|------|---------|
| Terraform | >= 1.3.0 |
| AWS CLI | configured with sufficient permissions |
| GitHub | Personal Access Token (scopes: `repo`, `admin:repo_hook`) |

---

## How to Deploy

### Step 1 — Clone this repo and push to your own GitHub

```bash
git clone <this-repo>
cd <this-repo>
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2 — Configure Terraform variables

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your GitHub details and token
```

### Step 3 — Deploy infrastructure

```bash
terraform init
terraform plan    # review what will be created
terraform apply   # type 'yes' to confirm
```

### Step 4 — Done! 🎉

After `apply` completes, Terraform prints your CloudFront URL:

```
cloudfront_url = "https://d1234abcde.cloudfront.net"
```

Open it in your browser. Every future `git push` to your branch will automatically rebuild and redeploy.

---

## How the Pipeline Works

```
git push → GitHub Webhook
             ↓
        CodePipeline triggered
             ↓
        Source stage: pulls latest code from GitHub
             ↓
        Build stage: CodeBuild runs buildspec.yml
                     - npm ci
                     - npm run build
             ↓
        Deploy stage: build/ folder synced to S3 hosting bucket
             ↓
        CloudFront serves the new version globally
```

---

## Tear Down

To destroy all AWS resources and stop incurring charges:

```bash
cd terraform
terraform destroy
```

---

## Cost Estimate

For a low-traffic personal project all services likely fall within the **AWS Free Tier** (12 months):

| Service | Free Tier |
|---------|-----------|
| S3 | 5 GB storage, 20K GET/month |
| CloudFront | 1 TB transfer, 10M requests/month |
| CodePipeline | 1 free active pipeline/month |
| CodeBuild | 100 build minutes/month |

After free tier: **~$1–3/month** for light usage.

---

## Security Notes

- The S3 hosting bucket is **private** — only CloudFront can access it (via OAC)
- Never commit `terraform.tfvars` to GitHub (it contains your GitHub token)
- Add `terraform.tfvars` to `.gitignore`
