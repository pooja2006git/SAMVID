# SAMVID

**A Simple, Secure Digital Passbook for Everyday Banking**

## 🚀 Overview

SAMVID is a lightweight, secure banking transaction awareness platform designed to replace the traditional bank passbook with a simple, trusted digital alternative.

Instead of forcing users to navigate complex banking apps or depend on unreliable SMS alerts, SAMVID provides a clear, structured, and always-accessible transaction view, optimized for usability, reliability, and accessibility.

This repository contains the Minimum Viable Product (MVP) of SAMVID, developed and submitted for the HackwithMagnus 2026 – Prototype & Finale Selection Rounds.

## 🎯 Problem Statement

Despite rapid digitalization, a large number of users still rely on manual passbook updates by visiting bank branches.

### Key Challenges:

- 📘 Manual passbook updates cause crowding, delays, and inconvenience
- 📱 Existing banking apps are cluttered, complex, and hard to navigate
- 🔐 Frequent OTP failures, app bugs, poor responsiveness
- 💬 SMS alerts are unreliable, mixed with spam, and unstructured
- 🧓 Senior citizens & everyday users struggle with modern banking apps
- 🚨 Passbooks are not accessible during emergencies or outside banking hours

### Core Problem:

There is no simple, trusted, and user-friendly digital alternative to the traditional bank passbook for verifying transactions.

## 💡 Solution

SAMVID acts as a digital passbook, focused on clarity, trust, and ease of access.

### What SAMVID Provides:

- A single, structured transaction view
- Clear categorization of:
  - UPI
  - ATM Withdrawals
  - Net Banking
  - Deposits & Credits
- Filters by date, type, and amount
- Minimal UI → zero clutter

## ⭐ Core Uniqueness (USP)

- **Passbook-first design** — focuses only on transaction verification, not analytics clutter
- **Accessible & reliable** — works smoothly on low-end devices, older OS, and poor networks
- **Secure without friction** — biometric-first authentication, no developer-mode lockouts

## 🏗️ Technical Architecture

### High-Level Flow:

```
User → Authentication → Consent → Account Aggregator → Bank → Transaction Data → SAMVID UI
```

## 🔐 Authentication & Security

SAMVID follows a layered but user-friendly security approach.

### Authentication Flow:

1. 📧 Email + Mobile Registration
2. 🔢 OTP verification (fallback)
3. 🔐 Biometric Authentication (Primary)
4. 📲 Device-level security (no credential storage)

### Key Security Principles:

- No bank passwords stored
- No transaction modification
- Contextual security instead of blanket restrictions
- Developer Mode is allowed (unlike existing banking apps)

## 📊 Data Source

### Primary Source: Account Aggregator (AA) Framework

Account Aggregator (AA) is an RBI-regulated Government of India framework that enables secure, consent-based data sharing.

### What AA Does:

- Fetches transaction data directly from banks
- Supports multi-bank integration
- Shares data in structured, machine-readable format
- Ensures user-controlled consent

### What AA Does NOT Do:

- ❌ Cannot store banking data
- ❌ Cannot access data without consent
- ❌ Cannot modify transactions

### Eligibility to Integrate:

- Registered company / startup
- Partnership with licensed AA entity
- Compliance with RBI & NPCI guidelines
- Secure authentication & encrypted data handling

## 🔁 Data Flow (Simplified)

```
User
 → Consent
 → Account Aggregator
 → Bank
 → Encrypted Transaction Data
 → SAMVID
 → Transaction View
```

## 🧪 MVP Scope (Current)

- ✔️ Transaction viewing dashboard
- ✔️ Categorized transaction list
- ✔️ Date & type filters
- ✔️ Clean, readable UI
- ✔️ Biometric-first authentication (simulated)
- ✔️ Secure, dummy data for demo & testing

⚠️ **Note:** This MVP uses mock/sample data for demonstration.

Live AA integration is planned post-approval & partnerships.

## 📱 Prototype Screens

- Authentication Flow
- Biometric Authentication
- Transaction Dashboard

## 📈 Impact

### For Users:

- Reduced dependency on physical passbooks
- Faster transaction verification
- Higher trust and accessibility
- Better experience for senior citizens

### For Banks & FinTechs:

- Reduced branch load
- Lower support & verification costs
- Improved customer satisfaction
- Scalable, compliant digital layer

## 💼 Business Model (B2B2C)

- **Primary Customers:** Banks, FinTechs
- **End Users:** Everyday banking users

### Revenue Streams:

- SaaS licensing for banks
- White-label deployment
- API integrations for FinTech partners
- Enterprise onboarding fees

## 🔮 Future Scope

- 🔗 Multi-bank live integration via AA
- 🤖 AI-assisted transaction explanations
- 📊 EMI tracking & payment reminders
- 🏦 Assisted branch appointment booking
- 🌍 Regional language support

All future enhancements will be driven by user feedback, regulatory approval, and market feasibility.

## 🏁 Conclusion

SAMVID is not just another banking app.

It is a focused, secure, and accessible digital passbook, built to solve a real, everyday banking problem with simplicity and trust at its core.

## 👥 Team

**O2 Squad**

