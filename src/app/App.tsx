import { BrowserRouter } from "react-router-dom";
import { AppProviders } from "./providers";
import { AppRouter } from "./AppRouter";

export default function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </BrowserRouter>
  );
}
