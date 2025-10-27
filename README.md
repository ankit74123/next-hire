# Job Portal Frontend

A modern job portal application built with React, Redux Toolkit, and Tailwind CSS.

## 🚀 Tech Stack

- **React 19** - UI Library
- **Redux Toolkit** - State Management
- **React Router DOM** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP Client
- **React Hook Form** - Form Management
- **React Icons** - Icon Library
- **React Toastify** - Toast Notifications
- **Vite** - Build Tool

## 📁 Project Structure

```
src/
├── assets/           # Images, fonts, and static files
├── components/       # Reusable components
│   ├── auth/        # Authentication components
│   ├── common/      # Common components (Header, Footer, Sidebar)
│   ├── jobseeker/   # Job seeker specific components
│   ├── recruiter/   # Recruiter specific components
│   └── shared/      # Shared components
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── redux/           # Redux store and slices
│   ├── store.js    # Redux store configuration
│   └── slices/     # Redux slices
├── services/        # API services
├── utils/           # Utility functions
│   ├── constants.js # App constants
│   ├── helpers.js   # Helper functions
│   └── validation.js # Validation utilities
├── App.jsx          # Main app component
└── main.jsx         # Entry point
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Install Dependencies
```bash
npm install
```

### Environment Variables
Create a `.env` file in the root directory based on `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=JobPortal
VITE_APP_VERSION=1.0.0
```

## 📜 Available Scripts

### Development
```bash
npm run dev
```
Starts the development server at `http://localhost:5173`

### Build
```bash
npm run build
```
Creates an optimized production build

### Preview
```bash
npm run preview
```
Preview the production build locally

### Linting
```bash
npm run lint
```
Run ESLint to check code quality

### Format Code
```bash
npm run format
```
Format code with Prettier

```bash
npm run format:check
```
Check code formatting without making changes

## 📦 Redux Store Structure

The Redux store includes the following slices:

- **authSlice** - Authentication state (login, register, logout)
- **profileSlice** - User profile and resume data
- **jobsSlice** - Job listings and search filters
- **applicationSlice** - Job applications and saved jobs
- **alertsSlice** - Job alerts management
- **notificationsSlice** - Notifications and unread count

## 🎨 Styling

This project uses Tailwind CSS for styling. Custom theme colors are configured in `tailwind.config.js`.

### Primary Colors
- Primary: Blue shades (primary-50 to primary-900)
- Background: Gray-50
- Text: Gray-900

### Custom Classes
- `.container-custom` - Centered container with responsive padding

## 🔐 Authentication

Authentication is managed through Redux with JWT tokens stored in localStorage.

### Auth Flow
1. User logs in → Token stored in localStorage
2. Token added to all API requests via Axios interceptor
3. Protected routes check authentication state
4. Logout clears token and redirects to login

## 📱 Components

### Layout Components
- **Header** - Top navigation with auth status
- **Footer** - Footer with links and social media
- **Sidebar** - Dynamic sidebar (Job Seeker / Recruiter)

## 🌐 API Integration

API calls are made using Axios with a configured instance in `services/api.js`:

- Base URL from environment variables
- Auth token automatically added to requests
- Global error handling
- Timeout configuration

## 🚧 Day 1 - Completed Tasks

✅ React app with Vite setup
✅ Tailwind CSS configured
✅ Core dependencies installed
✅ Folder structure organized
✅ Redux store configured with slices
✅ Basic layout components created
✅ Environment variables set up
✅ Prettier configured
✅ Routing setup with React Router
✅ API service configured
✅ Utility functions created
✅ Custom hooks (useAuth)

## 📝 Next Steps (Day 2+)

- [ ] Authentication UI (Login, Register, Forgot Password)
- [ ] Landing Page with Hero section
- [ ] Job Seeker Dashboard
- [ ] Resume Builder
- [ ] Job Search & Filters
- [ ] Application Management
- [ ] Recruiter Features
- [ ] And more...

## 🤝 Contributing

This is a learning project. Follow the 20-day plan documented in `frontend-20-day-plan.md`.

## 📄 License

MIT License

## 👨‍💻 Author

JobPortal Development Team

---

**Status**: Day 1 Complete ✅
**Last Updated**: October 27, 2025


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
