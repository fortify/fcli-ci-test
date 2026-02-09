# WARNING: Auto-Managed Repository

This repository is automatically managed by [fcli-ci-test-runner](https://github.com/fortify/fcli-ci-test-runner).

**All changes made directly in this repository will be overwritten.**

To make changes, edit the source files in the fcli-ci-test-runner repository:
- https://github.com/fortify/fcli-ci-test-runner/tree/main/ci/gitlab

Changes will be automatically synchronized when integration tests run.

## GitLab CI Configuration

This directory contains GitLab-specific pipeline configuration for fcli integration testing.

See [config.json](config.json) for:
- Repository URL (on GitLab)
- Supported operating systems
- Integration versions
- Required CI/CD variables

## Pipeline

The [.gitlab-ci.yml](.gitlab-ci.yml) file will be copied to the root of the GitLab repository during test execution.

## CI/CD Variables

The following CI/CD variables must be configured in the GitLab project (prefixed with `FCLI_FT_` and masked):

- `FCLI_FT_FOD_URL` - Fortify on Demand URL
- `FCLI_FT_FOD_CLIENT_ID` - FoD API client ID
- `FCLI_FT_FOD_CLIENT_SECRET` - FoD API client secret
- `FCLI_FT_SSC_URL` - Software Security Center URL
- `FCLI_FT_SSC_TOKEN` - SSC authentication token
- `FCLI_FT_SC_SAST_TOKEN` - ScanCentral SAST token
