import { useState } from 'react';
import Splash from './screens/Splash';
import Login from './screens/Login';
import CreateAccount from './screens/CreateAccount';
import OTPVerification from './screens/OTPVerification';
import BiometricAuth from './screens/BiometricAuth';
import ConnectBank from './screens/ConnectBank';
import RedirectingAA from './screens/RedirectingAA';
import ConsentSuccess from './screens/ConsentSuccess';
import TransactionDashboard from './components/TransactionDashboard';

type Screen = 'splash' | 'login' | 'create-account' | 'otp-verification' | 'biometric-auth' | 'connect-bank' | 'redirecting-aa' | 'consent-success' | 'dashboard';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');

  const handleSplashComplete = () => {
    setCurrentScreen('login');
  };

  const handleCreateAccount = async (
    fullName: string,
    mobileNumber: string,
    email: string,
    password: string
  ) => {
    // Demo only - no actual account creation
    // Navigate to OTP verification
    return Promise.resolve();
  };

  const handleLogin = () => {
    // Demo only - directly navigate to biometric auth
    setCurrentScreen('biometric-auth');
  };

  const handleOTPVerify = () => {
    // After OTP verification, navigate to biometric auth
    setCurrentScreen('biometric-auth');
  };

  const handleBiometricVerify = () => {
    // After biometric verification, navigate to connect bank
    setCurrentScreen('connect-bank');
  };

  const handleConnectBank = () => {
    // Navigate to redirecting screen
    setCurrentScreen('redirecting-aa');
  };

  const handleRedirectComplete = () => {
    // After redirect, show consent success
    setCurrentScreen('consent-success');
  };

  const handleConsentSuccess = () => {
    // After consent success, navigate to dashboard
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    // Redirect back to login
    setCurrentScreen('login');
  };

  return (
    <>
      {currentScreen === 'splash' && <Splash onComplete={handleSplashComplete} />}
      {currentScreen === 'login' && (
        <Login
          onCreateAccount={() => setCurrentScreen('create-account')}
          onLogin={handleLogin}
        />
      )}
      {currentScreen === 'create-account' && (
        <CreateAccount
          onAccountCreated={() => setCurrentScreen('otp-verification')}
          onCreateAccount={handleCreateAccount}
        />
      )}
      {currentScreen === 'otp-verification' && (
        <OTPVerification onVerify={handleOTPVerify} />
      )}
      {currentScreen === 'biometric-auth' && (
        <BiometricAuth onVerify={handleBiometricVerify} />
      )}
      {currentScreen === 'connect-bank' && (
        <ConnectBank onConnect={handleConnectBank} />
      )}
      {currentScreen === 'redirecting-aa' && (
        <RedirectingAA onComplete={handleRedirectComplete} />
      )}
      {currentScreen === 'consent-success' && (
        <ConsentSuccess onContinue={handleConsentSuccess} />
      )}
      {currentScreen === 'dashboard' && (
        <TransactionDashboard onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;
