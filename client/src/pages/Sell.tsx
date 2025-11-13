import { useState } from 'react';
import { Home, TrendingUp, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Sell() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    propertyAddress: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    squareMeters: '',
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert(language === 'es' ? 'Gracias por tu solicitud' : language === 'en' ? 'Thank you for your request' : language === 'fr' ? 'Merci pour votre demande' : 'Danke für Ihre Anfrage');
  };

  const benefits = [
    {
      icon: Home,
      titleKey: 'localMarketKnowledge',
      descKey: 'localMarketDesc',
    },
    {
      icon: TrendingUp,
      titleKey: 'worldwideNetwork',
      descKey: 'worldwideNetworkDesc',
    },
    {
      icon: CheckCircle,
      titleKey: 'individualService',
      descKey: 'individualServiceDesc',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#1a2f4a] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('sellSuccessfully')}
          </h1>
          <p className="text-xl text-gray-300">
            {language === 'es'
              ? 'Vende tu propiedad con los mejores profesionales'
              : language === 'en'
              ? 'Sell your property with the best professionals'
              : language === 'fr'
              ? 'Vendez votre propriété avec les meilleurs professionnels'
              : 'Verkaufen Sie Ihre Immobilie mit den besten Fachleuten'}
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">
            {language === 'es'
              ? 'Por qué vender con nosotros'
              : language === 'en'
              ? 'Why sell with us'
              : language === 'fr'
              ? 'Pourquoi vendre avec nous'
              : 'Warum mit uns verkaufen'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition-all duration-300"
                >
                  <Icon size={48} className="text-[#d4af37] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#1a2f4a] mb-3">
                    {language === 'es'
                      ? benefit.titleKey === 'localMarketKnowledge'
                        ? 'Conocimiento del Mercado Local'
                        : benefit.titleKey === 'worldwideNetwork'
                        ? 'Red Global'
                        : 'Servicio Personalizado'
                      : language === 'en'
                      ? benefit.titleKey === 'localMarketKnowledge'
                        ? 'Local Market Knowledge'
                        : benefit.titleKey === 'worldwideNetwork'
                        ? 'Worldwide Network'
                        : 'Individual Service'
                      : language === 'fr'
                      ? benefit.titleKey === 'localMarketKnowledge'
                        ? 'Connaissance du Marché Local'
                        : benefit.titleKey === 'worldwideNetwork'
                        ? 'Réseau Mondial'
                        : 'Service Personnalisé'
                      : benefit.titleKey === 'localMarketKnowledge'
                      ? 'Lokale Marktkenntnisse'
                      : benefit.titleKey === 'worldwideNetwork'
                      ? 'Weltweites Netzwerk'
                      : 'Individueller Service'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'es'
                      ? benefit.titleKey === 'localMarketKnowledge'
                        ? 'Nuestros profesionales conocen el mercado local en profundidad'
                        : benefit.titleKey === 'worldwideNetwork'
                        ? 'Acceso a compradores potenciales en todo el mundo'
                        : 'Servicio personalizado desde la consulta hasta la firma'
                      : language === 'en'
                      ? benefit.titleKey === 'localMarketKnowledge'
                        ? 'Our professionals know the local market in depth'
                        : benefit.titleKey === 'worldwideNetwork'
                        ? 'Access to potential buyers worldwide'
                        : 'Personalized service from consultation to signing'
                      : language === 'fr'
                      ? benefit.titleKey === 'localMarketKnowledge'
                        ? 'Nos professionnels connaissent le marché local en profondeur'
                        : benefit.titleKey === 'worldwideNetwork'
                        ? 'Accès aux acheteurs potentiels du monde entier'
                        : 'Service personnalisé de la consultation à la signature'
                      : benefit.titleKey === 'localMarketKnowledge'
                      ? 'Unsere Profis kennen den lokalen Markt gründlich'
                      : benefit.titleKey === 'worldwideNetwork'
                      ? 'Zugang zu potenziellen Käufern weltweit'
                      : 'Personalisierter Service von der Beratung bis zur Unterzeichnung'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Valuation Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#1a2f4a] mb-8">
              {language === 'es'
                ? 'Obtén una Valoración Online'
                : language === 'en'
                ? 'Get an Online Valuation'
                : language === 'fr'
                ? 'Obtenez une Évaluation en Ligne'
                : 'Erhalten Sie eine Online-Bewertung'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Property Address */}
              <div>
                <label className="block text-sm font-semibold text-[#1a2f4a] mb-2">
                  {language === 'es'
                    ? 'Dirección de la Propiedad'
                    : language === 'en'
                    ? 'Property Address'
                    : language === 'fr'
                    ? 'Adresse de la Propriété'
                    : 'Immobilienadresse'}
                </label>
                <input
                  type="text"
                  name="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37]"
                  required
                />
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-semibold text-[#1a2f4a] mb-2">
                  {language === 'es'
                    ? 'Tipo de Propiedad'
                    : language === 'en'
                    ? 'Property Type'
                    : language === 'fr'
                    ? 'Type de Propriété'
                    : 'Immobilientyp'}
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37]"
                  required
                >
                  <option value="">
                    {language === 'es'
                      ? 'Selecciona un tipo'
                      : language === 'en'
                      ? 'Select a type'
                      : language === 'fr'
                      ? 'Sélectionnez un type'
                      : 'Wählen Sie einen Typ'}
                  </option>
                  <option value="apartment">
                    {language === 'es' ? 'Apartamento' : language === 'en' ? 'Apartment' : language === 'fr' ? 'Appartement' : 'Wohnung'}
                  </option>
                  <option value="house">
                    {language === 'es' ? 'Casa' : language === 'en' ? 'House' : language === 'fr' ? 'Maison' : 'Haus'}
                  </option>
                  <option value="land">
                    {language === 'es' ? 'Terreno' : language === 'en' ? 'Land' : language === 'fr' ? 'Terrain' : 'Grundstück'}
                  </option>
                  <option value="commercial">
                    {language === 'es' ? 'Comercial' : language === 'en' ? 'Commercial' : language === 'fr' ? 'Commercial' : 'Gewerblich'}
                  </option>
                </select>
              </div>

              {/* Bedrooms and Bathrooms */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#1a2f4a] mb-2">
                    {t('bedrooms')}
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1a2f4a] mb-2">
                    {t('bathrooms')}
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Square Meters */}
              <div>
                <label className="block text-sm font-semibold text-[#1a2f4a] mb-2">
                  {t('sqm')}
                </label>
                <input
                  type="number"
                  name="squareMeters"
                  value={formData.squareMeters}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Contact Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold text-[#1a2f4a] mb-4">
                  {language === 'es'
                    ? 'Información de Contacto'
                    : language === 'en'
                    ? 'Contact Information'
                    : language === 'fr'
                    ? 'Informations de Contact'
                    : 'Kontaktinformation'}
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1a2f4a] mb-2">
                      {language === 'es'
                        ? 'Nombre'
                        : language === 'en'
                        ? 'Name'
                        : language === 'fr'
                        ? 'Nom'
                        : 'Name'}
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
                </div>
              </div>

              <button type="submit" className="w-full btn-primary">
                {language === 'es'
                  ? 'Obtener Valoración'
                  : language === 'en'
                  ? 'Get Valuation'
                  : language === 'fr'
                  ? 'Obtenir une Évaluation'
                  : 'Bewertung Erhalten'}
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

