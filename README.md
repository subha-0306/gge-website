<div align="center">

# Golden Globe Enterprises — GGE Finance

### Financial Services Website + Lead Management CRM

A full-stack financial services platform built for **Golden Globe Enterprises (GGE)**, combining a professional customer-facing website with an internal CRM for lead management, follow-ups, analytics, notifications, and reporting.

<br />

[![Live Website](https://img.shields.io/badge/🌐_Live_Website-ggefinance.com-D4AF37?style=for-the-badge)](https://www.ggefinance.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Express](https://img.shields.io/badge/Express.js-API-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-UI-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<br />

**Production:** https://www.ggefinance.com

</div>

---

## Overview

**Golden Globe Enterprises (GGE)** is a financial services platform designed to provide structured funding and financing solutions while giving the business an internal system to manage customer enquiries from submission to follow-up.

This project goes beyond a traditional static business website.

It combines:

- 🌐 A professional public-facing financial services website
- 📝 Customer enquiry and application flows
- 🔐 Protected administrator authentication
- 📊 Lead management and business analytics
- 🔔 Real-time lead notifications
- 📅 Follow-up scheduling and tracking
- 🗒️ Staff notes and activity history
- 📥 CSV lead exports
- 📱 Responsive user interfaces
- 🗄️ MongoDB-backed persistent data storage

The result is a complete **website → lead → CRM → follow-up → analytics** workflow.

---

## Live Application

| Platform | Link |
|---|---|
| 🌐 **Public Website** | [ggefinance.com](https://www.ggefinance.com) |
| 🔐 **Admin CRM** | [Admin Portal](https://www.ggefinance.com/admin/login) |

> **Note:** The CRM is restricted to authorized personnel. Authentication credentials are intentionally not stored in this repository.

---

# System Architecture

```text
                         ┌─────────────────────────┐
                         │     CUSTOMER / USER     │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │   React + Tailwind UI   │
                         │    Public Website       │
                         └────────────┬────────────┘
                                      │
                           Submit Enquiry / Form
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │      Express REST API   │
                         │      + Validation       │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │       MongoDB Atlas     │
                         │     Lead Persistence    │
                         └────────────┬────────────┘
                                      │
                    ┌─────────────────┴─────────────────┐
                    │                                   │
                    ▼                                   ▼
          ┌──────────────────┐                ┌──────────────────┐
          │   Email Alerts   │                │    Socket.IO     │
          │      SMTP        │                │  Real-time Push  │
          └──────────────────┘                └────────┬─────────┘
                                                       │
                                                       ▼
                                          ┌────────────────────────┐
                                          │      Admin CRM         │
                                          │                        │
                                          │ • Lead Management      │
                                          │ • Follow-ups           │
                                          │ • Notes & History      │
                                          │ • Analytics            │
                                          │ • CSV Export           │
                                          └────────────────────────┘
