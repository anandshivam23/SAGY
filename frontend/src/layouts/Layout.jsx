import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar always visible */}
      <Navbar />

      {/* MAIN CONTENT (THIS WAS MISSING / BROKEN) */}
      <main className="flex-1 px-8 py-6 bg-gray-50">
        {children}
      </main>

      {/* Footer always visible */}
      <Footer />
    </div>
  );
}
