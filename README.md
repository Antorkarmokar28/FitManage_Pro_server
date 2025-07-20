# 🏋️‍♀️ Gym Class Scheduling and Membership Management System

A robust Gym Management System built using **TypeScript**, **Express.js**, and **MongoDB/PostgreSQL**, following the **Modular Pattern** architecture. The system is designed to manage gym operations including class scheduling, trainer assignment, and class bookings, with well-defined roles and strict business rules.

---

## 🚀 Technology Stack

| Layer              | Technology                  |
|--------------------|-----------------------------|
| Programming Language | TypeScript                |
| Backend Framework   | Express.js                 |
| ORM/ODM             | Prisma (Preferred) / Mongoose |
| Database            | PostgreSQL (Preferred) / MongoDB |
| Authentication      | JWT (JSON Web Tokens)      |
| Architecture Pattern| Modular Pattern (Preferred) |

---

## 👥 User Roles & Permissions

### 🔑 Admin
- Create/manage **Trainers**
- Create/manage **Class Schedules**
- Assign trainers to classes
- Can create **up to 5 class schedules per day**

### 🧑‍🏫 Trainer
- View assigned class schedules
- Cannot create new schedules or manage trainee profiles

### 🧑‍💼 Trainee
- Create/manage own profile
- Book available class schedules (max 10 trainees per schedule)
- Cannot book multiple classes in the same time slot
- Can cancel bookings

---

## 🧩 Business Rules

### Class Scheduling
- ⏰ Each class lasts **2 hours**
- 📅 Maximum **5 classes per day**
- 👥 Each class has a maximum of **10 trainees**
- 📌 Only **Admins** can create/assign schedules

### Booking System
- ✅ Trainees can book a class **if slots are available**
- ❌ A trainee **cannot book two classes at the same time**
- 🔄 Bookings can be **cancelled** by the trainee

---

## 🛡️ Authentication & Authorization

- All routes are protected using **JWT-based authentication**
- Role-based access control enforced for Admin, Trainer, and Trainee
- Unauthorized access attempts return appropriate **401/403 errors**

---

## ❗ Error Handling

Robust global error handling middleware is used:
- 🔐 `Unauthorized Access`: User tries to access without proper role or token
- 📝 `Validation Errors`: Invalid fields (e.g., missing class name, invalid ObjectId)
- 🚫 `Booking Limit Exceeded`: When trying to book a full class
- 🚫 `Schedule Limit Exceeded`: Admin tries to create more than 5 classes in a day

---

## 🧠 Relational Diagram (Conceptual)

```txt
+------------+           +-------------+          +-------------+
|   User     |<--------->|   Booking   |<-------->|   Class     |
|------------|           |-------------|          |-------------|
| _id        |           | _id         |          | _id         |
| name       |           | traineeId   |--------->| className   |
| email      |           | classId     |          | trainerId   |
| role       |           | status      |          | date        |
| password   |           | bookingDate |          | startTime   |
+------------+           +-------------+          | endTime     |
                                                  | maxTrainees |
                                                  +-------------+
📁 Modular Folder Structure
pgsql
Copy
Edit
src/
├── modules/
│   ├── auth/
│   ├── user/
│   ├── class/
│   ├── booking/
│   └── trainer/
├── middlewares/
├── utils/
├── routes/
├── app.ts
└── server.ts

📦 Installation & Running
# Clone the repository
git clone https://github.com/your-username/gym-management.git

# Navigate into the project
cd gym-management

# Install dependencies
npm install

✅ Features at a Glance
 JWT-based Auth with Role-based Access

 Modular Folder Structure

Mongoose integration

 Admin Class Scheduling with Constraints

 Trainee Class Booking with Validation

 Trainer Schedule Viewing

 Error Handling & Validation Middleware
# Start the server
npm run start:dev
