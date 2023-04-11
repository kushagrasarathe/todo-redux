import ProtectedRoute from "@/src/components/ProtectedRoute";
import { AuthContextProvider } from "@/src/context/AuthContext";
import "@/styles/globals.css";
import { useRouter } from "next/router";

const authReq = ["/todos"];

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <AuthContextProvider>
      {authReq.includes(router.pathname) ? (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      ) : (
        <Component {...pageProps} />
      )}
    </AuthContextProvider>
  );
}
