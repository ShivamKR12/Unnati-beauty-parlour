# Unnati Beauty Parlour - Fullstack Website

## 🎨 Modern Responsive Beauty Salon Website with Admin/Customer Panels

### 🛠️ Tech Stack
- **Frontend**: HTML/CSS/JS (Responsive, Vanilla JS)
- **Backend**: Node.js + Express + MongoDB (Mongoose)
- **Auth**: JWT + bcrypt
- **Design**: Elegant feminine theme (pink/gold/beige)

## 🚀 Quick Start

1. **Install Node.js** (v18 or higher recommended)
2. **Backend Setup**:
   ```
   cd backend
   npm install
   cp ../.env.example .env
   ```
   - Get MongoDB Atlas free account: https://mongodb.com/atlas
   - Add MONGO_URI and JWT_SECRET to .env
   
3. **Run Backend**:
   ```
   npm run dev
   ```
   Backend: http://localhost:5000/api

4. **Frontend** (static):
   - Open `frontend/index.html` in browser
   - It auto-connects to backend API

5. **Test Admin**:
   - Register admin: POST `/api/auth/register` {email, password, role:'admin'}
   - Or use curl/Thunder Client

## 📁 Structure
See plan in conversation.

## 🔐 Default Test Data (after seed)
- Admin: admin@unnati.com / admin123 (create manually first)
- Services/Products auto-seeded.

## Features
- Dual login (Admin/Customer)
- Admin CMS: CRUD services/products/bookings
- Customer: Book, view history
- Responsive mobile-first design
- Image uploads (admin)

Happy coding! 💅

