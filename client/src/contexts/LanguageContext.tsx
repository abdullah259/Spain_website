import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'es' | 'en' | 'fr' | 'de' | 'ar';
type Currency = 'EUR' | 'USD' | 'GBP' | 'CHF' | 'AED';

interface Translations {
  [key: string]: {
    es: string;
    en: string;
    fr: string;
    de: string;
    ar: string;
  };
}

const translations: Translations = {
  // Header Navigation
  buyRent: { es: 'Comprar y Alquilar', en: 'Buy & Rent', fr: 'Acheter et Louer', de: 'Kaufen & Mieten', ar: 'شراء وتأجير' },
  sellProperty: { es: 'Vender Propiedad', en: 'Sell Property', fr: 'Vendre Propriété', de: 'Immobilie Verkaufen', ar: 'بيع العقار' },
  realEstateAgent: { es: 'Agente Inmobiliario', en: 'Real Estate Agent', fr: 'Agent Immobilier', de: 'Immobilienmakler', ar: 'وكيل العقارات' },
  company: { es: 'Empresa', en: 'Company', fr: 'Entreprise', de: 'Unternehmen', ar: 'الشركة' },
  locations: { es: 'Ubicaciones', en: 'Locations', fr: 'Emplacements', de: 'Standorte', ar: 'المواقع' },
  watchlist: { es: 'Lista de Deseos', en: 'Watchlist', fr: 'Liste de Surveillance', de: 'Merkliste', ar: 'قائمة المراقبة' },
  contactUs: { es: 'Contáctenos', en: 'Contact Us', fr: 'Nous Contacter', de: 'Kontaktieren Sie uns', ar: 'اتصل بنا' },
  invest: { es: 'Invertir', en: 'Invest', fr: 'Investir', de: 'Investieren', ar: 'استثمر' },

  // Hero Section
  findDreamProperty: { es: 'Encuentra tu propiedad de ensueño', en: 'Find your dream property', fr: 'Trouvez votre propriété de rêve', de: 'Finden Sie Ihre Traumimmobilie', ar: 'ابحث عن عقارك الحلم' },
  tagline: { es: 'Tu futuro, nuestro compromiso', en: 'Your future, our commitment', fr: 'Votre avenir, notre engagement', de: 'Ihre Zukunft, unser Engagement', ar: 'مستقبلك، التزامنا' },

  // Search
  buy: { es: 'Comprar', en: 'Buy', fr: 'Acheter', de: 'Kaufen', ar: 'شراء' },
  rent: { es: 'Alquilar', en: 'Rent', fr: 'Louer', de: 'Mieten', ar: 'تأجير' },
  search: { es: 'Buscar', en: 'Search', fr: 'Rechercher', de: 'Suchen', ar: 'بحث' },
  searchPlaceholder: { es: 'Ciudad, distrito, código postal o ID', en: 'City, district, postal code or ID', fr: 'Ville, district, code postal ou ID', de: 'Stadt, Bezirk, Postleitzahl oder ID', ar: 'المدينة أو المنطقة أو الرمز البريدي' },

  // CTA Buttons
  buyDreamHome: { es: 'Compra tu casa de ensueño', en: 'Buy your dream home', fr: 'Achetez votre maison de rêve', de: 'Kaufen Sie Ihr Traumhaus', ar: 'اشتر منزل أحلامك' },
  sellSuccessfully: { es: 'Vende con éxito', en: 'Sell successfully', fr: 'Vendre avec succès', de: 'Erfolgreich verkaufen', ar: 'بيع بنجاح' },
  becomeAgent: { es: 'Conviértete en agente', en: 'Become a real estate advisor', fr: 'Devenir conseiller immobilier', de: 'Werden Sie Immobilienberater', ar: 'كن مستشار عقارات' },

  // Three Pillars
  realEstate: { es: 'Inmobiliaria', en: 'Real Estate', fr: 'Immobilier', de: 'Immobilien', ar: 'العقارات' },
  realEstateDesc: { es: 'Propiedades para venta, alquiler y gestión inmobiliaria profesional.', en: 'Properties for sale, rent, and professional property management.', fr: 'Propriétés à vendre, à louer et gestion immobilière professionnelle.', de: 'Immobilien zum Verkauf, zur Miete und professionelle Immobilienverwaltung.', ar: 'عقارات للبيع والإيجار والإدارة المهنية' },
  investment: { es: 'Inversiones y Promoción', en: 'Investment & Development', fr: 'Investissement et Développement', de: 'Investition & Entwicklung', ar: 'الاستثمار والتطوير' },
  investmentDesc: { es: 'Terrenos, inversión en apartamentos y proyectos de nueva construcción.', en: 'Land, apartment investment, and new construction projects.', fr: 'Terrains, investissement immobilier et nouveaux projets de construction.', de: 'Grundstücke, Wohnungsinvestitionen und neue Bauprojekte.', ar: 'أراضي واستثمارات سكنية ومشاريع بناء جديدة' },
  technical: { es: 'Servicios Técnicos', en: 'Technical Services', fr: 'Services Techniques', de: 'Technische Dienstleistungen', ar: 'الخدمات التقنية' },
  technicalDesc: { es: 'Diseño interior, renovación, mantenimiento y Passive House.', en: 'Interior design, renovation, maintenance, and Passive House.', fr: 'Design intérieur, rénovation, entretien et maison passive.', de: 'Innendesign, Renovierung, Wartung und Passivhaus.', ar: 'التصميم الداخلي والتجديد والصيانة والمنازل الخضراء' },

  // Featured Properties
  featuredProperties: { es: 'Propiedades Destacadas', en: 'Featured Properties', fr: 'Propriétés en Vedette', de: 'Ausgewählte Immobilien', ar: 'العقارات المميزة' },
  sale: { es: 'Venta', en: 'Sale', fr: 'Vente', de: 'Verkauf', ar: 'للبيع' },
  rentLabel: { es: 'Alquiler', en: 'Rent', fr: 'Location', de: 'Miete', ar: 'للإيجار' },
  investmentType: { es: 'Inversión', en: 'Investment', fr: 'Investissement', de: 'Investition', ar: 'استثمار' },
  bedrooms: { es: 'Habitaciones', en: 'Bedrooms', fr: 'Chambres', de: 'Schlafzimmer', ar: 'غرف النوم' },
  bathrooms: { es: 'Baños', en: 'Bathrooms', fr: 'Salles de Bain', de: 'Badezimmer', ar: 'الحمامات' },
  sqm: { es: 'm²', en: 'sqm', fr: 'm²', de: 'm²', ar: 'م²' },
  sqft: { es: 'pies²', en: 'sq ft', fr: 'pi²', de: 'qft', ar: 'قدم²' },
  viewDetails: { es: 'Ver detalles', en: 'View details', fr: 'Voir les détails', de: 'Details ansehen', ar: 'عرض التفاصيل' },

  // Featured Projects
  featuredProjects: { es: 'Proyectos Destacados', en: 'Featured Projects', fr: 'Projets en Vedette', de: 'Ausgewählte Projekte', ar: 'المشاريع المميزة' },
  interiorDesign: { es: 'Diseño Interior', en: 'Interior Design', fr: 'Design Intérieur', de: 'Innendesign', ar: 'التصميم الداخلي' },
  renovation: { es: 'Renovación', en: 'Renovation', fr: 'Rénovation', de: 'Renovierung', ar: 'التجديد' },
  passiveHouse: { es: 'Passive House', en: 'Passive House', fr: 'Maison Passive', de: 'Passivhaus', ar: 'المنزل الأخضر' },
  viewProject: { es: 'Ver proyecto', en: 'View project', fr: 'Voir le projet', de: 'Projekt ansehen', ar: 'عرض المشروع' },

  // Testimonials
  testimonialsTitle: { es: 'Testimonios', en: 'Testimonials', fr: 'Témoignages', de: 'Bewertungen', ar: 'الآراء' },
  clientFeedback: { es: 'Lo que dicen nuestros clientes', en: 'What our clients say', fr: 'Ce que disent nos clients', de: 'Was unsere Kunden sagen', ar: 'ما يقوله عملاؤنا' },

  // CTA Section
  readyNextStep: { es: '¿Listo para tu siguiente paso?', en: 'Ready for your next step?', fr: 'Prêt pour votre prochaine étape?', de: 'Bereit für Ihren nächsten Schritt?', ar: 'هل أنت مستعد للخطوة التالية؟' },
  contactToday: { es: 'Contáctanos hoy y descubre cómo podemos ayudarte', en: 'Contact us today and discover how we can help you', fr: 'Contactez-nous aujourd\'hui et découvrez comment nous pouvons vous aider', de: 'Kontaktieren Sie uns heute und erfahren Sie, wie wir Ihnen helfen können', ar: 'اتصل بنا اليوم واكتشف كيف يمكننا مساعدتك' },
  contactBtn: { es: 'Contactar', en: 'Contact', fr: 'Contacter', de: 'Kontakt', ar: 'اتصل' },

  // Footer
  services: { es: 'Servicios', en: 'Services', fr: 'Services', de: 'Dienstleistungen', ar: 'الخدمات' },
  legal: { es: 'Legal', en: 'Legal', fr: 'Juridique', de: 'Rechtlich', ar: 'قانوني' },
  privacyPolicy: { es: 'Política de Privacidad', en: 'Privacy Policy', fr: 'Politique de Confidentialité', de: 'Datenschutzrichtlinie', ar: 'سياسة الخصوصية' },
  termsConditions: { es: 'Términos y Condiciones', en: 'Terms & Conditions', fr: 'Termes et Conditions', de: 'Geschäftsbedingungen', ar: 'الشروط والأحكام' },
  allRightsReserved: { es: 'Todos los derechos reservados', en: 'All rights reserved', fr: 'Tous droits réservés', de: 'Alle Rechte vorbehalten', ar: 'جميع الحقوق محفوظة' },
  followUs: { es: 'Síguenos', en: 'Follow Us', fr: 'Nous Suivre', de: 'Folgen Sie uns', ar: 'تابعنا' },

  // WhatsApp
  whatsappMsg: { es: 'Hola, me gustaría obtener más información sobre sus servicios.', en: 'Hello, I would like to get more information about your services.', fr: 'Bonjour, j\'aimerais obtenir plus d\'informations sur vos services.', de: 'Hallo, ich möchte gerne mehr über Ihre Dienstleistungen erfahren.', ar: 'مرحبا، أود الحصول على مزيد من المعلومات حول خدماتكم' },

  // Buy & Rent Page
  advancedFilters: { es: 'Filtros Avanzados', en: 'Advanced Filters', fr: 'Filtres Avancés', de: 'Erweiterte Filter', ar: 'مرشحات متقدمة' },
  clearFilters: { es: 'Limpiar Filtros', en: 'Clear Filters', fr: 'Effacer les Filtres', de: 'Filter Löschen', ar: 'مسح المرشحات' },
  propertiesFound: { es: 'propiedades encontradas', en: 'properties found', fr: 'propriétés trouvées', de: 'Immobilien gefunden', ar: 'عقارات وجدت' },
  noPropertiesFound: { es: 'No se encontraron propiedades', en: 'No properties found', fr: 'Aucune propriété trouvée', de: 'Keine Immobilien gefunden', ar: 'لم يتم العثور على عقارات' },
  tryAdjustingFilters: { es: 'Intenta ajustar tus filtros', en: 'Try adjusting your filters', fr: 'Essayez d\'ajuster vos filtres', de: 'Versuchen Sie, Ihre Filter anzupassen', ar: 'حاول تعديل المرشحات الخاصة بك' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  unitOfMeasure: 'sqm' | 'sqft';
  setUnitOfMeasure: (unit: 'sqm' | 'sqft') => void;
  t: (key: string) => string;
  exchangeRates: Record<Currency, number>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [unitOfMeasure, setUnitOfMeasure] = useState<'sqm' | 'sqft'>('sqm');
  const [exchangeRates, setExchangeRates] = useState<Record<Currency, number>>({
    EUR: 1,
    USD: 1.1,
    GBP: 0.87,
    CHF: 0.95,
    AED: 4.04,
  });

  // Fetch exchange rates daily
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
        const data = await response.json();
        setExchangeRates({
          EUR: 1,
          USD: data.rates.USD || 1.1,
          GBP: data.rates.GBP || 0.87,
          CHF: data.rates.CHF || 0.95,
          AED: data.rates.AED || 4.04,
        });
      } catch (error) {
        console.warn('Failed to fetch exchange rates:', error);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 24 * 60 * 60 * 1000); // Update daily
    return () => clearInterval(interval);
  }, []);

  const t = (key: string): string => {
    const trans = translations as any;
    return trans[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currency, setCurrency, unitOfMeasure, setUnitOfMeasure, t, exchangeRates }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

