This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# User-Management-App
This is a Next.js project bootstrapped with create-next-app. This application is designed to provide robust user management features, including Role-Based Access Control (RBAC) using NextAuth.js for authentication and Prisma ORM for database interactions.

# Features
- Custom User Registration with Role Selection
- Email Verification Flow
- Role-Based Access Control (RBAC)
- Secure Authentication using NextAuth.js with Credentials Provider
- Prisma ORM integration with PostgreSQL (Neon DB)
- TypeScript for type safety and enhanced developer experience
- Deployed on Vercel for continuous integration and delivery

# Tech Stack
- Next.js - Framework for React applications
- NextAuth.js - Authentication and session management
- Prisma - Database ORM for type-safe queries
- PostgreSQL - Database (hosted on Neon DB)
- TypeScript - Type safety and tooling
- Vercel - Deployment and hosting

Getting Started
To get started with development, follow these steps:

1. Clone the Repository
git clone https://github.com/nsain25/user-management-app.git
cd user-management-app

3. Install Dependencies ( mentioned above )
4. Set Up Environment Variables
5. Run the Development Server
Start the development server ( mentioned above )

Open http://localhost:3000 with your browser to see the result.
You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

This project uses next/font to automatically optimize and load Geist, a new font family for Vercel.

# Prisma Setup
Ensure your database is ready and up-to-date with Prisma:
npx prisma db push   # Sync your Prisma schema with the database
npx prisma generate  # Generate Prisma Client

# To open Prisma Studio (a UI to manage your database), run:
npx prisma studio
Build and Deploy

# Build for Production
npm run build

# Deploy on Vercel
This app is deployed using Vercel's seamless integration with GitHub. Every push to the main branch triggers a new deployment.

To manually trigger a deployment:
- Go to the Vercel Dashboard.
- Select your project → Deployments.
- Click on Redeploy or select Clear Cache and Deploy for a fresh build.

# Directory Structure
user-management-app/
│
├── pages/                # Page routes
│   ├── api/              # API routes
│   │   └── auth/         # NextAuth.js configuration
│   ├── auth/             # Authentication pages
│   └── dashboard.tsx     # User dashboard
│
├── prisma/               # Prisma schema and migrations
│   └── schema.prisma
│
├── src/                  # Application source
│   ├── components/       # Reusable React components
│   └── middleware/       # Role-based access middleware
│
├── types/                # TypeScript type definitions
│
└── .env                  # Environment variables
Learn More
To learn more about the tools and libraries used in this project, check out the following resources:
- Next.js Documentation - Learn about Next.js features and API.
- NextAuth.js Documentation - Authentication for Next.js apps.
- Prisma Documentation - Type-safe database queries with Prisma.
You can check out the Next.js GitHub repository - your feedback and contributions are welcome!

Contributing
Contributions are welcome! If you'd like to contribute, please fork the repository and create a pull request.

License
This project is open-source and available under the MIT License.

Contact
For questions or feedback, please contact the project maintainer.

Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.
Check out our Next.js deployment documentation for more details.

This application provides a robust foundation for managing users with role-based access control and secure authentication, making it ideal for enterprise-level projects requiring advanced user management features.
