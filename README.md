General info:
Git Commands Guide with AI Assistance Overview project provides an interactive and comprehensive guide to essential Git commands, designed for developers using VS Code and GitHub. Beyond just explanations, it integrates AI capabilities to help users generate effective commit messages and understand complex Git commands, enhancing their version control workflow. The guide is presented as a modal interface, ensuring it can be easily integrated into existing web projects without disrupting the main page content. Features: Interactive Flowchart: Navigate through common Git workflows with a clear, step-by-step visual guide.Essential Commands Shortlist: A quick reference for the most frequently used Git commands, along with their use cases.System-Specific Commands: Toggle between Windows (PowerShell) and Bash/Linux commands for platform-specific guidance.One-Click Copy: Easily copy Git commands to your clipboard for direct use in your terminal.✨ AI Commit Message Generator: Describe your code changes in plain English, and the integrated AI (powered by Gemini) will suggest concise and conventional Git commit messages.✨ AI Git Command Explainer: Input any Git command, and receive a clear, simple explanation, including its purpose, common use cases, and potential pitfalls.Theme Toggle: Switch between a modern "dark glass" theme and a "light" theme to match your preference.Modular Design: Built with separate HTML, CSS, and JavaScript files for easy integration and maintainability.Responsive Layout: Optimized for seamless viewing and interaction across various devices (desktop, tablet, mobile).Custom Scrollbars: Subtle, theme-matching "dot" style scrollbars for a polished look.Technologies Used: HTML5: Structure of the web application.CSS3: Styling, including custom properties (CSS variables) for robust theming, responsive design, and glassmorphism effects.JavaScript (ES6+): Core logic for modal interactions, dynamic content loading, theme toggling, and AI API calls.Gemini API (gemini-2.0-flash): For AI-powered commit message generation and Git command explanations. Marked.js: A lightweight library used for parsing Markdown content (specifically for the AI explanations) into HTML. How to Use / This project is designed to be easily integrated into any existing web project. Download Files: index.html (or integrate its content into your main HTML file), style.css, script.js. Project Setup: Place style.css and script.js in appropriate directories within your project (e.g., css/ and js/).HTML Integration: Copy the content from the provided git-commands-guide-html artifact.In your main index.html (or target HTML file), ensure you have a <button> element that will launch the guide modal. The example uses:<button class="launch-button" onclick="openMainGuideModal()">Open Git Guide</button>
Paste the entire <div id="mainGuideModal" ...> block (which contains the full guide structure) right before your closing </body> tag.Link CSS: In your <head> section, link to the style.css file:<link rel="stylesheet" href="path/to/your/style.css">
Link JavaScript: Before your closing </body> tag, link to the script.js file:<script src="path/to/your/script.js"></script>
(Replace path/to/your/ with the actual path in your project.)Run Locally:Simply open your index.html file in a web browser. The "Open Git Guide" button should be visible, and clicking it will launch the interactive modal. The customization project leverages CSS variables for easy theming and customization. All key colors, spacing, and effects are defined in the : root pseudo-class within style.css.You can modify these variables to match your project's aesthetic::root {
    /* === Dark Theme === */
    --Eigengrau: #16161d;             /* Main dark background */
    --transparent-dark-glass: rgba(18, 18, 18, 0.7); /* Modal overlay/card background */
    --text-color: #f2f2f2;           /* Primary text color */
    --accent-color: #CBFFFA;         /* Highlight/accent color */
    --input-bg: rgba(0, 0, 0, 0.3);   /* Background for inputs/code blocks */
    --button-bg: rgba(0, 0, 0, 0.5);  /* Default button background */
    --button-hover-bg: rgba(203, 255, 250, 0.2); /* Button hover state */
    --border-color: rgba(203, 255, 250, 0.3); /* Borders and subtle lines */
    --digital-font: 'Orbitron', sans-serif; /* Specific font for digital elements */

    /* Glass & Glow Effects */
    --frost-glow: rgba(203, 255, 250, 0.05); /* Subtle inner glow */
    --glass-blur: blur(10px);        /* Backdrop blur for glass effect */
    --shadow-glow: 0 0 15px rgba(203, 255, 250, 0.3); /* Outer shadow/glow */

    /* === Golden Ratio-Based Spacing === */
    --spacing-xs: 0.618rem;
    --spacing-sm: 1rem;
    --spacing-md: 1.618rem;
    --spacing-lg: 2.618rem;
    --spacing-xl: 4.236rem;

    --font-sm: 0.618rem;
    --font-base: 1rem;
    --font-md: 1.618rem;
    --font-lg: 2.618rem;
    --font-xl: 4.236rem;

    /* === Light Theme (for toggle) === */
    --light-Eigengrau: #f2f2f7;
    --light-transparent-dark-glass: rgba(255, 255, 255, 0.8);
    --light-text-color: #333333;
    --light-accent-color: #007bff;
    --light-input-bg: rgba(255, 255, 255, 0.7);
    --light-button-bg: rgba(0, 123, 255, 0.7);
    --light-button-hover-bg: rgba(0, 123, 255, 0.2);
    --light-border-color: rgba(0, 123, 255, 0.3);
    --light-frost-glow: rgba(0, 123, 255, 0.05);
    --light-shadow-glow: 0 0 15px rgba(0, 123, 255, 0.3);
}
Contributions are welcome! If you have suggestions for new features, improvements, or bug fixes, please feel free to contribute. This project is open-source and available under the MIT License.


REACT Implimentatian notes: 

import React, { useState, useEffect } from 'react';

const P2PPaymentsApp = () => {
  const [currentView, setCurrentView] = useState('onboarding'); // onboarding, dashboard, send, receive, cards, crypto, profile
  const [user, setUser] = useState({
    name: '',
    phone: '',
    email: '',
    isVerified: false,
    kycStatus: 'pending'
  });
  const [darkMode, setDarkMode] = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [notifications, setNotifications] = useState([]);

  // Mock user data after onboarding
  const mockUserData = {
    name: 'Alex Johnson',
    phone: '+1 (555) 123-4567',
    email: 'alex@example.com',
    isVerified: true,
    kycStatus: 'approved',
    fiatBalance: 2847.32,
    cryptoBalances: {
      BTC: 0.05234,
      ETH: 1.2456
    },
    recentTransactions: [
      { id: 1, type: 'received', amount: 125.00, from: 'Sarah M.', currency: 'USD', timestamp: '2 min ago' },
      { id: 2, type: 'sent', amount: 0.001, to: 'Mike R.', currency: 'BTC', timestamp: '1 hour ago' },
      { id: 3, type: 'card', amount: -42.50, merchant: 'Coffee Shop', currency: 'USD', timestamp: '3 hours ago' }
    ]
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Simple SVG Icons as components
  const Icons = {
    User: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    Send: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22,2 15,22 11,13 2,9 22,2" />
      </svg>
    ),
    Download: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7,10 12,15 17,10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
    CreditCard: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    Bitcoin: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 10h3a2 2 0 0 1 0 4H8" />
        <path d="M8 14h4a2 2 0 0 1 0 4H8" />
        <line x1="12" y1="6" x2="12" y2="8" />
        <line x1="12" y1="16" x2="12" y2="18" />
      </svg>
    ),
    Shield: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    TrendingUp: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
        <polyline points="17,6 23,6 23,12" />
      </svg>
    ),
    Settings: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    Bell: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    Eye: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    EyeOff: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    ),
    Moon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
    Sun: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
    ArrowUpRight: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7,7 17,7 17,17" />
      </svg>
    ),
    ArrowDownLeft: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <line x1="17" y1="7" x2="7" y2="17" />
        <polyline points="17,17 7,17 7,7" />
      </svg>
    ),
    Wallet: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
        <line x1="18" y1="12" x2="18" y2="12" />
      </svg>
    ),
    QrCode: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-48 h-48">
        <rect x="3" y="3" width="5" height="5" />
        <rect x="3" y="16" width="5" height="5" />
        <rect x="16" y="3" width="5" height="5" />
        <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
        <path d="M21 21v.01" />
        <path d="M12 7v3a2 2 0 0 1-2 2H7" />
        <path d="M3 12h.01" />
        <path d="M12 3h.01" />
        <path d="M12 16v.01" />
        <path d="M16 12h1" />
        <path d="M21 12v.01" />
        <path d="M12 21v-1" />
      </svg>
    ),
    History: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M3 3v5h5" />
        <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" />
        <path d="M12 7v5l4 2" />
      </svg>
    ),
    Check: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-20 h-20">
        <polyline points="20,6 9,17 4,12" />
      </svg>
    ),
    X: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    Plus: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    Zap: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
      </svg>
    )
  };

  const OnboardingFlow = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      name: '',
      phone: '',
      email: '',
      pin: ''
    });

    const handleNext = () => {
      if (step < 4) {
        setStep(step + 1);
      } else {
        setUser({...mockUserData});
        setCurrentView('dashboard');
      }
    };

    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-blue-50'} flex items-center justify-center p-4`}>
        <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-8`}>
          <div className="text-center mb-8">
            <div className={`w-16 h-16 ${darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-500 to-blue-500'} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
              <Icons.Zap />
            </div>
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>PayFlow</h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Your next-gen financial companion</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`h-2 flex-1 mx-1 rounded-full ${i <= step ? 'bg-gradient-to-r from-purple-500 to-blue-500' : darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
              ))}
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-center`}>Step {step} of 4</p>
          </div>

          {step === 1 && (
            <div>
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Welcome! Let's get started</h2>
              <input
                type="text"
                placeholder="Full Name"
                className={`w-full p-4 rounded-xl ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 border-gray-200'} border focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Contact Information</h2>
              <div className="space-y-4">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className={`w-full p-4 rounded-xl ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 border-gray-200'} border focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className={`w-full p-4 rounded-xl ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 border-gray-200'} border focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Secure Your Account</h2>
              <div className="text-center">
                <div className={`w-16 h-16 ${darkMode ? 'text-purple-400' : 'text-purple-500'} mx-auto mb-4`}>
                  <Icons.Shield />
                </div>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>Create a 6-digit PIN to secure your account</p>
                <input
                  type="password"
                  placeholder="6-Digit PIN"
                  maxLength="6"
                  className={`w-32 p-4 rounded-xl text-center text-2xl tracking-widest ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 border-gray-200'} border focus:ring-2 focus:ring-purple-500 focus:border-transparent mx-auto`}
                  value={formData.pin}
                  onChange={(e) => setFormData({...formData, pin: e.target.value})}
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center">
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>All Set!</h2>
              <Icons.Check />
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>Your account is ready. Start sending and receiving money instantly!</p>
            </div>
          )}

          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            {step === 4 ? 'Get Started' : 'Continue'}
          </button>
        </div>
      </div>
    );
  };

  const Dashboard = () => (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} pb-20`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} px-6 py-4 shadow-sm`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Icons.User />
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Welcome back,</p>
              <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
            >
              {darkMode ? <Icons.Sun /> : <Icons.Moon />}
            </button>
            <button className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-600'}`}>
              <Icons.Bell />
            </button>
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="px-6 py-6">
        <div className={`${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' : 'bg-gradient-to-br from-purple-500 to-blue-600'} rounded-3xl p-6 text-white shadow-2xl`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm">Total Balance</p>
              <div className="flex items-center space-x-2">
                <p className="text-3xl font-bold">
                  {balanceVisible ? `$${user.fiatBalance?.toLocaleString() || '0.00'}` : '••••••'}
                </p>
                <button onClick={() => setBalanceVisible(!balanceVisible)}>
                  {balanceVisible ? <Icons.EyeOff /> : <Icons.Eye />}
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm">Crypto Value</p>
              <p className="text-lg font-semibold">$1,247.89</p>
            </div>
          </div>
          
          <div className="flex justify-between pt-4 border-t border-white/20">
            <button 
              onClick={() => setCurrentView('send')}
              className="flex flex-col items-center space-y-2 bg-white/10 backdrop-blur rounded-xl p-4 flex-1 mr-2 hover:bg-white/20 transition-colors"
            >
              <Icons.Send />
              <span className="text-sm font-medium">Send</span>
            </button>
            <button 
              onClick={() => setCurrentView('receive')}
              className="flex flex-col items-center space-y-2 bg-white/10 backdrop-blur rounded-xl p-4 flex-1 mx-1 hover:bg-white/20 transition-colors"
            >
              <Icons.Download />
              <span className="text-sm font-medium">Receive</span>
            </button>
            <button 
              onClick={() => setCurrentView('cards')}

export default IndexsApp;


version of :
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Organization & Git Cheat Sheet</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        :root {
            /* === Dark Theme === */
            --Eigengrau: #16161d;
            --transparent-dark-glass: rgba(18, 18, 18, 0.7);     
            --text-color: #f2f2f2;
            --accent-color: #CBFFFA;
            --input-bg: rgba(0, 0, 0, 0.3);
            --button-bg: rgba(0, 0, 0, 0.5);
            --button-hover-bg: rgba(203, 255, 250, 0.2);
            --border-color: rgba(203, 255, 250, 0.3);
            --digital-font: 'Orbitron', sans-serif;

            /* Glass & Glow Effects */
            --frost-glow: rgba(203, 255, 250, 0.05);
            --glass-blur: blur(10px);
            --shadow-glow: 0 0 15px rgba(203, 255, 250, 0.3);

            /* === Golden Ratio-Based Spacing === */
            --spacing-xs: 0.618rem;
            --spacing-sm: 1rem;
            --spacing-md: 1.618rem;
            --spacing-lg: 2.618rem;
            --spacing-xl: 4.236rem;

            --font-sm: 0.618rem;
            --font-base: 1rem;
            --font-md: 1.618rem;
            --font-lg: 2.618rem;
            --font-xl: 4.236rem;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: linear-gradient(135deg, var(--Eigengrau) 0%, #0f0f1a 100%);
            color: var(--text-color);
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            min-height: 100vh;
            position: relative;
            overflow-x: hidden;
        }

        /* Animated background particles */
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at 20% 80%, rgba(203, 255, 250, 0.03) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(203, 255, 250, 0.03) 0%, transparent 50%);
            animation: float 20s ease-in-out infinite;
            pointer-events: none;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: var(--spacing-lg);
            position: relative;
            z-index: 1;
        }

        .hero {
            text-align: center;
            margin-bottom: var(--spacing-xl);
            padding: var(--spacing-xl) 0;
        }

        .hero h1 {
            font-family: var(--digital-font);
            font-size: clamp(2rem, 8vw, var(--font-xl));
            font-weight: 900;
            background: linear-gradient(135deg, var(--accent-color) 0%, #ffffff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: var(--shadow-glow);
            margin-bottom: var(--spacing-md);
            letter-spacing: 2px;
        }

        .hero p {
            font-size: var(--font-md);
            opacity: 0.8;
            max-width: 600px;
            margin: 0 auto;
        }

        .tabs {
            display: flex;
            justify-content: center;
            margin-bottom: var(--spacing-lg);
            gap: var(--spacing-sm);
            flex-wrap: wrap;
        }

        .tab-button {
            background: var(--transparent-dark-glass);
            border: 1px solid var(--border-color);
            color: var(--text-color);
            padding: var(--spacing-sm) var(--spacing-md);
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: var(--digital-font);
            font-weight: 600;
            backdrop-filter: var(--glass-blur);
            position: relative;
            overflow: hidden;
        }

        .tab-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
            opacity: 0.1;
            transition: left 0.5s ease;
        }

        .tab-button:hover::before {
            left: 100%;
        }

        .tab-button.active {
            background: var(--button-hover-bg);
            border-color: var(--accent-color);
            box-shadow: var(--shadow-glow);
        }

        .tab-button:hover {
            background: var(--button-hover-bg);
            transform: translateY(-2px);
        }

        .tab-content {
            display: none;
            animation: fadeIn 0.5s ease-in-out;
        }

        .tab-content.active {
            display: block;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: var(--spacing-lg);
            margin-bottom: var(--spacing-xl);
        }

        .card {
            background: var(--transparent-dark-glass);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: var(--spacing-lg);
            backdrop-filter: var(--glass-blur);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, var(--accent-color), transparent);
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-glow);
            border-color: var(--accent-color);
        }

        .card:hover::before {
            opacity: 1;
        }

        .card h3 {
            font-family: var(--digital-font);
            color: var(--accent-color);
            margin-bottom: var(--spacing-md);
            font-size: var(--font-md);
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
        }

        .icon {
            font-size: var(--font-lg);
            filter: drop-shadow(0 0 5px var(--accent-color));
        }

        .command-table {
            width: 100%;
            border-collapse: collapse;
            margin: var(--spacing-md) 0;
            font-family: 'Courier New', monospace;
            font-size: var(--font-sm);
        }

        .command-table th,
        .command-table td {
            padding: var(--spacing-sm);
            text-align: left;
            border-bottom: 1px solid var(--border-color);
        }

        .command-table th {
            background: var(--input-bg);
            color: var(--accent-color);
            font-weight: 600;
            position: sticky;
            top: 0;
        }

        .command-table tr:hover {
            background: var(--frost-glow);
        }

        .code-block {
            background: var(--input-bg);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            padding: var(--spacing-md);
            margin: var(--spacing-sm) 0;
            font-family: 'Courier New', monospace;
            font-size: var(--font-sm);
            position: relative;
            overflow-x: auto;
        }

        .code-block::before {
            content: attr(data-lang);
            position: absolute;
            top: -8px;
            right: var(--spacing-sm);
            background: var(--accent-color);
            color: var(--Eigengrau);
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: 600;
        }

        .highlight {
            color: var(--accent-color);
            font-weight: 600;
        }

        .step-list {
            counter-reset: step-counter;
            list-style: none;
        }

        .step-list li {
            counter-increment: step-counter;
            margin-bottom: var(--spacing-md);
            padding-left: var(--spacing-lg);
            position: relative;
        }

        .step-list li::before {
            content: counter(step-counter);
            position: absolute;
            left: 0;
            top: 0;
            background: var(--accent-color);
            color: var(--Eigengrau);
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: var(--font-sm);
        }

        .tip {
            background: rgba(203, 255, 250, 0.1);
            border-left: 4px solid var(--accent-color);
            padding: var(--spacing-md);
            margin: var(--spacing-md) 0;
            border-radius: 0 10px 10px 0;
        }

        .tip::before {
            content: "💡 ";
            font-size: var(--font-md);
            margin-right: var(--spacing-xs);
        }

        .copy-btn {
            position: absolute;
            top: var(--spacing-xs);
            right: var(--spacing-xs);
            background: var(--button-bg);
            border: 1px solid var(--border-color);
            color: var(--accent-color);
            padding: 4px 8px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 10px;
            transition: all 0.2s ease;
        }

        .copy-btn:hover {
            background: var(--button-hover-bg);
            transform: scale(1.05);
        }

        @media (max-width: 768px) {
            .grid {
                grid-template-columns: 1fr;
            }
            
            .tabs {
                flex-direction: column;
                align-items: center;
            }
            
            .command-table {
                font-size: 10px;
            }
            
            .container {
                padding: var(--spacing-md);
            }
        }

        .floating-action {
            position: fixed;
            bottom: var(--spacing-lg);
            right: var(--spacing-lg);
            background: var(--accent-color);
            color: var(--Eigengrau);
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: var(--font-lg);
            cursor: pointer;
            box-shadow: var(--shadow-glow);
            transition: all 0.3s ease;
            z-index: 1000;
        }

        .floating-action:hover {
            transform: scale(1.1) rotate(360deg);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="hero">
            <h1>PROJECT ORGANIZATION</h1>
            <p>Master the art of clean code organization and Git workflows across all platforms</p>
        </div>

        <div class="tabs">
            <button class="tab-button active" data-tab="workflow">🚀 Workflow</button>
            <button class="tab-button" data-tab="commands">⚡ Commands</button>
            <button class="tab-button" data-tab="automation">🤖 Automation</button>
            <button class="tab-button" data-tab="tips">💎 Pro Tips</button>
        </div>

        <div id="workflow" class="tab-content active">
            <div class="grid">
                <div class="card">
                    <h3><span class="icon">📁</span>Project Setup Workflow</h3>
                    <ol class="step-list">
                        <li>Create main folder: <span class="highlight">project-warehouse</span></li>
                        <li>Open in VS Code (Right-click → Open with Code)</li>
                        <li>Create project subfolders with meaningful names</li>
                        <li>Move keeper projects into organized structure</li>
                        <li>Delete unwanted snippets and experiments</li>
                        <li>Add README.md to document your collection</li>
                        <li>Initialize Git and push to GitHub</li>
                    </ol>
                    
                    <div class="tip">
                        Start with 1-2 projects, then add incrementally. This keeps commit history clean and makes each addition meaningful.
                    </div>
                </div>

                <div class="card">
                    <h3><span class="icon">🏗️</span>Folder Structure</h3>
                    <div class="code-block" data-lang="Structure">
project-warehouse/
├── calculator/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── weather-widget/
│   └── .gitkeep
├── tip-splitter/
│   └── README.md
├── animation-lab/
│   └── .gitkeep
└── README.md
                    </div>
                    
                    <div class="tip">
                        Use <span class="highlight">.gitkeep</span> or <span class="highlight">README.md</span> in empty folders so Git tracks them for future projects.
                    </div>
                </div>

                <div class="card">
                    <h3><span class="icon">📝</span>README Template</h3>
                    <div class="code-block" data-lang="Markdown">
# Project Warehouse

A collection of my frontend projects and code experiments.

## Contents

- `/calculator` – Basic calculator with vanilla JS
- `/weather-widget` – API-based weather display  
- `/tip-splitter` – Bill splitter for group dining
- `/animation-lab` – CSS/JS animation experiments

## Usage

Each project is self-contained. Open individual folders to explore.

## Tech Stack

HTML5, CSS3, Vanilla JavaScript
                    </div>
                </div>

                <div class="card">
                    <h3><span class="icon">🎯</span>Git Best Practices</h3>
                    <ol class="step-list">
                        <li>Initialize repo in main folder</li>
                        <li>Add projects one by one with meaningful commits</li>
                        <li>Use descriptive commit messages</li>
                        <li>Create branches for major features</li>
                        <li>Keep commits atomic and focused</li>
                        <li>Use .gitignore for unwanted files</li>
                    </ol>
                    
                    <div class="code-block" data-lang="Git">
git add tip-splitter/
git commit -m "Add tip splitter project with responsive design"
                    </div>
                </div>
            </div>
        </div>

        <div id="commands" class="tab-content">
            <div class="grid">
                <div class="card">
                    <h3><span class="icon">💻</span>Cross-Platform Commands</h3>
                    
                    <h4 style="color: var(--accent-color); margin: var(--spacing-md) 0;">Windows (PowerShell)</h4>
                    <ol class="step-list">
                        <li>Create folder: <code>mkdir project-warehouse</code></li>
                        <li>Navigate: <code>cd project-warehouse</code></li>
                        <li>Create file: <code>New-Item .gitkeep -ItemType File</code></li>
                        <li>List contents: <code>ls</code> or <code>dir</code></li>
                        <li>Copy folder: <code>Copy-Item -Recurse src dest</code></li>
                        <li>Remove folder: <code>Remove-Item -Recurse folder</code></li>
                    </ol>

                    <h4 style="color: var(--accent-color); margin: var(--spacing-md) 0;">macOS/Linux (Bash)</h4>
                    <ol class="step-list">
                        <li>Create folder: <code>mkdir project-warehouse</code></li>
                        <li>Navigate: <code>cd project-warehouse</code></li>
                        <li>Create file: <code>touch .gitkeep</code></li>
                        <li>List contents: <code>ls -la</code></li>
                        <li>Copy folder: <code>cp -r src dest</code></li>
                        <li>Remove folder: <code>rm -rf folder</code></li>
                    </ol>

                    <h4 style="color: var(--accent-color); margin: var(--spacing-md) 0;">Git Bash</h4>
                    <ol class="step-list">
                        <li>Create folder: <code>mkdir project-warehouse</code></li>
                        <li>Navigate: <code>cd project-warehouse</code></li>
                        <li>Create file: <code>touch .gitkeep</code></li>
                        <li>List contents: <code>ls -la</code></li>
                        <li>Copy folder: <code>cp -r src dest</code></li>
                        <li>Remove folder: <code>rm -rf folder</code></li>
                    </ol>
                </div>

                <div class="card">
                    <h3><span class="icon">⚡</span>Essential Git Commands</h3>
                    <ol class="step-list">
                        <li>Initialize repository: <code>git init</code></li>
                        <li>Stage all files: <code>git add .</code></li>
                        <li>Commit with message: <code>git commit -m "Initial commit of project warehouse"</code></li>
                        <li>Add remote origin: <code>git remote add origin https://github.com/username/project-warehouse.git</code></li>
                        <li>Set main branch: <code>git branch -M main</code></li>
                        <li>Push to GitHub: <code>git push -u origin main</code></li>
                        <li>Add single project: <code>git add calculator/</code></li>
                        <li>Commit project: <code>git commit -m "Add calculator project"</code></li>
                        <li>Check status: <code>git status</code></li>
                        <li>View commit history: <code>git log --oneline</code></li>
                        <li>Create and switch branch: <code>git checkout -b feature-branch</code></li>
                        <li>Switch to main: <code>git checkout main</code></li>
                        <li>Merge branch: <code>git merge feature-branch</code></li>
                    </ol>
                </div>

                <div class="card">
                    <h3><span class="icon">🔧</span>Repository Creation</h3>
                    <ol class="step-list">
                        <li>Go to <span class="highlight">github.com</span></li>
                        <li>Click <span class="highlight">New repository</span></li>
                        <li>Name it <span class="highlight">project-warehouse</span></li>
                        <li>Add description: "Frontend project collection"</li>
                        <li>Keep it public (or private if preferred)</li>
                        <li>Don't initialize with README (you'll add your own)</li>
                        <li>Click <span class="highlight">Create repository</span></li>
                    </ol>

                    <div class="code-block" data-lang="Terminal">
git remote add origin https://github.com/username/project-warehouse.git
git branch -M main
git push -u origin main
                    </div>
                </div>

                <div class="card">
                    <h3><span class="icon">📋</span>Useful .gitignore</h3>
                    <div class="code-block" data-lang="gitignore">
# Dependencies
node_modules/
npm-debug.log*

# IDE files
.vscode/settings.json
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db
desktop.ini

# Build outputs
dist/
build/
*.min.js
*.min.css

# Environment variables
.env
.env.local

# Temporary files
*.tmp
*.temp
*.log
                    </div>
                </div>
            </div>
        </div>

        <div id="automation" class="tab-content">
            <div class="grid">
                <div class="card">
                    <h3><span class="icon">🤖</span>File Organization Script</h3>
                    <p>Python script that automatically organizes files by type:</p>
                    
                    <ol class="step-list">
                        <li>Install Python 3.x on your system</li>
                        <li>Create new file: <code>organize_files.py</code></li>
                        <li>Import required modules: <code>import os, shutil, pathlib</code></li>
                        <li>Set watched directory: <code>WATCHED_DIR = Path.home() / "Downloads"</code></li>
                        <li>Set destination: <code>DEST_DIR = Path.home() / "Organized"</code></li>
                        <li>Define file type mappings for Images, Documents, Code, etc.</li>
                        <li>Create organize_files() function</li>
                        <li>Loop through files in watched directory</li>
                        <li>Move files to appropriate category folders</li>
                        <li>Run script: <code>python organize_files.py</code></li>
                    </ol>
                    
                    <div class="tip">
                        Save as <span class="highlight">organize_files.py</span> and run with <code>python organize_files.py</code>
                    </div>
                </div>

                <div class="card">
                    <h3><span class="icon">🖥️</span>System Tray Version</h3>
                    <p>Convert the organizer into a system tray application:</p>
                    
                    <ol class="step-list">
                        <li>Install dependencies: <code>pip install pystray pillow pyinstaller</code></li>
                        <li>Create <code>file_organizer_tray.py</code> with GUI components</li>
                        <li>Add system tray icon functionality</li>
                        <li>Create right-click menu with Start/Stop options</li>
                        <li>Build executable: <code>pyinstaller --onefile --noconsole file_organizer_tray.py</code></li>
                        <li>Find your .exe in the <code>/dist</code> folder</li>
                        <li>Add to Windows startup folder for auto-start</li>
                        <li>Run executable to see system tray icon</li>
                    </ol>
                    
                    <p>Features:</p>
                    <ul style="margin-top: var(--spacing-sm); padding-left: var(--spacing-md);">
                        <li>Runs in system tray</li>
                        <li>Right-click menu controls</li>
                        <li>Auto-start on boot option</li>
                        <li>Custom file type mapping</li>
                        <li>Real-time monitoring</li>
                    </ul>
                </div>

                <div class="card">
                    <h3><span class="icon">⏰</span>Automation Schedule</h3>
                    <p><strong>Windows Task Scheduler:</strong></p>
                    <ol class="step-list">
                        <li>Open Task Scheduler</li>
                        <li>Create Basic Task</li>
                        <li>Set trigger (hourly/daily)</li>
                        <li>Action: Start Program</li>
                        <li>Point to your .exe file</li>
                    </ol>
                    
                    <p><strong>macOS/Linux Cron Setup:</strong></p>
                    <ol class="step-list">
                        <li>Open terminal</li>
                        <li>Edit crontab: <code>crontab -e</code></li>
                        <li>Add hourly job: <code>0 * * * * /usr/bin/python3 /path/to/organize_files.py</code></li>
                        <li>Add startup job: <code>@reboot /usr/bin/python3 /path/to/organize_files.py</code></li>
                        <li>Save and exit editor</li>
                        <li>Verify with: <code>crontab -l</code></li>
                    </ol>
                </div>

                <div class="card">
                    <h3><span class="icon">🚀</span>Quick Setup Scripts</h3>
                    <p><strong>Project Creator Script Setup:</strong></p>
                    <ol class="step-list">
                        <li>Create new file: <code>create_project.sh</code></li>
                        <li>Add shebang: <code>#!/bin/bash</code></li>
                        <li>Get project name: <code>PROJECT_NAME=$1</code></li>
                        <li>Create project folder: <code>mkdir -p "project-warehouse/$PROJECT_NAME"</code></li>
                        <li>Navigate to folder: <code>cd "project-warehouse/$PROJECT_NAME"</code></li>
                        <li>Create files: <code>touch index.html style.css script.js README.md</code></li>
                        <li>Initialize README: <code>echo "# $PROJECT_NAME" > README.md</code></li>
                        <li>Stage files: <code>git add .</code></li>
                        <li>Commit: <code>git commit -m "Initialize $PROJECT_NAME project"</code></li>
                        <li>Make executable: <code>chmod +x create_project.sh</code></li>
                        <li>Use script: <code>./create_project.sh my-new-app</code></li>
                    </ol>
                </div>
            </div>
        </div>

        <div id="tips" class="tab-content">
            <div class="grid">
                <div class="card">
                    <h3><span class="icon">💎</span>Organization Pro Tips</h3>
                    <ul style="padding-left: var(--spacing-md); space-y: var(--spacing-sm);">
                        <li><strong>Naming Convention:</strong> Use kebab-case for folders (my-project)</li>
                        <li><strong>Version Control:</strong> Commit early, commit often with clear messages</li>
                        <li><strong>Documentation:</strong> Every project needs a README, even small ones</li>
                        <li><strong>Dependencies:</strong> Use package.json even for vanilla JS projects</li>
                        <li><strong>Backup Strategy:</strong> GitHub + local backups = peace of mind</li>
                        <li><strong>Clean Commits:</strong> One feature per commit, descriptive messages</li>
                    </ul>
                    
                    <div class="tip">
                        Think of your project-warehouse as a museum of your learning journey. Each project tells a story of growth.
                    </div>
                </div>

                <div class="card">
                    <h3><span class="icon">🎨</span>Folder Structure Templates</h3>
                    <p><strong>Simple Web Project:</strong></p>
                    <div class="code-block" data-lang="Structure">
my-project/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── images/
└── README.md
                    </div>
                    
                    <p><strong>Advanced Project:</strong></p>
                    <div class="code-block" data-lang="Structure">
my-app/
├── src/
│   ├── components/
│   ├── styles/
│   └── utils/
├── public/
├── tests/
├── docs/
├── .gitignore
├── package.json
└── README.md
                    </div>
                </div>

                <div class="card">
                    <h3><span class="icon">🔥</span>Workflow Shortcuts</h3>
                    <p><strong>VS Code Extensions:</strong></p>
                    <ul style="padding-left: var(--spacing-md);">
                        <li>GitLens - Enhanced Git capabilities</li>
                        <li>Live Server - Instant local server</li>
                        <li>Auto Rename Tag - HTML tag synchronization</li>
                        <li>Prettier - Code formatting</li>
                        <li>Bracket Pair Colorizer - Visual matching</li>
                    </ul>
                    
                    <p><strong>VS Code Keyboard Shortcuts:</strong></p>
                    <ol class="step-list">
                        <li>Command Palette: <code>Ctrl/Cmd + Shift + P</code></li>
                        <li>Toggle Terminal: <code>Ctrl/Cmd + `</code></li>
                        <li>Toggle Sidebar: <code>Ctrl/Cmd + B</code></li>
                        <li>Open Explorer: <code>Ctrl/Cmd + Shift + E</code></li>
                        <li>Open Source Control: <code>Ctrl/Cmd + Shift + G</code></li>
                        <li>Quick Open File: <code>Ctrl/Cmd + P</code></li>
                        <li>Split Editor: <code>Ctrl/Cmd + \</code></li>
                        <li>Close Editor: <code>Ctrl/Cmd + W</code></li>
                    </ol>
                </div>

                <div class="card">
                    <h3><span class="icon">🚨</span>Common Mistakes to Avoid</h3>
                    <ul style="padding-left: var(--spacing-md);">
                        <li><strong>Don't:</strong> Commit node_modules or build files</li>
                        <li><strong>Don't:</strong> Use spaces in folder names (use-hyphens-instead)</li>
                        <li><strong>Don't:</strong> Force push to main branch</li>
                        <li><strong>Don't:</strong> Commit without testing first</li>
                        <li><strong>Don't:</strong> Use generic commit messages like "update"</li>
                        <li><strong>Don't:</strong> Store sensitive data in public repos</li>
                    </ul>
                    
                    <div class="tip">
                        When in doubt, create a branch. Branches are cheap, broken main branches are expensive.
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="floating-action" onclick="scrollToTop()">
        ↑
    </div>

    <script>
        // Tab functionality
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                button.classList.add('active');
                document.getElementById(button.getAttribute('data-tab')).classList.add('active');
            });
        });

        // Copy functionality for code blocks
        document.querySelectorAll('.code-block').forEach(block => {
            const copyBtn = document.createElement ('button');
            copyBtn.classList.add('copy-button');
            copyBtn.innerText = 'Copy';
            block.appendChild(copyBtn);

            copyBtn.addEventListener('click', () => {
                const code = block.innerText;
                navigator.clipboard.writeText(code);
                copyBtn.innerText = 'Copied!';
                setTimeout(() => copyBtn.innerText = 'Copy', 1000);
            });
        });
    </script>
