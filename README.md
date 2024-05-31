
# Project Title
I have implemented user management system based on
Node.js and Express.js are popular web frameworks that can be used to create web applications. JWT (JSON Web Token) is an authentication method that allows users to identify themselves and verify that they have access to specific resources. MongoDB is a NoSQL database that is designed to store and manage large amounts of unstructured data. bcrypt is a library that can be used to securely store passwords in a database. Base64 is an encoding scheme that can be used to represent data in a URL- friendly way. Overall, implementing user management using Node.js, Express, JWT, MongoDB, bcrypt, and Base64.


## Configuration
1. Ensure you have MongoDB installed and running on your machine
2. Create a .env file in the root directory of the project.
PORT=8080
MONGODB_URI=mongodb://localhost:27017/your-database
JWT_SECRET=your_jwt_secret_key
3. PORT: The port number on which the server will run.
4. MONGODB_URI: The connection URI for your MongoDB database.
5. JWT_SECRET: A secret key for JWT token generation and verification
## API
1. GET /api/users: Get all users.
2. POST /api/users: Create a new user.
3. GET /api/users/:id: Get user by ID.
4. PUT /api/users/:id: Update user by ID.
5. DELETE /api/users/:id: Delete user by ID.
6. GET /api to get data of public api
## Authentication
-The server uses JSON Web Tokens (JWT) for authentication.

-To register, send a POST request to /api/auth/register with user details.

-To login, send a POST request to /api/auth/login with username and password.

-Include the JWT token in the Authorization header for protected routes.
## Usage
1. Start the server:
npm Start

2. Open your web browser and go to:8080 port
