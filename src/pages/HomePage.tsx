import React from 'react';
import { Hero } from '../components/home/Hero';
import { TheSystemSection } from '../components/home/TheSystemSection';
import { MiniAppsShowroom } from '../components/home/MiniAppsShowroom';
import { DashboardCenterOfControlSection } from '../components/home/DashboardCenterOfControlSection';
import { CustomSolutionsSection } from '../components/home/CustomSolutionsSection';
import { AcademySection } from '../components/home/AcademySection';
import { VilmarSection } from '../components/home/VilmarSection';
import { ShowcaseSection } from '../components/home/ShowcaseSection';
import { ConvergenceSection } from '../components/home/ConvergenceSection';
import { FinalCtaSection } from '../components/home/FinalCtaSection';
import { NavigationTab } from '../types';

interface HomePageProps {
  onNavigate: (tab: NavigationTab, subId?: string) => void;
  onOpenSolutionModal: (topic?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenSolutionModal,
}) => {
  const handleScrollToSystem = () => {
    const el = document.getElementById('the-system');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col">
      {/* 07. HERO — Full Screen con Quantum Core */}
      <Hero
        onExploreClick={handleScrollToSystem}
        onCreateClick={() => onOpenSolutionModal()}
      />

      {/* 09. SECCIÓN "THE SYSTEM" — Todo puede conectarse */}
      <div id="the-system">
        <TheSystemSection />
      </div>

      {/* 10. MINI APPS — Pequeñas herramientas. Grandes posibilidades. */}
      <MiniAppsShowroom
        onViewAllClick={() => onNavigate('mini-apps')}
        onTestMiniApp={(app) => onNavigate('mini-apps', app.id)}
        onRequestCustomization={(appName) => onOpenSolutionModal(`Mini App: ${appName}`)}
      />

      {/* 12, 13, 14, 15, 16. DASHBOARDS — Todo lo que necesitás. En un solo lugar. */}
      <DashboardCenterOfControlSection
        onViewAllClick={() => onNavigate('dashboards')}
        onRequestCustomization={(dashName) => onOpenSolutionModal(`Dashboard: ${dashName}`)}
      />

      {/* 18 & 19. SOLUCIONES DIGITALES — Tu problema. Una experiencia diseñada a medida. */}
      <CustomSolutionsSection
        onSubmitIdea={(idea) => onOpenSolutionModal(idea)}
      />

      {/* 20 & 21. AI QUANTUM ACADEMY — Formación práctica en IA (sin dominar la Home) */}
      <AcademySection onLearnMoreClick={() => onNavigate('academy')} />

      {/* 22. VILMAR — Detrás de AI Quantum Studio */}
      <VilmarSection 
        onLearnMoreClick={() => onNavigate('nosotros')} 
        onContactClick={() => onOpenSolutionModal('Conversación directa con Vilmar')}
      />

      {/* 23. SHOWCASE — Exposición digital */}
      <ShowcaseSection
        onRequestCustom={() => onOpenSolutionModal('Proyecto Showcase')}
      />

      {/* 24. CONVERGENCIA — Todo comienza con una idea */}
      <ConvergenceSection />

      {/* 25. CTA FINAL — ¿Qué querés crear? */}
      <FinalCtaSection
        onSelectOption={(tab) => onNavigate(tab)}
        onOpenModal={() => onOpenSolutionModal()}
      />
    </div>
  );
};
