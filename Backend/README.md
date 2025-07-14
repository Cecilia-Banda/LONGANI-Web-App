LONGANI HEALTHCARE BACKEND

  This is the backend for the Longani Patient filing Web application

  1. Tech Stack
     -Node.js with Express.js
     -MongoDB with Mongoose
     -JWT for the authentication
     -Dotenv for environment variables
     -Postman for API testing


   2. SetUp Guide
   - git clone https://github.com/your-username/LONGANI-Web-App.git

      -  cd LONGANI-Web-App/Backend
      - npm install for dependencies

   3. Set Up your .env file
      -PORT=5000
      - MONGO_URI=mongodb+srv://your-db-uri
      -JWT_SECRET=your-secret-key

   4. Run Server (Dev mode)
       - npm run dev


       AUTHENTICATION AND ROLES
   This sytem uses JWT-based login and users are assigned roles like:
    Admin: Hospital management
    Record Officers: Can perfor CRUD operation on patients records
    OPD Nurse: Can view/Add vital, make appointments and refer to Doctor
    Doctor: Can view and update treatment records    


        API Testing
All endpoints can be tested using Postman. Ensure to:

Include the JWT in headers for protected routes

Test CRUD operations on /api/patients, /api/users, /api/auth


            STATUS
    Currently in development
    Authentication & Role setup in progress
    Patient CRUD endpoints under testing


            AUTHOR
Cecilia Munayani Banda
Engineering Student | Full-Stack Dev | Aspiring systems thinkerdr