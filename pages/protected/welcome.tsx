// pages/protected/welcome.tsx
import { getSession, signOut } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";

const Welcome = ({ user }: { user: any }) => {
  const { data: session } = useSession();

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      <p>Your role is: {user.role}</p>
      <button
        onClick={() => signOut({ callbackUrl: "/auth/signin" })}
        className="bg-red-500 text-white py-2 px-4 rounded"
      >
        Sign Out
      </button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
};

export default Welcome;
