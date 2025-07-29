LONGANI Web App
🎯 Project Overview
LONGANI is a streamlined, role-based web application built with React, Node.js, and MongoDB designed to modernize healthcare data management. It eliminates paper-based patient records, improves efficiency for medical staff, and ensures secure, real-time access to patient information.


      ✨ Features
User Authentication and Authorization
Digital Patient Records: Eliminate paper-based patient records with secure digital storage
Role-Based Access Control: Different access levels for medical staff, administrators, and other healthcare personnel
Real-Time Patient Information: Instant access to up-to-date patient data
Patient Registration System: Easy patient onboarding and record creation
Streamlined Workflow: Improved efficiency for medical staff
MongoDB Integration: Robust database management for healthcare data


🛠 Technology Stack
Frontend
React.js
Tailwind CSS
JavaScript (ES6+)
Responsive Design
Backend
Node.js
Express.js
Database
MongoDB (Local Development)
MongoDB Atlas (Production)
Deployment
Frontend: Vercel

Backend: Render

Database: MongoDB Atlas
https://cloud.mongodb.com/v2/68667c5fae9eac4a4c004eb0#/overview


         🎨 Design & Mockups
Figma Prototype
🎨 Interactive Figma Mockups
The design process includes comprehensive wireframes and interactive prototypes showcasing the user interface and user experience design for the healthcare management system.

           Screenshots
![login](./Design/login.png)
![Admin](./Design/Admin-Dashboard.png)
![Doctor](./Design/Doctor-Dashboard.png)
![Nurse](./Design/Nurse-Dashboard.png)
![RecordOfficer](./Design/RecordOfficer-dashboard.png

     📥 Installation Guide
      Prerequisites
Before you begin, ensure you have the following installed on your system:
Node.js and npm (version 14.0 or higher)
Download from nodejs.org
Verify installation: node --version and npm --version
MongoDB
Download from mongodb.com
Ensure MongoDB is running locally at mongodb://localhost/hospital-register
Verify installation: mongod --version
Git
Download from git-scm.com
Verify installation: git --version
Step-by-Step Installation
Step 1: Clone the Repository
git clone https://github.com/Cecilia-Banda/LONGANI-Web-App.git
cd LONGANI-Web-App

Step 2: Install Dependencies
Navigate to the root folder of the project and install the necessary dependencies for both the backend and frontend:
npm install

Step 3: Set up the Database
Ensure you have MongoDB installed and running locally. Create a new database for this project:
By default, the backend server connects to MongoDB at mongodb://localhost/hospital-register
If you want to use a different MongoDB URI, update it in the backend/config/db.js file

Step 4: Configure Environment Variables
Rename the .env.example to .env in the backend folder and update the environment variables if needed:
cd backend
mv .env.example .env
  Edit the .env file with your specific configuration

Step 5: Install Backend and Frontend Dependencies Separately
  Install backend dependencies
cd backend
npm install

 Install frontend dependencies
cd ../frontend
npm install

🚀 Running the Application

Development Mode

Step 6: Run the Application
Start the backend server and frontend development server separately. Open two terminals:
Terminal 1 - Backend Server:
cd backend
npm start

Terminal 2 - Frontend Development Server:
cd frontend
npm start

Step 7: Access the Application
Once both the backend server and frontend development server are running:
Open your browser and go to http://localhost:5001
The backend API will be running on its designated port
The frontend React application will be accessible through the specified URL
Production Mode
 Build the frontend application
cd frontend
npm run build

 Start the production server
cd ../backend
npm run prod

Troubleshooting Common Issues
Issue 1: Port Already in Use
  Find and kill the process using the port
lsof -ti:3000 | xargs kill -9

 Or specify a different port
PORT=3001 npm start

Issue 2: Node Modules Issues
  Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

📁 Project Structure
LONGANI-Web-App/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env.example
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   
│   │   ├── utils/
│   │   └── App.js
│   ├── package.json
│   └── package-lock.json
├── README.md
├── .gitignore
└── package.json

              🎥 Demo Videos
MVP Demo Video

https://screenapp.io/app/#/shared/66akEMXJmC: Initial version showcasing core functionality and basic features

Final Demo Video

https://www.loom.com/share/c198394c0a2345a5848f90677317beef?sid=23857dcd-1d09-4ae8-ba51-59ab9b918762:
Comprehensive demonstration of all features and functionalities

This comprehensive demo showcases:
Digital patient record management
Role-based access control in action
Patient registration process
Real-time data access and updates
Healthcare workflow improvements
Security features and data protection

          🌐 Live Deployment

🔗 Access the Live Application

Frontend Deployment (Vercel): 
Backend Deployment (Render): https://dashboard.render.com/web/srv-d23q5s6uk2gs738qn6r0/deploys/dep-d23qf6ndiees739ufhvg
Deployment Details
Frontend: Deployed on Vercel with automatic GitHub integration
Backend: Deployed on Render with continuous deployment
Database: MongoDB Atlas for the production environment
Last Updated: [29th July 2025]


📚 API Documentation

Authentication Endpoints
POST /api/auth/login       - User authentication
POST /api/auth/register    - New user registration
POST /api/auth/logout      - User logout

Patient Management Endpoints
GET    /api/patients       - Retrieve all patients
POST   /api/patients/register       - Register a new patient
GET    /api/patients/:id   - Get specific patient details
PUT    /api/patients/:id   - Update patient information
DELETE /api/patients/:id   - Remove patient record

Healthcare Staff Endpoints
GET    /api/auth/profile         - Retrieve user 
POST   /api/auth/register        - Add new user 
PUT    /api/auth/:id      - Update user 

💡 Usage

Patient Registration
To register a new patient, use the POST request to /api/patients with patient details (name, ID, medical history, etc.):
{
  "name": "Martha Phiri",
  "age": 30,
  "gender": "Female",
  "email": "Martha@example.com",
“phoneNumber”: “0768952366”
  "medicalHistory": "No known allergies"
}

Frontend Interface

Use the web interface for easier interaction with the healthcare management system
Role-based dashboards provide appropriate access levels for different user types
Real-time updates ensure all staff have access to the latest patient information

🤝 Contributing

Fork the repository
Create a feature branch (git checkout -b feature/AwesomeFeature)
Commit your changes (git commit -m 'Add some AwesomeFeature')
Push to the branch (git push origin feature/AwesomeFeature)
Open a Pull Request

📞 Contact

Developer: Cecilia Banda
GitHub: @Cecilia-Banda
Email: c.banda@alustudent.com
LinkedIn: https://www.linkedin.com/in/cecilia-banda-3171a2239?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Berwj01WrRVyII4ZC%2FkzIAw%3D%3D


Project Repository: LONGANI-Web-App

📄 License
This project is licensed under the MIT License

