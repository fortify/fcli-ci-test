# fcli-ci-test

Integration testing repository for fcli across multiple CI platforms (GitHub Actions, GitLab CI, Azure DevOps).

This repository orchestrates automated testing of fcli and its CI integrations (GitHub Action, GitLab Components, Azure DevOps scripts) to ensure compatibility across platforms, versions, and fcli releases.

## Structure

- `.github/workflows/` - GitHub Actions workflows
  - `run-tests.yml` - Main orchestrator for all CI platforms
  - `test-pipeline.yml` - Symlink to ci/github/test-pipeline.yml
- `ci/` - CI platform-specific configurations and pipelines
  - `github/` - GitHub Actions configuration and test pipeline
  - `gitlab/` - GitLab CI configuration and pipeline
  - `ado/` - Azure DevOps configuration and pipeline
- `sources/` - Sample applications for testing
  - `eightball/` - Simple Java application
  - `IWA-DotNet/` - .NET application (to be added)

## Usage

Trigger tests manually via GitHub Actions:

1. Go to **Actions** tab in GitHub
2. Select **Run Integration Tests** workflow
3. Click **Run workflow**
4. Configure inputs:
   - **fcli_version**: fcli version tag (default: `dev_v3.x`)
   - **products**: Comma-separated products to test (default: `fod,ssc`)
   - **components**: Comma-separated components to test (default: `setup,ast-scan`)
   - **source_dirs**: Comma-separated source directories (default: `eightball`)
   - **ci_systems**: Comma-separated CI systems with versions (default: `github:v2,github:v3,gitlab:v2,ado:v1`)
   - **os**: Comma-separated operating systems (default: `linux`)

### Examples

**Test GitHub Action v3 only:**
```
ci_systems: github:v3
products: fod
components: ast-scan
os: linux
```

**Test all platforms with Windows:**
```
ci_systems: github:v2,github:v3,gitlab:v2,ado:v1
os: windows
```
Note: GitLab will be automatically filtered out (only supports Linux)

**Test specific fcli release:**
```
fcli_version: v3.14.3
ci_systems: github:v3,gitlab:v2
```

## CI Platform Matrix

| Platform | Versions | Supported OS | Notes |
|----------|----------|--------------|-------|
| GitHub Actions | v2, v3 | Linux, Windows, Mac | Runs inline in this repo |
| GitLab CI | v2, v3 | Linux | Syncs to gitlab.com/fortify/fcli-ci-test |
| Azure DevOps | v1 | Linux, Windows, Mac | Syncs to dev.azure.com/fortify-oss/fcli-ci-test |

## Secrets

Required GitHub repository secrets (using `FCLI_FT_*` prefix for functional testing):

### Fortify Product Credentials
- `FCLI_FT_FOD_URL` - Fortify on Demand URL (e.g., https://ams.fortify.com)
- `FCLI_FT_FOD_CLIENT_ID` - FoD API client ID
- `FCLI_FT_FOD_CLIENT_SECRET` - FoD API client secret
- `FCLI_FT_SSC_URL` - Software Security Center URL
- `FCLI_FT_SSC_TOKEN` - SSC authentication token (CIToken)
- `FCLI_FT_SC_SAST_TOKEN` - ScanCentral SAST client authentication token

### CI Platform Tokens
- `GITLAB_TOKEN` - GitLab personal access token with `api` scope (for syncing CI/CD variables)
- `GITLAB_TRIGGER_TOKEN` - GitLab pipeline trigger token (for triggering pipelines)
- `ADO_PAT` - Azure DevOps personal access token with Build (read & execute) and Variable Groups (read & write) scopes
- `ADO_ORGANIZATION` - Azure DevOps organization name (e.g., `fortify-oss`)
- `ADO_PROJECT` - Azure DevOps project name (e.g., `fcli-ci-test`)

## How It Works

1. **Matrix Generation**: The `run-tests.yml` workflow expands input parameters into a test matrix, filtering out unsupported combinations (e.g., GitLab + Windows)

2. **GitHub Tests**: Triggered directly via `workflow_dispatch` to `test-pipeline.yml` in the same repository

3. **GitLab/ADO Tests**: 
   - Clone remote repository
   - Sync pipeline files and source code
   - Update CI/CD variables/secrets via API
   - Trigger pipeline with test parameters
   - Poll for completion

4. **Results**: All test results are aggregated and displayed in the workflow run summary

## Development

### Adding New Source Applications

1. Create a new directory under `sources/` (e.g., `sources/my-app/`)
2. Add your source code
3. Update the `source_dirs` input when running tests

### Modifying CI Pipelines

Edit the pipeline files in the respective `ci/<platform>/` directories:
- GitHub: Modify `ci/github/test-pipeline.yml` (symlinked to `.github/workflows/test-pipeline.yml`)
- GitLab: Modify `ci/gitlab/.gitlab-ci.yml`
- Azure DevOps: Modify `ci/ado/azure-pipelines.yml`

All pipelines are now consistently stored in their respective `ci/<platform>/` directories. For GitHub Actions, a symlink ensures the workflow remains discoverable by GitHub.

Changes will be automatically synchronized to remote repositories (GitLab, ADO) during the next test run.

### Configuration

Each CI platform has a `config.json` file defining:
- Repository URL
- Supported operating systems
- Available integration versions
- Required secret names

## External Repositories

The following external repositories are automatically managed by this repository:

- **GitLab**: https://gitlab.com/fortify/fcli-ci-test
- **Azure DevOps**: https://dev.azure.com/fortify-oss/fcli-ci-test

**⚠️ WARNING**: All changes made directly in these repositories will be overwritten during test runs.

## Future Enhancements

- [ ] Implement workflow run polling for GitHub tests
- [ ] Complete GitLab sync and trigger implementation
- [ ] Complete Azure DevOps sync and trigger implementation
- [ ] Add test verification logic (check scan submission, artifacts, etc.)
- [ ] Add support for triggering from fcli repository CI
- [ ] Report test status back to fcli commits via Status API
- [ ] Add more sample applications (IWA-DotNet, etc.)
- [ ] Support for testing specific fcli action versions

## License

See [LICENSE.txt](LICENSE.txt)
