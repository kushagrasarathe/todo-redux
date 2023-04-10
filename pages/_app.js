import ProtectedRoute from "@/src/config/ProtectedRoute";
import { AuthContextProvider } from "@/src/context/AuthContext";
import "@/styles/globals.css";
import { useRouter } from "next/router";

const noAuthReq = ["/", "/login", "/signup"];

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <AuthContextProvider>
      {noAuthReq.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  );
}
