/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { MiniAppsPage } from './pages/MiniAppsPage';
import { DashboardsPage } from './pages/DashboardsPage';
import { CustomSolutionsPage } from './pages/CustomSolutionsPage';
import { AcademyPage } from './pages/AcademyPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { SolutionModal } from './components/shared/SolutionModal';
import { AuthProvider } from './context/AuthContext';
import { QuantumCursor } from './components/canvas/QuantumCursor';
import { FloatingWhatsAppButton } from './components/shared/FloatingWhatsAppButton';
import { NavigationTab, MiniAppItem } from './types';

function MainAppContent() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [selectedMiniAppId, setSelectedMiniAppId] = useState<string | undefined>(undefined);
  const [solutionModalOpen, setSolutionModalOpen] = useState(false);
  const [solutionModalTopic, setSolutionModalTopic] = useState<string | undefined>(undefined);

  // Sync initial URL path per Section 11 & 28
  useEffect(() => {
    const syncPath = () => {
      const pathname = window.location.pathname.replace(/^\//, '').toLowerCase();
      if (pathname.startsWith('mini-apps/')) {
        const appId = pathname.replace('mini-apps/', '');
        setCurrentTab('mini-apps');
        setSelectedMiniAppId(appId);
      } else if (pathname === 'mini-apps') {
        setCurrentTab('mini-apps');
        setSelectedMiniAppId(undefined);
      } else if (pathname === 'dashboards') {
        setCurrentTab('dashboards');
        setSelectedMiniAppId(undefined);
      } else if (pathname === 'soluciones') {
        setCurrentTab('soluciones');
        setSelectedMiniAppId(undefined);
      } else if (pathname === 'academy') {
        setCurrentTab('academy');
        setSelectedMiniAppId(undefined);
      } else if (pathname === 'nosotros') {
        setCurrentTab('nosotros');
        setSelectedMiniAppId(undefined);
      } else if (pathname === 'contacto') {
        setCurrentTab('contacto');
        setSelectedMiniAppId(undefined);
      } else {
        setCurrentTab('home');
        setSelectedMiniAppId(undefined);
      }
    };

    syncPath();
    window.addEventListener('popstate', syncPath);
    return () => window.removeEventListener('popstate', syncPath);
  }, []);

  const handleNavigate = (tab: NavigationTab, subId?: string) => {
    setCurrentTab(tab);
    setSelectedMiniAppId(subId);
    let newPath = tab === 'home' ? '/' : `/${tab}`;
    if (tab === 'mini-apps' && subId) {
      newPath = `/mini-apps/${subId}`;
    }
    window.history.pushState({}, '', newPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSolutionModal = (topic?: string) => {
    setSolutionModalTopic(topic);
    setSolutionModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#05070b] text-slate-100 flex flex-col selection:bg-cyan-400 selection:text-black relative">
      {/* Layer 04: Custom Quantum Cursor */}
      <QuantumCursor />

      {/* Clean 3-Zone Header with Auth Controls */}
      <Header
        currentTab={currentTab}
        onNavigate={(tab) => handleNavigate(tab)}
        onOpenSolutionModal={() => handleOpenSolutionModal()}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={(tab) => handleNavigate(tab)}
            onOpenSolutionModal={handleOpenSolutionModal}
          />
        )}
        {currentTab === 'mini-apps' && (
          <MiniAppsPage
            initialAppId={selectedMiniAppId}
            onBack={() => handleNavigate('home')}
            onOpenSolutionModal={handleOpenSolutionModal}
          />
        )}
        {currentTab === 'dashboards' && (
          <DashboardsPage
            onBack={() => handleNavigate('home')}
            onOpenSolutionModal={handleOpenSolutionModal}
          />
        )}
        {currentTab === 'soluciones' && (
          <CustomSolutionsPage
            onBack={() => handleNavigate('home')}
            onOpenSolutionModal={handleOpenSolutionModal}
          />
        )}
        {currentTab === 'academy' && (
          <AcademyPage
            onBack={() => handleNavigate('home')}
            onOpenSolutionModal={handleOpenSolutionModal}
          />
        )}
        {currentTab === 'nosotros' && (
          <AboutPage
            onBack={() => handleNavigate('home')}
            onOpenSolutionModal={handleOpenSolutionModal}
          />
        )}
        {currentTab === 'contacto' && (
          <ContactPage
            onBack={() => handleNavigate('home')}
          />
        )}
      </main>

      {/* Minimalist Footer */}
      <Footer onNavigate={(tab) => handleNavigate(tab)} />

      {/* Floating Bespoke WhatsApp Button */}
      <FloatingWhatsAppButton />

      {/* Global Solution / Consultation Modal */}
      <SolutionModal
        isOpen={solutionModalOpen}
        onClose={() => setSolutionModalOpen(false)}
        initialTopic={solutionModalTopic}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
