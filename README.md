# Syncronus. MongoDB Express React Node project

Syncronus is a Realtime Chat App. which features message channels & direct messages to other users including emoji, upload files, download files in realtime.

# The dependencies that this project uses:

*Frontend*

-vite For building and bundling the application

-react-router-dom: For routing

-tailwind for stayling

-fetch: For making HTTP requests

-context API: For state management SocketJS

-Redux Toolkit : For State management feature

-cookie : For authentication


*Backend*

-express: For creating the server

-mongoose: For interacting with MongoDB

-cors: For handling Cross-Origin Resource Sharing

-dotenv: For managing environment variables

-zod: For validation user

-bcryptjs: For hashing passwords

-jsonwebtoken: For authentication

-nodemon: For automatic server restarts during development


## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js: [Download and install Node.js](https://nodejs.org/)
- npm: Node.js package manager (comes with Node.js installation)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/anwarhakim31/Medicare..git Medicare
   ```

2. Navigate to  front project directory:

     ```bash
     cd Realtime-Chat
     ```

3.  Navigate to backend directory and install depedencies

     ```bash
     cd backend
     npm install
     ```

4.  Navigate to frontend directory and install depedencies
   
     ```bash
     cd ..
     cd frontend
     npm install 
     ```

## Setup Environment

1. Create a .env file in the root backend of your project.

    PORT="2001"
    JWT_KEY="(30219321#%$!#@1313ladkl12!@#!)"
    ORIGIN="http://localhost:5173"
    DATABASE_URL="mongodb://:@ac-vkeqbdg-shard-00-00.u7kz2in.mongodb.net:27017,ac-vkeqbdg-shard-00-01.u7kz2in.mongodb.net:27017,ac-vkeqbdg-shard-00-02.u7kz2in.mongodb.net:27017/ChatApp?replicaSet=atlas-c8qsll-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Syth"
    AWS_ACCESS_KEY_ID= rahasia
    AWS_SECRET_ACCESS_KEY= rahasia
    AWS_REGION=ap-southeast-2
    AWS_S3_BUCKET=syncrons

2. Create a .env file in the root frontend of your project.
    
    VITE_SERVER_URL = "http://localhost:2001"

## Development

1. To start the  server, run:
  
     ```bash
     npm run dev
     ```
   
 2. To start the frontend, run :

    ```bash
    npm run dev
    ```

## Deployment

Deploy the `dist` directory to your hosting platform of choice.
