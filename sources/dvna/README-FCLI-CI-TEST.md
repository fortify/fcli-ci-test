# DVNA - Damn Vulnerable NodeJS Application

## Source
This application is sourced from https://github.com/appsecco/dvna

## License
MIT License

Copyright (c) 2017 Appsecco Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Purpose in fcli-ci-test
This vulnerable Node.js application is used to test Fortify static analysis scanning 
capabilities across different CI/CD platforms (GitHub Actions, GitLab CI, Azure DevOps).

The application intentionally contains security vulnerabilities including:
- SQL Injection
- Cross-Site Scripting (XSS)
- Command Injection
- XML External Entity (XXE) Injection
- Insecure Deserialization
- And more...

## Build Tool
- **Language**: JavaScript (Node.js)
- **Build Tool**: npm
- **Build Command**: `npm install`
