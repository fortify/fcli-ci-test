/**
 * Magic 8-Ball application for testing Fortify scans.
 * Contains intentional security issues for demonstration purposes.
 */

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const readline = require('readline');

const RESPONSES = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Reply hazy, try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
];

// Intentional security issue: Hardcoded credentials
const ADMIN_PASSWORD = "admin123";
const API_KEY = "sk-1234567890abcdef";

class EightBall {
    constructor() {
        this.app = express();
        this.db = new sqlite3.Database(':memory:');
        this.setupDatabase();
        this.setupRoutes();
    }

    setupDatabase() {
        this.db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
        this.db.run("INSERT INTO users (username, password) VALUES ('admin', 'admin123')");
    }

    getResponse() {
        return RESPONSES[Math.floor(Math.random() * RESPONSES.length)];
    }

    // Intentional security issue: SQL injection vulnerability
    getUserQuery(userId) {
        const query = "SELECT * FROM users WHERE id = '" + userId + "'";
        console.log("Executing query: " + query);
        
        // SQL injection vulnerability
        this.db.all(query, (err, rows) => {
            if (err) {
                console.error(err);
            } else {
                console.log(rows);
            }
        });
        
        return query;
    }

    // Intentional security issue: Command injection vulnerability
    executeCommand(command) {
        const exec = require('child_process').exec;
        // Command injection vulnerability - user input directly in exec
        exec('echo ' + command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error}`);
                return;
            }
            console.log(`Output: ${stdout}`);
        });
    }

    // Intentional security issue: Path traversal vulnerability
    readFile(filename) {
        const fs = require('fs');
        // Path traversal vulnerability - no validation of filename
        const content = fs.readFileSync(filename, 'utf8');
        return content;
    }

    authenticate(password) {
        return ADMIN_PASSWORD === password;
    }

    setupRoutes() {
        // Intentional security issue: Missing authentication
        this.app.get('/api/prediction', (req, res) => {
            res.json({ prediction: this.getResponse() });
        });

        // Intentional security issue: SQL injection via query parameter
        this.app.get('/api/user/:id', (req, res) => {
            const userId = req.params.id;
            const query = this.getUserQuery(userId);
            res.json({ query: query });
        });

        // Intentional security issue: XSS vulnerability
        this.app.get('/api/echo', (req, res) => {
            const message = req.query.message;
            // XSS vulnerability - unescaped user input
            res.send('<html><body><h1>' + message + '</h1></body></html>');
        });

        // Intentional security issue: Sensitive data exposure
        this.app.get('/api/config', (req, res) => {
            res.json({
                apiKey: API_KEY,
                dbPassword: ADMIN_PASSWORD
            });
        });
    }

    startServer(port = 3000) {
        this.app.listen(port, () => {
            console.log(`8-Ball server listening on port ${port}`);
        });
    }

    runCLI() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log("Welcome to the Magic 8-Ball!");
        console.log("Ask a yes/no question, or type 'quit' to exit.");

        const askQuestion = () => {
            rl.question('\nYour question: ', (question) => {
                if (question.toLowerCase() === 'quit') {
                    console.log("Goodbye!");
                    rl.close();
                    return;
                }

                if (question.trim() === '') {
                    console.log("Please ask a question!");
                    askQuestion();
                    return;
                }

                console.log("8-Ball says: " + this.getResponse());
                askQuestion();
            });
        };

        askQuestion();
    }
}

// Main execution
if (require.main === module) {
    const eightBall = new EightBall();
    
    // Check if running as server or CLI
    if (process.argv.includes('--server')) {
        eightBall.startServer();
    } else {
        eightBall.runCLI();
    }
}

module.exports = EightBall;
