import { useState } from 'react';
import { TrendingUp, Target, Lightbulb, DollarSign, CheckCircle, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';

export default function Invest() {
  const { language, t, currency, exchangeRates } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'growth' | 'premium'>('growth');

  const investmentPlans = [
    {
      id: 'starter',
      name: language === 'es' ? 'Inicio' : language === 'en' ? 'Starter' : language === 'fr' ? 'Démarrage' : 'Anfänger',
      minBudget: 50000,
      description: language === 'es'
        ? 'Perfecto para inversores primerizos'
        : language === 'en'
        ? 'Perfect for first-time investors'
        : language === 'fr'
        ? 'Parfait pour les premiers investisseurs'
        : 'Perfekt für Anfängerinvestoren',
      features: [
        language === 'es' ? 'Consultoría personalizada' : language === 'en' ? 'Personalized consulting' : language === 'fr' ? 'Conseil personnalisé' : 'Persönliche Beratung',
        language === 'es' ? 'Análisis de mercado' : language === 'en' ? 'Market analysis' : language === 'fr' ? 'Analyse de marché' : 'Marktanalyse',
        language === 'es' ? 'Gestión de propiedades' : language === 'en' ? 'Property management' : language === 'fr' ? 'Gestion immobilière' : 'Immobilienverwaltung',
        language === 'es' ? 'Soporte legal' : language === 'en' ? 'Legal support' : language === 'fr' ? 'Support juridique' : 'Rechtliche Unterstützung',
      ],
      expectedReturn: '8-10%',
    },
    {
      id: 'growth',
      name: language === 'es' ? 'Crecimiento' : language === 'en' ? 'Growth' : language === 'fr' ? 'Croissance' : 'Wachstum',
      minBudget: 250000,
      description: language === 'es'
        ? 'Para inversores con experiencia'
        : language === 'en'
        ? 'For experienced investors'
        : language === 'fr'
        ? 'Pour les investisseurs expérimentés'
        : 'Für erfahrene Investoren',
      features: [
        language === 'es' ? 'Consultoría dedicada' : language === 'en' ? 'Dedicated consulting' : language === 'fr' ? 'Conseil dédié' : 'Dedizierte Beratung',
        language === 'es' ? 'Análisis profundo' : language === 'en' ? 'In-depth analysis' : language === 'fr' ? 'Analyse approfondie' : 'Tiefgehende Analyse',
        language === 'es' ? 'Gestión completa' : language === 'en' ? 'Full management' : language === 'fr' ? 'Gestion complète' : 'Vollständige Verwaltung',
        language === 'es' ? 'Reportes mensuales' : language === 'en' ? 'Monthly reports' : language === 'fr' ? 'Rapports mensuels' : 'Monatliche Berichte',
        language === 'es' ? 'Oportunidades exclusivas' : language === 'en' ? 'Exclusive opportunities' : language === 'fr' ? 'Opportunités exclusives' : 'Exklusive Möglichkeiten',
      ],
      expectedReturn: '12-15%',
    },
    {
      id: 'premium',
      name: language === 'es' ? 'Premium' : language === 'en' ? 'Premium' : language === 'fr' ? 'Premium' : 'Premium',
      minBudget: 1000000,
      description: language === 'es'
        ? 'Para inversores institucionales'
        : language === 'en'
        ? 'For institutional investors'
        : language === 'fr'
        ? 'Pour les investisseurs institutionnels'
        : 'Für institutionelle Anleger',
      features: [
        language === 'es' ? 'Gestor de cartera dedicado' : language === 'en' ? 'Dedicated portfolio manager' : language === 'fr' ? 'Gestionnaire de portefeuille dédié' : 'Dedizierter Portfoliomanager',
        language === 'es' ? 'Acceso a todas las oportunidades' : language === 'en' ? 'Access to all opportunities' : language === 'fr' ? 'Accès à toutes les opportunités' : 'Zugang zu allen Möglichkeiten',
        language === 'es' ? 'Estructuras fiscales optimizadas' : language === 'en' ? 'Optimized tax structures' : language === 'fr' ? 'Structures fiscales optimisées' : 'Optimierte Steuerstrukturen',
        language === 'es' ? 'Reportes trimestrales' : language === 'en' ? 'Quarterly reports' : language === 'fr' ? 'Rapports trimestriels' : 'Quartalsberichte',
        language === 'es' ? 'Eventos exclusivos' : language === 'en' ? 'Exclusive events' : language === 'fr' ? 'Événements exclusifs' : 'Exklusive Veranstaltungen',
        language === 'es' ? 'Acceso a desarrollos pre-lanzamiento' : language === 'en' ? 'Pre-launch development access' : language === 'fr' ? 'Accès aux développements avant le lancement' : 'Zugang zu Entwicklungen vor dem Start',
      ],
      expectedReturn: '15-20%',
    },
  ];

  const whyInvest = [
    {
      icon: TrendingUp,
      title: language === 'es' ? 'Retornos Consistentes' : language === 'en' ? 'Consistent Returns' : language === 'fr' ? 'Rendements Constants' : 'Konsistente Renditen',
      description: language === 'es'
        ? 'Historial probado de rentabilidad en el mercado inmobiliario'
        : language === 'en'
        ? 'Proven track record of profitability in the real estate market'
        : language === 'fr'
        ? 'Historique éprouvé de rentabilité sur le marché immobilier'
        : 'Bewährte Erfolgsbilanz der Rentabilität auf dem Immobilienmarkt',
    },
    {
      icon: Target,
      title: language === 'es' ? 'Estrategia Enfocada' : language === 'en' ? 'Focused Strategy' : language === 'fr' ? 'Stratégie Ciblée' : 'Fokussierte Strategie',
      description: language === 'es'
        ? 'Enfoque en mercados con alto potencial de crecimiento'
        : language === 'en'
        ? 'Focus on markets with high growth potential'
        : language === 'fr'
        ? 'Concentration sur les marchés à fort potentiel de croissance'
        : 'Konzentration auf Märkte mit hohem Wachstumspotenzial',
    },
    {
      icon: Lightbulb,
      title: language === 'es' ? 'Innovación' : language === 'en' ? 'Innovation' : language === 'fr' ? 'Innovation' : 'Innovation',
      description: language === 'es'
        ? 'Proyectos sostenibles y de diseño moderno'
        : language === 'en'
        ? 'Sustainable and modern design projects'
        : language === 'fr'
        ? 'Projets durables et de conception moderne'
        : 'Nachhaltige und modern gestaltete Projekte',
    },
    {
      icon: DollarSign,
      title: language === 'es' ? 'Transparencia Total' : language === 'en' ? 'Full Transparency' : language === 'fr' ? 'Transparence Totale' : 'Vollständige Transparenz',
      description: language === 'es'
        ? 'Reportes detallados y acceso a toda la información'
        : language === 'en'
        ? 'Detailed reports and access to all information'
        : language === 'fr'
        ? 'Rapports détaillés et accès à toutes les informations'
        : 'Detaillierte Berichte und Zugang zu allen Informationen',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1a2f4a] to-[#2a4a6a] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            {language === 'es'
              ? 'Crece tu Patrimonio'
              : language === 'en'
              ? 'Grow Your Wealth'
              : language === 'fr'
              ? 'Augmentez votre Patrimoine'
              : 'Vermögen Vermehren'}
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl">
            {language === 'es'
              ? 'Oportunidades de inversión inmobiliaria con retornos comprobados. Desde pequeños presupuestos hasta inversiones institucionales.'
              : language === 'en'
              ? 'Real estate investment opportunities with proven returns. From small budgets to institutional investments.'
              : language === 'fr'
              ? 'Opportunités d\'investissement immobilier avec rendements éprouvés. Des petits budgets aux investissements institutionnels.'
              : 'Immobilieninvestitionsmöglichkeiten mit bewährten Renditen. Von kleinen Budgets bis zu institutionellen Investitionen.'}
          </p>
        </div>
      </section>

      {/* Why Invest Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#1a2f4a] mb-12 text-center">
            {language === 'es'
              ? 'Por Qué Invertir con Nosotros'
              : language === 'en'
              ? 'Why Invest With Us'
              : language === 'fr'
              ? 'Pourquoi Investir Avec Nous'
              : 'Warum Mit Uns Investieren'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyInvest.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow">
                  <Icon size={40} className="text-[#d4af37] mb-4" />
                  <h3 className="text-xl font-bold text-[#1a2f4a] mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investment Plans */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#1a2f4a] mb-12 text-center">
            {language === 'es'
              ? 'Planes de Inversión'
              : language === 'en'
              ? 'Investment Plans'
              : language === 'fr'
              ? 'Plans d\'Investissement'
              : 'Investitionspläne'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {investmentPlans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-lg overflow-hidden transition-all cursor-pointer ${
                  selectedPlan === plan.id
                    ? 'bg-[#1a2f4a] text-white shadow-2xl transform scale-105'
                    : 'bg-white text-[#1a2f4a] shadow-lg hover:shadow-xl'
                }`}
                onClick={() => setSelectedPlan(plan.id as 'starter' | 'growth' | 'premium')}
              >
                <div className={`p-8 ${selectedPlan === plan.id ? 'bg-[#d4af37] text-[#1a2f4a]' : 'bg-gray-100'}`}>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className={`text-sm mt-2 ${selectedPlan === plan.id ? 'text-[#1a2f4a]' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="p-8">
                  <div className="mb-6">
                    <p className={`text-sm ${selectedPlan === plan.id ? 'text-gray-300' : 'text-gray-600'}`}>
                      {language === 'es' ? 'Presupuesto Mínimo' : language === 'en' ? 'Minimum Budget' : language === 'fr' ? 'Budget Minimum' : 'Mindestbudget'}
                    </p>
                    <p className="text-3xl font-bold text-[#d4af37] mt-2">
                      {currency} {plan.minBudget.toLocaleString()}
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className={`text-sm ${selectedPlan === plan.id ? 'text-gray-300' : 'text-gray-600'}`}>
                      {language === 'es' ? 'Retorno Esperado' : language === 'en' ? 'Expected Return' : language === 'fr' ? 'Rendement Attendu' : 'Erwartete Rendite'}
                    </p>
                    <p className="text-2xl font-bold text-[#d4af37] mt-2">{plan.expectedReturn}</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <CheckCircle size={20} className="text-[#d4af37] flex-shrink-0 mt-1" />
                        <span className={`text-sm ${selectedPlan === plan.id ? 'text-gray-100' : 'text-gray-700'}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                      selectedPlan === plan.id
                        ? 'bg-[#d4af37] text-[#1a2f4a] hover:bg-white'
                        : 'bg-[#d4af37] text-[#1a2f4a] hover:bg-[#c9a02d]'
                    }`}
                  >
                    <span>
                      {language === 'es'
                        ? 'Comenzar'
                        : language === 'en'
                        ? 'Get Started'
                        : language === 'fr'
                        ? 'Commencer'
                        : 'Anfangen'}
                    </span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#1a2f4a] mb-12 text-center">
            {language === 'es'
              ? 'Cómo Funciona'
              : language === 'en'
              ? 'How It Works'
              : language === 'fr'
              ? 'Comment Ça Marche'
              : 'Wie Es Funktioniert'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="text-center">
                <div className="bg-[#d4af37] text-[#1a2f4a] w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step}
                </div>
                <h3 className="text-lg font-bold text-[#1a2f4a] mb-2">
                  {step === 1
                    ? language === 'es'
                      ? 'Consulta'
                      : language === 'en'
                      ? 'Consultation'
                      : language === 'fr'
                      ? 'Consultation'
                      : 'Beratung'
                    : step === 2
                    ? language === 'es'
                      ? 'Análisis'
                      : language === 'en'
                      ? 'Analysis'
                      : language === 'fr'
                      ? 'Analyse'
                      : 'Analyse'
                    : step === 3
                    ? language === 'es'
                      ? 'Inversión'
                      : language === 'en'
                      ? 'Investment'
                      : language === 'fr'
                      ? 'Investissement'
                      : 'Investition'
                    : language === 'es'
                    ? 'Retornos'
                    : language === 'en'
                    ? 'Returns'
                    : language === 'fr'
                    ? 'Retours'
                    : 'Renditen'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {step === 1
                    ? language === 'es'
                      ? 'Habla con nuestros expertos'
                      : language === 'en'
                      ? 'Talk with our experts'
                      : language === 'fr'
                      ? 'Parlez avec nos experts'
                      : 'Sprechen Sie mit unseren Experten'
                    : step === 2
                    ? language === 'es'
                      ? 'Evaluamos tus objetivos'
                      : language === 'en'
                      ? 'We evaluate your goals'
                      : language === 'fr'
                      ? 'Nous évaluons vos objectifs'
                      : 'Wir bewerten Ihre Ziele'
                    : step === 3
                    ? language === 'es'
                      ? 'Ejecutamos la estrategia'
                      : language === 'en'
                      ? 'We execute the strategy'
                      : language === 'fr'
                      ? 'Nous exécutons la stratégie'
                      : 'Wir führen die Strategie aus'
                    : language === 'es'
                    ? 'Recibe tus ganancias'
                    : language === 'en'
                    ? 'Receive your profits'
                    : language === 'fr'
                    ? 'Recevez vos bénéfices'
                    : 'Erhalten Sie Ihre Gewinne'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1a2f4a] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            {language === 'es'
              ? '¿Listo para Invertir?'
              : language === 'en'
              ? 'Ready to Invest?'
              : language === 'fr'
              ? 'Prêt à Investir?'
              : 'Bereit zu Investieren?'}
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            {language === 'es'
              ? 'Contáctanos hoy para una consulta gratuita y descubre cómo podemos ayudarte a crecer tu patrimonio.'
              : language === 'en'
              ? 'Contact us today for a free consultation and discover how we can help you grow your wealth.'
              : language === 'fr'
              ? 'Contactez-nous aujourd\'hui pour une consultation gratuite et découvrez comment nous pouvons vous aider à augmenter votre patrimoine.'
              : 'Kontaktieren Sie uns heute für eine kostenlose Beratung und erfahren Sie, wie wir Ihnen helfen können, Ihr Vermögen zu vermehren.'}
          </p>
          <Link href="/contact" className="inline-block bg-[#d4af37] text-[#1a2f4a] px-8 py-3 rounded-lg font-semibold hover:bg-white transition-colors">
            {t('contactUs')}
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

