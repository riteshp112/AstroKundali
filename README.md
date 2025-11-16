# ✨ AstroKundali: Kundali Maker App

> **UI/UX Design Brief** — A comprehensive guide for building a modern Vedic Astrology Birth Chart maker.

---

## 1. 🌟 Project Overview

### App Name
**Nakshatra** or **AstroKundali**

### Primary Goal
To provide a simple, accurate, and visually appealing platform for users to generate, view, and manage their Vedic astrology birth charts.

### 👥 Target Audience

- 🌍 Individuals in India and abroad interested in their personal astrology
- 👨‍👩‍👧 Families creating charts for newborns or for matchmaking
- 📚 Amateur astrology students and enthusiasts

## 2. 🎨 Visual Design & Branding

### Tone & Feel
✅ Trustworthy • Modern • Clean • Spiritual • Respectful of traditional aesthetics

### 🎭 Color Palette

| Role | Color | Hex | Meaning |
|------|-------|-----|---------|
| **Primary** | Deep Indigo/Navy Blue | `#2B3A67` | Cosmos, depth, trust |
| **Secondary** | Muted Gold/Saffron | `#FFB946` | Spirituality, knowledge, prosperity |
| **Accent 1** | Soft Teal | `#48D1CC` | CTAs & highlights |
| **Accent 2** | Maroon | `#800000` | CTAs & highlights |
| **Neutral (BG)** | Cream | `#FFF9F0` | Softer than pure white |
| **Neutral (Text)** | Dark Grey | `#333333` | Body text |

### 📝 Typography

| Element | Font | Purpose |
|---------|------|---------|
| **Headings** | Playfair Display or Lora | Modern serif, elegant touch |
| **Body & UI** | Inter or Poppins | Clean, highly legible sans-serif |

## 3. ⚙️ Core Features (User Stories)

### 🆕 As a new user, I want to:
- ⚡ Quickly generate a Kundali without creating an account (Guest Mode)
- 💾 Create an account to save my profiles and access them later

### 🔄 As a returning user, I want to:
- 📋 See a dashboard of all my saved profiles (e.g., "Me," "My Son," "My Partner")
- ✏️ Create a new Kundali profile by entering Name, Date of Birth, Time of Birth, and Place of Birth
- 🗺️ Easily find the Place of Birth using a search-friendly map/city finder (essential for lat/long)

### 👁️ As a user viewing a Kundali, I want to:
- 📊 See the main Lagna (Ascendant) chart clearly
- 🔀 Toggle between different chart styles (North Indian, South Indian, East Indian)
- ⭐ View basic planetary details (Planet, Rashi, Degree, Nakshatra)
- ⏱️ Check my Vimshottari Dasha (major planetary periods)
- 📅 See basic Panchang details for my birth (Tithi, Vara, Nakshatra, Yoga, Karana)
- 📥 Download a simple PDF summary of my chart

## 4. 🎬 Screen-by-Screen Breakdown (Wireframes)

> This is the blueprint for your Figma screens.

### 🎬 Screen 1: Splash & Onboarding

**Components:**
- 🎨 App Logo (e.g., a stylized constellation or lotus)
- 📝 App Name & Tagline (e.g., "AstroKundali: Your cosmic map")
- ✨ Simple animation or graphic
- ⏱️ **Flow:** Automatically transitions to Home/Login after 2-3 seconds

### 🏠 Screen 2: Welcome / Home (Guest)

**Purpose:** Main entry point for new users

**Components:**
- 🎨 **Hero Section:** A beautiful, calming astrological graphic
- 🔴 **Primary CTA:** A prominent button: "Create New Kundali"
- ⚪ **Secondary CTA:** "Login / Sign Up" (less prominent, top-right)
- 💡 **Value Proposition:** "Enter your birth details to discover your complete Vedic birth chart"

### 📝 Screen 3: Create Kundali Form (Crucial Screen)

**Purpose:** Collect necessary data with high accuracy

**Components:**
- 📋 **Form Title:** "Create Your Kundali"
- 👤 **Input Field:** "Full Name"
- 📅 **Input Field:** "Date of Birth" (native calendar/date picker)
- 🕐 **Input Field:** "Time of Birth" (native time picker)
- 🌐 **Input Field:** "Place of Birth (City, Country)"

> ⚠️ **CRITICAL:** This must be powered by **Google Places API** (or similar) to autocomplete and fetch exact latitude/longitude automatically. Suggestions appear as user types.

- 💾 **Toggle:** "Save this profile to my account?" (if logged in)
- 🟢 **Primary CTA:** "Generate Kundali" (with loading state)

### 📊 Screen 4: Kundali View (Main Report)

**Purpose:** Display generated Kundali in a clear, tabbed interface

**Components:**
- 📄 **Header:** Profile Name, DoB, ToB, PoB
- 📑 **Sub-Header (Tabs):** Core navigation
  - `Chart` | `Planets` | `Dasha` | `Details`
- ⚙️ **Settings Icon (Top Right):** Change Chart Style & "Download PDF"

| Tab | Description |
|-----|-------------|
| **Tab 1: Chart** *(Default)* | Main Lagna chart + toggle for Navamsa (D9) |
| **Tab 2: Planets** | Clean table: Planet \| Rashi \| House \| Degree \| Nakshatra \| Pada |
| **Tab 3: Dasha** | Vimshottari Dasha + expandable list (Maha/Antar/Pratyantardasha) |
| **Tab 4: Details** | Basic Panchang: Tithi, Vara, Nakshatra, Yoga, Karana |

### 👤 Screen 5: My Profiles (Logged-in Home)

**Purpose:** Dashboard for logged-in users

**Components:**
- 📋 **Header:** "My Kundalis"
- ➕ **Primary CTA:** "Add New Profile" (Floating Action Button)
- 📑 **List:** Card-based layout of all saved profiles
- 📄 **Each Card:** Name + DoB & ToB + "View Kundali >" link

### 🔐 Screen 6: Login / Settings

**Purpose:** Account management

**Components:**
- 🔑 **Login Options:** Email/Password, Sign in with Google, Sign in with Apple
- ⚙️ **Logged-in View (Settings):**
  - Edit Profile
  - Default Chart Style (North/South)
  - Language
  - Logout

---

## 💻 Developer Setup

### Quick Start

To run the new React (Vite) frontend locally:

**1️⃣ Install dependencies:**
```bash
cd /workspaces/AstroKundali
npm install
```

**2️⃣ Start dev server:**
```bash
npm run dev
```

📝 The app will be served by Vite at `http://localhost:5173`

### 🎯 Next Implementation Steps

- [ ] Add Google Places autocomplete for the Place field
- [ ] Implement Kundali generation logic / backend integration
- [ ] Add routing and all app screens from the design

### 🔑 Environment Variables (Google Maps Places)

To enable **Place field autocomplete** with real-time latitude/longitude capture:

**1️⃣ Create `.env` file at project root:**
```bash
# .env
VITE_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
```

**2️⃣ Restart dev server:**
```bash
npm run dev
```

✅ The frontend will load Google Maps Places library and auto-populate coordinates when user selects a place.