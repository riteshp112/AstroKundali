import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import WelcomeScreen from "./components/WelcomeScreen";
import CreateKundali from "./components/CreateKundali";
import KundaliViewer from "./components/KundaliViewer";
import Dashboard from "./components/Dashboard";
import LoginScreen from "./components/LoginScreen";
import { Toaster } from "./components/ui/sonner";
import { loadFromStorage, saveKundali, getAllKundalis, getRecentKundalis } from "./utils/storage";

export interface KundaliData {
  id: string;
  name: string;
  dob: string;
  tob: string;
  pob: string;
  latitude: number;
  longitude: number;
  createdAt: string;
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedKundalis, setSavedKundalis] = useState<
    KundaliData[]
  >([]);
  const [recentKundalis, setRecentKundalis] = useState<
    KundaliData[]
  >([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Load kundalis from storage on mount
    const data = loadFromStorage();
    setSavedKundalis(data.kundalis);
    setRecentKundalis(data.recentKundalis);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Reload kundalis when logged in
    const data = loadFromStorage();
    setSavedKundalis(data.kundalis);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSavedKundalis([]);
  };

  const handleSaveKundali = (kundali: KundaliData) => {
    // Save to storage
    saveKundali(kundali);
    
    // Update state
    setSavedKundalis((prev) => [...prev, kundali]);
    setRecentKundalis((prev) => {
      const filtered = prev.filter(k => k.id !== kundali.id);
      return [kundali, ...filtered].slice(0, 5);
    });
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route
            path="/"
            element={<WelcomeScreen isLoggedIn={isLoggedIn} recentKundalis={recentKundalis} />}
          />
          <Route
            path="/create"
            element={
              <CreateKundali
                isLoggedIn={isLoggedIn}
                onSave={handleSaveKundali}
              />
            }
          />
          <Route
            path="/kundali/:id"
            element={<KundaliViewer />}
          />
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <Dashboard
                  kundalis={savedKundalis}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={<LoginScreen onLogin={handleLogin} />}
          />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;