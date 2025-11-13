import { Award, Globe, Users, Target } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Company() {
  const { language, t } = useLanguage();

  const values = [
    {
      icon: Award,
      titleKey: 'excellence',
      descKey: 'excellenceDesc',
    },
    {
      icon: Globe,
      titleKey: 'global',
      descKey: 'globalDesc',
    },
    {
      icon: Users,
      titleKey: 'teamwork',
      descKey: 'teamworkDesc',
    },
    {
      icon: Target,
      titleKey: 'innovation',
      descKey: 'innovationDesc',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#1a2f4a] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {language === 'es'
              ? 'Sobre Activa Propiedades'
              : language === 'en'
              ? 'About Activa Propiedades'
              : language === 'fr'
              ? 'À Propos d\'Activa Propiedades'
              : 'Über Activa Propiedades'}
          </h1>
          <p className="text-xl text-gray-300">
            {language === 'es'
              ? 'Tu futuro, nuestro compromiso'
              : language === 'en'
              ? 'Your future, our commitment'
              : language === 'fr'
              ? 'Votre avenir, notre engagement'
              : 'Ihre Zukunft, unser Engagement'}
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#1a2f4a] mb-6">
                {language === 'es'
                  ? 'Quiénes Somos'
                  : language === 'en'
                  ? 'Who We Are'
                  : language === 'fr'
                  ? 'Qui Sommes-Nous'
                  : 'Wer Wir Sind'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'es'
                  ? 'Activa Propiedades es una empresa líder en servicios inmobiliarios, inversiones y servicios técnicos. Con más de 20 años de experiencia, nos especializamos en proporcionar soluciones integrales para todas tus necesidades de bienes raíces.'
                  : language === 'en'
                  ? 'Activa Propiedades is a leading company in real estate services, investments, and technical services. With over 20 years of experience, we specialize in providing comprehensive solutions for all your real estate needs.'
                  : language === 'fr'
                  ? 'Activa Propiedades est une entreprise leader dans les services immobiliers, les investissements et les services techniques. Avec plus de 20 ans d\'expérience, nous nous spécialisons dans la fourniture de solutions complètes pour tous vos besoins immobiliers.'
                  : 'Activa Propiedades ist ein führendes Unternehmen in Immobiliendienstleistungen, Investitionen und technischen Dienstleistungen. Mit über 20 Jahren Erfahrung spezialisieren wir uns auf umfassende Lösungen für alle Ihre Immobilienbedürfnisse.'}
              </p>
              <p className="text-gray-600">
                {language === 'es'
                  ? 'Nuestro equipo de profesionales experimentados está comprometido con la excelencia y la satisfacción del cliente en cada proyecto que realizamos.'
                  : language === 'en'
                  ? 'Our team of experienced professionals is committed to excellence and customer satisfaction in every project we undertake.'
                  : language === 'fr'
                  ? 'Notre équipe de professionnels expérimentés s\'engage à l\'excellence et à la satisfaction de la clientèle dans chaque projet que nous entreprendre.'
                  : 'Unser Team erfahrener Fachleute ist der Exzellenz und Kundenzufriedenheit in jedem Projekt verpflichtet, das wir durchführen.'}
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop"
                alt="Team"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">
            {language === 'es'
              ? 'Nuestros Valores'
              : language === 'en'
              ? 'Our Values'
              : language === 'fr'
              ? 'Nos Valeurs'
              : 'Unsere Werte'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-all duration-300">
                  <Icon size={48} className="text-[#d4af37] mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-[#1a2f4a] mb-2">
                    {language === 'es'
                      ? value.titleKey === 'excellence'
                        ? 'Excelencia'
                        : value.titleKey === 'global'
                        ? 'Alcance Global'
                        : value.titleKey === 'teamwork'
                        ? 'Trabajo en Equipo'
                        : 'Innovación'
                      : language === 'en'
                      ? value.titleKey === 'excellence'
                        ? 'Excellence'
                        : value.titleKey === 'global'
                        ? 'Global Reach'
                        : value.titleKey === 'teamwork'
                        ? 'Teamwork'
                        : 'Innovation'
                      : language === 'fr'
                      ? value.titleKey === 'excellence'
                        ? 'Excellence'
                        : value.titleKey === 'global'
                        ? 'Portée Mondiale'
                        : value.titleKey === 'teamwork'
                        ? 'Travail d\'Équipe'
                        : 'Innovation'
                      : value.titleKey === 'excellence'
                      ? 'Exzellenz'
                      : value.titleKey === 'global'
                      ? 'Globale Reichweite'
                      : value.titleKey === 'teamwork'
                      ? 'Teamarbeit'
                      : 'Innovation'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {language === 'es'
                      ? value.titleKey === 'excellence'
                        ? 'Nos esforzamos por la excelencia en cada aspecto de nuestro trabajo'
                        : value.titleKey === 'global'
                        ? 'Operamos en múltiples países con estándares internacionales'
                        : value.titleKey === 'teamwork'
                        ? 'Colaboración y comunicación efectiva en todo nuestro equipo'
                        : 'Buscamos constantemente nuevas formas de mejorar nuestros servicios'
                      : language === 'en'
                      ? value.titleKey === 'excellence'
                        ? 'We strive for excellence in every aspect of our work'
                        : value.titleKey === 'global'
                        ? 'We operate in multiple countries with international standards'
                        : value.titleKey === 'teamwork'
                        ? 'Collaboration and effective communication across our team'
                        : 'We constantly seek new ways to improve our services'
                      : language === 'fr'
                      ? value.titleKey === 'excellence'
                        ? 'Nous recherchons l\'excellence dans tous les aspects de notre travail'
                        : value.titleKey === 'global'
                        ? 'Nous opérons dans plusieurs pays avec des normes internationales'
                        : value.titleKey === 'teamwork'
                        ? 'Collaboration et communication efficace au sein de notre équipe'
                        : 'Nous recherchons constamment de nouvelles façons d\'améliorer nos services'
                      : value.titleKey === 'excellence'
                      ? 'Wir streben in allen Aspekten unserer Arbeit nach Exzellenz'
                      : value.titleKey === 'global'
                      ? 'Wir sind in mehreren Ländern mit internationalen Standards tätig'
                      : value.titleKey === 'teamwork'
                      ? 'Zusammenarbeit und effektive Kommunikation in unserem Team'
                      : 'Wir suchen ständig nach neuen Wegen, um unsere Dienstleistungen zu verbessern'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-[#1a2f4a] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#d4af37] mb-2">20+</div>
              <p className="text-gray-300">
                {language === 'es'
                  ? 'Años de Experiencia'
                  : language === 'en'
                  ? 'Years of Experience'
                  : language === 'fr'
                  ? 'Années d\'Expérience'
                  : 'Jahre Erfahrung'}
              </p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#d4af37] mb-2">1000+</div>
              <p className="text-gray-300">
                {language === 'es'
                  ? 'Propiedades Vendidas'
                  : language === 'en'
                  ? 'Properties Sold'
                  : language === 'fr'
                  ? 'Propriétés Vendues'
                  : 'Verkaufte Immobilien'}
              </p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#d4af37] mb-2">500+</div>
              <p className="text-gray-300">
                {language === 'es'
                  ? 'Clientes Satisfechos'
                  : language === 'en'
                  ? 'Satisfied Clients'
                  : language === 'fr'
                  ? 'Clients Satisfaits'
                  : 'Zufriedene Kunden'}
              </p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#d4af37] mb-2">15+</div>
              <p className="text-gray-300">
                {language === 'es'
                  ? 'Profesionales'
                  : language === 'en'
                  ? 'Professionals'
                  : language === 'fr'
                  ? 'Professionnels'
                  : 'Fachleute'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

