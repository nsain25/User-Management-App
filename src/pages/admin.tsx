import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const AdminPage = () => {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // If not authenticated or no admin role, redirect to sign-in
    if (status === "unauthenticated" || session?.user?.role !== "ADMIN") {
      router.push("/auth/signin");
      return;
    }

    const fetchAdminMessage = async () => {
      const res = await fetch("/api/admin");
      if (res.ok) {
        const data = await res.json();
        setMessage(data.message);
      } else {
        setMessage("Access Denied");
      }
    };

    if (status === "authenticated") {
      fetchAdminMessage();
    }
  }, [status, session, router]); // Added necessary dependencies

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <p>{message}</p>
    </div>
  );
};

export default AdminPage;
