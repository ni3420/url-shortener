 <h1 align="center"><b>Shortly:-url Shortener & Analytics</b></h1>

<p align="center">
  <a href="https://url-shortener-seven-ebon.vercel.app">
    <img src="https://img.shields.io/badge/Live%20Demo-Open%20App-blue?style=for-the-badge" />
  </a>
</p>

> A full-stack URL shortener with analytics, campaigns, and Clerk authentication.

![GitHub stars](https://img.shields.io/github/stars/ni3420/url-shortener?style=for-the-badge&logo=github) ![GitHub forks](https://img.shields.io/github/forks/ni3420/url-shortener?style=for-the-badge&logo=github) ![GitHub issues](https://img.shields.io/github/issues/ni3420/url-shortener?style=for-the-badge&logo=github) ![Last commit](https://img.shields.io/github/last-commit/ni3420/url-shortener?style=for-the-badge&logo=github) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 📑 Table of Contents

- [Description](#description)
- [Key Features](#key-features)
- [Use Cases](#use-cases)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Key Dependencies](#key-dependencies)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 📝 Description

This project is a self-hosted, full-stack URL shortening application split into a React-based client and an Express-powered server. It addresses the need for secure, custom link shorteners by allowing authenticated users to easily generate shortened URLs, manage user accounts, and track basic usage analytics. The codebase is organized as a clean monorepo designed to keep the presentation and business logic decoupled.

## ✨ Key Features

- **🔗 URL Shortening and Redirection** — Create, store, and redirect shortened URLs using dedicated Express backend routes.
- **📊 Analytics Tracking** — Gather usage data and access metrics for shortened links through specialized analytics routing.
- **🔐 Clerk User Authentication** — Secure API endpoints and frontend pages using Clerk middleware on the Express backend and the ClerkProvider on the React frontend.
- **📁 Campaign Management** — Group shortened links together and manage them collectively under dedicated campaigns.
- **⚡ TanStack Query Integration** — Perform efficient data fetching, caching, and state synchronization between the React client and Express API.

## 🎯 Use Cases

- Deploying a secure, authenticated URL shortener for private or team use.
- Grouping marketing links into structured campaigns and analyzing their performance.
- Developing a baseline full-stack application template using React, Vite, and Express with built-in OAuth support.

## 🛠️ Tech Stack

- 🐳 **Docker**
- ⚛️ **React**
- 🌬️ **Tailwind CSS**
- 📘 **TypeScript**
- ⚡ **Vite**

**Notable libraries:** Clerk, React Hook Form, TanStack Query, Zod

## ⚡ Quick Start

```bash

# 1. Clone the repository
git clone https://github.com/ni3420/url-shortener.git

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

## 📦 Key Dependencies

```
@clerk/clerk-react: ^5.61.3
@hookform/resolvers: ^5.4.0
@tailwindcss/vite: ^4.3.0
@tanstack/react-query: ^5.100.14
axios: ^1.16.1
lucide-react: ^1.17.0
react: ^19.2.6
react-dom: ^19.2.6
react-hook-form: ^7.77.0
react-hot-toast: ^2.6.0
react-icons: ^5.6.0
react-router-dom: ^7.16.0
recharts: ^3.8.1
sonner: ^2.0.7
tailwindcss: ^4.3.0
```

## 🚀 Available Scripts

- **dev** — `npm run dev`
- **build** — `npm run build`
- **lint** — `npm run lint`
- **preview** — `npm run preview`

## 🌐 API Endpoints

Detected endpoints (best-effort scan):

```
GET /health
GET /:campaignId/overview
GET /:campaignId/breakdown
GET /:campaignId/utm
GET /:campaignId/timeline
POST /
GET /
GET /:id
PUT /:id
DELETE /:id
POST /:campaignId/links
GET /:campaignId/links
```

## 📁 Project Structure

```
.
├── client
│   ├── bun.lock
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── public
│   │   ├── favicon.svg
│   │   ├── icons.svg
│   │   ├── img.svg
│   │   └── img2.svg
│   ├── src
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── app
│   │   │   └── router.tsx
│   │   ├── assets
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   ├── components
│   │   │   ├── FilterBar.tsx
│   │   │   ├── Form.tsx
│   │   │   ├── LinkList.tsx
│   │   │   ├── Not-Found.tsx
│   │   │   └── SearchInput.tsx
│   │   ├── conf
│   │   │   └── conf.ts
│   │   ├── features
│   │   │   ├── Campaigns
│   │   │   │   ├── Schema.ts
│   │   │   │   ├── api
│   │   │   │   │   └── ...
│   │   │   │   └── components
│   │   │   │       └── ...
│   │   │   ├── analytics
│   │   │   │   ├── api
│   │   │   │   │   └── ...
│   │   │   │   ├── components
│   │   │   │   │   └── ...
│   │   │   │   ├── index.ts
│   │   │   │   └── types.ts
│   │   │   ├── auth
│   │   │   │   ├── api
│   │   │   │   │   └── ...
│   │   │   │   ├── components
│   │   │   │   │   └── ...
│   │   │   │   └── schema.ts
│   │   │   └── dashboard
│   │   │       ├── Schema.ts
│   │   │       ├── api
│   │   │       │   └── ...
│   │   │       └── components
│   │   │           └── ...
│   │   ├── index.css
│   │   ├── lib
│   │   │   └── api.ts
│   │   ├── main.tsx
│   │   ├── middleware
│   │   │   ├── authprotect.tsx
│   │   │   └── publicroutes.tsx
│   │   └── pages
│   │       ├── auth
│   │       │   ├── signin.tsx
│   │       │   └── signup.tsx
│   │       └── dashboard
│   │           └── layout.tsx
│   ├── stats.html
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vercel.json
│   └── vite.config.ts
└── server
    ├── Dockerfile
    ├── bun.lock
    ├── package.json
    ├── src
    │   ├── controllers
    │   │   ├── analytics.controllers.ts
    │   │   ├── campaign.controllers.ts
    │   │   ├── url.controllers.ts
    │   │   └── user.controllers.ts
    │   ├── db
    │   │   └── dbconnection.ts
    │   ├── index.ts
    │   ├── middlewares
    │   │   └── auth.ts
    │   ├── models
    │   │   ├── analytics.models.ts
    │   │   ├── campaign.models.ts
    │   │   ├── url.models.ts
    │   │   ├── user.models.ts
    │   │   └── utm.models.ts
    │   ├── routes
    │   │   ├── analytics.routes.ts
    │   │   ├── campaign.routes.ts
    │   │   ├── url.routes.ts
    │   │   └── user.routes.ts
    │   ├── service
    │   │   ├── extractUtmParameter.ts
    │   │   ├── ratelimit.ts
    │   │   └── token.ts
    │   └── types.ts
    └── tsconfig.json
```

## 🛠️ Development Setup

### Node.js / JavaScript
1. Install Node.js (v18+ recommended)
2. Install dependencies: `npm install` (or `yarn` / `pnpm install` / `bun install`)
3. Start the dev server: see the **Quick Start** above

### Docker
1. `docker build -t my-app .`
2. `docker run -p 3000:3000 my-app`

## 🚢 Deployment

### Docker
```bash
docker build -t url-shortener .
docker run -p 3000:3000 url-shortener
```

### Vercel

This project is configured for [Vercel](https://vercel.com). Push to the connected branch or run `vercel` locally.

## 👥 Contributing

Contributions are welcome! Here's the standard flow:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/ni3420/url-shortener.git`
3. **Branch**: `git checkout -b feature/your-feature`
4. **Commit**: `git commit -m 'feat: add some feature'`
5. **Push**: `git push origin feature/your-feature`
6. **Open** a pull request


