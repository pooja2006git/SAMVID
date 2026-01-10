import { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import CreateAccountScreen from './components/CreateAccountScreen';
import Dashboard from './components/Dashboard';
import { demoAuth } from './lib/demoAuth';

type Screen = 'splash' | 'login' | 'register' | 'dashboard';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');

  useEffect(() => {
    const session = demoAuth.getSession();
    if (session) {
      setCurrentScreen('dashboard');
    }
  }, []);

  const handleSplashComplete = () => {
    setCurrentScreen('login');
  };

  const handleLoginSuccess = () => {
    setCurrentScreen('dashboard');
  };

  const handleCreateAccount = () => {
    setCurrentScreen('register');
  };

  const handleAccountCreated = () => {
    setCurrentScreen('login');
  };

  const handleLogout = () => {
    demoAuth.signOut();
    setCurrentScreen('splash');
  };

  if (currentScreen === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (currentScreen === 'login') {
    return (
      <LoginScreen
        onCreateAccount={handleCreateAccount}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  if (currentScreen === 'register') {
    return <CreateAccountScreen onAccountCreated={handleAccountCreated} />;
  }

  if (currentScreen === 'dashboard') {
    return <Dashboard onLogout={handleLogout} />;
  }

  return null;
}

export default App;
