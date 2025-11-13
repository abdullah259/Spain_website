import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Locations() {
  const { language, t } = useLanguage();

  const offices = [
    {
      city: language === 'es' ? 'Madrid' : language === 'en' ? 'Madrid' : language === 'fr' ? 'Madrid' : 'Madrid',
      address: 'Paseo de la Castellana 77, 28046 Madrid',
      phone: '+34 91 123 4567',
      email: 'madrid@activapropiedades.com',
      hours: language === 'es' ? 'Lun-Vie: 9:00-18:00' : language === 'en' ? 'Mon-Fri: 9:00-18:00' : language === 'fr' ? 'Lun-Ven: 9:00-18:00' : 'Mo-Fr: 9:00-18:00',
    },
    {
      city: language === 'es' ? 'Barcelona' : language === 'en' ? 'Barcelona' : language === 'fr' ? 'Barcelone' : 'Barcelona',
      address: 'Avenida Diagonal 640, 08017 Barcelona',
      phone: '+34 93 456 7890',
      email: 'barcelona@activapropiedades.com',
      hours: language === 'es' ? 'Lun-Vie: 9:00-18:00' : language === 'en' ? 'Mon-Fri: 9:00-18:00' : language === 'fr' ? 'Lun-Ven: 9:00-18:00' : 'Mo-Fr: 9:00-18:00',
    },
    {
      city: language === 'es' ? 'Málaga' : language === 'en' ? 'Málaga' : language === 'fr' ? 'Málaga' : 'Málaga',
      address: 'Calle Larios 5, 29015 Málaga',
      phone: '+34 95 234 5678',
      email: 'malaga@activapropiedades.com',
      hours: language === 'es' ? 'Lun-Vie: 9:00-18:00' : language === 'en' ? 'Mon-Fri: 9:00-18:00' : language === 'fr' ? 'Lun-Ven: 9:00-18:00' : 'Mo-Fr: 9:00-18:00',
    },
    {
      city: language === 'es' ? 'Valencia' : language === 'en' ? 'Valencia' : language === 'fr' ? 'Valence' : 'Valencia',
      address: 'Calle Colón 45, 46004 Valencia',
      phone: '+34 96 345 6789',
      email: 'valencia@activapropiedades.com',
      hours: language === 'es' ? 'Lun-Vie: 9:00-18:00' : language === 'en' ? 'Mon-Fri: 9:00-18:00' : language === 'fr' ? 'Lun-Ven: 9:00-18:00' : 'Mo-Fr: 9:00-18:00',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#1a2f4a] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('locations')}
          </h1>
          <p className="text-xl text-gray-300">
            {language === 'es'
              ? 'Encuéntranos en múltiples ubicaciones'
              : language === 'en'
              ? 'Find us in multiple locations'
              : language === 'fr'
              ? 'Trouvez-nous dans plusieurs emplacements'
              : 'Finden Sie uns an mehreren Standorten'}
          </p>
        </div>
      </section>

      {/* Offices Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offices.map((office, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-[#1a2f4a] mb-6">{office.city}</h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <MapPin size={24} className="text-[#d4af37] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-[#1a2f4a]">
                        {language === 'es'
                          ? 'Dirección'
                          : language === 'en'
                          ? 'Address'
                          : language === 'fr'
                          ? 'Adresse'
                          : 'Adresse'}
                      </p>
                      <p className="text-gray-600">{office.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone size={24} className="text-[#d4af37] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-[#1a2f4a]">
                        {language === 'es'
                          ? 'Teléfono'
                          : language === 'en'
                          ? 'Phone'
                          : language === 'fr'
                          ? 'Téléphone'
                          : 'Telefon'}
                      </p>
                      <a href={`tel:${office.phone}`} className="text-[#d4af37] hover:underline">
                        {office.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail size={24} className="text-[#d4af37] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-[#1a2f4a]">
                        {language === 'es'
                          ? 'Correo Electrónico'
                          : language === 'en'
                          ? 'Email'
                          : language === 'fr'
                          ? 'Email'
                          : 'E-Mail'}
                      </p>
                      <a href={`mailto:${office.email}`} className="text-[#d4af37] hover:underline">
                        {office.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock size={24} className="text-[#d4af37] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-[#1a2f4a]">
                        {language === 'es'
                          ? 'Horario'
                          : language === 'en'
                          ? 'Hours'
                          : language === 'fr'
                          ? 'Heures'
                          : 'Öffnungszeiten'}
                      </p>
                      <p className="text-gray-600">{office.hours}</p>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-6 btn-primary">
                  {language === 'es'
                    ? 'Contactar'
                    : language === 'en'
                    ? 'Contact'
                    : language === 'fr'
                    ? 'Contacter'
                    : 'Kontakt'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

