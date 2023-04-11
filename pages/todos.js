import { useAuth } from "@/src/context/AuthContext";

export default function Todos() {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
