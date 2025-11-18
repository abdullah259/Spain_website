import { useLanguage } from '@/contexts/LanguageContext';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const { language } = useLanguage();

  const phoneNumber = '+34642383997';
  const messages = {
    es: 'Hola, me gustaría obtener más información sobre sus servicios.',
    en: 'Hello, I would like to get more information about your services.',
    fr: 'Bonjour, j\'aimerais obtenir plus d\'informations sur vos services.',
    de: 'Hallo, ich möchte gerne mehr Informationen über Ihre Dienstleistungen erhalten.',
  };

  const message = messages[language as keyof typeof messages] || messages.en;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25d366] hover:bg-[#20ba5a] text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110"
      title={language === 'es' ? 'Contactar por WhatsApp' : language === 'en' ? 'Contact via WhatsApp' : language === 'fr' ? 'Contacter par WhatsApp' : 'Kontaktieren Sie uns per WhatsApp'}
    >
      {/* Official WhatsApp Logo */}
      {/* <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.946 1.194c-1.54.793-2.847 1.921-3.916 3.349-1.068 1.428-1.878 3.03-2.432 4.703-.554 1.673-.85 3.438-.85 5.213 0 1.775.296 3.54.85 5.213.554 1.673 1.364 3.275 2.432 4.703 1.069 1.428 2.376 2.556 3.916 3.349 1.54.793 3.174 1.194 4.946 1.194 1.772 0 3.406-.401 4.946-1.194 1.54-.793 2.847-1.921 3.916-3.349 1.068-1.428 1.878-3.03 2.432-4.703.554-1.673.85-3.438.85-5.213 0-1.775-.296-3.54-.85-5.213-.554-1.673-1.364-3.275-2.432-4.703-1.069-1.428-2.376-2.556-3.916-3.349-1.54-.793-3.174-1.194-4.946-1.194zm0-2.182c2.209 0 4.32.502 6.331 1.506 2.01 1.004 3.72 2.397 5.128 4.18 1.408 1.783 2.512 3.865 3.312 6.245.8 2.38 1.2 4.96 1.2 7.74 0 2.78-.4 5.36-1.2 7.74-.8 2.38-1.904 4.462-3.312 6.245-1.408 1.783-3.118 3.176-5.128 4.18-2.011 1.004-4.122 1.506-6.331 1.506-2.209 0-4.32-.502-6.331-1.506-2.01-1.004-3.72-2.397-5.128-4.18-1.408-1.783-2.512-3.865-3.312-6.245-.8-2.38-1.2-4.96-1.2-7.74 0-2.78.4-5.36 1.2-7.74.8-2.38 1.904-4.462 3.312-6.245 1.408-1.783 3.118-3.176 5.128-4.18 2.011-1.004 4.122-1.506 6.331-1.506z" />
      </svg> */}
      <FaWhatsapp size={32} />
    </a>
  );
}

