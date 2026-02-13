# Firebase Click Counter App

A complete, production-ready click counter application built with Next.js and Firebase. Perfect for learning Firebase integration or as a foundation for your own app.

## Features

✅ **User Authentication**
- Email/password signup and login
- Secure password management
- Change password functionality

✅ **Real-time Data Persistence**
- Click counts saved to Firestore
- Data persists across sessions
- Each user sees only their own data

✅ **Professional UI/UX**
- Responsive design (mobile, tablet, desktop)
- Loading states and error handling
- Tailwind CSS + shadcn/ui components
- Smooth animations and transitions

✅ **Comprehensive Documentation**
- In-app manual with beginner-friendly explanations
- Multiple setup guides for different skill levels
- Code comments throughout the project
- Firebase integration guide

## Quick Start

### Prerequisites
- Node.js 18+ and npm/pnpm/yarn
- A Google account (for Firebase)
- A code editor

### 1. Set Up Firebase (2 minutes)
1. Go to [firebase.google.com](https://firebase.google.com)
2. Create a new project
3. Create a Web app
4. Copy your Firebase config

See **QUICK_START.md** for detailed instructions.

### 2. Add Environment Variables

Create a `.env.local` file (or add to Vercel):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Install & Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### 4. Test the App

1. Sign up with any email and password (6+ chars)
2. Click the "Click Me!" button
3. Your clicks save automatically!
4. Log out and back in - your count is still there!

## Documentation

### For First-Time Setup
- **[QUICK_START.md](./QUICK_START.md)** - Get running in 10 minutes
- **[SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)** - Complete step-by-step guide

### For Learning
- **In-App Manual** - Click "Read Manual" button in the app
- **[FIREBASE_INTEGRATION.md](./FIREBASE_INTEGRATION.md)** - Detailed Firebase guide

### For Developers
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Technical overview

## Project Structure

```
├── app/                          # Next.js app directory
│   ├── page.tsx                  # Click counter (main page)
│   ├── login/page.tsx            # Login form
│   ├── signup/page.tsx           # Signup form
│   ├── settings/page.tsx         # Account settings
│   ├── manual/page.tsx           # In-app documentation
│   └── layout.tsx                # Root layout
│
├── lib/
│   ├── firebase.ts               # Firebase setup
│   ├── auth-context.tsx          # Auth state management
│   └── firestore-utils.ts        # Database operations
│
├── components/ui/                # UI components (shadcn/ui)
├── public/                       # Static assets
└── styles/                       # Global styles
```

## Technology Stack

- **Framework**: Next.js 16 (React 19)
- **Database**: Firestore (Firebase)
- **Authentication**: Firebase Auth
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Hosting**: Vercel
- **Language**: TypeScript

## Key Features

### Authentication
- Secure user registration and login
- Firebase-managed sessions
- Password change functionality

### Database
- Firestore for real-time data
- User click counts stored per user
- Security rules ensure privacy

### User Experience
- Protected routes (login required)
- Auto-save functionality
- Error handling and loading states
- Mobile-responsive design

## How It Works

1. **User Signs Up** → Firebase creates account
2. **User Logs In** → Session created by Firebase
3. **User Clicks Button** → Count increases + saves to Firestore
4. **User Logs Out** → Session ended
5. **User Logs Back In** → Click count restored from Firestore

## Development

### Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run linter
```

### Code Style

- ESLint for code quality
- TypeScript for type safety
- Tailwind CSS for styling

## Deployment

### Deploy to Vercel

```bash
# Push to GitHub
git push origin main

# Connect to Vercel at vercel.com
# Select your repository
# Add environment variables
# Deploy!
```

Your app will be live automatically!

## Learning Resources

### In This Project
1. Read **QUICK_START.md** to get started
2. Click "Read Manual" in the app for concepts
3. Review code comments in `lib/` folder
4. Check `app/` folder to see how pages work

### External Resources
- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## Common Issues

### "Firebase is not defined"
```bash
npm install firebase
```

### "Permission Denied"
Check your Firestore security rules are published.

### Variables not working
Make sure env vars are in Vercel, not just .env.local

See **FIREBASE_INTEGRATION.md** for more troubleshooting.

## Extending the App

### Add a Leaderboard
See top 10 clickers with `getAllUserClickCounts()`

### Add Real-time Sync
Listen to Firestore changes with `onSnapshot()`

### Add User Profiles
Store extra user info in Firestore user document

### Add Achievements
Unlock badges at click milestones

## Security

- Firebase handles password hashing
- Firestore rules restrict data access
- Environment variables protect secrets
- HTTPS enforced by Vercel

## Performance

- Server-side rendering for speed
- Optimized images and assets
- Firestore queries for efficiency
- Code splitting for small bundles

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Open source - use freely for learning and projects.

## Support

1. Check the in-app manual (click "Read Manual")
2. Read the documentation files
3. Check [Firebase Docs](https://firebase.google.com/docs)
4. Search for similar issues online

## What You'll Learn

By building this app, you'll understand:

- ✅ How React components work
- ✅ Using hooks (useState, useEffect)
- ✅ Firebase authentication
- ✅ Firestore database operations
- ✅ Next.js routing and layouts
- ✅ State management with Context
- ✅ Responsive design with Tailwind
- ✅ Deploying to production

## Next Steps

1. ✅ Get the app running
2. ✅ Read the in-app manual
3. ✅ Experiment with the code
4. ✅ Add your own features
5. ✅ Deploy to production
6. ✅ Share with others!

---

**Ready to start?** See **QUICK_START.md** for the next steps!

Built with ❤️ for learning Firebase + Next.js
