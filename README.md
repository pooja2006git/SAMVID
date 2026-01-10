# SAMVID – Financial Awareness Platform

SAMVID is a modern fintech web application designed to improve financial awareness and simplify common banking interactions through a clean, minimal, and user-friendly interface.

The platform focuses on reducing complexity in everyday banking tasks while maintaining a privacy-first and modular design approach.

---

## 🚀 Live Demo
https://samvid-frontend.vercel.app

---

## 🧠 Problem Statement
Many users still struggle with traditional banking apps and third-party finance tools that are cluttered, slow, and difficult to understand. Tasks like tracking transactions, understanding UPI spending, finding bank branches, applying for loans, or resolving card issues often require multiple platforms, emails, or manual processes.

This results in:
- Poor financial visibility
- Unstructured data handling
- High user inconvenience
- Reduced trust and usability

---

## 💡 Solution
SAMVID provides a **single, awareness-driven platform** that organizes essential banking-related features in a simple and intuitive way.  
Instead of offering heavy banking operations, the app focuses on **clarity, guidance, and structured workflows** that help users understand and manage their financial activities better.

---

## 🔑 Core Features

### 1️⃣ Bank Transaction Viewer
- Upload and view bank transaction data
- Filter transactions by date, category, UPI, and ATM withdrawals
- Clean dashboard for quick financial insights

### 2️⃣ Mini UPI Payment Record Book
- Dedicated view for UPI-based transactions
- Helps users track digital payment behavior separately
- Improves visibility of frequent and small-value payments

### 3️⃣ Loan Advisory & Application Intake System
- Structured loan application form (KYC, income, amount)
- Eligibility-based loan suggestions
- Status tracking (Submitted / Review / Approved / Rejected)

### 4️⃣ Bank Branch Discovery
- Find nearby bank branches by city and area
- View branch details such as working hours and contact information
- Guidance-only system (no direct appointment booking)

### 5️⃣ Credit/Debit Card Dispute Management Portal
- Guided flow for common card-related issues
- Step-by-step dispute submission assistance
- Document checklist and status awareness

---

## 📦 Project Status

- Product currently at **MVP stage**

---

## 🚀 Deployment

### Deploying to Vercel

1. **Push your code to GitHub** (or GitLab/Bitbucket)

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Vercel will auto-detect the Vite framework

3. **Set Environment Variables:**
   In your Vercel project settings, add these environment variables:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   Get these values from your Supabase project settings: https://supabase.com/dashboard/project/_/settings/api

4. **Deploy:**
   - Vercel will automatically build and deploy
   - Build command: `npm run build`
   - Output directory: `dist`
   - Framework preset: Vite

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

---

## 🔒 Privacy & Security Approach
- No direct bank API integration in the current version
- User-provided data used only for demonstration and validation
- Designed with a privacy-first, ethical data handling mindset
- Architecture supports secure future integrations

---

## 🎯 Vision
True financial empowerment begins with understanding.  
By starting with a focused MVP and expanding based on real user needs, SAMVID aims to redefine how users interact with and understand their financial data.

---

## 👤 Author
Pooja Sri
