import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

export default function Contact() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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
    alert(language === 'es' ? 'Gracias por tu mensaje' : language === 'en' ? 'Thank you for your message' : language === 'fr' ? 'Merci pour votre message' : 'Danke für Ihre Nachricht');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#1a2f4a] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('contactUs')}
          </h1>
          <p className="text-xl text-gray-300">
            {language === 'es'
              ? 'Estamos aquí para ayudarte'
              : language === 'en'
              ? 'We are here to help you'
              : language === 'fr'
              ? 'Nous sommes là pour vous aider'
              : 'Wir sind hier, um Ihnen zu helfen'}
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Email */}
            <div className="text-center">
              <Mail size={48} className="text-[#d4af37] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#1a2f4a] mb-2">
                {language === 'es'
                  ? 'Correo Electrónico'
                  : language === 'en'
                  ? 'Email'
                  : language === 'fr'
                  ? 'Email'
                  : 'E-Mail'}
              </h3>
              <a href="mailto:info@activapropiedades.com" className="text-[#d4af37] hover:underline">
                info@activapropiedades.com
              </a>
            </div>

            {/* Phone */}
            <div className="text-center">
              <Phone size={48} className="text-[#d4af37] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#1a2f4a] mb-2">
                {language === 'es'
                  ? 'Teléfono'
                  : language === 'en'
                  ? 'Phone'
                  : language === 'fr'
                  ? 'Téléphone'
                  : 'Telefon'}
              </h3>
              <a href="tel:+34642383997" className="text-[#d4af37] hover:underline">
                +34 642 383 997
              </a>
            </div>

            {/* Address */}
            <div className="text-center">
              <MapPin size={48} className="text-[#d4af37] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#1a2f4a] mb-2">
                {language === 'es'
                  ? 'Dirección'
                  : language === 'en'
                  ? 'Address'
                  : language === 'fr'
                  ? 'Adresse'
                  : 'Adresse'}
              </h3>
              <p className="text-gray-600">
                {language === 'es'
                  ? 'Madrid, España'
                  : language === 'en'
                  ? 'Madrid, Spain'
                  : language === 'fr'
                  ? 'Madrid, Espagne'
                  : 'Madrid, Spanien'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#1a2f4a] mb-8">
              {language === 'es'
                ? 'Envíanos un Mensaje'
                : language === 'en'
                ? 'Send us a Message'
                : language === 'fr'
                ? 'Envoyez-nous un Message'
                : 'Senden Sie uns eine Nachricht'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1a2f4a] mb-2">
                  {language === 'es'
                    ? 'Asunto'
                    : language === 'en'
                    ? 'Subject'
                    : language === 'fr'
                    ? 'Sujet'
                    : 'Betreff'}
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37]"
                  required
                >
                  <option value="">
                    {language === 'es'
                      ? 'Selecciona un asunto'
                      : language === 'en'
                      ? 'Select a subject'
                      : language === 'fr'
                      ? 'Sélectionnez un sujet'
                      : 'Wählen Sie ein Thema'}
                  </option>
                  <option value="buy">
                    {language === 'es'
                      ? 'Compra de Propiedad'
                      : language === 'en'
                      ? 'Property Purchase'
                      : language === 'fr'
                      ? 'Achat de Propriété'
                      : 'Immobilienkauf'}
                  </option>
                  <option value="sell">
                    {language === 'es'
                      ? 'Venta de Propiedad'
                      : language === 'en'
                      ? 'Property Sale'
                      : language === 'fr'
                      ? 'Vente de Propriété'
                      : 'Immobilienverkauf'}
                  </option>
                  <option value="investment">
                    {language === 'es'
                      ? 'Inversión'
                      : language === 'en'
                      ? 'Investment'
                      : language === 'fr'
                      ? 'Investissement'
                      : 'Investition'}
                  </option>
                  <option value="technical">
                    {language === 'es'
                      ? 'Servicios Técnicos'
                      : language === 'en'
                      ? 'Technical Services'
                      : language === 'fr'
                      ? 'Services Techniques'
                      : 'Technische Dienstleistungen'}
                  </option>
                  <option value="other">
                    {language === 'es'
                      ? 'Otro'
                      : language === 'en'
                      ? 'Other'
                      : language === 'fr'
                      ? 'Autre'
                      : 'Sonstiges'}
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
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37]"
                  placeholder={
                    language === 'es'
                      ? 'Escribe tu mensaje aquí...'
                      : language === 'en'
                      ? 'Write your message here...'
                      : language === 'fr'
                      ? 'Écrivez votre message ici...'
                      : 'Schreiben Sie Ihre Nachricht hier...'
                  }
                  required
                />
              </div>

              <button type="submit" className="w-full btn-primary flex items-center justify-center space-x-2">
                <Send size={20} />
                <span>
                  {language === 'es'
                    ? 'Enviar Mensaje'
                    : language === 'en'
                    ? 'Send Message'
                    : language === 'fr'
                    ? 'Envoyer le Message'
                    : 'Nachricht Senden'}
                </span>
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

