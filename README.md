Express Mysql REST API
==================================

Getting Started
---------------

```sh
# clone it
git clone git@github.com:dainiusgliebus/nodejs-express-rest-mysql-starter
cd nodejs-express-rest-mysql-starter

# Make it your own
rm -rf .git && git init && npm init

# Install dependencies
npm install

# Create mysql database and copy sql to database from sql/users.sql
# Copy .env.example to .env and update with local parameters
cp .env.example .env

# Run test
npm run test

# Run test-reload
npm run test-watch

# Start development live-reload server
npm run dev

# Start production server:
npm start
```