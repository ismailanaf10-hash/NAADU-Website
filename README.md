# Naadu Restaurant — Website & Admin Dashboard

A full-stack, modern restaurant web platform and management system built for **Naadu Restaurant** (Chilimbi, Mangaluru, Karnataka). Designed with Next.js 14 App Router, Tailwind CSS, Prisma ORM, and TypeScript.

---

## Features

### 1. Management & Admin Dashboard (`/admin`)
- **Authentication**: JWT-based secure session with HTTP-only cookies and bcrypt hashing.
- **Overview Dashboard**: Real-time metrics for today's reservations, pending approvals, menu inventory, active offers, and operational charts.
- **Reservation Management**: Full lifecycle workflow (Pending, Confirmed, Completed, Cancelled, Rejected) with customer contact details and search/filtering.
- **Menu Management**: Categorized menu manager (Starters, Coastal Karavali Specials, Vegetarian, Kids Menu, Desserts) with pricing, veg/non-veg tags, and availability toggles.
- **Category Manager**: Ordering, slug generation, and active state management.
- **Offers & Promotions**: Create, schedule, and feature seasonal discounts and restaurant promotions.
- **Events & Sports Screening**: Announce live sports screenings and special dining events with dates and booking triggers.
- **Gallery Manager**: Food and ambience photo curation with categorization and featured flags.
- **Review Moderation**: Approve or hide customer feedback and showcase top testimonials.
- **Restaurant Settings**: Live configuration for opening hours, contact details, Google Maps directions, max party sizes, and Adsterra monetization controls.

### 2. Customer-Facing Website (`/`)
- Mobile-first, responsive design tailored for Mangalurean dining culture.
- Full digital menu with dietary badges (Veg, Kids, Popular, Chef Specials).
- Table reservation booking form with instant reference code generation.
- Events & sports screening announcements.
- Customer review submission & display.
- Dynamic Google Maps directions, contact details, and opening hours.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (local development) / PostgreSQL ready
- **ORM**: Prisma 6
- **Auth**: Custom JWT + bcryptjs
- **Icons**: Lucide React
- **Validation**: Zod

---

## Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/ismailanaf10-hash/NAADU-admin-dashboard.git
cd NAADU-admin-dashboard
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure `DATABASE_URL` is configured:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="naadu-super-secret-jwt-key-mangaluru-2026-production-ready"
ADMIN_SESSION_DURATION_HOURS=8
```

### 3. Database Setup & Seeding
Push the schema and seed initial categories, items, sample bookings, and the superadmin user:
```bash
npx prisma db push
npx prisma db seed
```

### 4. Run Development Server
```bash
npm run dev
```

Visit the website at [http://localhost:3000](http://localhost:3000) or the Admin Panel at [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

---

## Default Admin Credentials

- **Email**: `admin@naadurestaurant.com`
- **Password**: `admin123`
- **Role**: `superadmin`
