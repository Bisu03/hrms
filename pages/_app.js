import { useEffect } from 'react';
import '../styles/globals.css';
import "flatpickr/dist/flatpickr.min.css";
import { SessionProvider, useSession } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from 'next/router';
import Loader from '../components/ui/Loader/Loader';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    const handleWheel = (event) => {
      if (document.activeElement.type === "number") {
        document.activeElement.blur();
      }
    };

    document.addEventListener("wheel", handleWheel);
    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const queryClient = new QueryClient();
  return (
    <SessionProvider session={session}>
      <Toaster position="top-center" reverseOrder={false} />
      <QueryClientProvider client={queryClient}>
        {Component.adminRoute ? (
          <AdminRoute>
            <Component {...pageProps} />
          </AdminRoute>
        ) : (
          <Component {...pageProps} />
        )}
      </QueryClientProvider>
    </SessionProvider>
  );
}

function AdminRoute({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isUser = !!session?.user;

  useEffect(() => {
    if (status === "loading") return;
    if (!isUser) router.push("/login");
  }, [isUser, status]);

  if (isUser) {
    return children;
  }

  return <Loader />;
}

export default MyApp;
