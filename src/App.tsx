import FreeFeedPage from "./pages/FreeFeedPage";
import HomePage from "./pages/HomePage";

export default function App() {
  return window.location.pathname.startsWith("/free-feed") ? (
    <FreeFeedPage />
  ) : (
    <HomePage />
  );
}
