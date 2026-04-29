# 🏠 Property Dealer CRM System

A full-stack Level 3 CRM system for property dealers in Pakistan, built with **Next.js 14 (App Router)**, **MongoDB**, **NextAuth**, and **Tailwind CSS**.

---

## 📋 Features

| Feature | Status |
|---|---|
| Authentication (Signup/Login + bcrypt) | ✅ |
| Role-Based Access Control (Admin/Agent) | ✅ |
| Lead CRUD (Create, Read, Update, Delete) | ✅ |
| Lead Scoring System (Budget-based priority) | ✅ |
| Lead Assignment (Admin assigns to agents) | ✅ |
| Real-time Updates (Polling every 15s) | ✅ |
| WhatsApp Click-to-Chat Integration | ✅ |
| Email Notifications (New lead + Assignment) | ✅ |
| Activity Timeline / Audit Trail | ✅ |
| Smart Follow-up Reminder System | ✅ |
| Analytics Dashboard with Charts | ✅ |
| Rate Limiting (50 req/min agents, 500 admin) | ✅ |
| Validation Middleware (Zod) | ✅ |
| Responsive / Mobile-friendly UI | ✅ |

---

## 🏗️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS, Recharts
- **Backend**: Next.js API Routes (Node.js)
- **Database**: MongoDB + Mongoose ODM
- **Auth**: NextAuth v4 with JWT strategy + bcryptjs
- **Email**: Nodemailer (Gmail SMTP)
- **Validation**: Zod
- **Real-time**: Polling (15s interval) — fallback to Socket.io if needed
- **Icons**: Lucide React

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Gmail account (for email notifications)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/property-crm.git
cd property-crm

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 4. Run the development server
npm run dev
```

### Environment Variables

```env
# MongoDB
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/property-crm

# NextAuth
NEXTAUTH_SECRET=your-secret-key-min-32-chars
NEXTAUTH_URL=http://localhost:3000

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@gmail.com
EMAIL_PASS=your-app-password      # Gmail App Password (not regular password)
EMAIL_FROM=Property CRM <your@gmail.com>
```

### Database Seeding (Development)

```bash
# Seed with sample data (20 leads, 1 admin, 3 agents)
npx ts-node scripts/seed.ts
```

**Default Credentials after seeding:**

| Role  | Email | Password |
|-------|-------|----------|
| Admin | admin@propertycrm.com | admin123 |
| Agent | ahmed@propertycrm.com | agent123 |
| Agent | sara@propertycrm.com | agent123 |
| Agent | bilal@propertycrm.com | agent123 |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts   # NextAuth config
│   │   │   └── signup/route.ts          # User registration
│   │   ├── leads/
│   │   │   ├── route.ts                 # GET all / POST create
│   │   │   └── [id]/
│   │   │       ├── route.ts             # GET / PATCH / DELETE
│   │   │       └── activities/route.ts  # Lead timeline
│   │   ├── agents/route.ts              # Agent management
│   │   ├── analytics/route.ts           # Dashboard analytics
│   │   ├── followups/route.ts           # Follow-up tracker
│   │   └── notifications/route.ts       # Polling notifications
│   ├── admin/                           # Admin pages
│   │   ├── page.tsx                     # Dashboard
│   │   ├── leads/page.tsx               # Lead management
│   │   ├── agents/page.tsx              # Agent management
│   │   ├── analytics/page.tsx           # Analytics charts
│   │   └── followups/page.tsx           # Follow-up tracker
│   ├── agent/                           # Agent pages
│   │   ├── page.tsx                     # Agent dashboard
│   │   ├── leads/page.tsx               # My leads
│   │   └── followups/page.tsx           # My follow-ups
│   ├── login/page.tsx
│   └── signup/page.tsx
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx                  # Navigation sidebar
│   │   └── AuthProvider.tsx             # NextAuth session
│   ├── leads/
│   │   ├── LeadCard.tsx                 # Lead display card
│   │   ├── LeadForm.tsx                 # Create/edit modal
│   │   └── ActivityTimeline.tsx         # Audit timeline
│   └── ui/
│       ├── StatsCard.tsx                # Dashboard metric card
│       ├── Toaster.tsx                  # Toast notifications
│       └── NotificationBell.tsx         # Real-time bell
├── lib/
│   ├── db/mongoose.ts                   # DB connection
│   ├── middleware/
│   │   ├── auth.ts                      # Auth middleware
│   │   ├── rateLimit.ts                 # Rate limiter
│   │   └── validation.ts               # Zod schemas
│   └── utils/
│       ├── email.ts                     # Email templates
│       └── helpers.ts                   # Utility functions
├── models/
│   ├── User.ts                          # User schema
│   ├── Lead.ts                          # Lead schema + scoring
│   └── Activity.ts                      # Activity log schema
├── middleware.ts                         # Next.js route protection
└── types/next-auth.d.ts                 # Type extensions
```

---

## 🔐 Authentication & RBAC

### Authentication Flow
1. User registers via `/signup` → password hashed with bcrypt (12 rounds)
2. User logs in → NextAuth creates JWT session (24hr expiry)
3. All API routes verify session via `requireAuth()` middleware
4. Admin-only routes use `requireAdmin()` middleware

### Role-Based Access
| Feature | Admin | Agent |
|---------|-------|-------|
| View all leads | ✅ | ❌ |
| View own assigned leads | ✅ | ✅ |
| Create leads | ✅ | ✅ |
| Update any lead | ✅ | Own only |
| Delete leads | ✅ | ❌ |
| Assign/Reassign leads | ✅ | ❌ |
| View analytics | ✅ | ❌ |
| Manage agents | ✅ | ❌ |
| Rate limit | 500/min | 50/min |

---

## ⚡ Lead Scoring System

Scoring is handled in Mongoose model middleware (`pre('save')`) on the backend:

```
Budget > 20M PKR  → Score: 90 → Priority: HIGH   🔴
Budget 10–20M PKR → Score: 60 → Priority: MEDIUM  🟡
Budget < 10M PKR  → Score: 30 → Priority: LOW     🟢
```

Score is automatically assigned on lead creation and whenever budget is updated.

---

## 📊 Analytics

The Admin analytics dashboard provides:
- Total leads, active agents, high priority count, unassigned leads
- Lead status distribution (Pie chart)
- Lead priority breakdown (Pie chart)
- Monthly lead trend (Line chart)
- Agent performance overview (Bar chart + table with conversion rates)

---

## 📱 WhatsApp Integration

Click-to-chat using `https://wa.me/{number}` format:
- Automatically strips non-numeric characters
- Converts Pakistani `0xxx` format to `92xxx` (international)
- Available on every lead card

---

## 📧 Email Notifications

Triggered automatically (async, non-blocking):
1. **New Lead Created** → Sends to admin email
2. **Lead Assigned to Agent** → Sends to agent's email

Professional HTML email templates with lead details and CTA buttons.

---

## 🔔 Real-time Updates

Using **polling** (every 15 seconds) as primary mechanism:
- Lead lists auto-refresh
- Notification bell polls `/api/notifications` for recent activities
- Unread count shown on bell icon

For Socket.io: install `socket.io` and `socket.io-client`, create a custom server.js.

---

## 🛡️ Middleware

### Rate Limiting
```
Agents: 50 requests/minute (per user ID)
Admins: 500 requests/minute
Auth endpoints: 10 requests/minute (brute-force protection)
```

### Validation (Zod)
All API endpoints validate request bodies using Zod schemas. Returns structured error messages with field-level details.

---

## 🚀 Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set environment variables in Vercel dashboard.

---

## 📝 Git Branch Strategy

```
main                    # Production
├── feature/auth        # Authentication system
├── feature/rbac        # Role-based access control
├── feature/leads       # Lead management CRUD
├── feature/scoring     # Lead scoring system
├── feature/assignment  # Lead assignment
├── feature/realtime    # Real-time updates / polling
├── feature/analytics   # Analytics dashboard
├── feature/followups   # Follow-up system
├── feature/email       # Email notifications
├── feature/whatsapp    # WhatsApp integration
└── feature/middleware  # Validation + rate limiting
```

---

## 👨‍💻 Author

CS-4032 Web Programming — Assignment 03
