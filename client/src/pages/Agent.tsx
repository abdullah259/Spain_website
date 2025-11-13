import { Briefcase, Users, TrendingUp, Globe } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

export default function Agent() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(language === 'es' ? 'Gracias por tu solicitud' : language === 'en' ? 'Thank you for your application' : language === 'fr' ? 'Merci pour votre candidature' : 'Danke für Ihre Bewerbung');
  };

  const benefits = [
    {
      icon: Globe,
      titleKey: 'globalNetwork',
      descKey: 'globalNetworkDesc',
    },
    {
      icon: TrendingUp,
      titleKey: 'careerGrowth',
      descKey: 'careerGrowthDesc',
    },
    {
      icon: Users,
      titleKey: 'teamSupport',
      descKey: 'teamSupportDesc',
    },
    {
      icon: Briefcase,
      titleKey: 'professionalTools',
      descKey: 'professionalToolsDesc',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#1a2f4a] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('becomeAgent')}
          </h1>
          <p className="text-xl text-gray-300">
            {language === 'es'
              ? 'Únete a una empresa internacional líder en bienes raíces'
              : language === 'en'
              ? 'Join a leading international real estate company'
              : language === 'fr'
              ? 'Rejoignez une entreprise immobilière internationale de premier plan'
              : 'Treten Sie einem führenden internationalen Immobilienunternehmen bei'}
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">
            {language === 'es'
              ? 'Por qué unirse a nosotros'
              : language === 'en'
              ? 'Why join us'
              : language === 'fr'
              ? 'Pourquoi nous rejoindre'
              : 'Warum uns beitreten'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="text-center">
                  <Icon size={48} className="text-[#d4af37] mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-[#1a2f4a] mb-2">
                    {language === 'es'
                      ? benefit.titleKey === 'globalNetwork'
                        ? 'Red Global'
                        : benefit.titleKey === 'careerGrowth'
                        ? 'Crecimiento Profesional'
                        : benefit.titleKey === 'teamSupport'
                        ? 'Apoyo del Equipo'
                        : 'Herramientas Profesionales'
                      : language === 'en'
                      ? benefit.titleKey === 'globalNetwork'
                        ? 'Global Network'
                        : benefit.titleKey === 'careerGrowth'
                        ? 'Career Growth'
                        : benefit.titleKey === 'teamSupport'
                        ? 'Team Support'
                        : 'Professional Tools'
                      : language === 'fr'
                      ? benefit.titleKey === 'globalNetwork'
                        ? 'Réseau Mondial'
                        : benefit.titleKey === 'careerGrowth'
                        ? 'Croissance Professionnelle'
                        : benefit.titleKey === 'teamSupport'
                        ? 'Soutien de l\'Équipe'
                        : 'Outils Professionnels'
                      : benefit.titleKey === 'globalNetwork'
                      ? 'Globales Netzwerk'
                      : benefit.titleKey === 'careerGrowth'
                      ? 'Berufliches Wachstum'
                      : benefit.titleKey === 'teamSupport'
                      ? 'Teamunterstützung'
                      : 'Professionelle Tools'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {language === 'es'
                      ? benefit.titleKey === 'globalNetwork'
                        ? 'Acceso a una red de más de 1,000 ubicaciones en 35 países'
                        : benefit.titleKey === 'careerGrowth'
                        ? 'Oportunidades de desarrollo profesional continuo'
                        : benefit.titleKey === 'teamSupport'
                        ? 'Equipo experimentado listo para apoyarte'
                        : 'Tecnología y herramientas de última generación'
                      : language === 'en'
                      ? benefit.titleKey === 'globalNetwork'
                        ? 'Access to a network of over 1,000 locations in 35 countries'
                        : benefit.titleKey === 'careerGrowth'
                        ? 'Continuous professional development opportunities'
                        : benefit.titleKey === 'teamSupport'
                        ? 'Experienced team ready to support you'
                        : 'State-of-the-art technology and tools'
                      : language === 'fr'
                      ? benefit.titleKey === 'globalNetwork'
                        ? 'Accès à un réseau de plus de 1 000 emplacements dans 35 pays'
                        : benefit.titleKey === 'careerGrowth'
                        ? 'Opportunités de développement professionnel continu'
                        : benefit.titleKey === 'teamSupport'
                        ? 'Équipe expérimentée prête à vous soutenir'
                        : 'Technologie et outils de pointe'
                      : benefit.titleKey === 'globalNetwork'
                      ? 'Zugang zu einem Netzwerk von über 1.000 Standorten in 35 Ländern'
                      : benefit.titleKey === 'careerGrowth'
                      ? 'Möglichkeiten zur kontinuierlichen beruflichen Entwicklung'
                      : benefit.titleKey === 'teamSupport'
                      ? 'Erfahrenes Team bereit, Sie zu unterstützen'
                      : 'Hochmoderne Technologie und Tools'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#1a2f4a] mb-8">
              {language === 'es'
                ? 'Solicita Ahora'
                : language === 'en'
                ? 'Apply Now'
                : language === 'fr'
                ? 'Postulez Maintenant'
                : 'Jetzt Bewerben'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#1a2f4a] mb-2">
                  {language === 'es'
                    ? 'Nombre Completo'
                    : language === 'en'
                    ? 'Full Name'
                    : language === 'fr'
                    ? 'Nom Complet'
                    : 'Vollständiger Name'}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1a2f4a] mb-2">
                  {language === 'es'
                    ? 'Correo Electrónico'
                    : language === 'en'
                    ? 'Email'
                    : language === 'fr'
                    ? 'Email'
                    : 'E-Mail'}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1a2f4a] mb-2">
                  {language === 'es'
                    ? 'Teléfono'
                    : language === 'en'
                    ? 'Phone'
                    : language === 'fr'
                    ? 'Téléphone'
                    : 'Telefon'}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1a2f4a] mb-2">
                  {language === 'es'
                    ? 'Experiencia en Bienes Raíces'
                    : language === 'en'
                    ? 'Real Estate Experience'
                    : language === 'fr'
                    ? 'Expérience Immobilière'
                    : 'Immobilienerfahrung'}
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37]"
                  required
                >
                  <option value="">
                    {language === 'es'
                      ? 'Selecciona una opción'
                      : language === 'en'
                      ? 'Select an option'
                      : language === 'fr'
                      ? 'Sélectionnez une option'
                      : 'Wählen Sie eine Option'}
                  </option>
                  <option value="no-experience">
                    {language === 'es'
                      ? 'Sin experiencia'
                      : language === 'en'
                      ? 'No experience'
                      : language === 'fr'
                      ? 'Pas d\'expérience'
                      : 'Keine Erfahrung'}
                  </option>
                  <option value="1-3-years">
                    {language === 'es'
                      ? '1-3 años'
                      : language === 'en'
                      ? '1-3 years'
                      : language === 'fr'
                      ? '1-3 ans'
                      : '1-3 Jahre'}
                  </option>
                  <option value="3-5-years">
                    {language === 'es'
                      ? '3-5 años'
                      : language === 'en'
                      ? '3-5 years'
                      : language === 'fr'
                      ? '3-5 ans'
                      : '3-5 Jahre'}
                  </option>
                  <option value="5-plus-years">
                    {language === 'es'
                      ? 'Más de 5 años'
                      : language === 'en'
                      ? '5+ years'
                      : language === 'fr'
                      ? '5+ ans'
                      : '5+ Jahre'}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1a2f4a] mb-2">
                  {language === 'es'
                    ? 'Mensaje'
                    : language === 'en'
                    ? 'Message'
                    : language === 'fr'
                    ? 'Message'
                    : 'Nachricht'}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37]"
                  placeholder={
                    language === 'es'
                      ? 'Cuéntanos sobre ti...'
                      : language === 'en'
                      ? 'Tell us about yourself...'
                      : language === 'fr'
                      ? 'Parlez-nous de vous...'
                      : 'Erzählen Sie uns von sich...'
                  }
                />
              </div>

              <button type="submit" className="w-full btn-primary">
                {language === 'es'
                  ? 'Enviar Solicitud'
                  : language === 'en'
                  ? 'Submit Application'
                  : language === 'fr'
                  ? 'Soumettre une Candidature'
                  : 'Bewerbung Einreichen'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

