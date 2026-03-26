variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Unique name for this project (used to name all resources)"
  type        = string
  default     = "react-spa-cicd"
}

variable "github_owner" {
  description = "Your GitHub username or organization"
  type        = string
}

variable "github_repo" {
  description = "GitHub repository name (without owner prefix)"
  type        = string
}

variable "github_branch" {
  description = "Branch to track for deployments"
  type        = string
  default     = "main"
}

variable "github_oauth_token" {
  description = "GitHub Personal Access Token (repo + admin:repo_hook scopes)"
  type        = string
  sensitive   = true
}
