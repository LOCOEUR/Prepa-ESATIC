import React, { useState } from 'react';
import { RevisionProvider, useRevision } from './context/RevisionContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import QuizSession from './components/QuizSession';
import SubjectManager from './components/SubjectManager';
import Footer from './components/Footer';

function AppContent() {
  const [currentTab, setCurrentTab] = useState('dashboard'); // 'dashboard' | 'session' | 'drill' | 'manage'
  const [activeModule, setActiveModule] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState('all'); // 'all' | 'info' | 'telecom'
  const [authorUrl] = useState("https://www.linkedin.com/in/astride-lobasse-a660a233a/");
  
  const { getUnmasteredQuestions } = useRevision();

  const handleSelectModule = (mod) => {
    setActiveModule(mod);
    setCurrentTab('session');
  };

  const handleStartMasteryDrill = () => {
    setActiveModule(null);
    setCurrentTab('drill');
  };

  const unmasteredQuestions = getUnmasteredQuestions();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab}
        startMasteryDrill={handleStartMasteryDrill}
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
      />

      <main className="flex-1 pb-16">
        {currentTab === 'dashboard' && (
          <Dashboard 
            onSelectModule={handleSelectModule} 
            startMasteryDrill={handleStartMasteryDrill}
            selectedTrack={selectedTrack}
          />
        )}

        {currentTab === 'session' && activeModule && (
          <QuizSession 
            questions={activeModule.questions}
            sessionTitle={activeModule.title}
            onBack={() => setCurrentTab('dashboard')}
          />
        )}

        {currentTab === 'drill' && (
          <QuizSession 
            questions={unmasteredQuestions}
            sessionTitle="🎯 Mode 100% Mastery Loop (PREPA ESATIC)"
            onBack={() => setCurrentTab('dashboard')}
          />
        )}

        {currentTab === 'manage' && (
          <SubjectManager 
            onBack={() => setCurrentTab('dashboard')}
          />
        )}
      </main>

      <Footer authorUrl={authorUrl} />
    </div>
  );
}

export default function App() {
  return (
    <RevisionProvider>
      <AppContent />
    </RevisionProvider>
  );
}
