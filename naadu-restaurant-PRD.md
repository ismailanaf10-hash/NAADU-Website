# Naadu Restaurant — Product Requirements Document

**Version:** 1.0  
**Status:** Ready for Development  
**Prepared for:** Antigravity AI Coding Agent  
**Project:** Naadu Restaurant — Website & Management System  
**Location:** Mangaluru, Karnataka, India

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision](#2-product-vision)
3. [Goals & Non-Goals](#3-goals--non-goals)
4. [Target Users](#4-target-users)
5. [User Journeys](#5-user-journeys)
6. [Information Architecture](#6-information-architecture)
7. [Public Website — Page Specifications](#7-public-website--page-specifications)
8. [Restaurant Menu System](#8-restaurant-menu-system)
9. [Reservation System](#9-reservation-system)
10. [Admin Panel](#10-admin-panel)
11. [Dashboard & Analytics](#11-dashboard--analytics)
12. [Offers & Promotions](#12-offers--promotions)
13. [Events & Sports Screening](#13-events--sports-screening)
14. [Kids Menu](#14-kids-menu)
15. [Gallery](#15-gallery)
16. [Reviews](#16-reviews)
17. [Contact & Location](#17-contact--location)
18. [Adsterra Monetization](#18-adsterra-monetization)
19. [Configuration System](#19-configuration-system)
20. [Database Architecture](#20-database-architecture)
21. [API Architecture](#21-api-architecture)
22. [Authentication & Security](#22-authentication--security)
23. [Media Management](#23-media-management)
24. [SEO](#24-seo)
25. [Accessibility](#25-accessibility)
26. [Performance](#26-performance)
27. [Error Handling](#27-error-handling)
28. [Notifications](#28-notifications)
29. [Technology Stack](#29-technology-stack)
30. [Project Structure](#30-project-structure)
31. [MVP Scope](#31-mvp-scope)
32. [Future Roadmap](#32-future-roadmap)
33. [Development Phases](#33-development-phases)
34. [Testing Plan](#34-testing-plan)
35. [Deployment](#35-deployment)
36. [Production Checklist](#36-production-checklist)
37. [Content Required From Restaurant](#37-content-required-from-restaurant)
38. [Final Acceptance Criteria](#38-final-acceptance-criteria)

---

## 1. Executive Summary

Naadu Restaurant is a real restaurant located in Mangaluru, Karnataka. This document defines the complete product specification for their web presence and internal management system.

The product consists of two parts:

1. **Public Website** — A premium, mobile-first restaurant website for customer discovery, menu browsing, table reservations, and brand representation.
2. **Admin Panel** — A simple, non-technical management interface that allows restaurant staff to manage menus, reservations, offers, gallery, events, and site settings without touching code.

The system is designed to be built using Antigravity and must be production-ready, maintainable, and SEO-optimized. It includes a controlled Adsterra monetization layer that never compromises the restaurant's core conversion flows.

**Known restaurant facts that may be used:**
- Name: Naadu Restaurant
- Address: 1, 1, S-17, S-17-1143, Kulur Ferry Rd, Chilimbi, BOLOOR, Ladyhill, Mangaluru, Karnataka 575006
- Phone: 070223 73444
- Features: Vegetarian options, Kids' menu, Suitable for watching sports

All other details are marked as `CONTENT REQUIRED FROM RESTAURANT`.

---

## 2. Product Vision

Naadu Restaurant's digital presence should feel like a real, professionally designed restaurant website — not a generic template. The design and development must reflect:

- The warmth of coastal Karnataka hospitality
- The authenticity of a local Mangaluru dining experience
- A modern, premium aesthetic that builds trust with new customers
- A fast, mobile-first interface for users arriving via phone searches and social media

The website is not a demo, an AI showcase, or a generic clone. It is a real business tool.

---

## 3. Goals & Non-Goals

### Goals

- Represent Naadu Restaurant with a professional, credible digital identity
- Enable customers to browse the full menu without creating an account
- Allow table reservations through a simple, low-friction form
- Provide the restaurant admin a simple non-technical management interface
- Serve SEO-optimized pages for local Mangaluru search discovery
- Support light, UX-first Adsterra monetization that does not damage the customer experience
- Be fully responsive and mobile-first
- Be fast-loading and production-deployable

### Non-Goals

- **No customer login or authentication** — customers browse entirely without accounts
- **No online food ordering in MVP** — ordering is a future feature
- **No online payment integration in MVP**
- **No delivery tracking in MVP**
- **No loyalty or coupon system in MVP**
- **No WhatsApp automation in MVP** — WhatsApp link opens the app, no bot
- **No multi-restaurant or multi-branch support**
- **No third-party POS integration in MVP**

---

## 4. Target Users

### 4.1 Restaurant Customers (Public)

- **Local Mangaluru residents** searching for dining options
- **Visitors and tourists** looking for authentic local food in Mangaluru
- **Families** checking for kids' menu options and table availability
- **Sports fans** checking for live match screening information
- **Mobile-first users** discovering the restaurant via Google, Instagram, or word of mouth

Customer behavior assumptions:
- Most customers will visit from mobile phones
- Many will arrive from Google search or Maps
- Decision to visit is made within seconds — the website must immediately communicate quality and identity
- Reservation must be as easy as possible — no account creation

### 4.2 Restaurant Admin (Internal)

- **Restaurant owner** — may manage all settings
- **Restaurant manager** — manages reservations, menus, events
- **Staff member** — may handle specific tasks like reservation confirmations

Admin assumptions:
- Admin users are not necessarily technical
- The admin interface must use plain language, not developer terminology
- Admin tasks must be completable without training or documentation

---

## 5. User Journeys

### Journey 1: New Visitor → Menu Discovery → Reservation

```
Google Search / Instagram / Maps
    ↓
Homepage (hero + food photography)
    ↓
Browses Featured Dishes / Categories
    ↓
Menu Page (category filter / search)
    ↓
Food Detail Page (full dish info)
    ↓
"Reserve a Table" CTA
    ↓
Reservation Form (minimal fields)
    ↓
Confirmation Page (reference number + WhatsApp/call option)
```

### Journey 2: Direct Reservation

```
Homepage
    ↓
"Reserve a Table" CTA (sticky or hero)
    ↓
Reservation Form
    ↓
Confirmation
```

### Journey 3: Offer Discovery → Visit Intent

```
Homepage → Offers Section
    ↓
Offers Page (full list)
    ↓
Offer Detail
    ↓
"Reserve a Table" or "Call Us" CTA
```

### Journey 4: Contact / Location

```
Homepage → Contact Section or Footer
    ↓
Contact Page
    ↓
Google Maps / WhatsApp / Call
```

### Journey 5: Sports Event Discovery

```
Homepage → Events Section
    ↓
Events Page
    ↓
Event detail (match info / date)
    ↓
Reserve / Call CTA
```

### Journey 6: Admin — Reservation Management

```
Admin Login
    ↓
Dashboard (pending reservations alert)
    ↓
Reservations List (filter by date/status)
    ↓
Open Reservation → Confirm / Reject / Add Note
```

---

## 6. Information Architecture

### Public Site Map

```
/                         → Home
/menu                     → Full Menu (with category filter + search)
/menu/[category-slug]     → Category-filtered menu
/menu/item/[item-slug]    → Food Detail Page
/reserve                  → Table Reservation Form
/reserve/confirmation     → Reservation Confirmation
/offers                   → Offers & Promotions
/about                    → About Naadu Restaurant
/gallery                  → Photo Gallery
/events                   → Events & Sports Screening
/kids-menu                → Kids Menu
/contact                  → Contact & Location
/reviews                  → Customer Reviews
/privacy                  → Privacy Policy
/terms                    → Terms & Conditions
```

### Admin Site Map

```
/admin                    → Redirect to /admin/login or /admin/dashboard
/admin/login              → Admin Login
/admin/dashboard          → Dashboard & Analytics
/admin/menu               → Menu Items List
/admin/menu/new           → Add Menu Item
/admin/menu/[id]          → Edit Menu Item
/admin/categories         → Category Management
/admin/reservations       → Reservations List
/admin/reservations/[id]  → Reservation Detail
/admin/offers             → Offers Management
/admin/offers/new         → Add Offer
/admin/offers/[id]        → Edit Offer
/admin/gallery            → Gallery Management
/admin/reviews            → Reviews Moderation
/admin/events             → Events Management
/admin/events/new         → Add Event
/admin/events/[id]        → Edit Event
/admin/kids-menu          → Kids Menu Management
/admin/settings           → Settings Hub
/admin/settings/general   → Restaurant Info
/admin/settings/hours     → Opening Hours
/admin/settings/contact   → Contact & Social
/admin/settings/seo       → SEO Settings
/admin/settings/homepage  → Homepage Content
/admin/settings/ads       → Ads & Monetization
/admin/settings/reservation → Reservation Config
```

---

## 7. Public Website — Page Specifications

### 7.1 Home Page (`/`)

**Purpose:** Primary landing page. Communicates restaurant identity immediately, drives menu discovery and reservations.

**Sections (in order):**

#### 7.1.1 Navigation Header
- Logo (Naadu Restaurant name/logo image)
- Nav links: Home, Menu, Offers, Events, Gallery, About, Contact
- Primary CTA button: "Reserve a Table" (visible on desktop in header)
- Mobile: Hamburger menu → slide-in drawer with same nav links + CTA
- Header should be sticky on scroll (desktop and mobile)
- Background becomes slightly opaque/solid on scroll for readability

#### 7.1.2 Hero Section
- Full-width high-quality food or restaurant ambience image/banner
- Overlay text: Restaurant name + short tagline
  - Tagline: `CONTENT REQUIRED FROM RESTAURANT`
- Two CTA buttons:
  - Primary: "Reserve a Table" → `/reserve`
  - Secondary: "View Menu" → `/menu`
- Hero image source: managed from Admin → Settings → Homepage

#### 7.1.3 Restaurant Highlights Bar
- 3–4 short icon + text highlights, e.g.:
  - "Vegetarian Friendly"
  - "Kids Menu Available"
  - "Live Sports Screening"
  - `[ADDITIONAL HIGHLIGHT — CONTENT REQUIRED FROM RESTAURANT]`
- These highlights are editable from Admin Settings → Homepage

#### 7.1.4 Featured Dishes
- Section heading: "Our Specials" or similar (`CONTENT REQUIRED FROM RESTAURANT`)
- Display 4–6 food cards marked as "Featured" in the menu management
- Each card:
  - Food image
  - Food name
  - Short description (truncated to ~2 lines)
  - Price
  - Veg/Non-veg indicator
  - "View Details" link → `/menu/item/[slug]`
- "View Full Menu" link at section end

#### 7.1.5 Popular Dishes
- Section heading: "Most Loved"
- Display 4–6 food items marked as "Popular"
- Same card layout as Featured Dishes
- This section is optional — shown only if popular items are marked in admin

#### 7.1.6 Food Categories
- Visual category grid/row
- Each category shows:
  - Category image or icon
  - Category name
  - Click → `/menu/[category-slug]`
- Only show categories that have at least one available menu item

#### 7.1.7 Offers Preview
- Section heading: "Today's Offers" or similar
- Show up to 2–3 active offers
- Offer card:
  - Offer image (if available)
  - Offer title
  - Short description
  - "View All Offers" link at section end → `/offers`
- If no active offers, this section is hidden

#### 7.1.8 About Naadu (Brief)
- Short 2–3 paragraph text about the restaurant
- Single restaurant photo alongside
- "Read More About Us" link → `/about`
- Content: `CONTENT REQUIRED FROM RESTAURANT`

#### 7.1.9 Gallery Preview
- Show 6–8 recent or featured gallery images in a grid/masonry layout
- Click on any image → opens lightbox
- "View Full Gallery" link → `/gallery`

#### 7.1.10 Events & Sports Screening Preview
- Show upcoming events (if any) or a static promotional section for sports screening
- If upcoming events exist: display the next 2–3 as cards
- If no events: show a static banner indicating the restaurant screens live sports
  - Static text: `CONTENT REQUIRED FROM RESTAURANT`
- "View All Events" link → `/events`

#### 7.1.11 Kids Menu Highlight
- A brief section or banner highlighting the Kids Menu
- Image + short text
- CTA: "See Kids Menu" → `/kids-menu`
- Content: `CONTENT REQUIRED FROM RESTAURANT`

#### 7.1.12 Customer Reviews Preview
- Display 3 approved/featured customer reviews
- Each review shows:
  - Star rating (1–5)
  - Customer name
  - Review excerpt
  - Date
- "Read All Reviews" link → `/reviews`

#### 7.1.13 Contact & Location Section
- Address: 1, 1, S-17, S-17-1143, Kulur Ferry Rd, Chilimbi, BOLOOR, Ladyhill, Mangaluru, Karnataka 575006
- Phone: 070223 73444
- Opening Hours: `CONTENT REQUIRED FROM RESTAURANT` (pulled from Admin settings)
- Embedded Google Maps iframe
- Two action buttons:
  - "WhatsApp Us" → `https://wa.me/917022373444` (opens WhatsApp)
  - "Call Now" → `tel:+917022373444`

#### 7.1.14 Instagram / Social Section
- Short section heading: "Follow Us" or similar
- Link to Instagram profile: `CONTENT REQUIRED FROM RESTAURANT`
- Optional: display 4–6 latest Instagram post thumbnails if Instagram embed is configured
  - If embed is not configured, show a static "Follow us on Instagram" banner
- Links to all configured social media accounts

#### 7.1.15 Footer
- Logo
- Short restaurant description (1–2 lines): `CONTENT REQUIRED FROM RESTAURANT`
- Quick links: Home, Menu, Offers, Events, Gallery, About, Contact
- Contact: Address, Phone, WhatsApp
- Opening Hours summary
- Social media icons/links
- Copyright: "© [Year] Naadu Restaurant. All rights reserved."
- Links: Privacy Policy, Terms & Conditions

---

### 7.2 Menu Page (`/menu` and `/menu/[category-slug]`)

**Purpose:** Allow customers to browse all available food items, filter by category, and search.

**Functional Requirements:**

- Display all available menu items by default
- Category filter tabs/buttons at top (horizontal scroll on mobile)
- Search bar: live filter by item name as user types
- Veg / Non-Veg toggle filter
- Results update without page reload (client-side filtering)

**Menu Item Card:**
- Food image (required — show placeholder if not uploaded)
- Food name
- Short description (max ~2 lines)
- Price (formatted in ₹)
- Veg / Non-Veg indicator (green dot = veg, red dot = non-veg)
- "Popular" badge if marked popular
- "Featured" badge if marked featured
- "Unavailable" overlay/label if item is currently unavailable
- Click → `/menu/item/[slug]`

**Empty State:**
- If a search or filter returns zero results: "No items found. Try a different category or search."

**Validation:**
- Search is debounced (300ms) to avoid excessive re-renders
- URL should update with category slug for shareable links and SEO

**Acceptance Criteria:**
- Menu loads within 2 seconds on mobile
- Category filter works correctly
- Unavailable items are visually distinct but still browsable
- Search filters correctly across item names

---

### 7.3 Food Detail Page (`/menu/item/[item-slug]`)

**Purpose:** Full information page for a single menu item.

**Sections:**

- Large food image (full width on mobile, prominent on desktop)
- Food name (H1)
- Category breadcrumb (e.g., Home > Menu > Starters > Item Name)
- Veg / Non-Veg status with indicator
- Price (₹)
- Short description
- Full description if available
- Ingredients / Allergen information (if provided by restaurant — optional field)
- Availability status (visible badge if currently unavailable)
- CTA: "Reserve a Table" button → `/reserve`
- Related Dishes section: show 3–4 items from the same category

**Validation:**
- If item slug does not exist, return a clear 404 page with a "Back to Menu" link
- If item is unavailable, show availability status but do not remove the page

**SEO:**
- Page title: `[Item Name] — Naadu Restaurant`
- Meta description: Short description of the dish + restaurant name
- Structured data: MenuItem schema where appropriate

---

### 7.4 Table Reservation (`/reserve`)

Full specification in **Section 9**.

---

### 7.5 Offers Page (`/offers`)

**Purpose:** List all active promotions and offers.

**Functional Requirements:**
- Display all currently active offers (end date has not passed)
- Each offer card:
  - Offer image (if uploaded)
  - Offer title
  - Description
  - Discount/value description
  - Valid dates (start – end)
  - Terms (expandable or shown below description)
- If no active offers: "No offers available right now. Check back soon!"
- Expired offers are not shown publicly

**Admin Requirements:** See Section 12.

---

### 7.6 About Page (`/about`)

**Purpose:** Tell the restaurant's story, build trust, and communicate identity.

**Sections:**
- Hero image (restaurant interior or exterior): `CONTENT REQUIRED FROM RESTAURANT`
- Restaurant name heading
- Story / Introduction: `CONTENT REQUIRED FROM RESTAURANT`
- Philosophy / Food Identity: `CONTENT REQUIRED FROM RESTAURANT`
- Local / Mangaluru connection: `CONTENT REQUIRED FROM RESTAURANT`
- Hospitality statement: `CONTENT REQUIRED FROM RESTAURANT`
- Restaurant photo gallery (3–4 images): `CONTENT REQUIRED FROM RESTAURANT`
- CTA: "Reserve a Table" or "View Menu"

**Admin Requirements:**
- All About page text is editable from Admin → Settings → General
- Photos are managed through Gallery with an "About page" tag or dedicated About photo slots

---

### 7.7 Gallery Page (`/gallery`)

**Purpose:** Showcase restaurant ambience, food, events, and sports screening moments.

**Functional Requirements:**
- Masonry or grid photo layout
- Category filter tabs: All, Food, Ambience, Events, Sports Screening
- Lightbox on click (full-screen image viewer with next/prev navigation)
- Lazy loading for images below the fold

**Admin Requirements:** See Section 15.

---

### 7.8 Reviews Page (`/reviews`)

**Purpose:** Display approved customer reviews publicly.

**Functional Requirements:**
- Display all admin-approved reviews
- Show:
  - Star rating (1–5 visual stars)
  - Customer name
  - Review text
  - Date
  - Optional customer photo (if submitted)
- Average rating summary at top (total reviews + average stars)
- Sort: Most Recent (default), Highest Rating

**Review Submission (Optional for MVP):**
- If enabled in Admin settings, show a "Leave a Review" form below the list
- Fields: Name, Rating, Review text, Optional email (not displayed publicly)
- Submitted reviews go to Admin for moderation before appearing publicly

**Admin Requirements:** See Section 16.

---

### 7.9 Events Page (`/events`)

Full specification in **Section 13**.

---

### 7.10 Kids Menu Page (`/kids-menu`)

Full specification in **Section 14**.

---

### 7.11 Contact Page (`/contact`)

**Purpose:** Complete contact and location information.

**Sections:**
- Restaurant name
- Full address: 1, 1, S-17, S-17-1143, Kulur Ferry Rd, Chilimbi, BOLOOR, Ladyhill, Mangaluru, Karnataka 575006
- Phone: 070223 73444
- Opening Hours (pulled from Admin settings): `CONTENT REQUIRED FROM RESTAURANT`
- Embedded Google Maps (URL from Admin settings)
- Action buttons:
  - "Call Now" → `tel:+917022373444`
  - "WhatsApp Us" → `https://wa.me/917022373444`
  - "Get Directions" → Google Maps URL
- Social media links (from Admin settings)
- Optional contact form:
  - Name
  - Phone/Email
  - Message
  - Submit → stores message in database, notifies admin by email if configured

**Validation:**
- All address/phone/hours data must come from Admin settings, not be hard-coded in the frontend
- Maps URL must be configurable from Admin

---

## 8. Restaurant Menu System

### 8.1 Data Model

See **Section 20** for full schema. Summary:

- `MenuCategory`: name, slug, image, description, displayOrder, isEnabled
- `MenuItem`: name, slug, description, fullDescription, price, categoryId, images, isVeg, isAvailable, isFeatured, isPopular, isKidsMenu, ingredients, allergens, tags

### 8.2 Category Hierarchy

- Only one level of categories (no subcategories in MVP)
- Categories have a defined display order set by admin
- Disabled categories and their items are hidden from the public menu
- Category slugs are used in URLs for SEO

### 8.3 Filtering Logic

On the Menu page, filtering is applied client-side after the initial data load:

1. Category filter: show only items in the selected category
2. Veg/Non-veg toggle: show only veg or non-veg items
3. Search: match against item name (case-insensitive, partial match)
4. All filters can be combined
5. Unavailable items remain visible but marked as unavailable

### 8.4 Kids Menu Integration

- Kids menu items are regular `MenuItem` records with `isKidsMenu: true`
- They appear on both the main `/menu` page (in their category) and the `/kids-menu` page
- Admin can filter and manage kids menu items independently

---

## 9. Reservation System

### 9.1 Purpose

Allow customers to request a table reservation without requiring an account. Admin reviews and confirms reservations.

### 9.2 Reservation Form (`/reserve`)

**Fields:**

| Field | Type | Required | Notes |
|---|---|---|---|
| Full Name | Text | Yes | Min 2 chars |
| Phone Number | Tel | Yes | Indian format validation (10 digits) |
| Email Address | Email | No | Optional — for confirmation email if configured |
| Reservation Date | Date | Yes | Cannot be in the past. Cannot be more than 60 days in future (configurable) |
| Reservation Time | Time | Yes | Only show times within opening hours. 30-minute intervals. |
| Number of Guests | Number | Yes | Min 1, Max configurable (default 20) |
| Special Requests | Textarea | No | Max 500 characters |
| Occasion | Select | No | Options: None, Birthday, Anniversary, Business Lunch, Family Gathering, Other (configurable) |

**Form Behavior:**
- Date picker should disable past dates and dates beyond the booking window
- Time picker should only show slots within configured opening hours
- On submit: client-side validation first, then server-side
- Show a loading indicator during submission
- On success: redirect to `/reserve/confirmation?ref=[referenceNumber]`
- On failure: show inline error messages without losing form data

### 9.3 Spam / Duplicate Protection

- Rate limiting: max 3 reservation submissions from the same IP per hour
- Duplicate check: warn if the same phone number has an existing pending/confirmed reservation for the same date
- Optional: honeypot hidden field to catch bots
- Optional: simple math CAPTCHA or Cloudflare Turnstile (configurable in Admin)

### 9.4 Confirmation Page (`/reserve/confirmation`)

- Display: "Your reservation request has been received!"
- Reservation Reference Number (e.g., `NAADU-20240115-0042`)
- Summary of submitted details (name, date, time, guests)
- Status: "Pending Confirmation"
- Message: "We will confirm your reservation shortly. You can also reach us at:"
- Phone: 070223 73444
- WhatsApp button
- Call button
- "Back to Home" link

### 9.5 Reservation Status Flow

```
Submitted → PENDING
Admin Reviews:
  → CONFIRMED (customer notified if email provided and notification configured)
  → REJECTED (customer notified if email provided)
Customer arrives:
  → COMPLETED (marked by admin)
Customer cancels or no-show:
  → CANCELLED
```

### 9.6 Reference Number Format

`NAADU-YYYYMMDD-NNNN` where NNNN is a zero-padded daily sequence number.

### 9.7 Admin Reservation Management

See **Section 10.5** for full admin panel specification.

### 9.8 Validation Rules

- Date: must be today or in the future, within configured booking window
- Time: must be within configured operating hours
- Phone: must be a valid 10-digit Indian mobile number
- Name: min 2 characters, max 100 characters
- Guests: 1 to configured maximum
- Email: valid format if provided

### 9.9 Security

- All form inputs sanitized on the server
- No SQL injection or XSS attack vectors
- Rate limiting applied at the API level
- Reservation data stored only in the restaurant's own database

---

## 10. Admin Panel

### 10.1 Admin Authentication

**Login Page (`/admin/login`):**
- Fields: Email/Username + Password
- On success: redirect to `/admin/dashboard`
- On failure: show "Invalid credentials" (do not specify which field is wrong)
- No "remember me" in MVP (session expires after configurable period, default 8 hours)
- No self-registration — admin accounts are created via database seed or CLI command
- Rate limiting: max 5 failed attempts per IP per 15 minutes → temporary lockout

**Session Management:**
- JWT stored in an HTTP-only cookie (not localStorage)
- Token expires after 8 hours (configurable via `.env`)
- Logout clears the cookie
- All `/admin/*` routes are protected — unauthenticated requests redirect to `/admin/login`

### 10.2 Admin Dashboard

**Purpose:** At-a-glance overview of restaurant operations.

**Metric Cards (row 1):**
- Total Reservations Today
- Pending Reservations (highlighted if > 0)
- Confirmed Reservations Today
- Total Upcoming Reservations (next 7 days)

**Metric Cards (row 2):**
- Total Menu Items
- Available Items / Unavailable Items
- Active Offers
- Total Gallery Images

**Charts:**
- Reservations by Day (last 14 days — bar chart)
- Reservations by Status (pie/donut — Pending / Confirmed / Cancelled / Completed)

**Recent Reservations Table:**
- Last 10 reservation submissions
- Columns: Ref #, Customer Name, Date, Time, Guests, Status, Actions
- "View All" link → `/admin/reservations`

**Quick Actions:**
- "Add Menu Item" button
- "Add Offer" button
- "Add Event" button

### 10.3 Menu Management (`/admin/menu`)

**List View:**
- Table of all menu items
- Columns: Image thumbnail, Name, Category, Price, Veg/Non-veg, Status (Available/Unavailable), Featured, Popular, Actions
- Filters: Category dropdown, Status toggle, Veg/Non-veg toggle, Search by name
- Bulk actions: Enable/Disable selected, Delete selected (with confirmation)
- "Add New Item" button

**Add / Edit Menu Item Form:**

| Field | Type | Required | Notes |
|---|---|---|---|
| Item Name | Text | Yes | Max 100 chars |
| Slug | Text | Auto-generated from name, editable | URL-safe, unique |
| Category | Select | Yes | From active categories |
| Price (₹) | Number | Yes | Decimal allowed |
| Short Description | Textarea | Yes | Max 200 chars (shown in card) |
| Full Description | Rich text or Textarea | No | Shown on detail page |
| Dietary | Radio | Yes | Vegetarian / Non-Vegetarian |
| Upload Image | File | No | See Media Management |
| Ingredients | Textarea | No | Optional list |
| Allergen Info | Textarea | No | Optional |
| Status | Toggle | Yes | Available / Unavailable |
| Mark as Featured | Checkbox | No | Appears in homepage featured section |
| Mark as Popular | Checkbox | No | Appears in homepage popular section |
| Kids Menu | Checkbox | No | Appears on Kids Menu page |

**Validation:**
- Name required, price required, category required
- Slug must be unique across all items
- Image file must be JPG/PNG/WebP, max 5MB
- Price must be a positive number

**Acceptance Criteria:**
- Admin can add, edit, delete menu items
- Unavailable items are hidden from public menu browse (still accessible by direct URL)
- Featured/Popular tags update homepage sections immediately

### 10.4 Category Management (`/admin/categories`)

**List View:**
- Table: Category name, Slug, Image, Item Count, Display Order, Status, Actions
- Drag-and-drop or up/down arrows to reorder
- "Add Category" button

**Add / Edit Category Form:**

| Field | Type | Required |
|---|---|---|
| Category Name | Text | Yes |
| Slug | Auto-generated, editable | Yes |
| Description | Textarea | No |
| Category Image | File upload | No |
| Display Order | Number (auto, editable) | Yes |
| Status | Toggle (Active/Inactive) | Yes |

**Deletion Rules:**
- If category has assigned menu items: show warning "This category has [N] items. Reassign them before deleting or delete all items first."
- Prevent deletion until items are reassigned or deleted
- If category has zero items: allow direct deletion with confirmation

### 10.5 Reservation Management (`/admin/reservations`)

**List View:**
- Table columns: Ref #, Customer Name, Phone, Date, Time, Guests, Status, Submitted At, Actions
- Filters:
  - Date range picker
  - Status: All / Pending / Confirmed / Cancelled / Completed
  - Search by customer name or phone
- Default sort: Newest first
- Export to CSV button (date range)

**Reservation Detail View (`/admin/reservations/[id]`):**

Show all fields:
- Reference number
- Customer name
- Phone
- Email (if provided)
- Date and time
- Number of guests
- Special requests
- Occasion
- Submission timestamp
- Current status
- Internal notes (editable by admin)

Actions available:
- **Confirm** (Pending → Confirmed)
- **Reject** (Pending → Rejected) — requires optional rejection reason
- **Mark Completed** (Confirmed → Completed)
- **Cancel** (any active status → Cancelled)
- **Add/Edit Internal Note** (always available, not shown to customer)

Status badge colors:
- Pending: Yellow/Orange
- Confirmed: Green
- Cancelled: Grey
- Rejected: Red
- Completed: Blue

### 10.6 Offers Management (`/admin/offers`)

**List View:**
- Table: Offer title, Discount, Start Date, End Date, Status, Actions
- Filter by: Active / Inactive / Expired

**Add / Edit Offer Form:**

| Field | Type | Required |
|---|---|---|
| Offer Title | Text | Yes |
| Description | Textarea | Yes |
| Discount / Value | Text | Yes | (e.g., "20% off", "Free dessert") |
| Start Date | Date | Yes |
| End Date | Date | Yes |
| Offer Image | File | No |
| Terms & Conditions | Textarea | No |
| Status | Toggle (Active/Inactive) | Yes |

**Logic:**
- An offer appears publicly only if: `isActive = true` AND `startDate <= today <= endDate`
- Admin can manually deactivate any offer regardless of dates
- Expired offers are kept in the database but hidden from public pages

### 10.7 Gallery Management (`/admin/gallery`)

See **Section 15**.

### 10.8 Reviews Management (`/admin/reviews`)

See **Section 16**.

### 10.9 Events Management (`/admin/events`)

See **Section 13**.

### 10.10 Kids Menu Management

- Admin accesses kids menu items via Admin → Menu → filter by "Kids Menu" checkbox
- Or via a dedicated "Kids Menu" shortcut in the sidebar that opens the menu list pre-filtered
- No separate data model — kids menu items are standard MenuItem records with `isKidsMenu: true`

### 10.11 Restaurant Settings (`/admin/settings`)

Full specification in **Section 19**.

---

## 11. Dashboard & Analytics

### 11.1 Analytics Goals

Track only what is meaningful for restaurant decision-making. Do not over-engineer.

### 11.2 Tracked Events

The system tracks these analytics events:

| Event | Description |
|---|---|
| `page_view` | Any public page visited (page slug recorded) |
| `menu_view` | Menu page loaded |
| `item_view` | Food detail page loaded (item ID recorded) |
| `reservation_start` | User opened the reservation form |
| `reservation_submit` | Reservation form submitted (success) |
| `reservation_fail` | Reservation form submission failed (client or server) |
| `offer_view` | Offers page or offer detail viewed |
| `whatsapp_click` | WhatsApp CTA clicked |
| `call_click` | Call CTA clicked |
| `maps_click` | Google Maps CTA clicked |
| `gallery_view` | Gallery page visited |
| `event_view` | Events page or event detail viewed |

### 11.3 Analytics Storage

- Events stored in a lightweight `AnalyticsEvent` table/collection
- Each record: `eventType`, `metadata` (JSON), `timestamp`, `sessionId` (anonymous)
- No personal data stored in analytics
- No third-party analytics services required in MVP

### 11.4 Dashboard Display

- Counters: Total page views (today / 7 days / 30 days)
- Most viewed menu items (top 5)
- Most visited pages (top 5)
- WhatsApp clicks, Call clicks, Maps clicks (totals)
- Reservation conversion: (reservation_submit / reservation_start) × 100%
- Simple bar chart: daily page views (last 14 days)

### 11.5 Privacy

- Analytics data is anonymous — no cookies, no tracking IDs linked to personal data
- No Google Analytics in MVP — self-hosted only
- `CONTENT REQUIRED FROM RESTAURANT` — confirm if any analytics consent banner is required based on their legal needs

---

## 12. Offers & Promotions

### 12.1 Purpose

Allow the restaurant to run time-limited promotions that appear on the website.

### 12.2 Public Display

- Active offers shown on the Offers page (`/offers`)
- Up to 2–3 featured offers previewed on the homepage
- Offer cards in the homepage are sorted by start date (most recent first)

### 12.3 Admin Requirements

- CRUD (Create, Read, Update, Delete) for offers
- Toggle active/inactive without deleting
- Set specific start and end dates
- Upload optional offer image
- Add terms and conditions text
- System automatically hides offers past their end date

### 12.4 Offer Data Fields

| Field | Type | Required |
|---|---|---|
| title | String | Yes |
| description | String | Yes |
| discountText | String | Yes | (e.g., "20% off starters") |
| imageUrl | String | No |
| startDate | Date | Yes |
| endDate | Date | Yes |
| terms | String | No |
| isActive | Boolean | Yes | Default: true |
| createdAt | DateTime | Auto |
| updatedAt | DateTime | Auto |

---

## 13. Events & Sports Screening

### 13.1 Purpose

Naadu Restaurant is described as suitable for watching sports. This section manages event announcements including sports screenings and special events.

### 13.2 Public Display (`/events`)

- List of upcoming events (future events, sorted by date ascending)
- Each event card:
  - Event image (if uploaded)
  - Event title
  - Date and time
  - Description
  - CTA button (configurable per event, e.g., "Reserve Your Spot" → `/reserve`)
- If no upcoming events: show a static "We screen live sports events! Call us to find out what's next." banner with Call/WhatsApp CTAs
- Past events are not shown publicly

### 13.3 Homepage Integration

- If there are 1+ upcoming events, the homepage Events section shows the next 2–3
- If no events, the homepage shows a static sports screening promotional banner
- Static banner content: `CONTENT REQUIRED FROM RESTAURANT`

### 13.4 Event Data Fields

| Field | Type | Required |
|---|---|---|
| title | String | Yes |
| description | String | Yes |
| eventDate | Date | Yes |
| eventTime | Time | Yes |
| imageUrl | String | No |
| ctaLabel | String | No | (e.g., "Reserve a Table") |
| ctaUrl | String | No | (e.g., `/reserve`) |
| isPublished | Boolean | Yes | Default: false |
| createdAt | DateTime | Auto |

### 13.5 Admin Requirements

- CRUD for events
- Toggle published/unpublished
- Events can be created in advance and published when ready
- Unpublished events are not visible publicly
- Deleting an event is permanent (with confirmation dialog)

---

## 14. Kids Menu

### 14.1 Purpose

Naadu Restaurant has a kids' menu. This section provides a dedicated browsable page for parents.

### 14.2 Public Display (`/kids-menu`)

- Page heading: "Kids Menu" (or restaurant-supplied heading: `CONTENT REQUIRED FROM RESTAURANT`)
- Short introduction: `CONTENT REQUIRED FROM RESTAURANT`
- Display all MenuItem records where `isKidsMenu: true` and `isAvailable: true`
- Uses the same food card layout as the main menu
- Groups by category if multiple kids categories exist
- CTA at bottom: "Reserve a Table" → `/reserve`

### 14.3 Admin Requirements

- Kids menu items are managed through the standard Menu Management interface
- Admin marks any item as kids menu via the `isKidsMenu` checkbox
- A "Kids Menu" filter shortcut is available in the Admin sidebar
- No separate page required in admin — the filter is sufficient

---

## 15. Gallery

### 15.1 Purpose

Showcase the restaurant — food, ambience, events, sports screening, and special moments.

### 15.2 Public Display (`/gallery`)

- Grid or masonry layout
- Category filter tabs: All | Food | Ambience | Events | Sports | Other
- Clicking an image opens a lightbox with:
  - Full-size image
  - Caption (if set)
  - Next / Previous navigation
  - Close button (keyboard: Escape)
- Lazy loading for all images below fold
- Mobile: full-width images, 2-column grid, or masonry depending on design direction

### 15.3 Gallery Image Data Fields

| Field | Type | Required |
|---|---|---|
| imageUrl | String | Yes |
| thumbnailUrl | String | Auto-generated |
| caption | String | No |
| category | Enum | Yes | food, ambience, events, sports, other |
| isFeatured | Boolean | Yes | Featured images shown on homepage |
| displayOrder | Number | Auto |
| isVisible | Boolean | Yes | Default: true |
| altText | String | No | For accessibility |
| createdAt | DateTime | Auto |

### 15.4 Admin Requirements (`/admin/gallery`)

- Upload images (single or batch)
- Accepted formats: JPG, PNG, WebP
- Max file size: 10MB per image
- After upload: image is auto-resized and a thumbnail is generated
- Assign category to each image
- Toggle featured (homepage) status
- Set caption and alt text
- Reorder images via drag-and-drop or display order number
- Delete image (permanent, with confirmation)
- Filter by category in admin list view

---

## 16. Reviews

### 16.1 Purpose

Display authentic customer feedback. Admin moderates all reviews before they appear publicly.

### 16.2 Public Display (`/reviews`)

- Average rating summary (e.g., "4.5 / 5 from 38 reviews")
- Individual review cards:
  - Star rating (1–5)
  - Customer name
  - Review text
  - Date posted
  - Optional photo
- Sorted by: Most Recent (default) | Highest Rating
- Show only admin-approved reviews

### 16.3 Review Submission (Configurable)

- Admin can enable/disable public review submission via Admin Settings
- If enabled, show a form below the review list:
  - Customer Name (required)
  - Rating (required, 1–5 stars selector)
  - Review text (required, max 1000 chars)
  - Email (optional, not displayed publicly — for admin reference only)
  - Photo upload (optional, max 5MB)
  - Submit button
- On submission: store as `status: pending`, not shown publicly
- Admin receives notification (if configured)

### 16.4 Review Data Fields

| Field | Type | Required |
|---|---|---|
| customerName | String | Yes |
| rating | Number (1–5) | Yes |
| reviewText | String | Yes |
| email | String | No | (admin only, not public) |
| photoUrl | String | No |
| status | Enum | Yes | pending, approved, hidden, deleted |
| isFeatured | Boolean | No | Featured reviews shown on homepage |
| submittedAt | DateTime | Auto |
| moderatedAt | DateTime | Auto on status change |

### 16.5 Admin Requirements (`/admin/reviews`)

- List all reviews (all statuses) with filter by status
- View full review detail
- Approve → moves to public display
- Hide → removes from public display (reversible)
- Delete → permanent (with confirmation)
- Feature → appears in homepage reviews preview
- Cannot edit review text (preserves authenticity)
- Can add an internal admin note (not public)

---

## 17. Contact & Location

### 17.1 Data (Known)

- **Restaurant Name:** Naadu Restaurant
- **Address:** 1, 1, S-17, S-17-1143, Kulur Ferry Rd, Chilimbi, BOLOOR, Ladyhill, Mangaluru, Karnataka 575006
- **Phone:** 070223 73444
- **WhatsApp:** `https://wa.me/917022373444`
- **Google Maps URL:** `CONTENT REQUIRED FROM RESTAURANT` (admin configures this)
- **Opening Hours:** `CONTENT REQUIRED FROM RESTAURANT`
- **Instagram:** `CONTENT REQUIRED FROM RESTAURANT`
- **Facebook:** `CONTENT REQUIRED FROM RESTAURANT`
- **Other social:** `CONTENT REQUIRED FROM RESTAURANT`

### 17.2 Implementation Rules

- All contact data is stored in Admin Settings (RestaurantSettings in the database)
- No contact data is hard-coded in frontend components
- Frontend fetches from the settings API on build or at runtime
- If a phone/WhatsApp/social field is empty in settings, the corresponding button/link is hidden on the frontend

### 17.3 Google Maps

- Embedded as an `<iframe>` using the Maps embed URL from Admin settings
- Must be responsive (full-width container)
- Alt text / title for accessibility: "Naadu Restaurant location on Google Maps"
- Do not use the Google Maps JavaScript API in MVP (iframe is sufficient)

---

## 18. Adsterra Monetization

### 18.1 Strategy

The restaurant's primary purpose is customer acquisition and reservations, not advertising revenue. Ads are a secondary income stream and must never compromise the core user experience.

**Approved ad formats:**
- Native Banner (preferred)
- Standard Banner
- Social Bar (limited, non-blocking)

**Explicitly excluded from MVP:**
- Popunder ads
- Push notification ads
- Interstitial ads
- Smartlink in conversion flows

### 18.2 Ad Placement Rules

**Native Banner — Allowed placements:**
- Between content sections on the homepage (below Offers, above Gallery preview)
- Between items in informational/content pages
- On the Reviews page (below review list)
- On the Events page

**Standard Banner — Allowed placements:**
- Sidebar on desktop menu page (if layout allows)
- Below-the-fold on About page
- Below content on Contact page

**Social Bar — Allowed placements:**
- On informational pages only (About, Gallery, Events, Reviews)
- Must not be fixed/sticky if it overlaps any navigation or CTA

**Ad-Free Zones (no ads under any circumstances):**
- Reservation form page (`/reserve`)
- Reservation confirmation page (`/reserve/confirmation`)
- Admin panel (all `/admin/*` routes)
- Navigation header
- Within 200px above or below any primary CTA button (Reserve a Table, Call Now, WhatsApp)
- Food detail page (to preserve conversion intent)

### 18.3 Admin Ads Configuration (`/admin/settings/ads`)

Admin can:
- Toggle all ads globally: Enable / Disable
- Toggle each ad format independently:
  - Native Banner: Enable / Disable
  - Standard Banner: Enable / Disable
  - Social Bar: Enable / Disable
- Input Adsterra placement IDs (zone IDs) for each format
- Configure page-level targeting:
  - Per-page toggle: "Show ads on [Page Name]" for each public page
  - This allows disabling ads on specific pages without code changes
- Configure device targeting (if supported by Adsterra):
  - Desktop only / Mobile only / Both
- "Test mode" toggle: load ad placeholders (grey boxes) instead of real ads — for development and QA

### 18.4 Implementation

- Ad configuration is read from the database (Admin Settings → Ads)
- Ad scripts are injected dynamically based on the configuration — never hard-coded
- Ad scripts must load asynchronously and must not block page rendering
- If an ad call fails, the space simply collapses — no error shown to the user
- Performance: ad scripts must not delay Largest Contentful Paint (LCP)

---

## 19. Configuration System

### 19.1 Philosophy

Configuration is split into two categories:

1. **`config.json`** — Non-sensitive, environment-independent settings that can be version-controlled and modified by admins or developers without secrets.
2. **`.env`** — Sensitive credentials and environment-specific secrets. Never committed to version control.

### 19.2 `config.json` Structure

```json
{
  "restaurant": {
    "name": "Naadu Restaurant",
    "tagline": "CONTENT REQUIRED FROM RESTAURANT",
    "phone": "070223 73444",
    "whatsapp": "+917022373444",
    "address": "1, 1, S-17, S-17-1143, Kulur Ferry Rd, Chilimbi, BOLOOR, Ladyhill, Mangaluru, Karnataka 575006",
    "googleMapsUrl": "CONTENT REQUIRED FROM RESTAURANT",
    "googleMapsEmbedUrl": "CONTENT REQUIRED FROM RESTAURANT"
  },
  "social": {
    "instagram": "CONTENT REQUIRED FROM RESTAURANT",
    "facebook": "CONTENT REQUIRED FROM RESTAURANT"
  },
  "features": {
    "reservationsEnabled": true,
    "reviewSubmissionEnabled": false,
    "offersEnabled": true,
    "eventsEnabled": true,
    "kidsMenuEnabled": true,
    "adsEnabled": true
  },
  "reservation": {
    "maxFutureBookingDays": 60,
    "maxGuestsPerReservation": 20,
    "timeSlotIntervalMinutes": 30,
    "confirmationEmailEnabled": false
  },
  "ads": {
    "globalEnabled": true,
    "nativeBannerEnabled": true,
    "nativeBannerZoneId": "",
    "standardBannerEnabled": true,
    "standardBannerZoneId": "",
    "socialBarEnabled": false,
    "socialBarZoneId": "",
    "pageTargeting": {
      "home": true,
      "menu": true,
      "about": true,
      "gallery": true,
      "reviews": true,
      "events": true,
      "contact": true,
      "offers": true,
      "reserve": false,
      "reserveConfirmation": false,
      "foodDetail": false,
      "kidsMenu": false
    }
  },
  "analytics": {
    "selfHostedEnabled": true
  },
  "seo": {
    "defaultTitle": "Naadu Restaurant — Mangaluru",
    "defaultDescription": "CONTENT REQUIRED FROM RESTAURANT",
    "siteUrl": "CONTENT REQUIRED FROM RESTAURANT"
  },
  "ui": {
    "heroImageUrl": "/images/hero.jpg",
    "logoUrl": "/images/logo.png",
    "primaryColor": "CONTENT REQUIRED FROM RESTAURANT — match brand",
    "showSportsSection": true
  }
}
```

### 19.3 `.env` Contents

```
# Database
DATABASE_URL=

# Authentication
JWT_SECRET=
ADMIN_SESSION_DURATION_HOURS=8

# Email (optional, for notifications)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM_ADDRESS=

# File Storage
STORAGE_PROVIDER=local
STORAGE_LOCAL_PATH=./uploads
# If cloud storage:
STORAGE_CLOUD_BUCKET=
STORAGE_CLOUD_REGION=
STORAGE_CLOUD_ACCESS_KEY=
STORAGE_CLOUD_SECRET_KEY=

# Application
NODE_ENV=production
PORT=3000
```

### 19.4 Settings Editable by Admin (via Admin Panel)

The following can be changed by the admin through the UI without modifying files:
- Restaurant name, phone, WhatsApp, address, maps URL
- Opening hours
- Social media links
- About page text
- SEO page titles and meta descriptions
- Homepage hero image and highlights
- Ad zone IDs and page targeting
- Reservation settings (max guests, booking window)
- Review submission enabled/disabled

Changes made in Admin Settings are stored in the `RestaurantSettings` database collection and fetched by the frontend at runtime or at build time.

---

## 20. Database Architecture

**Recommended Database:** PostgreSQL (primary) or MongoDB (alternative). PostgreSQL is preferred for relational data integrity (reservations, categories, menu items).

---

### 20.1 `Admin`

| Field | Type | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | Primary key |
| email | String | Yes | Unique |
| passwordHash | String | Yes | bcrypt hashed |
| name | String | Yes | Display name |
| role | Enum | Yes | `superadmin`, `manager` (future) |
| lastLoginAt | DateTime | No | |
| createdAt | DateTime | Auto | |
| updatedAt | DateTime | Auto | |

Indexes: `email` (unique)

---

### 20.2 `MenuCategory`

| Field | Type | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | |
| name | String | Yes | |
| slug | String | Yes | Unique, URL-safe |
| description | String | No | |
| imageUrl | String | No | |
| displayOrder | Integer | Yes | Default 0 |
| isEnabled | Boolean | Yes | Default true |
| createdAt | DateTime | Auto | |
| updatedAt | DateTime | Auto | |

Indexes: `slug` (unique), `displayOrder`

---

### 20.3 `MenuItem`

| Field | Type | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | |
| categoryId | UUID (FK) | Yes | References MenuCategory |
| name | String | Yes | Max 100 chars |
| slug | String | Yes | Unique, URL-safe |
| shortDescription | String | Yes | Max 200 chars |
| fullDescription | Text | No | |
| price | Decimal | Yes | 2 decimal places |
| imageUrl | String | No | |
| isVeg | Boolean | Yes | true = veg, false = non-veg |
| isAvailable | Boolean | Yes | Default true |
| isFeatured | Boolean | Yes | Default false |
| isPopular | Boolean | Yes | Default false |
| isKidsMenu | Boolean | Yes | Default false |
| ingredients | Text | No | |
| allergenInfo | Text | No | |
| tags | String[] | No | Array of tag strings |
| viewCount | Integer | Yes | Default 0 — for analytics |
| createdAt | DateTime | Auto | |
| updatedAt | DateTime | Auto | |

Indexes: `slug` (unique), `categoryId`, `isAvailable`, `isFeatured`, `isPopular`, `isKidsMenu`

---

### 20.4 `Reservation`

| Field | Type | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | |
| referenceNumber | String | Yes | Unique. Format: NAADU-YYYYMMDD-NNNN |
| customerName | String | Yes | |
| customerPhone | String | Yes | |
| customerEmail | String | No | |
| reservationDate | Date | Yes | |
| reservationTime | Time | Yes | |
| guestCount | Integer | Yes | |
| specialRequests | Text | No | |
| occasion | String | No | |
| status | Enum | Yes | `pending`, `confirmed`, `rejected`, `cancelled`, `completed` |
| adminNotes | Text | No | Internal only |
| rejectionReason | String | No | |
| ipAddress | String | No | For spam protection — not displayed |
| createdAt | DateTime | Auto | |
| updatedAt | DateTime | Auto | |

Indexes: `status`, `reservationDate`, `customerPhone`, `referenceNumber` (unique)

---

### 20.5 `Offer`

| Field | Type | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | |
| title | String | Yes | |
| description | Text | Yes | |
| discountText | String | Yes | |
| imageUrl | String | No | |
| startDate | Date | Yes | |
| endDate | Date | Yes | |
| terms | Text | No | |
| isActive | Boolean | Yes | Default true |
| createdAt | DateTime | Auto | |
| updatedAt | DateTime | Auto | |

Indexes: `isActive`, `startDate`, `endDate`

---

### 20.6 `GalleryImage`

| Field | Type | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | |
| imageUrl | String | Yes | |
| thumbnailUrl | String | Yes | Auto-generated |
| caption | String | No | |
| altText | String | No | |
| category | Enum | Yes | `food`, `ambience`, `events`, `sports`, `other` |
| isFeatured | Boolean | Yes | Default false |
| isVisible | Boolean | Yes | Default true |
| displayOrder | Integer | Yes | |
| createdAt | DateTime | Auto | |

Indexes: `category`, `isFeatured`, `isVisible`

---

### 20.7 `Review`

| Field | Type | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | |
| customerName | String | Yes | |
| rating | Integer (1–5) | Yes | |
| reviewText | Text | Yes | |
| email | String | No | Admin only |
| photoUrl | String | No | |
| status | Enum | Yes | `pending`, `approved`, `hidden` |
| isFeatured | Boolean | Yes | Default false |
| adminNote | Text | No | Internal only |
| submittedAt | DateTime | Auto | |
| moderatedAt | DateTime | No | |

Indexes: `status`, `isFeatured`, `rating`

---

### 20.8 `Event`

| Field | Type | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | |
| title | String | Yes | |
| description | Text | Yes | |
| eventDate | Date | Yes | |
| eventTime | Time | Yes | |
| imageUrl | String | No | |
| ctaLabel | String | No | |
| ctaUrl | String | No | |
| isPublished | Boolean | Yes | Default false |
| createdAt | DateTime | Auto | |
| updatedAt | DateTime | Auto | |

Indexes: `isPublished`, `eventDate`

---

### 20.9 `RestaurantSettings`

A single-row settings store (or a key-value store). Stores all admin-configurable settings that are not credentials.

| Field | Type | Notes |
|---|---|---|
| id | UUID | Single record |
| restaurantName | String | |
| tagline | String | |
| phone | String | |
| whatsappNumber | String | |
| address | String | |
| googleMapsEmbedUrl | String | |
| googleMapsDirectionsUrl | String | |
| logoUrl | String | |
| instagram | String | |
| facebook | String | |
| openingHours | JSON | Array of `{ day, openTime, closeTime, isClosed }` |
| aboutText | Text | |
| heroImageUrl | String | |
| seoTitle | String | |
| seoDescription | String | |
| highlights | JSON | Array of `{ icon, text }` |
| reservationMaxGuests | Integer | |
| reservationMaxFutureDays | Integer | |
| reviewSubmissionEnabled | Boolean | |
| adsGlobalEnabled | Boolean | |
| adsConfig | JSON | Full ad configuration |
| updatedAt | DateTime | Auto |

---

### 20.10 `AnalyticsEvent`

| Field | Type | Notes |
|---|---|---|
| id | UUID | |
| eventType | String | e.g., `page_view`, `reservation_submit` |
| metadata | JSON | e.g., `{ page: '/menu', itemId: '...' }` |
| sessionId | String | Anonymous identifier |
| createdAt | DateTime | Auto |

Indexes: `eventType`, `createdAt`

---

## 21. API Architecture

**Architecture:** REST API  
**Base URL:** `/api/v1/`  
**Auth header for protected routes:** `Authorization: Bearer <JWT>` (cookie-based in browser)

---

### 21.1 Public API Endpoints

#### Menu Categories

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/v1/categories` | Get all enabled categories |

Response: `{ categories: [ { id, name, slug, imageUrl, description, displayOrder } ] }`

---

#### Menu Items

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/v1/menu` | Get all available menu items (supports `?category=slug`, `?search=text`, `?isVeg=true`) |
| GET | `/api/v1/menu/featured` | Get featured items |
| GET | `/api/v1/menu/popular` | Get popular items |
| GET | `/api/v1/menu/kids` | Get kids menu items |
| GET | `/api/v1/menu/:slug` | Get single item by slug |

Response for list: `{ items: [ { id, name, slug, shortDescription, price, isVeg, imageUrl, isAvailable, isFeatured, isPopular, category } ] }`

---

#### Reservations (Public)

| Method | Route | Purpose |
|---|---|---|
| POST | `/api/v1/reservations` | Submit a new reservation |
| GET | `/api/v1/reservations/reference/:ref` | Get reservation status by reference number |

POST body: `{ customerName, customerPhone, customerEmail?, reservationDate, reservationTime, guestCount, specialRequests?, occasion? }`

POST response: `{ success: true, referenceNumber: "NAADU-20240115-0042", status: "pending" }`

---

#### Offers

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/v1/offers` | Get all currently active offers |

---

#### Gallery

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/v1/gallery` | Get all visible gallery images (supports `?category=food`) |

---

#### Reviews

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/v1/reviews` | Get all approved reviews |
| POST | `/api/v1/reviews` | Submit a review (if review submission is enabled) |

---

#### Events

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/v1/events` | Get upcoming published events |

---

#### Restaurant Settings (Public)

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/v1/settings/public` | Get public restaurant info (name, phone, hours, address, social) |

---

#### Analytics

| Method | Route | Purpose |
|---|---|---|
| POST | `/api/v1/analytics/event` | Record an analytics event (fire and forget) |

Body: `{ eventType, metadata? }`

---

### 21.2 Admin API Endpoints (Protected)

All admin endpoints require a valid admin JWT. Unauthenticated requests return `401 Unauthorized`.

#### Auth

| Method | Route | Purpose |
|---|---|---|
| POST | `/api/v1/admin/auth/login` | Admin login — returns JWT |
| POST | `/api/v1/admin/auth/logout` | Logout — clears cookie |
| GET | `/api/v1/admin/auth/me` | Verify session, return admin info |

---

#### Admin — Menu

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/v1/admin/menu` | List all items (all statuses) |
| POST | `/api/v1/admin/menu` | Create item |
| PUT | `/api/v1/admin/menu/:id` | Update item |
| DELETE | `/api/v1/admin/menu/:id` | Delete item |
| PATCH | `/api/v1/admin/menu/:id/status` | Toggle available/unavailable |

---

#### Admin — Categories

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/v1/admin/categories` | List all categories |
| POST | `/api/v1/admin/categories` | Create category |
| PUT | `/api/v1/admin/categories/:id` | Update category |
| DELETE | `/api/v1/admin/categories/:id` | Delete category |
| PATCH | `/api/v1/admin/categories/reorder` | Update display order |

---

#### Admin — Reservations

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/v1/admin/reservations` | List reservations (filter: `?status=`, `?date=`, `?search=`) |
| GET | `/api/v1/admin/reservations/:id` | Get reservation detail |
| PATCH | `/api/v1/admin/reservations/:id/status` | Update status |
| PATCH | `/api/v1/admin/reservations/:id/note` | Add/update internal note |
| GET | `/api/v1/admin/reservations/export` | Export to CSV |

---

#### Admin — Offers

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/v1/admin/offers` | List all offers |
| POST | `/api/v1/admin/offers` | Create offer |
| PUT | `/api/v1/admin/offers/:id` | Update offer |
| DELETE | `/api/v1/admin/offers/:id` | Delete offer |

---

#### Admin — Gallery

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/v1/admin/gallery` | List all images |
| POST | `/api/v1/admin/gallery/upload` | Upload image (multipart/form-data) |
| PUT | `/api/v1/admin/gallery/:id` | Update image metadata |
| DELETE | `/api/v1/admin/gallery/:id` | Delete image |
| PATCH | `/api/v1/admin/gallery/reorder` | Update display order |

---

#### Admin — Reviews

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/v1/admin/reviews` | List all reviews (filter: `?status=`) |
| PATCH | `/api/v1/admin/reviews/:id/status` | Approve / Hide |
| DELETE | `/api/v1/admin/reviews/:id` | Delete review |

---

#### Admin — Events

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/v1/admin/events` | List all events |
| POST | `/api/v1/admin/events` | Create event |
| PUT | `/api/v1/admin/events/:id` | Update event |
| DELETE | `/api/v1/admin/events/:id` | Delete event |

---

#### Admin — Settings

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/v1/admin/settings` | Get all settings |
| PUT | `/api/v1/admin/settings` | Update settings (partial update supported) |

---

#### Admin — Dashboard / Analytics

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/v1/admin/dashboard` | Get dashboard summary (counts, recent reservations) |
| GET | `/api/v1/admin/analytics` | Get analytics data (supports `?period=7d,30d`) |

---

### 21.3 API Conventions

- All responses: `Content-Type: application/json`
- Success response shape: `{ success: true, data: {...} }` or `{ success: true, data: [...] }`
- Error response shape: `{ success: false, error: { code: "VALIDATION_ERROR", message: "...", fields: {} } }`
- HTTP status codes used correctly: 200, 201, 400, 401, 403, 404, 422, 429, 500
- Dates in ISO 8601 format: `2024-01-15T14:30:00Z`
- Pagination for large lists: `?page=1&limit=20` with response including `{ total, page, limit, data }`

---

## 22. Authentication & Security

### 22.1 Admin Authentication

- Password hashing: **bcrypt** with a minimum cost factor of 12
- JWT: signed with `JWT_SECRET` from `.env`, stored in HTTP-only, SameSite=Strict cookie
- Token expiry: configurable via `.env` (default 8 hours)
- No refresh token in MVP — admin re-logs in after session expiry

### 22.2 Protected Routes

- All `/admin/*` routes check for a valid JWT on every request
- Invalid or expired JWT → redirect to `/admin/login`
- JWT verification happens server-side (middleware), not client-side only

### 22.3 Input Validation

- All API inputs validated server-side using a validation library (e.g., Zod or Joi)
- Client-side validation is supplementary — never the sole validator
- Validated fields: types, lengths, formats, allowed values
- Unrecognized fields are stripped (no extra properties accepted)

### 22.4 File Upload Security

- Accepted MIME types: `image/jpeg`, `image/png`, `image/webp`
- File size limit enforced server-side (not just client-side): 10MB for gallery, 5MB for menu items
- File extension is verified against MIME type (no disguised executable files)
- Files stored outside the web root (not directly accessible via URL without a serving layer)
- Generated filenames use UUID — not original filenames from user

### 22.5 Rate Limiting

- Reservation submission: max 3 per IP per hour
- Admin login: max 5 failed attempts per IP per 15 minutes → 15-minute lockout
- Analytics events: max 100 per IP per minute (fire-and-forget, silent drop on limit)
- Review submission: max 2 per IP per 24 hours

### 22.6 XSS Protection

- All user-generated content (review text, reservation notes) is escaped before rendering
- No `innerHTML` with user content
- Content Security Policy headers set on the server

### 22.7 CSRF

- For cookie-based auth: SameSite=Strict is the primary protection
- Optional: Double-submit cookie pattern for extra safety on state-changing requests

### 22.8 Environment Variables

- All secrets in `.env` — never in source code or `config.json`
- `.env` is in `.gitignore`
- No client-side exposure of server secrets (never pass secrets to Next.js `NEXT_PUBLIC_*` or equivalent)

### 22.9 Database Security

- All database queries use parameterized statements / ORM — no raw string concatenation
- Database credentials only in `.env`
- Minimum privilege principle: app database user has only the permissions it needs

---

## 23. Media Management

### 23.1 Supported Formats

- JPEG / JPG
- PNG
- WebP

### 23.2 File Size Limits

| Use Case | Max Size |
|---|---|
| Menu item image | 5 MB |
| Gallery image | 10 MB |
| Offer image | 5 MB |
| Event image | 5 MB |
| Review photo | 5 MB |
| Restaurant logo | 2 MB |
| Hero image | 10 MB |

### 23.3 Image Processing

On upload, the server automatically:
1. Validates MIME type and file size
2. Generates a UUID-based filename
3. Resizes / optimizes the image:
   - Menu item: max 800×600px, WebP output, quality 80
   - Gallery: max 1920×1280px (full), max 400×300px (thumbnail), WebP output
   - Hero: max 1920×900px, WebP output
4. Stores original (or resized) and thumbnail where applicable
5. Returns the public URL(s)

### 23.4 Storage

**MVP (local storage):**
- Files stored in `/uploads/` on the server filesystem
- Served by the Node.js server or a static file server
- Directory structure: `/uploads/menu/`, `/uploads/gallery/`, `/uploads/offers/`, `/uploads/events/`, `/uploads/reviews/`

**Production (recommended):**
- Cloud object storage (e.g., Cloudflare R2, AWS S3, or Backblaze B2)
- Credentials in `.env`
- CDN-served URLs for performance
- The application code should support both local and cloud via a storage adapter pattern

### 23.5 Image Deletion

- Deleting a record (menu item, gallery image, etc.) does NOT automatically delete the image file in MVP
- A periodic cleanup job or manual cleanup process is acceptable for MVP
- Flag in `config.json`: `"deleteOrphanedImages": false` (future: true)

### 23.6 Alt Text

- Every image must have configurable alt text
- Default alt text fallback: `"[Item/Restaurant name] — Naadu Restaurant"`
- Alt text is stored in the database alongside the image URL

---

## 24. SEO

### 24.1 Page-Level SEO

Every public page must have:
- Unique `<title>` tag
- Unique `<meta name="description">`
- Canonical URL `<link rel="canonical">`
- Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- Twitter card tags (optional but recommended)

**Default title format:** `[Page Name] — Naadu Restaurant, Mangaluru`

| Page | Title Example |
|---|---|
| Home | `Naadu Restaurant — Authentic Dining in Mangaluru` |
| Menu | `Our Menu — Naadu Restaurant, Mangaluru` |
| Reserve | `Reserve a Table — Naadu Restaurant` |
| About | `About Us — Naadu Restaurant` |
| Contact | `Contact & Location — Naadu Restaurant, Mangaluru` |
| Events | `Events & Sports Screening — Naadu Restaurant` |
| Kids Menu | `Kids Menu — Naadu Restaurant` |
| Food Item | `[Item Name] — Naadu Restaurant` |

All titles/descriptions are editable from Admin → Settings → SEO.

### 24.2 Structured Data (Schema.org)

Implement the following JSON-LD schemas:

**Restaurant (on homepage and contact page):**
```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Naadu Restaurant",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1, 1, S-17, S-17-1143, Kulur Ferry Rd, Chilimbi, BOLOOR",
    "addressLocality": "Ladyhill",
    "addressRegion": "Mangaluru, Karnataka",
    "postalCode": "575006",
    "addressCountry": "IN"
  },
  "telephone": "+917022373444",
  "servesCuisine": "CONTENT REQUIRED FROM RESTAURANT",
  "hasMenu": "https://[site-url]/menu",
  "acceptsReservations": true,
  "openingHoursSpecification": "CONTENT REQUIRED FROM RESTAURANT"
}
```

**MenuItem (on food detail pages):**
- Use `MenuItem` schema with `name`, `description`, `offers` (price)

**BreadcrumbList (on food detail pages):**
- Home > Menu > [Category] > [Item Name]

### 24.3 Technical SEO

- `sitemap.xml` generated automatically at `/sitemap.xml`
  - Includes: all public pages, all menu category pages, all food detail pages
  - Excludes: admin pages, confirmation pages
- `robots.txt` at `/robots.txt`:
  - Allow all public pages
  - Disallow `/admin/*`, `/api/*`
- Canonical URLs on all pages
- No duplicate content across category/search parameter variations (use `<link rel="canonical">`)

### 24.4 Local SEO

- Google Business Profile: `CONTENT REQUIRED FROM RESTAURANT` (link from website footer)
- Address and phone number consistent across all pages and schema markup
- Location-specific keywords in page titles where natural: "Mangaluru", "Ladyhill", "Chilimbi"
- Google Maps embedded on homepage and contact page

### 24.5 Image SEO

- All images have descriptive `alt` text
- Images use descriptive filenames where possible
- Lazy loading for off-screen images (`loading="lazy"`)
- Responsive `srcset` for different screen sizes

---

## 25. Accessibility

### 25.1 Standards Target

WCAG 2.1 Level AA compliance.

### 25.2 Semantic HTML

- Correct heading hierarchy: one `<h1>` per page, logical `<h2>`/`<h3>` structure
- Landmark elements: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`
- Use `<button>` for actions, `<a>` for navigation — never style `<div>` as clickable without ARIA
- Form elements use `<label>` with correct `for`/`id` association

### 25.3 Keyboard Navigation

- All interactive elements reachable and operable by keyboard
- Visible focus indicators on all focusable elements (never `outline: none` without replacement)
- Modal/lightbox: focus trapped inside when open, returns to trigger on close
- Skip-to-content link at the top of each page

### 25.4 Forms

- All form inputs have associated labels
- Required fields marked both visually and with `aria-required="true"`
- Error messages linked to their input via `aria-describedby`
- Success/failure states announced to screen readers via `aria-live`

### 25.5 Images

- All meaningful images have descriptive `alt` text
- Decorative images use `alt=""`
- Food images: `alt="[Dish Name] — Naadu Restaurant"`

### 25.6 Color Contrast

- Text on background meets minimum 4.5:1 contrast ratio (normal text)
- Large text: minimum 3:1 ratio
- UI components: minimum 3:1 ratio
- Do not use color as the sole indicator of information (e.g., veg/non-veg indicators use color + text/icon)

### 25.7 Navigation

- Mobile hamburger menu is keyboard and screen-reader accessible
- `aria-expanded` on toggle buttons
- `aria-label` on icon-only buttons (WhatsApp, Call, Social icons)

---

## 26. Performance

### 26.1 Targets

| Metric | Target |
|---|---|
| Largest Contentful Paint (LCP) | < 2.5s on mobile (4G) |
| First Contentful Paint (FCP) | < 1.5s |
| Time to Interactive (TTI) | < 3.5s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Total page weight (homepage) | < 1.5MB |

### 26.2 Image Optimization

- All images converted to WebP on upload
- Responsive images: `srcset` with multiple sizes
- `loading="lazy"` on all below-fold images
- Hero image: preloaded with `<link rel="preload">`
- No images wider than their display size

### 26.3 JavaScript

- Minimize JavaScript bundle size
- Code-split by page (Next.js handles this automatically)
- No blocking JavaScript in `<head>` (except critical)
- Ad scripts load asynchronously, never block rendering

### 26.4 CSS

- No unused CSS in production (purging with Tailwind or equivalent)
- Critical CSS inlined for above-fold content
- No render-blocking CSS

### 26.5 Caching

- Static assets (images, JS, CSS) served with long cache headers
- API responses for menu/settings: short cache (5 minutes) acceptable
- Reservation submission: no caching

### 26.6 Fonts

- Use Google Fonts or self-hosted fonts — no more than 2 font families
- `font-display: swap` to prevent flash of invisible text
- Preload critical font files

### 26.7 Animations

- Avoid animations on low-performance devices (use `prefers-reduced-motion` media query)
- No CPU-intensive animations (parallax, particle effects, complex canvas)
- Transitions: max 300ms, use `transform` and `opacity` only (GPU-composited)

---

## 27. Error Handling

### 27.1 Public-Facing Error States

| Scenario | User-Facing Message |
|---|---|
| Reservation submission fails (server error) | "We're sorry, something went wrong. Please try again or call us at 070223 73444." |
| Reservation form validation fails | Inline field errors highlighting which fields need correction |
| Menu fails to load | "We couldn't load the menu right now. Please refresh or call us." |
| Food item not found (404) | "This item isn't available. Browse our full menu." + Back to Menu button |
| Page not found (404) | "Page not found. Let's get you back on track." + Home + Menu buttons |
| Server error (500) | "Something went wrong on our end. Please try again shortly." |
| Network failure | "Check your internet connection and try again." |
| Image upload fails (admin) | "Image upload failed. Please check the file size and format and try again." |

### 27.2 Admin Error States

- Admin login failure: "Invalid email or password."
- CRUD operation failure: Toast notification: "Failed to save. Please try again."
- Delete confirmation: always show a confirmation dialog before destructive actions
- Session expiry: redirect to login with message "Your session has expired. Please log in again."

### 27.3 Empty States

| Context | Empty State Message |
|---|---|
| No menu items in category | "No items in this category yet." |
| No offers active | "No offers available right now. Check back soon!" |
| No upcoming events | "No upcoming events. Follow us on Instagram for updates." |
| No reviews yet | "Be the first to share your experience!" |
| No gallery images | (Admin adds images — not shown publicly if empty) |

### 27.4 Error Logging

- All server errors logged with timestamp, route, error type, and stack trace
- Logs written to file in production: `/logs/error.log`
- No sensitive customer data in logs
- Raw errors never exposed to public users — always show user-friendly messages

---

## 28. Notifications

### 28.1 MVP Scope

Notifications in MVP are minimal. The goal is not to over-engineer email systems.

### 28.2 Admin Notifications (MVP)

**New Reservation Submitted:**
- If `SMTP_HOST` and related variables are configured in `.env`: send an email to a configured admin notification email address
- Email content:
  - Subject: `New Reservation Request — NAADU-YYYYMMDD-NNNN`
  - Body: Customer name, phone, date, time, guests, special requests
  - Link to admin panel reservation detail
- If email is not configured: no notification sent — admin checks the dashboard

**New Review Submitted (if submission is enabled):**
- Same email notification pattern

### 28.3 Customer Notifications (MVP — Optional)

- If customer provided an email and email is configured: send a reservation confirmation email
- Email content:
  - Subject: `Your Reservation Request at Naadu Restaurant — [Reference Number]`
  - Body: Reference number, date, time, guests, status (Pending), restaurant contact info
  - "If you need to change or cancel, please call 070223 73444"
- No automated status update emails in MVP (admin contacts customer by phone if needed)

### 28.4 Future Notifications (Post-MVP)

- Automated WhatsApp message on reservation confirmation
- Customer email on status change (Confirmed / Rejected)
- SMS integration

---

## 29. Technology Stack

### 29.1 Recommended Stack

| Layer | Technology | Reason |
|---|---|---|
| Frontend | **Next.js 14 (App Router)** | SSR/SSG for SEO, built-in routing, API routes option, React ecosystem |
| Styling | **Tailwind CSS** | Utility-first, easy to maintain, excellent responsive utilities, no unused CSS in production |
| Backend | **Node.js + Express** (separate) or **Next.js API Routes** | Keep backend close to frontend; Next.js API routes reduce deployment complexity for MVP |
| Database | **PostgreSQL** | Relational integrity for reservations + categories + items; well-supported; production-ready |
| ORM | **Prisma** | Type-safe queries, migration management, easy schema changes, excellent PostgreSQL support |
| Authentication | **Custom JWT + bcrypt** | Admin-only; no need for heavyweight auth library |
| Image Processing | **Sharp** | Node.js image processing — resize, WebP conversion, thumbnail generation |
| File Storage (MVP) | **Local filesystem** | Simple for MVP; swap to cloud with storage adapter |
| File Storage (Production) | **Cloudflare R2 or AWS S3** | Cost-effective, CDN-enabled |
| Email | **Nodemailer** | Simple SMTP email sending; works with any email provider |
| Validation | **Zod** | TypeScript-native schema validation for API inputs |
| Deployment | **Railway / Render / Fly.io** | Easy PostgreSQL + Node.js deployment; affordable for small restaurants |

### 29.2 Why This Stack

- **Next.js** is chosen over plain React because SEO is critical for a restaurant website — search engine indexing of the menu, food items, and location pages requires server-side rendering.
- **PostgreSQL + Prisma** is chosen over MongoDB because reservation data, menu categories, and item relationships benefit from relational integrity and Prisma's type-safe query builder reduces bugs.
- **Tailwind CSS** is chosen to avoid design bloat and make it easy to implement a custom visual identity without fighting a pre-built component library.
- The stack is widely documented and maintainable by any developer — not tied to exotic tools.

### 29.3 Design Tokens / Component System

- No third-party component library (Material UI, Ant Design) — the restaurant design should feel custom, not generic
- Build a small set of shared components: Button, Card, Badge, Modal, Toast, Form inputs
- Color palette and typography defined as Tailwind custom theme config

---

## 30. Project Structure

```
naadu-restaurant/
│
├── app/                          # Next.js App Router pages
│   ├── (public)/                 # Public-facing routes
│   │   ├── page.tsx              # Home
│   │   ├── menu/
│   │   │   ├── page.tsx          # Menu listing
│   │   │   ├── [category]/
│   │   │   │   └── page.tsx      # Category-filtered menu
│   │   │   └── item/
│   │   │       └── [slug]/
│   │   │           └── page.tsx  # Food detail
│   │   ├── reserve/
│   │   │   ├── page.tsx          # Reservation form
│   │   │   └── confirmation/
│   │   │       └── page.tsx      # Confirmation page
│   │   ├── offers/page.tsx
│   │   ├── about/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── events/page.tsx
│   │   ├── kids-menu/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── reviews/page.tsx
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   │
│   ├── admin/                    # Admin panel routes (protected)
│   │   ├── login/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── menu/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── categories/page.tsx
│   │   ├── reservations/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── offers/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── reviews/page.tsx
│   │   ├── events/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   └── settings/
│   │       ├── page.tsx          # Settings hub
│   │       ├── general/page.tsx
│   │       ├── hours/page.tsx
│   │       ├── contact/page.tsx
│   │       ├── seo/page.tsx
│   │       ├── homepage/page.tsx
│   │       ├── ads/page.tsx
│   │       └── reservation/page.tsx
│   │
│   └── api/                      # Next.js API routes
│       └── v1/
│           ├── categories/route.ts
│           ├── menu/route.ts
│           ├── menu/[slug]/route.ts
│           ├── reservations/route.ts
│           ├── offers/route.ts
│           ├── gallery/route.ts
│           ├── reviews/route.ts
│           ├── events/route.ts
│           ├── settings/public/route.ts
│           ├── analytics/event/route.ts
│           └── admin/
│               ├── auth/login/route.ts
│               ├── auth/logout/route.ts
│               ├── menu/route.ts
│               ├── categories/route.ts
│               ├── reservations/route.ts
│               ├── offers/route.ts
│               ├── gallery/route.ts
│               ├── gallery/upload/route.ts
│               ├── reviews/route.ts
│               ├── events/route.ts
│               ├── settings/route.ts
│               ├── dashboard/route.ts
│               └── analytics/route.ts
│
├── components/
│   ├── ui/                       # Base design system components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Textarea.tsx
│   │   └── Spinner.tsx
│   ├── public/                   # Public-site-specific components
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── MenuItemCard.tsx
│   │   ├── CategoryTabs.tsx
│   │   ├── ReservationForm.tsx
│   │   ├── OfferCard.tsx
│   │   ├── EventCard.tsx
│   │   ├── GalleryGrid.tsx
│   │   ├── Lightbox.tsx
│   │   ├── ReviewCard.tsx
│   │   ├── StarRating.tsx
│   │   ├── WhatsAppButton.tsx
│   │   ├── MapEmbed.tsx
│   │   └── AdSlot.tsx
│   └── admin/                    # Admin panel components
│       ├── AdminLayout.tsx
│       ├── AdminSidebar.tsx
│       ├── DashboardCard.tsx
│       ├── DataTable.tsx
│       ├── StatusBadge.tsx
│       ├── ImageUploader.tsx
│       └── ConfirmDialog.tsx
│
├── lib/
│   ├── db.ts                     # Prisma client
│   ├── auth.ts                   # JWT utilities
│   ├── validation/               # Zod schemas
│   ├── storage.ts                # Storage adapter (local/cloud)
│   ├── email.ts                  # Email sending
│   ├── analytics.ts              # Analytics event logging
│   ├── rateLimit.ts              # Rate limiting utilities
│   └── utils.ts                  # General utilities (slugify, formatPrice, etc.)
│
├── prisma/
│   ├── schema.prisma             # Database schema
│   ├── migrations/               # Migration files
│   └── seed.ts                   # Seed/demo data
│
├── public/
│   ├── images/                   # Static images (logo, placeholders)
│   ├── icons/                    # SVG icons
│   ├── robots.txt
│   └── favicon.ico
│
├── uploads/                      # Local file upload storage (gitignored)
│   ├── menu/
│   ├── gallery/
│   ├── offers/
│   ├── events/
│   └── reviews/
│
├── config/
│   └── config.json               # Non-sensitive configuration
│
├── types/
│   └── index.ts                  # Shared TypeScript types
│
├── logs/                         # Server logs (gitignored)
│
├── .env                          # Environment variables (gitignored)
├── .env.example                  # Example env file (committed)
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 31. MVP Scope

The following are **included** in MVP (Version 1):

### Public Website
- [x] Home page with all sections
- [x] Menu page with category filter and search
- [x] Food detail pages
- [x] Table reservation form + confirmation
- [x] Offers page
- [x] About page
- [x] Gallery with lightbox
- [x] Events & Sports Screening page
- [x] Kids Menu page
- [x] Reviews page (display only; submission optional/configurable)
- [x] Contact page with Google Maps, WhatsApp, Call
- [x] Privacy Policy page (template — `CONTENT REQUIRED FROM RESTAURANT`)
- [x] Terms page (template — `CONTENT REQUIRED FROM RESTAURANT`)
- [x] Footer with all links
- [x] Mobile-responsive navigation
- [x] SEO — meta tags, schema markup, sitemap, robots.txt

### Admin Panel
- [x] Admin login with JWT authentication
- [x] Dashboard with key metrics
- [x] Menu item management (CRUD, image upload)
- [x] Category management (CRUD, reorder)
- [x] Reservation management (list, detail, status update, notes)
- [x] Offers management (CRUD)
- [x] Gallery management (upload, categorize, reorder)
- [x] Reviews moderation (approve, hide, feature)
- [x] Events management (CRUD)
- [x] Restaurant settings (all admin-editable fields)
- [x] Ads configuration

### Infrastructure
- [x] Adsterra ad slot integration (configurable, non-intrusive)
- [x] Self-hosted analytics event tracking
- [x] Image processing (resize, WebP, thumbnail)
- [x] Rate limiting
- [x] Email notifications (if SMTP configured)
- [x] Config.json architecture
- [x] Seed data with clearly marked placeholders

---

## 32. Future Roadmap

Post-MVP features — **do not implement in Version 1:**

| Feature | Notes |
|---|---|
| Online food ordering | Full cart + order management system |
| Online payment | Razorpay / PayU integration |
| Delivery tracking | Real-time order tracking |
| Customer accounts | Registration, order history, saved preferences |
| Loyalty / rewards program | Points, stamps, discounts |
| Coupon codes | Discount code system |
| WhatsApp automation | Booking confirmations via WhatsApp Business API |
| AI dish recommendations | Based on browsing or preferences |
| Advanced analytics | Funnel analysis, cohort reports, retention |
| Push notifications | Web push for offers and events |
| POS integration | Sync with restaurant POS system |
| Instagram feed embed | Automatic feed pull from Instagram Graph API |
| Multi-language support | English + Kannada / Tulu |
| Table map / floor plan | Interactive table selection |
| QR code menu | Printable QR → digital menu |

---

## 33. Development Phases

### Phase 1: Project Setup & Architecture
**Duration estimate:** 1–2 days

**Build:**
- Next.js project initialized with TypeScript and Tailwind CSS
- Prisma configured with PostgreSQL connection
- Database schema created and initial migration run
- `config.json` and `.env.example` structure defined
- Folder structure set up as per Section 30
- Base UI components created: Button, Card, Badge, Input, Toast
- Admin layout component with sidebar
- Linting, formatting, and build pipeline configured

**Dependencies:** None

**Expected result:** Running development server with correct folder structure, empty pages, and working database connection

**Testing:** `npm run dev` starts without errors. Prisma connects to database.

---

### Phase 2: Database & Seed Data

**Build:**
- Complete Prisma schema for all models (Section 20)
- Run `prisma migrate dev` to create all tables
- Write `seed.ts` with clearly labelled placeholder data:
  - 1 admin account (email + hashed password)
  - 3 menu categories with placeholder names
  - 5 menu items with placeholder names and "PLACEHOLDER — REPLACE BEFORE PRODUCTION" descriptions
  - 1 sample offer (placeholder)
  - 1 sample event (placeholder)
  - 2 sample reviews (pre-approved, placeholder)
  - 5 gallery image placeholders
  - Default `RestaurantSettings` record with known restaurant data

**Expected result:** `prisma db seed` populates all tables with test data

**Testing:** All tables seeded. Admin login works. No errors.

---

### Phase 3: Admin Authentication

**Build:**
- POST `/api/v1/admin/auth/login` — validate email/password, issue JWT in HTTP-only cookie
- POST `/api/v1/admin/auth/logout` — clear cookie
- GET `/api/v1/admin/auth/me` — return session info
- Admin login page (`/admin/login`) with form
- Middleware protecting all `/admin/*` routes
- Redirect to login on unauthorized

**Expected result:** Admin can log in and access protected routes. Non-authenticated users redirected to login.

**Testing:** Correct credentials → dashboard. Wrong credentials → error. Direct URL to /admin/dashboard without login → redirect to /admin/login.

---

### Phase 4: Admin Panel — Core Management

**Build (in this order):**
1. Admin Dashboard (`/admin/dashboard`) — static layout with metric cards and placeholder charts
2. Category Management — full CRUD
3. Menu Management — full CRUD including image upload
4. Reservation Management — list view, detail view, status update actions
5. Offers Management — full CRUD
6. Gallery Management — upload, categorize, delete
7. Reviews Management — list, approve/hide/delete
8. Events Management — full CRUD
9. Restaurant Settings — all fields, all tabs
10. Dashboard — wire up real data from database

**Expected result:** Complete admin panel with working data management for all entities

**Testing:** Create, edit, delete each entity type. Upload images. Update settings. All changes reflect in the database.

---

### Phase 5: Public API Layer

**Build:**
- All public API routes from Section 21.1
- Input validation with Zod on all POST endpoints
- Rate limiting middleware
- Analytics event recording endpoint

**Expected result:** All public API endpoints return correct data. Invalid input returns proper error responses.

**Testing:** API endpoints tested with sample requests. Validation rejects bad data. Rate limiting triggers on repeat requests.

---

### Phase 6: Public Website — Core Pages

**Build:**
- Global layout: Navigation + Footer (data from settings API)
- Home page — all sections (Hero, Features, Featured/Popular dishes, Categories, About, Gallery preview, Events, Reviews, Contact)
- Menu page — category filter, search, item cards
- Food detail page
- About page
- Contact page — with Maps embed

**Expected result:** Public website renders with real data from the API. Menu browse works. Food detail pages are accessible.

**Testing:** Browse all pages on desktop and mobile. All sections render. Category filter works. Food cards link to correct detail pages.

---

### Phase 7: Reservation System

**Build:**
- Reservation form page (`/reserve`)
- Form validation (client-side + server-side)
- POST reservation to API
- Reference number generation
- Reservation confirmation page
- Admin notification email (if SMTP configured)
- Rate limiting on reservation submission
- Spam honeypot

**Expected result:** Customer can submit a reservation. Confirmation page shows reference number. Admin sees new reservation in panel.

**Testing:** Submit valid reservation → confirmation page shown → record in database → admin sees it. Submit invalid data → correct field errors shown. Exceed rate limit → error shown.

---

### Phase 8: Supporting Pages

**Build:**
- Offers page
- Gallery page with lightbox
- Events page
- Kids Menu page
- Reviews page (display + optional submission form)
- Privacy Policy page (template)
- Terms page (template)
- 404 error page
- 500 error page

**Expected result:** All public pages render correctly. Gallery lightbox works. Reviews show with star ratings.

**Testing:** Visit all pages. Test lightbox on mobile and desktop. Test review display. Test empty states.

---

### Phase 9: SEO, Performance & Accessibility

**Build:**
- Meta tags on all pages (title, description, og:*, canonical)
- JSON-LD schema markup (Restaurant, MenuItem, BreadcrumbList)
- `sitemap.xml` generation
- `robots.txt`
- Image alt text on all images
- Skip-to-content link
- Keyboard navigation audit and fixes
- `loading="lazy"` on images
- Hero image preload
- Font optimization (`font-display: swap`)
- Tailwind CSS purge verification
- `prefers-reduced-motion` applied to animations

**Expected result:** All pages pass Lighthouse SEO audit score 90+. Accessibility score 85+. Core Web Vitals in green ranges.

**Testing:** Run Lighthouse on Home, Menu, Food Detail, Reserve, Contact. Fix any failures.

---

### Phase 10: Adsterra Integration

**Build:**
- `AdSlot` component that reads from Admin settings
- Dynamic ad script injection based on zone ID and page targeting config
- Ad-free zone enforcement (reservation pages, admin, food detail)
- Test mode (placeholder boxes instead of real ads)
- Admin settings UI for all ad configuration

**Expected result:** Ads appear on configured pages. Ads are absent from conversion-critical pages. Admin can enable/disable without code changes.

**Testing:** Enable ads, check they appear in correct locations. Disable globally, confirm none appear. Check reservation page has no ads.

---

### Phase 11: Testing & QA

**Build:**
- Manual test pass against all items in Section 34 (Testing Plan)
- Cross-browser check: Chrome, Firefox, Safari, Edge
- Device testing: Android phone, iPhone, tablet, laptop, desktop
- Performance audit: Lighthouse and WebPageTest
- Accessibility audit: axe DevTools or Wave
- Security review: check input validation, rate limiting, auth protection

**Expected result:** All critical flows work correctly across devices and browsers. Performance targets met. No critical accessibility or security issues.

---

### Phase 12: Production Deployment

**Build:**
- Production environment configuration
- Database migration on production
- Admin seed account created on production
- File storage configured (cloud if applicable)
- Domain configured
- SSL certificate (HTTPS required)
- Environment variables set in production
- Final smoke test of all public pages and admin panel

**Expected result:** Live, publicly accessible website. Admin panel accessible. Reservations being stored. All pages loading correctly.

---

## 34. Testing Plan

### 34.1 Mobile Testing

- [ ] All public pages render correctly on 375px (iPhone SE)
- [ ] All public pages render correctly on 390px (iPhone 14)
- [ ] Navigation hamburger menu opens and closes correctly
- [ ] Reservation form is fully usable on mobile
- [ ] Menu category filter is scrollable horizontally on mobile
- [ ] Food cards are readable and tappable on mobile
- [ ] Gallery lightbox opens and navigates correctly on mobile
- [ ] WhatsApp button opens WhatsApp app
- [ ] Call button opens phone dialer
- [ ] Maps embed loads on mobile

### 34.2 Desktop Testing

- [ ] All public pages render correctly at 1280px and 1440px
- [ ] Navigation displays correctly (no hamburger on desktop)
- [ ] Admin panel is fully usable on desktop
- [ ] Admin tables display all columns correctly

### 34.3 Reservation Testing

- [ ] Valid reservation can be submitted
- [ ] Confirmation page shows reference number
- [ ] Reservation appears in admin panel
- [ ] Invalid phone number shows error
- [ ] Past date is rejected
- [ ] Required fields validated on submit
- [ ] Rate limiting activates on excess submissions
- [ ] Duplicate phone number warning shown (if configured)

### 34.4 Admin Panel Testing

- [ ] Admin login with correct credentials → dashboard
- [ ] Admin login with wrong credentials → error, no access
- [ ] Direct URL to /admin/dashboard without login → redirect to login
- [ ] Add menu item with image → appears on public menu
- [ ] Edit menu item → changes reflect on public menu
- [ ] Delete menu item → removed from public menu (with confirmation)
- [ ] Mark item as unavailable → shows as unavailable on public menu
- [ ] Mark item as featured → appears in homepage featured section
- [ ] Add category → appears in menu filter
- [ ] Disable category → category and items hidden from public menu
- [ ] Confirm reservation → status changes to Confirmed
- [ ] Reject reservation → status changes to Rejected
- [ ] Add offer → appears on offers page
- [ ] Set offer end date to yesterday → offer no longer appears publicly
- [ ] Upload gallery image → appears in gallery
- [ ] Delete gallery image → removed from gallery (with confirmation)
- [ ] Approve review → appears on reviews page
- [ ] Hide review → removed from reviews page
- [ ] Create event → appears on events page
- [ ] Unpublish event → removed from events page
- [ ] Update restaurant settings → changes reflect on public site

### 34.5 Form Testing

- [ ] All required fields show errors when empty
- [ ] Invalid email format rejected
- [ ] Invalid phone format rejected
- [ ] Form data preserved on validation failure (no data loss)
- [ ] Success state shown on valid submission

### 34.6 Image Upload Testing (Admin)

- [ ] Valid JPEG upload succeeds
- [ ] Valid PNG upload succeeds
- [ ] File over 10MB rejected with clear error
- [ ] Non-image file rejected with clear error
- [ ] Uploaded image appears in correct location on public site

### 34.7 Error State Testing

- [ ] 404 page shown for non-existent menu item slug
- [ ] 404 page shown for non-existent URL
- [ ] Menu still works if 1 item has no image (placeholder shown)
- [ ] Offers section hidden on homepage if no active offers

### 34.8 Security Testing

- [ ] Cannot access /admin/* routes without valid session
- [ ] API returns 401 for protected endpoints without auth
- [ ] Submitting HTML/script in reservation fields is safely escaped in storage and display
- [ ] Rate limiting blocks excessive reservation submissions

### 34.9 SEO Testing

- [ ] Each page has unique title and description
- [ ] Home page has Restaurant schema markup
- [ ] Food detail page has breadcrumb schema
- [ ] Sitemap.xml is accessible and contains all public URLs
- [ ] Robots.txt disallows /admin/* and /api/*
- [ ] All images have alt text

### 34.10 Performance Testing

- [ ] Homepage Lighthouse Performance score ≥ 80 (mobile)
- [ ] Images lazy-load below fold
- [ ] Hero image loads without layout shift
- [ ] No render-blocking resources on critical path

### 34.11 Ads Testing

- [ ] Ads appear on home page in correct locations
- [ ] Ads do NOT appear on /reserve or /reserve/confirmation
- [ ] Ads do NOT appear in admin panel
- [ ] Disabling ads globally in Admin settings removes all ads
- [ ] Test mode shows placeholder boxes correctly
- [ ] Ad scripts load asynchronously and do not block page

### 34.12 Accessibility Testing

- [ ] All pages pass basic axe DevTools scan with 0 critical errors
- [ ] Tab navigation reaches all interactive elements
- [ ] Focus indicators visible on all focusable elements
- [ ] Screen reader announces form errors correctly
- [ ] Gallery lightbox keyboard navigable (arrow keys, Escape)

---

## 35. Deployment

### 35.1 Recommended Hosting

| Service | Use Case |
|---|---|
| **Railway** | Full-stack Next.js + PostgreSQL, simple deployment, affordable |
| **Render** | Alternative — Next.js + PostgreSQL, free tier available |
| **Fly.io** | Alternative — more control, slightly more setup |
| **Vercel** (frontend only) | If backend is separated; less ideal for file uploads |

### 35.2 Environment Setup

1. Create a PostgreSQL database on the chosen provider
2. Set all `.env` variables in the deployment provider's environment configuration
3. Run `prisma migrate deploy` on the production database
4. Run `prisma db seed` to create the initial admin account
5. Configure custom domain
6. Enable HTTPS (most providers handle this automatically)
7. Test all pages in production before going live

### 35.3 Uploads Storage in Production

- In MVP: uploads stored on the server filesystem — note that deployments may reset the filesystem on some providers (Railway persists volumes; Vercel does not support persistent local files)
- If using a provider with ephemeral filesystems: configure cloud storage (Cloudflare R2 or AWS S3) before going live
- Set `STORAGE_PROVIDER=cloud` in `.env` and fill cloud credentials

### 35.4 Domain Configuration

- `CONTENT REQUIRED FROM RESTAURANT` — domain name
- Configure DNS A record or CNAME to point to the hosting provider
- Enforce HTTPS — HTTP requests should redirect to HTTPS

---

## 36. Production Checklist

### Pre-Launch

**Content:**
- [ ] All "CONTENT REQUIRED FROM RESTAURANT" placeholders replaced with real content
- [ ] Opening hours entered in Admin Settings
- [ ] At least 3–5 real menu categories created
- [ ] Real menu items entered with prices and images
- [ ] At least 1 restaurant photo uploaded to Gallery
- [ ] Hero image uploaded
- [ ] Logo uploaded
- [ ] Google Maps embed URL configured
- [ ] WhatsApp number verified
- [ ] Social media links entered
- [ ] About page text written
- [ ] Privacy Policy reviewed (legal — do not use the template without review)
- [ ] Terms reviewed

**Technical:**
- [ ] Admin password changed from seed default to a strong password
- [ ] `JWT_SECRET` set to a strong random string in production
- [ ] `NODE_ENV=production` set
- [ ] Database is production-grade (not a development or free tier with limited storage)
- [ ] File uploads persist correctly (test by uploading an image and restarting the server)
- [ ] Email notifications tested (if configured)
- [ ] HTTPS enabled
- [ ] Custom domain configured
- [ ] `sitemap.xml` accessible
- [ ] `robots.txt` accessible and correct
- [ ] All ad zone IDs entered if Adsterra monetization is active
- [ ] Rate limiting tested

**Quality:**
- [ ] Website tested on a real mobile device (Android + iPhone if possible)
- [ ] Reservation submitted and confirmed from the admin panel
- [ ] All nav links work
- [ ] Footer links work
- [ ] WhatsApp button opens correct number
- [ ] Call button dials correct number
- [ ] Google Maps opens correct location
- [ ] No broken images

### Post-Launch

- [ ] Submit website URL to Google Search Console
- [ ] Submit sitemap to Google Search Console
- [ ] Check Google Business Profile for Naadu Restaurant — add website URL
- [ ] Monitor reservation dashboard daily

---

## 37. Content Required From Restaurant

The following information must be provided by Naadu Restaurant before the website can go live. Every item marked `CONTENT REQUIRED FROM RESTAURANT` in this document maps to an entry below.

| # | Item | Where Used | Notes |
|---|---|---|---|
| 1 | Restaurant tagline / short slogan | Hero section, SEO | 1–2 sentences max |
| 2 | Opening hours (days + times) | Admin Settings → Hours, Contact page, Footer | All days of the week |
| 3 | Google Maps embed URL | Homepage map, Contact page | Copy from Google Maps → Share → Embed |
| 4 | Google Maps directions URL | "Get Directions" button | Copy full Maps URL |
| 5 | Instagram profile URL | Social section, Footer | Full URL |
| 6 | Facebook page URL (if any) | Footer, Contact | Full URL |
| 7 | About page text | About page | Restaurant story, philosophy, history |
| 8 | Cuisine type(s) | Schema markup, About page | e.g., "South Indian, Coastal Karnataka" |
| 9 | Restaurant highlights (3–4) | Homepage highlights bar | Short, factual statements |
| 10 | Complete menu (all items) | Menu management | Category, name, description, price, veg/non-veg |
| 11 | Food photography | Menu items, Gallery | High-quality photos of dishes |
| 12 | Restaurant photos | Hero, About, Gallery | Interior, exterior, ambience |
| 13 | Logo | Header, Footer | PNG or SVG, transparent background preferred |
| 14 | Kids menu section intro text | Kids Menu page | Short welcome message |
| 15 | Sports/events static banner text | Events section (homepage) | If no upcoming events are scheduled |
| 16 | Privacy Policy text | /privacy | Must be reviewed by restaurant before use |
| 17 | Terms & Conditions text | /terms | Must be reviewed by restaurant before use |
| 18 | Domain name | Deployment | The website URL |
| 19 | Admin email address | Admin account, notifications | For login and email notifications |
| 20 | Notification email address | Where reservation emails are sent | Can be same as admin email |
| 21 | SMTP email credentials | `.env` | For email notifications (optional) |

---

## 38. Final Acceptance Criteria

The website is considered production-ready when ALL of the following are true:

### Public Website
- [ ] Home page loads in under 3 seconds on mobile (4G connection)
- [ ] All navigation links work on desktop and mobile
- [ ] Menu browse works: category filter, search, veg/non-veg toggle
- [ ] Every menu item links to a working food detail page
- [ ] Reservation form can be submitted successfully and shows a confirmation with a reference number
- [ ] Admin can see the submitted reservation in the admin panel
- [ ] Offers page shows active offers only
- [ ] Gallery opens with working lightbox on mobile and desktop
- [ ] Events page shows upcoming events correctly
- [ ] Kids menu page displays kids items
- [ ] Reviews page shows approved reviews
- [ ] Contact page shows correct address, phone, maps, and working WhatsApp / Call buttons
- [ ] All known restaurant data (address, phone) is correct throughout the site
- [ ] Footer links and copyright are correct
- [ ] 404 page is shown for invalid URLs
- [ ] Website is fully usable on iPhone SE (375px) and modern Android phones

### Admin Panel
- [ ] Admin can log in with correct credentials
- [ ] Admin cannot log in with wrong credentials
- [ ] Admin can add, edit, delete menu items with images
- [ ] Admin can manage categories including reordering
- [ ] Admin can confirm and reject reservations
- [ ] Admin can manage offers with date ranges
- [ ] Admin can upload and categorize gallery images
- [ ] Admin can approve and hide reviews
- [ ] Admin can create and publish events
- [ ] Admin can update all restaurant settings and see changes reflect on the public site
- [ ] Admin can configure and toggle Adsterra ad placements without code changes

### SEO & Performance
- [ ] Every page has a unique, descriptive title and meta description
- [ ] Sitemap.xml is valid and accessible
- [ ] Robots.txt is correct
- [ ] Restaurant structured data is present on the homepage
- [ ] Lighthouse SEO score ≥ 90 on homepage
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1 on mobile

### Security
- [ ] Admin routes are inaccessible without a valid session
- [ ] User input is sanitized and escaped in storage and display
- [ ] No secrets appear in frontend JavaScript bundles or `config.json`
- [ ] Rate limiting is active on reservation and login endpoints

### Ads
- [ ] Ads are absent from the reservation form and confirmation pages
- [ ] Ads are absent from the admin panel
- [ ] Ads can be globally disabled from admin settings
- [ ] Adsterra zone IDs are configurable without code deployment

---

*End of PRD — Naadu Restaurant v1.0*

*All placeholder content is clearly marked. No restaurant information has been invented. This document is ready for implementation.*
