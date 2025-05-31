# StyleHub - E-Commerce Clothing Platform

A modern e-commerce clothing platform built with Next.js, connecting to a NestJS REST API backend.

## Features

- Responsive product catalog with search and pagination
- Detailed product view with product ratings and reviews
- Create, update, and delete products with local file upload
- Form validation and error handling
- Modern UI with Tailwind CSS animations and transitions
- Loading and error states with helpful troubleshooting tips
- Mock data mode when API is unavailable
- Visual indicators for product features (badges)
- Star rating system
- Responsive design for all device sizes

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **API Communication**: Axios
- **UI Components**: Custom components with Tailwind
- **Icons**: React Icons
- **Notifications**: React Toastify

## Getting Started

### 1. Set up environment variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# API URL
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 2. Run the development server

First, make sure the backend NestJS server is running. Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The app connects to a NestJS backend API which should be running on http://localhost:3001 by default. You can change the API URL in the environment variables.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
