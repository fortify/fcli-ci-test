# EightBall Test Application

A simple Java application that simulates a Magic 8-Ball fortune teller.

## Purpose

This application is used for testing Fortify CI integrations. It contains:
- Basic Java code for compilation and packaging
- Intentional security vulnerabilities for scan demonstration:
  - SQL injection vulnerability
  - Hardcoded credentials
  - Input validation issues

## Building

```bash
mvn clean package
```

## Running

```bash
mvn exec:java -Dexec.mainClass="com.fortify.test.EightBall"
```

Or after building:
```bash
java -jar target/eightball-1.0-SNAPSHOT.jar
```

## Security Issues (Intentional)

This application contains intentional security issues for testing purposes:

1. **SQL Injection**: The `getUserQuery()` method constructs SQL queries using string concatenation
2. **Hardcoded Password**: The `ADMIN_PASSWORD` constant contains a hardcoded credential
3. **Weak Cryptography**: Uses `java.util.Random` instead of `SecureRandom`

These issues should be detected by Fortify Static Code Analyzer (SCA) during CI testing.

## Requirements

- Java 17 or higher
- Maven 3.6 or higher
