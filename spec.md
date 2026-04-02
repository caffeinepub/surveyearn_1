# SurveyEarn

## Current State
New project with authorization component installed.

## Requested Changes (Diff)

### Add
- Home page with hero section and "Start Earning" CTA button
- Login/Signup page with toggle between modes
- Dashboard page showing user balance and "Start Survey" button
- Survey page with CPX Research iframe (dynamic user ID)
- Postback endpoint `/api/postback` accepting `user_id`, `reward`, `status` query params
- User balance tracking in backend
- Duplicate reward prevention via transaction ID tracking
- Route guards: unauthenticated users redirected to login
- Session persistence via localStorage

### Modify
- Backend actor to add balance management on top of auth

### Remove
- Nothing

## Implementation Plan
1. Backend: User profile store mapping user_id -> balance; postback handler that credits rewards and deduplicates; getBalance query; register/login functions that return a session token stored in localStorage
2. Frontend: React Router with 4 pages (Home, Login, Dashboard, Survey); auth context reading localStorage; protected routes redirecting to login; Survey page renders CPX iframe with dynamic ext_user_id; Dashboard polls/reads balance
