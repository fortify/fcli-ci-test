# GitHub Actions Configuration

This directory contains GitHub Actions-specific configuration and documentation for fcli integration testing.

## Configuration

See [config.json](config.json) for:
- Repository URL
- Supported operating systems
- Integration versions
- Required secrets

## Test Pipeline

The test pipeline is located at [test-pipeline.yml](test-pipeline.yml) in this directory, with a symlink at [.github/workflows/test-pipeline.yml](../../.github/workflows/test-pipeline.yml) for GitHub Actions discoverability.

This pattern maintains consistency with GitLab and Azure DevOps where all pipelines are stored in their respective `ci/<platform>/` directories.

This pipeline is triggered by the main orchestrator workflow and executes tests using different versions of the `fortify/github-action`.

## Secrets

The following secrets must be configured in the GitHub repository (prefixed with `FCLI_FT_` for functional testing):

- `FCLI_FT_FOD_URL` - Fortify on Demand URL
- `FCLI_FT_FOD_CLIENT_ID` - FoD API client ID
- `FCLI_FT_FOD_CLIENT_SECRET` - FoD API client secret
- `FCLI_FT_SSC_URL` - Software Security Center URL
- `FCLI_FT_SSC_TOKEN` - SSC authentication token
- `FCLI_FT_SC_SAST_TOKEN` - ScanCentral SAST token
