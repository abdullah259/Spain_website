import { useState } from 'react';
import { Menu, X, Globe, DollarSign } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';

type Language = 'es' | 'en' | 'fr' | 'de' | 'ar';
type Currency = 'EUR' | 'USD' | 'GBP' | 'CHF' | 'AED';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);
  const { language, setLanguage, currency, setCurrency, t } = useLanguage();

  const languages: Array<{ code: Language; label: string }> = [
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'ar', label: 'العربية' },
  ];

  const currencyInfo: Array<{ code: Currency; label: string; symbol: string }> = [
    { code: 'EUR', label: 'Euro', symbol: '€' },
    { code: 'USD', label: 'US Dollar', symbol: '$' },
    { code: 'GBP', label: 'British Pound', symbol: '£' },
    { code: 'CHF', label: 'Swiss Franc', symbol: 'CHF' },
    { code: 'AED', label: 'UAE Dirham', symbol: 'د' }, // Will use aed-symbol class
  ];

  const navItems = [
    { key: 'buyRent', href: '/buy-rent' },
    { key: 'sellProperty', href: '/sell' },
    { key: 'construction', href: '/construction' },
    { key: 'invest', href: '/invest' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Link to Home */}
          <Link href="/" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Activa Propiedades" className="h-12 md:h-16" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.key} href={item.href} className="text-[#1a2f4a] hover:text-[#d4af37] font-medium transition-colors">
                {item.key === 'invest'
                  ? language === 'es'
                    ? 'Invertir'
                    : language === 'en'
                    ? 'Invest'
                    : language === 'fr'
                    ? 'Investir'
                    : language === 'de'
                    ? 'Investieren'
                    : 'استثمر'
                  : t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Currency Selector with Logos */}
            <div className="relative">
              <button
                onClick={() => setCurrencyMenuOpen(!currencyMenuOpen)}
                className="flex items-center space-x-1 text-[#1a2f4a] hover:text-[#d4af37] transition-colors text-sm font-semibold"
              >
                <span className={currency === 'AED' ? 'aed-symbol' : ''}>{currencyInfo.find(c => c.code === currency)?.symbol}</span>
                <span>{currency}</span>
              </button>
              {currencyMenuOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-max">
                  {currencyInfo.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        setCurrency(curr.code);
                        setCurrencyMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 flex items-center space-x-2 ${
                        currency === curr.code ? 'bg-[#d4af37] text-[#1a2f4a]' : 'text-[#1a2f4a] hover:bg-gray-100'
                      }`}
                    >
                      <span className={`text-lg font-semibold ${curr.code === 'AED' ? 'aed-symbol' : ''}`}>{curr.symbol}</span>
                      <span>{curr.code}</span>
                      <span className="text-xs text-gray-600">({curr.label})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector with Flags */}
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center space-x-1 text-[#1a2f4a] hover:text-[#d4af37] transition-colors text-sm font-semibold"
              >
                <Globe size={18} />
                <span>{language.toUpperCase()}</span>
              </button>
              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLanguageMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 ${
                        language === lang.code ? 'bg-[#d4af37] text-[#1a2f4a]' : 'text-[#1a2f4a] hover:bg-gray-100'
                      }`}
                    >
                      <span className="font-semibold">{lang.code.toUpperCase()}</span>
                      <span className="text-xs text-gray-600">({lang.label})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#1a2f4a]"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="block text-[#1a2f4a] hover:text-[#d4af37] py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.key === 'invest'
                  ? language === 'es'
                    ? 'Invertir'
                    : language === 'en'
                    ? 'Invest'
                    : language === 'fr'
                    ? 'Investir'
                    : language === 'de'
                    ? 'Investieren'
                    : 'استثمر'
                  : t(item.key)}
              </Link>
            ))}

            {/* Mobile Language Selector */}
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm font-semibold text-[#1a2f4a] mb-2">{language === 'ar' ? 'اللغة' : language === 'es' ? 'Idioma' : language === 'en' ? 'Language' : language === 'fr' ? 'Langue' : 'Sprache'}</p>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      language === lang.code
                        ? 'bg-[#d4af37] text-[#1a2f4a]'
                        : 'bg-gray-100 text-[#1a2f4a] hover:bg-gray-200'
                    }`}
                  >
                    {lang.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Currency Selector */}
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm font-semibold text-[#1a2f4a] mb-2">{language === 'ar' ? 'العملة' : language === 'es' ? 'Moneda' : language === 'en' ? 'Currency' : language === 'fr' ? 'Devise' : 'Währung'}</p>
              <div className="flex flex-wrap gap-2">
                {currencyInfo.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => {
                      setCurrency(curr.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1 rounded-full text-sm ${
                      currency === curr.code
                        ? 'bg-[#d4af37] text-[#1a2f4a]'
                        : 'bg-gray-100 text-[#1a2f4a] hover:bg-gray-200'
                    }`}
                  >
                    {curr.code}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

