# TODO: Remove Backend and Make Frontend Only

- [x] Remove the entire backend folder
- [x] Remove auth-related files: AuthContext.jsx, ProtectedRoute.jsx, LoginPage.jsx, SignupPage.jsx
- [x] Update App.jsx: Remove ProtectedRoute imports and wrappers, remove login/signup routes
- [x] Update main.jsx: Remove AuthProvider wrap
- [x] Update Navbar.jsx: Remove auth context usage, always show all nav items, remove login/logout/signup buttons
- [x] Run frontend to test functionality
