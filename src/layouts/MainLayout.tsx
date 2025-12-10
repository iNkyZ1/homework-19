import { JSX } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ErrorBoundary from "../components/ErrorBoundary";

function MainLayout(): JSX.Element {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div>
      <header style={{ padding: "16px", borderBottom: "1px solid #ddd" }}>
        <nav style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Link to="/">Home</Link>
          <Link to="/characters">Characters</Link>
          <Link to="/locations">Locations</Link>
          <Link to="/episodes">Episodes</Link>

          {isAuthenticated && (
            <button
              onClick={logout}
              style={{
                marginLeft: "auto",
                padding: "6px 12px",
                border: "1px solid #ccc",
                background: "#f5f5f5",
                cursor: "pointer",
              }}
            >
              Выйти
            </button>
          )}
        </nav>
      </header>

      <main style={{ padding: "16px" }}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default MainLayout;
