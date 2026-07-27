import React from 'react';
import { NavPage, UserSession, ApplicantData, DivisionInfo } from './types';
import { INITIAL_APPLICANTS } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { ApplicationForm } from './components/ApplicationForm';
import { ApplicantDashboard } from './components/ApplicantDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { DivisiExplorer } from './components/DivisiExplorer';
import { SupportPage } from './components/SupportPage';
import { AuthModal } from './components/AuthModal';

export default function App() {
  const [currentPage, setCurrentPage] = React.useState<NavPage>('home');
  const [authModalOpen, setAuthModalOpen] = React.useState<boolean>(false);
  
  const [session, setSession] = React.useState<UserSession>({
    isLoggedIn: false,
    role: null
  });

  const [applicants, setApplicants] = React.useState<ApplicantData[]>(INITIAL_APPLICANTS);
  const [selectedDivision, setSelectedDivision] = React.useState<DivisionInfo | null>(null);

  const addNewApplicant = (newApp: ApplicantData) => {
    setApplicants(prev => [newApp, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800 selection:bg-amber-300 selection:text-slate-900">
      
      {/* Header */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        session={session}
        setSession={setSession}
        openAuthModal={() => setAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <LandingPage
            setCurrentPage={setCurrentPage}
            openAuthModal={() => setAuthModalOpen(true)}
            setSelectedDivision={(div) => {
              setSelectedDivision(div);
              setCurrentPage('form');
            }}
          />
        )}

        {currentPage === 'form' && (
          <ApplicationForm
            setCurrentPage={setCurrentPage}
            addNewApplicant={addNewApplicant}
            preselectedDivision={selectedDivision}
          />
        )}

        {currentPage === 'status' && (
          <ApplicantDashboard
            applicants={applicants}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'divisi' && (
          <DivisiExplorer
            setCurrentPage={setCurrentPage}
            setSelectedDivision={(div) => {
              setSelectedDivision(div);
              setCurrentPage('form');
            }}
          />
        )}

        {currentPage === 'admin' && (
          <AdminDashboard
            applicants={applicants}
            setApplicants={setApplicants}
          />
        )}

        {currentPage === 'support' && (
          <SupportPage />
        )}
      </main>

      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Login & Register Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        setSession={setSession}
        setCurrentPage={setCurrentPage}
      />

    </div>
  );
}
