# InsecureRestAPI - Test Source for fcli-ci-test-runner

This directory contains a copy of [InsecureRestAPI](https://github.com/kadraman/InsecureRestAPI), an insecure NodeJS/Express/MongoDB REST API with intentional vulnerabilities for educational purposes.

## Source Information
- **Repository**: https://github.com/kadraman/InsecureRestAPI
- **License**: GPLv3
- **Language**: TypeScript/Node.js
- **Build Tool**: npm

## Purpose
Used as test source code for fcli GitHub Actions integration testing with Fortify FoD and SSC.

## Updates
This source is periodically synced from the upstream repository. To update:
```bash
cd /tmp
rm -rf InsecureRestAPI
git clone --depth 1 https://github.com/kadraman/InsecureRestAPI.git
cd -
rm -rf sources/node
cp -r /tmp/InsecureRestAPI sources/node
rm -rf sources/node/.git
```
