output "cloudfront_url" {
  description = "Your React app is live at this URL"
  value       = "https://${aws_cloudfront_distribution.cdn.domain_name}"
}

output "hosting_bucket" {
  description = "S3 bucket that stores the built React files"
  value       = aws_s3_bucket.hosting.bucket
}

output "artifact_bucket" {
  description = "S3 bucket used by CodePipeline for build artifacts"
  value       = aws_s3_bucket.artifacts.bucket
}

output "codepipeline_name" {
  description = "Name of the CodePipeline"
  value       = aws_codepipeline.pipeline.name
}

output "cloudfront_distribution_id" {
  description = "CloudFront Distribution ID (useful for cache invalidations)"
  value       = aws_cloudfront_distribution.cdn.id
}

output "codebuild_project_name" {
  description = "Name of the CodeBuild project"
  value       = aws_codebuild_project.build.name
}
