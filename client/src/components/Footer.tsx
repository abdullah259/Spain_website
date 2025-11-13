import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';

export default function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-[#1a2f4a] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#d4af37]">
              {t('company')}
            </h3>
            <p className="text-gray-300 text-sm">
              {language === 'es'
                ? 'Activa Propiedades es tu socio confiable en bienes raíces, inversión y servicios técnicos.'
                : language === 'en'
                ? 'Activa Propiedades is your trusted partner in real estate, investment, and technical services.'
                : language === 'fr'
                ? 'Activa Propiedades est votre partenaire de confiance en immobilier, investissement et services techniques.'
                : 'Activa Propiedades ist Ihr vertrauenswürdiger Partner in Immobilien, Investitionen und technischen Dienstleistungen.'}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#d4af37]">
              {t('servicesFooter')}
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#properties" className="hover:text-[#d4af37] transition-colors">
                  {t('realEstate')}
                </a>
              </li>
              <li>
                <a href="#investment" className="hover:text-[#d4af37] transition-colors">
                  {t('investment')}
                </a>
              </li>
              <li>
                <a href="#technical" className="hover:text-[#d4af37] transition-colors">
                  {t('technical')}
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#d4af37]">
              {language === 'es'
                ? 'Navegación'
                : language === 'en'
                ? 'Navigation'
                : language === 'fr'
                ? 'Navigation'
                : 'Navigation'}
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/locations" className="hover:text-[#d4af37] transition-colors">
                  {t('locations')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#d4af37] transition-colors">
                  {t('contactUs')}
                </Link>
              </li>
              <li>
                <Link href="/company" className="hover:text-[#d4af37] transition-colors">
                  {t('company')}
                </Link>
              </li>
              <li>
                <Link href="/agent" className="hover:text-[#d4af37] transition-colors">
                  {language === 'es'
                    ? 'Become A Agente Inmobiliario'
                    : language === 'en'
                    ? 'Become A Real Estate Agent'
                    : language === 'fr'
                    ? 'Devenir Agent Immobilier'
                    : language === 'de'
                    ? 'Immobilienmakler Werden'
                    : 'أصبح وكيل عقاري'}
                </Link>
              </li>
              <li>
                <Link href="/construction" className="hover:text-[#d4af37] transition-colors">
                  {language === 'es'
                    ? 'Construcción'
                    : language === 'en'
                    ? 'Construction'
                    : language === 'fr'
                    ? 'Construction'
                    : language === 'de'
                    ? 'Konstruktion'
                    : 'البناء'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#d4af37]">
              {t('legal')}
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#privacy" className="hover:text-[#d4af37] transition-colors">
                  {t('privacyPolicy')}
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-[#d4af37] transition-colors">
                  {t('termsConditions')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#d4af37]">
              {t('followUs')}
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#d4af37] transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#d4af37] transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#d4af37] transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#d4af37] transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>
            © 2024 Activa Propiedades. {t('allRightsReserved')}.
          </p>
        </div>
      </div>
    </footer>
  );
}

