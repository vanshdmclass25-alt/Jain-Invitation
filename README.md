# Jain Tapasya Pārna Invitation

A premium, responsive invitation web platform inspired by the interactive door-reveal and template-customization flow of digital invitation studios, designed with reverence for **Jain spirituality, tapasya, simplicity, purity, peace, and celebration of Pārna**.

---

## 1. How to Run the Project Locally

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be running on `http://localhost:3000`.

3. **Build for production:**
   ```bash
   npm run build
   ```

---

## 2. How to Replace Template Images & Pinterest Reference Designs

The project follows a modular, decoupled asset management architecture:

- **Configuration File:** All asset paths and SVG vector components are mapped in `/src/config/assets.tsx`.
- **Public Assets Directory:** Place your high-resolution photographs, textures, or custom door illustrations in `/public/assets/`:
  - `/public/assets/doors/` — Custom 3D door textures or artwork
  - `/public/assets/template-1/` — Rajwada borders and motifs
  - `/public/assets/template-2/` — Shwet editorial accents
  - `/public/assets/template-3/` — Sukoon botanical lotus motifs
  - `/public/assets/template-4/` — Divya celestial evening frames
- **Templates Definition:** To modify color palettes, fonts, borders, or door gradients, edit `/src/config/templates.ts`.

---

## 3. How Form Data Flows into the Live Preview

1. **Central State Management:**
   - The user inputs (Name, Portrait, Tapasya Type, Date, Time, Venue, Maps URL, Family Photos, Additional Details) are stored in a centralized `InvitationData` state inside `/src/App.tsx`.
2. **Immediate Two-Way Synchronization:**
   - Every keystroke and image upload immediately updates the reactive state.
   - The state is passed as props directly into `<InvitationCard />`, which re-renders in real-time on both desktop (side-by-side) and mobile views.
3. **Local & URL Persistence:**
   - Data is automatically saved to browser `localStorage` (`jain_parna_invitation_data_v1`).
   - When the user clicks "Share on WhatsApp" or "Share Link", the data is encoded into the URL parameter (`?invitation=...`), allowing recipients on other devices or phones to load the exact personalized invitation upon opening.

---

## 4. How to Deploy to Vercel

1. Push your code to GitHub, GitLab, or Bitbucket.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**. Vercel will build and serve your static single-page application globally on its high-speed edge CDN.

---

## 5. How to Connect Backend/Database Later (Firebase / Supabase)

If you wish to store RSVPs, guest attendance confirmations, or save invitations to a persistent cloud database:

1. **Option A: Firebase Firestore**
   - Initialize Firebase client in `/src/lib/firebase.ts` with your config.
   - Create a collection `invitations`:
     ```ts
     import { doc, setDoc, getDoc } from 'firebase/firestore';
     // Save invitation
     await setDoc(doc(db, 'invitations', invitationId), invitationData);
     ```
   - Generate short URLs: `https://yourdomain.com/i/[invitationId]`
2. **Option B: Supabase (PostgreSQL)**
   - Create an `invitations` table with columns `id`, `name`, `tapasya_type`, `date`, `venue`, `template_id`, `created_at`.
   - Use the `@supabase/supabase-js` client to insert and fetch invitations.

---

## 6. Visual Design & Jain Spiritual Reverence

- **Zero Religious Clutter:** Strictly free from Ganpati, marigolds, or non-Jain religious illustrations.
- **Jain Motifs:** Sacred Lotus with Anjali Mudra (praying hands) based on traditional Jain Tapasya Pārna iconography, Dhyana Mudra (Bhagwan Mahavir meditation posture), and auspicious Navkar / Jain sutras (*॥ श्री महावीराय नमः ॥*, *॥ ॐ नमो जिणाणं ॥*, *मिच्छामि दुक्कडं*).
- **Curated Typography:** Cinzel display headings, Cormorant Garamond elegant serifs, Marcellus classical typography, and Tiro Devanagari Hindi.
- **Ambient Sound:** Web Audio API meditative acoustic drone with soft harmonic resonance (optional, starts only upon user tap).
