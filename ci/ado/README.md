# WARNING: Auto-Managed Repository

This repository is automatically managed by [fcli-ci-test](https://github.com/fortify/fcli-ci-test).

**All changes made directly in this repository will be overwritten.**

To make changes, edit the source files in the fcli-ci-test repository:
- https://github.com/fortify/fcli-ci-test/tree/main/ci/ado

Changes will be automatically synchronized when integration tests run.

## Azure DevOps Configuration

This directory contains Azure DevOps-specific pipeline configuration for fcli integration testing.

See [config.json](config.json) for:
- Repository URL (on Azure DevOps)
- Supported operating systems
- Integration versions
- Required pipeline variables

## Pipeline

The [azure-pipelines.yml](azure-pipelines.yml) file will be copied to the root of the Azure DevOps repository during test execution.

## Pipeline Variables / Variable Group

The following pipeline variables must be configured in an Azure DevOps Variable Group (marked as secret):

- `FCLI_FT_FOD_URL` - Fortify on Demand URL
- `FCLI_FT_FOD_CLIENT_ID` - FoD API client ID
- `FCLI_FT_FOD_CLIENT_SECRET` - FoD API client secret (secret)
- `FCLI_FT_SSC_URL` - Software Security Center URL
- `FCLI_FT_SSC_TOKEN` - SSC authentication token (secret)
- `FCLI_FT_SC_SAST_TOKEN` - ScanCentral SAST token (secret)
