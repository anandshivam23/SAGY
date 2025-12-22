import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { useAuth } from "./context/AuthContext";

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  return <AppRouter />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
