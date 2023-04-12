import store from "@/redux";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import { AuthContextProvider } from "@/src/context/AuthContext";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { Provider } from "react-redux";

const authReq = ["/todo"];

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <AuthContextProvider>
      {authReq.includes(router.pathname) ? (
        <Provider store={store}>
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        </Provider>
      ) : (
        <Component {...pageProps} />
      )}
    </AuthContextProvider>
  );
}
