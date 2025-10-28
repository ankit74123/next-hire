# Job Portal Frontend 🎯

> A comprehensive, production-ready job portal application built with React 19, Redux Toolkit, and Tailwind CSS. Features include job search, application tracking, recruiter dashboard, ATS pipeline, interview scheduling, company reviews, and salary insights.

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-2.9.2-purple.svg)](https://redux-toolkit.js.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1.14-646CFF.svg)](https://vitejs.dev/)

## ✨ Features

### For Job Seekers
- 🔍 **Advanced Job Search** - Filter by location, salary, experience, company, and more
- 📝 **Profile Management** - Complete profile builder with work experience, education, and skills
- 📄 **Resume Management** - Upload and manage multiple resumes
- 📊 **Application Tracking** - Track all job applications with status updates
- 💾 **Saved Jobs** - Bookmark interesting jobs for later
- 🔔 **Job Alerts** - Get notified about new jobs matching your criteria
- 📈 **Analytics Dashboard** - Visualize your job search progress
- ⭐ **Company Reviews** - Read and write reviews about companies
- 💰 **Salary Insights** - Research salaries by role, location, and experience

### For Recruiters
- 📋 **Job Posting** - Multi-step form to post jobs with detailed requirements
- 👔 **Job Management** - View, edit, and manage all posted jobs
- 📥 **Application Management** - Review and track candidate applications
- 🔎 **Candidate Search** - Search resume database with advanced filters
- 📌 **ATS Pipeline** - Kanban board to manage hiring pipeline
- 📅 **Interview Scheduling** - Schedule and manage interviews
- 💬 **Messaging System** - Communicate with candidates
- 📧 **Email Templates** - Create and manage email templates
- 🏢 **Company Profile** - Showcase company information and culture

## 🚀 Tech Stack

- **React 19.1.1** - Latest React with hooks and concurrent features
- **Redux Toolkit 2.9.2** - State management with 11 slices
- **React Router DOM 7.9.4** - Client-side routing with 47 routes
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Vite 7.1.14** - Lightning-fast build tool with HMR
- **React Hook Form 7.65.0** - Performant form management
- **React Icons 5.5.0** - Comprehensive icon library
- **React Toastify 11.0.5** - Elegant toast notifications

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/          # ProtectedRoute
│   ├── common/        # Header, Footer, ErrorBoundary, etc. (10 components)
│   ├── jobseeker/     # StatCard, ProgressBar (2 components)
│   ├── recruiter/     # Recruiter-specific components
│   └── shared/        # Shared utilities
├── hooks/
│   ├── useAuth.js           # Authentication hook
│   └── useAccessibility.js   # Accessibility hooks (keyboard nav, focus trap, etc.)
├── pages/
│   ├── jobseeker/     # 14 pages (Dashboard, Profile, Applications, etc.)
│   ├── recruiter/     # 10 pages (Dashboard, PostJob, ATS, Interviews, etc.)
│   ├── CompanyReviews.jsx   # Company review system
│   ├── SalaryInsights.jsx   # Salary research tool
│   ├── Home.jsx             # Landing page
│   ├── JobSearch.jsx        # Job search with filters
│   └── [5 more pages]
├── redux/
│   ├── store.js       # Redux store configuration
│   └── slices/        # 11 Redux slices (auth, profile, jobs, applications, etc.)
├── services/
│   └── api.js         # API service configuration
├── utils/
│   ├── constants.js   # Application constants
│   ├── helpers.js     # Helper functions
│   └── validation.js  # Form validation utilities
├── App.jsx            # Main app with routing, lazy loading, error boundary
├── main.jsx           # Application entry point
└── index.css          # Global styles with accessibility enhancements
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/job-portal-frontend.git
cd job-portal-frontend

# Install dependencies
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
