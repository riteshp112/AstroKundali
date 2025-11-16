Kundali Maker App: UI/UX Design Brief

This document outlines the design strategy, feature set, and screen-by-screen breakdown for a modern Kundali (Vedic Astrology Birth Chart) maker application.

1. Project Overview

App Name (Suggestion): Nakshatra or AstroKundali

Primary Goal: To provide a simple, accurate, and visually appealing platform for users to generate, view, and manage their Vedic astrology birth charts.

Target Audience:

Individuals in India and abroad interested in their personal astrology.

Families creating charts for newborns or for matchmaking.

Amateur astrology students and enthusiasts.

2. Visual Design & Branding

Tone & Feel: Trustworthy, modern, clean, spiritual, and respectful of traditional aesthetics.

Color Palette:

Primary: Deep Indigo/Navy Blue (#2B3A67) - Represents the cosmos, depth, and trust.

Secondary: Muted Gold/Saffron (#FFB946) - Represents spirituality, knowledge, and prosperity.

Accent: Soft Teal (#48D1CC) or Maroon (#800000) - For call-to-action buttons (CTAs) and highlights.

Neutrals: Cream (#FFF9F0) for backgrounds (softer than pure white) and Dark Grey (#333333) for text.

Typography:

Headings: A modern serif font with a touch of elegance (e.g., Playfair Display or Lora).

Body & UI: A clean, highly legible sans-serif font (e.g., Inter or Poppins).

3. Core Features (User Stories)

As a new user, I want to:

Quickly generate a Kundali without creating an account (Guest Mode).

Create an account to save my profiles and access them later.

As a returning user, I want to:

See a dashboard of all my saved profiles (e.g., "Me," "My Son," "My Partner").

Create a new Kundali profile by entering a Name, Date of Birth, Time of Birth, and Place of Birth.

Easily find the Place of Birth using a search-friendly map/city finder (essential for lat/long).

As a user viewing a Kundali, I want to:

See the main Lagna (Ascendant) chart clearly.

Toggle between different chart styles (North Indian, South Indian, East Indian).

View basic planetary details (Planet, Rashi, Degree, Nakshatra).

Check my Vimshottari Dasha (major planetary periods).

See basic Panchang details for my birth (Tithi, Vara, Nakshatra, Yoga, Karana).

Download a simple PDF summary of my chart.

4. Screen-by-Screen Breakdown (Wireframes)

This is the blueprint for your Figma screens.

Screen 1: Splash & Onboarding

Components:

App Logo (e.g., a stylized constellation or lotus).

App Name & Tagline (e.g., "AstroKundali: Your cosmic map").

Simple animation or graphic.

Flow: Automatically transitions to the Home/Login screen after 2-3 seconds.

Screen 2: Welcome / Home (Guest)

Purpose: The main entry point for new users.

Components:

Hero Section: A beautiful, calming astrological graphic.

Primary CTA: A prominent button: "Create New Kundali".

Secondary CTA: "Login / Sign Up" (less prominent, perhaps top-right).

Value Proposition: "Enter your birth details to discover your complete Vedic birth chart."

Screen 3: Create Kundali Form (Crucial Screen)

Purpose: To collect the necessary data with high accuracy.

Components:

Form Title: "Create Your Kundali"

Input Field: "Full Name"

Input Field: "Date of Birth" (Use a native calendar/date picker).

Input Field: "Time of Birth" (Use a native time picker).

Input Field: "Place of Birth (City, Country)"

CRITICAL: This must be powered by a Google Places API (or similar) to autocomplete and fetch the exact latitude and longitude automatically. As the user types, suggestions appear.

Toggle: "Save this profile to my account?" (Appears if the user is logged in).

Primary CTA: "Generate Kundali" (This button should have a loading state).

Screen 4: Kundali View (Main Report)

Purpose: To display the generated Kundali in a clear, tabbed interface.

Components:

Header: Shows the Profile Name, DoB, ToB, and PoB.

Sub-Header (Tabs): This is the core navigation for the report.

Chart | Planets | Dasha | Details

Settings Icon (Top Right):

Allows user to change Chart Style (North Indian, South Indian).

"Download PDF" option.

Tab 1: Chart (Default)

The main visual: The Kundali (Lagna Chart) in the selected style.

A simple toggle to switch to Navamsa (D9) chart.

Tab 2: Planets

A clean, responsive table.

Columns: Planet | Rashi (Sign) | House | Degree | Nakshatra | Pada

Tab 3: Dasha

Displays the current Vimshottari Dasha.

A nested/expandable list showing Mahadasha, Antardasha, and Pratyantardasha periods with start/end dates.

Tab 4: Details

Basic Panchang info in a list format:

Tithi:

Vara (Weekday):

Nakshatra:

Yoga:

Karana:

Basic ascendant details (Lagna, Lagna Lord, etc.).

Screen 5: My Profiles (Logged-in Home)

Purpose: The dashboard for a logged-in user.

Components:

Header: "My Kundalis"

Primary CTA: "Add New Profile" (Floating Action Button in the corner).

List: A card-based list of all saved profiles.

Each Card:

Name ("Rohan," "My Daughter")

DoB & ToB

A "View Kundali >" link.

Screen 6: Login / Settings

Purpose: Account management.

Components:

Login Options: Email/Password, Sign in with Google, Sign in with Apple.

Logged-in View (Settings):

"Edit Profile"

"Default Chart Style" (North/South)

"Language"

"Logout"

## Developer Setup

To run the new React (Vite) frontend locally:

- Install dependencies:

```bash
cd /workspaces/AstroKundali
npm install
```

- Start dev server:

```bash
npm run dev
```

The app will be served by Vite (usually at `http://localhost:5173`).

Next steps you may want me to implement:

- Add Google Places autocomplete for the Place field.
- Implement Kundali generation logic / backend integration.
- Add routing and the app screens from the design brief.
