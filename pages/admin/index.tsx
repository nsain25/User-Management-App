// pages/admin/index.tsx
import { useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session } = useSession();

  if (!session) return <div>Loading...</div>;

  if (session.user?.role !== "ADMIN") {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <p>Welcome, {session.user.email}</p>
    </div>
  );
}
