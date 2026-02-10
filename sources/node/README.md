# EightBall Test Application (Node.js)

Simple Node.js application for testing Fortify and Debricked scans.

## Purpose

This application is intentionally vulnerable for testing purposes. It contains:
- **SAST vulnerabilities**: SQL injection, command injection, XSS, path traversal, hardcoded credentials, etc.
- **SCA vulnerabilities**: Vulnerable dependencies (old versions of express and sqlite3)

## Usage

### CLI Mode
```bash
npm install
node index.js
```

### Server Mode
```bash
npm install
node index.js --server
```

## Security Issues (Intentional)

1. **SQL Injection** - User input concatenated directly into SQL queries
2. **Command Injection** - User input passed to child_process.exec without sanitization
3. **Path Traversal** - File paths not validated
4. **XSS** - Unescaped user input in HTML responses
5. **Hardcoded Credentials** - Admin password and API key in source code
6. **Sensitive Data Exposure** - Credentials exposed via API endpoint
7. **Vulnerable Dependencies** - Old versions of express and sqlite3 with known CVEs

**DO NOT USE IN PRODUCTION!**
