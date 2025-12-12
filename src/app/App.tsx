import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import { AppLayout } from "@/widgets/layout/AppLayout";
import PrivateRoute from "@/features/auth/ui/PrivateRoute";
import { AppProviders, AppLoader } from "./providers";

const HomePage = lazy(() => import("@/pages/HomePage"));
const CharactersPage = lazy(() => import("../pages/CharactersPage"));
const CharacterDetailsPage = lazy(
  () => import("../pages/CharacterDetailsPage")
);
const LocationsPage = lazy(() => import("../pages/LocationsPage"));
const LocationDetailsPage = lazy(() => import("../pages/LocationDetailsPage"));
const EpisodesPage = lazy(() => import("../pages/EpisodesPage"));
const EpisodeDetailsPage = lazy(() => import("../pages/EpisodeDetailsPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

export default function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <Suspense fallback={<AppLoader />}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<AppLayout />}>
              <Route index element={<HomePage />} />

              <Route
                path="characters"
                element={
                  <PrivateRoute>
                    <CharactersPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="characters/:id"
                element={
                  <PrivateRoute>
                    <CharacterDetailsPage />
                  </PrivateRoute>
                }
              />

              <Route
                path="locations"
                element={
                  <PrivateRoute>
                    <LocationsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="locations/:id"
                element={
                  <PrivateRoute>
                    <LocationDetailsPage />
                  </PrivateRoute>
                }
              />

              <Route
                path="episodes"
                element={
                  <PrivateRoute>
                    <EpisodesPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="episodes/:id"
                element={
                  <PrivateRoute>
                    <EpisodeDetailsPage />
                  </PrivateRoute>
                }
              />

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </AppProviders>
    </BrowserRouter>
  );
}
