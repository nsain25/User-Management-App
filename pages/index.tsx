import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth/signin"); // Redirect to the sign-in page immediately
  }, [router]); // Added router to dependency array

  return <p>Redirecting to sign in...</p>;
}
