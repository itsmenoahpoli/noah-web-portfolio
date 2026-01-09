# Patrick Niño Noah W Policarpio - Web Portfolio

A modern, responsive portfolio website showcasing professional experience, projects, and contact information. Built with Next.js, React, TypeScript, and Tailwind CSS.

## Overview

This portfolio website represents the professional work and experience of Patrick Niño Noah W Policarpio, a Senior Software Engineer and Tech Lead with 7+ years of experience building scalable web and mobile applications. The site features a clean, minimalist design with smooth animations and a fully responsive layout that works seamlessly across all devices.

## Features

- **Responsive Design**: Mobile-first approach with full responsiveness across all screen sizes
- **Dark Mode**: Built-in theme toggle for light and dark modes
- **Smooth Animations**: Powered by Framer Motion for engaging user interactions
- **Progress Bar**: NProgress integration for smooth page navigation feedback
- **SEO Optimized**: Complete Open Graph and Twitter Card metadata for social sharing
- **Modern Stack**: Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4

## SEO & Social Sharing

- **Title**: Patrick Niño Noah W Policarpio
- **Description**: Senior Software Engineer and Tech Lead with 7+ years of experience building scalable web and mobile applications. Expert in React, Vue, Node.js, NestJS, Laravel, and cloud-based architectures.
- **OG Image**: `/noah-self.jpg` (1200x630px)

## Tech Stack

- **Framework**: Next.js 16.1.1
- **React**: 19.2.3
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Progress Bar**: NProgress
- **Fonts**: Inter (Google Fonts)
- **Database**: MongoDB with Prisma ORM
- **State Management**: TanStack React Query v5
- **Forms & Validation**: Formik + Zod

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Management

This project uses Prisma with MongoDB. Since MongoDB is a NoSQL database, traditional migrations are not used. Instead, use `db push` to sync your schema.

### Commands

- **Sync Schema**: Push your `prisma/schema.prisma` changes to the database.
  ```bash
  npx prisma db push
  ```

- **Generate Client**: Regenerate the Prisma client after schema changes.
  ```bash
  npx prisma generate
  ```

- **Prisma Studio**: Open a GUI to view and edit your data.
  ```bash
  npx prisma studio
  ```

## CMS Dashboard

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## CMS Dashboard

The project includes a custom CMS at `/self-dashboard` to manage projects, blogs, and experiences.

- **Authentication**: Credentials are stored in `.env` (`DASHBOARD_USERNAME`, `DASHBOARD_PASSWORD`).
- **Middleware**: Secure routes are protected by JWT authentication via `middleware.ts`.

## Project Structure

```
app/
├── components/
│   ├── Header.tsx          # Fixed navigation header with theme toggle
│   ├── Hero.tsx            # Hero section with introduction and experience
│   └── ProgressBar.tsx     # Page navigation progress indicator
├── globals.css             # Global styles and Tailwind configuration
├── layout.tsx              # Root layout with metadata and SEO
└── page.tsx                # Home page
public/
└── noah-self.jpg           # Open Graph meta image
```

## Build & Deploy

Build the production version:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
