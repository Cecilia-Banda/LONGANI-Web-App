# LONGANI-Web-App
PROJECT DESCRIPTION

A streamlined, role-based web application built with React, Node.js, and MongoDB designed to modernize healthcare data management. It eliminates paper-based patient records, improves efficiency for medical staff, and ensures secure, real-time access to patient information.


EXACT SETUP
 The initial steps are: 
Pre-requisites

Before setting up the project, make sure you have the following installed on your machine:

Node.js and npm - To run the server and frontend. MongoDB - To set up the database.

Getting Started

Follow these steps to get the project up and running:

Step 1: Clone the Repository - git clone https://github.com/Cecilia-Banda/LONGANI-Web-App.git

Step 2: Install Dependencies

Navigate to the root folder of the project and install the necessary dependencies for both the backend and frontend: npm install

Step 3: Set up the Database

Ensure you have MongoDB installed and running locally. Create a new database for this project. By default, the backend server connects to MongoDB at mongodb://localhost/hospital-register.

If you want to use a different MongoDB URI, update it in the backend/config/db.js file

Step 4: Configure Environment Variables

Rename the .env.example to .env in the backend folder and update the environment variables if needed.

Step 5: Run the Application

Now, start the backend server and frontend development server separately. Open two terminals:

Terminal 1 - Backend Server : cd backend npm start

Terminal 2 - Frontend Development Server cd frontend npm start

Step 6: Access the Application open your browser and go to http://localhost:5000

Once both the backend server and frontend development server are running, you can access the application in your browser, when you have deployed it 


    DESIGNS

Figma mockUps: https://www.figma.com/proto/mbSaNSmIx5KZqeZHETuaNB/LONGANI?node-id=0-1&t=L1vEDwPLgxiJB3QW-1

Screenshots: 
![login](./Design/login.png)
![Admin](./Design/Admin-Dashboard.png)
![Doctor](./Design/Doctor-Dashboard.png)
![Nurse](./Design/Nurse-Dashboard.png)
![RecordOfficer](./Design/RecordOfficer-dashboard.png)



DEMO VIDEO 
https://screenapp.io/app/#/shared/66akEMXJmC

USAGE

To register a new patient, use the POST request to /api/patients with patient details (name, ID, etc.).

Use the frontend interface for easier interaction

DEPLOYMENT PLAN
 - Frontend : Vercel
 - Backend: Render
 - Database: MongoDB Atlas
