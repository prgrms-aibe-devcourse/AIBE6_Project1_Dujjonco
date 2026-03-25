import { Outlet } from "react-router";
import { Header } from "./Header";
import { AuthProvider } from "../contexts/AuthContext";

export function Root() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  );
}
