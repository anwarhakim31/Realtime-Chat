## Syncronus. MongoDB Express React Node project

Syncronus is a Realtime Chat App. which features message channels & direct messages to other users including emoji, upload files, download files in realtime.

## The dependencies that this project uses:

*Frontend*



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
   git clone https://github.com/anwarhakim31/Realtime-Chat.git Syncronus
   ```

2. Navigate to  front project directory:

     ```bash
     cd Syncronus
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

    PORT="8080"
   
    JWT_KEY=
   
    ORIGIN="http://localhost:5173"
   
    DATABASE_URL=
   
    AWS_ACCESS_KEY_ID=
   
    AWS_SECRET_ACCESS_KEY=
   
    AWS_REGION=
   
    AWS_S3_BUCKET=

3. Create a .env file in the root frontend of your project.
    
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
