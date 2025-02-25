// pages/dashboard.tsx
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading session...</p>;
  if (!session) return <p>Not authenticated</p>;

  return (
    <div>
      <h1>Welcome, {session.user?.email}!</h1>
      <p>You are signed in.</p>
    </div>
  );
}

