# Frontend-2 - Simple Structure ✨

## 📁 Folder Structure

```
src/
├── components/
│   ├── Navbar/           ← Navbar component (with logout button)
│   ├── Sidebar/          ← Sidebar component (navigation menu)
│   └── Navigation.jsx    ← Other components
├── pages/
│   ├── Login/            ← Login page
│   ├── Register/         ← Register page
│   ├── Dashboard/        ← Main dashboard
│   ├── Contacts/         ← Contacts list
│   └── VerifyEmail/      ← Email verification
├── routes/
│   └── AppRoutes.jsx     ← Route definitions
├── App.jsx               ← Main component
└── main.jsx              ← Entry point
```

## 🚀 Quick Start

1. Start your backend: `npm start` (in backend folder)

2. Start frontend:
```bash
npm install
npm run dev
```

3. Open http://localhost:5173 in browser

## 📝 Pages

### 1. **Register** (`/`)
- Sign up with name, email, password
- Redirects to verify email

### 2. **Verify Email** (`/verify-email`)
- Enter code from email

### 3. **Login** (`/login`)
- Sign in with email and password
- Shows password toggle

### 4. **Dashboard** (`/dashboard`)
- Shows user profile
- Shows sidebar navigation
- Navbar with logout button

### 5. **Contacts** (`/contacts`)
- List all contacts
- Same layout as dashboard

## 🧩 Components

### **Navbar**
- Shows user name
- Links to Dashboard & Contacts
- Logout button

### **Sidebar**
- Navigation menu
- Mobile responsive (toggle button)
- Links to pages

## 🔗 API Endpoints

All endpoints go to: `http://localhost:3001`

```
POST   /api/auth/register      - Register user
POST   /api/auth/login         - Login user
POST   /api/auth/verify-email  - Verify email
GET    /api/user/profile       - Get user profile
GET    /api/contacts           - Get all contacts
```

## 🎯 Simple & Clean!

- ✅ No complex files
- ✅ Direct API calls
- ✅ useState only
- ✅ Bootstrap styling
- ✅ Navbar & Sidebar as components
- ✅ Easy to understand

That's it! Simple and working 🎉
