# 🏥 HealthCare server - with AI-Powered Doctor Finder

## 📋 Overview

HealthConnect is a comprehensive healthcare platform that revolutionizes the way patients find and connect with healthcare providers. At its core, the platform features an **intelligent AI-driven doctor finder** that analyzes patient symptoms, medical history, and preferences to recommend the most suitable doctors and specialists.

### 🤖 AI-Driven Doctor Finder Feature

Our cutting-edge AI system helps patients by:

- **Symptom Analysis**: Natural language processing to understand patient complaints and symptoms
- **Smart Matching**: Machine learning algorithms that match patients with doctors based on specialty, experience, location, and availability
- **Personalized Recommendations**: Takes into account patient history, preferences, and insurance coverage
- **Predictive Analytics**: Suggests specialists based on symptom patterns and medical conditions
- **Real-time Availability**: Integrates doctor schedules to recommend available appointments

This intelligent system eliminates the guesswork in finding the right healthcare provider, saving patients time and ensuring they receive appropriate care from qualified professionals.

---

## 🚀 Getting Started

### Option 1: Use Our Hosted Version

Access the platform immediately at: **[https://healthcare-opal-two.vercel.app/](https://healthcare-opal-two.vercel.app/)**

No installation required! Start finding doctors right away.

### Option 2: Local Installation

#### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn package manager

#### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/Shafayathub/Health-Care-Server2.0.git
cd Health-Care-Server2.0
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
POSTGRES_URI=postgresql://localhost:5432/healthcare

# AI/ML Service
AI_SERVICE_URL=http://localhost:5000
AI_API_KEY=your_ai_api_key

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=24h

# Email Service (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password
```

4. **Start the application**

```bash
# Development mode
npm run dev

# Production mode
npm start
```

5. **Access the application**

Open your browser and navigate to `http://localhost:5000`

---

## 📡 API Documentation

### Base URL
- **Local**: `http://localhost:5000/api/v1`
- **Production**: `https://healthcare-opal-two.vercel.app/`

### Authentication
Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Available Endpoints

#### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user profile

#### AI Doctor Finder
- `POST /ai/find-doctor` - Find doctors based on symptoms and preferences
- `POST /ai/analyze-symptoms` - Analyze symptoms and suggest specialties
- `GET /ai/recommendations/:userId` - Get personalized doctor recommendations

#### Doctors
- `GET /doctors` - Get all doctors (with filters)
- `GET /doctors/:id` - Get doctor details
- `POST /doctors` - Add a new doctor (admin only)
- `PUT /doctors/:id` - Update doctor information (admin only)
- `DELETE /doctors/:id` - Delete doctor (admin only)

#### Appointments
- `GET /appointments` - Get user appointments
- `POST /appointments` - Book an appointment
- `PUT /appointments/:id` - Update appointment
- `DELETE /appointments/:id` - Cancel appointment

#### Patients
- `GET /patients/profile` - Get patient profile
- `PUT /patients/profile` - Update patient profile
- `POST /patients/medical-history` - Add medical history

#### Reviews
- `GET /reviews/doctor/:doctorId` - Get doctor reviews
- `POST /reviews` - Submit a review
- `PUT /reviews/:id` - Update review
- `DELETE /reviews/:id` - Delete review

---

## 📮 Postman Collection

Import our Postman collection to test all API endpoints quickly.

### Quick Import

1. Download the collection: [HealthConnect API Collection](./Resources/HealthCare.postman_collection.json)
2. Open Postman
3. Click **Import** button
4. Select the downloaded JSON file
5. Configure environment variables:
   - `base_url`: Your API base URL
   - `token`: Your authentication token (obtained after login)

### Collection Structure

```
HealthConnect API
├── Authentication
│   ├── Register User
│   ├── Login User
│   ├── Get Current User
│   └── Logout
├── AI Doctor Finder
│   ├── Find Doctor by Symptoms
│   ├── Analyze Symptoms
│   └── Get Recommendations
├── Doctors
│   ├── Get All Doctors
│   ├── Get Doctor by ID
│   ├── Create Doctor
│   ├── Update Doctor
│   └── Delete Doctor
├── Appointments
│   ├── Get My Appointments
│   ├── Book Appointment
│   ├── Update Appointment
│   └── Cancel Appointment
├── Patients
│   ├── Get Profile
│   ├── Update Profile
│   └── Add Medical History
└── Reviews
    ├── Get Doctor Reviews
    ├── Submit Review
    ├── Update Review
    └── Delete Review
```

### Example Requests

**Find Doctor by Symptoms**
```json
POST /ai/find-doctor
{
  "symptoms": ["headache", "fever", "fatigue"],
  "location": "New York, NY",
  "insuranceProvider": "Blue Cross",
  "preferredGender": "any",
  "maxDistance": 10
}
```

**Book Appointment**
```json
POST /appointments
{
  "doctorId": "60d5ec49f1b2c72b8c8e4f1a",
  "date": "2025-10-25",
  "time": "14:00",
  "reason": "Follow-up consultation",
  "type": "in-person"
}
```

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **AI/ML**: OpenRouter API, Hugging Face Transformers
- **Authentication**: JWT
- **API Documentation**: Swagger/OpenAPI


---