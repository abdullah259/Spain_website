import { useLanguage } from '@/contexts/LanguageContext';
import { Building2, Hammer, Zap, Shield, Users, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Construction() {
  const { language } = useLanguage();

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      construction: {
        es: 'Construcción',
        en: 'Construction',
        fr: 'Construction',
        de: 'Konstruktion',
        ar: 'البناء',
      },
      constructionTitle: {
        es: 'Servicios de Construcción y Renovación',
        en: 'Construction and Renovation Services',
        fr: 'Services de Construction et Rénovation',
        de: 'Bau- und Renovierungsdienstleistungen',
        ar: 'خدمات البناء والتجديد',
      },
      constructionDesc: {
        es: 'Ofrecemos soluciones completas de construcción, desde proyectos residenciales hasta comerciales de gran escala.',
        en: 'We offer complete construction solutions, from residential projects to large-scale commercial developments.',
        fr: 'Nous offrons des solutions de construction complètes, des projets résidentiels aux développements commerciaux à grande échelle.',
        de: 'Wir bieten umfassende Baulösungen von Wohnprojekten bis zu großflächigen Geschäftsentwicklungen.',
        ar: 'نقدم حلول بناء شاملة، من المشاريع السكنية إلى التطورات التجارية واسعة النطاق.',
      },
      ourServices: {
        es: 'Nuestros Servicios',
        en: 'Our Services',
        fr: 'Nos Services',
        de: 'Unsere Dienstleistungen',
        ar: 'خدماتنا',
      },
      newConstruction: {
        es: 'Construcción Nueva',
        en: 'New Construction',
        fr: 'Nouvelle Construction',
        de: 'Neubau',
        ar: 'البناء الجديد',
      },
      newConstructionDesc: {
        es: 'Proyectos de construcción desde cero con diseño moderno y sostenible.',
        en: 'Construction projects from scratch with modern and sustainable design.',
        fr: 'Projets de construction à partir de zéro avec design moderne et durable.',
        de: 'Bauprojekte von Grund auf mit modernem und nachhaltigem Design.',
        ar: 'مشاريع بناء من الصفر مع تصميم حديث ومستدام.',
      },
      renovation: {
        es: 'Renovación',
        en: 'Renovation',
        fr: 'Rénovation',
        de: 'Renovierung',
        ar: 'التجديد',
      },
      renovationDesc: {
        es: 'Transformamos espacios existentes en propiedades modernas y funcionales.',
        en: 'We transform existing spaces into modern and functional properties.',
        fr: 'Nous transformons les espaces existants en propriétés modernes et fonctionnelles.',
        de: 'Wir verwandeln bestehende Räume in moderne und funktionale Immobilien.',
        ar: 'نحول المساحات الموجودة إلى عقارات حديثة وعملية.',
      },
      interiorDesign: {
        es: 'Diseño Interior',
        en: 'Interior Design',
        fr: 'Design Intérieur',
        de: 'Innendesign',
        ar: 'التصميم الداخلي',
      },
      interiorDesignDesc: {
        es: 'Diseño interior personalizado que refleja tu estilo y necesidades.',
        en: 'Personalized interior design that reflects your style and needs.',
        fr: 'Design intérieur personnalisé qui reflète votre style et vos besoins.',
        de: 'Personalisiertes Innendesign, das Ihren Stil und Ihre Bedürfnisse widerspiegelt.',
        ar: 'تصميم داخلي مخصص يعكس أسلوبك واحتياجاتك.',
      },
      projectManagement: {
        es: 'Gestión de Proyectos',
        en: 'Project Management',
        fr: 'Gestion de Projet',
        de: 'Projektmanagement',
        ar: 'إدارة المشروع',
      },
      projectManagementDesc: {
        es: 'Supervisión completa del proyecto desde la planificación hasta la entrega final.',
        en: 'Complete project supervision from planning to final delivery.',
        fr: 'Supervision complète du projet de la planification à la livraison finale.',
        de: 'Vollständige Projektüberwachung von der Planung bis zur endgültigen Lieferung.',
        ar: 'إشراف كامل على المشروع من التخطيط إلى التسليم النهائي.',
      },
      qualityAssurance: {
        es: 'Garantía de Calidad',
        en: 'Quality Assurance',
        fr: 'Assurance Qualité',
        de: 'Qualitätssicherung',
        ar: 'ضمان الجودة',
      },
      qualityAssuranceDesc: {
        es: 'Estándares de calidad internacionales en todos nuestros proyectos.',
        en: 'International quality standards in all our projects.',
        fr: 'Normes de qualité internationales dans tous nos projets.',
        de: 'Internationale Qualitätsstandards in allen unseren Projekten.',
        ar: 'معايير الجودة الدولية في جميع مشاريعنا.',
      },
      sustainableBuild: {
        es: 'Construcción Sostenible',
        en: 'Sustainable Building',
        fr: 'Construction Durable',
        de: 'Nachhaltiges Bauen',
        ar: 'البناء المستدام',
      },
      sustainableBuildDesc: {
        es: 'Proyectos eco-amigables con eficiencia energética y materiales sostenibles.',
        en: 'Eco-friendly projects with energy efficiency and sustainable materials.',
        fr: 'Projets écologiques avec efficacité énergétique et matériaux durables.',
        de: 'Umweltfreundliche Projekte mit Energieeffizienz und nachhaltigen Materialien.',
        ar: 'مشاريع صديقة للبيئة مع كفاءة الطاقة والمواد المستدامة.',
      },
      whyChooseUs: {
        es: '¿Por Qué Elegirnos?',
        en: 'Why Choose Us?',
        fr: 'Pourquoi Nous Choisir?',
        de: 'Warum Uns Wählen?',
        ar: 'لماذا تختارنا؟',
      },
      expertise: {
        es: 'Experiencia',
        en: 'Expertise',
        fr: 'Expertise',
        de: 'Fachwissen',
        ar: 'الخبرة',
      },
      expertiseDesc: {
        es: 'Más de 20 años de experiencia en construcción y renovación.',
        en: 'Over 20 years of experience in construction and renovation.',
        fr: 'Plus de 20 ans d\'expérience en construction et rénovation.',
        de: 'Über 20 Jahre Erfahrung in Bau und Renovierung.',
        ar: 'أكثر من 20 سنة من الخبرة في البناء والتجديد.',
      },
      innovation: {
        es: 'Innovación',
        en: 'Innovation',
        fr: 'Innovation',
        de: 'Innovation',
        ar: 'الابتكار',
      },
      innovationDesc: {
        es: 'Tecnologías modernas y métodos de construcción innovadores.',
        en: 'Modern technologies and innovative construction methods.',
        fr: 'Technologies modernes et méthodes de construction innovantes.',
        de: 'Moderne Technologien und innovative Baumethoden.',
        ar: 'التقنيات الحديثة وطرق البناء المبتكرة.',
      },
      teamDedicated: {
        es: 'Equipo Dedicado',
        en: 'Dedicated Team',
        fr: 'Équipe Dévouée',
        de: 'Engagiertes Team',
        ar: 'فريق مخصص',
      },
      teamDedicatedDesc: {
        es: 'Profesionales calificados y comprometidos con la excelencia.',
        en: 'Qualified professionals committed to excellence.',
        fr: 'Professionnels qualifiés engagés envers l\'excellence.',
        de: 'Qualifizierte Fachleute, die sich der Exzellenz verschrieben haben.',
        ar: 'متخصصون مؤهلون ملتزمون بالتميز.',
      },
      contact: {
        es: 'Contactar',
        en: 'Contact',
        fr: 'Contacter',
        de: 'Kontakt',
        ar: 'اتصل',
      },
      getInTouch: {
        es: 'Ponte en Contacto',
        en: 'Get In Touch',
        fr: 'Nous Contacter',
        de: 'Kontaktieren Sie Uns',
        ar: 'تواصل معنا',
      },
      requestQuote: {
        es: 'Solicitar Presupuesto',
        en: 'Request Quote',
        fr: 'Demander un Devis',
        de: 'Angebot Anfordern',
        ar: 'طلب عرض أسعار',
      },
    };

    return translations[key]?.[language] || key;
  };

  const services = [
    { icon: Building2, title: 'newConstruction', desc: 'newConstructionDesc' },
    { icon: Hammer, title: 'renovation', desc: 'renovationDesc' },
    { icon: Zap, title: 'interiorDesign', desc: 'interiorDesignDesc' },
    { icon: Shield, title: 'projectManagement', desc: 'projectManagementDesc' },
    { icon: TrendingUp, title: 'qualityAssurance', desc: 'qualityAssuranceDesc' },
    { icon: Users, title: 'sustainableBuild', desc: 'sustainableBuildDesc' },
  ];

  const reasons = [
    { icon: Users, title: 'expertise', desc: 'expertiseDesc' },
    { icon: Zap, title: 'innovation', desc: 'innovationDesc' },
    { icon: Shield, title: 'teamDedicated', desc: 'teamDedicatedDesc' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1a2f4a] to-[#2d4a6b] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('constructionTitle')}</h1>
          <p className="text-lg md:text-xl text-gray-200">{t('constructionDesc')}</p>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2f4a] mb-12 text-center">{t('ourServices')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <Icon className="w-12 h-12 text-[#d4af37] mb-4" />
                  <h3 className="text-xl font-bold text-[#1a2f4a] mb-3">{t(service.title)}</h3>
                  <p className="text-gray-600">{t(service.desc)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2f4a] mb-12 text-center">{t('whyChooseUs')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <Icon className="w-16 h-16 text-[#d4af37]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1a2f4a] mb-3">{t(reason.title)}</h3>
                  <p className="text-gray-600">{t(reason.desc)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Project Section */}
      <div className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Project Image */}
            <div className="bg-gradient-to-br from-[#1a2f4a] to-[#2d4a6b] rounded-lg h-96 flex items-center justify-center">
              <div className="text-center text-white">
                <Building2 className="w-24 h-24 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Paquita 180m² - 5º Piso</p>
              </div>
            </div>

            {/* Project Details */}
            <div>
              <h2 className="text-4xl font-bold text-[#1a2f4a] mb-6">
                {language === 'es'
                  ? 'ACTIVA Construcción Propiedades'
                  : language === 'en'
                  ? 'ACTIVA Construction Properties'
                  : language === 'fr'
                  ? 'ACTIVA Propriétés de Construction'
                  : language === 'de'
                  ? 'ACTIVA Konstruktionsliegenschaften'
                  : 'خصائص بناء ACTIVA'}
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {language === 'es'
                  ? 'Casas inteligentes y sostenibles con principios de diseño bioclimático para optimizar el consumo energético, mejorar el confort y reducir el impacto ambiental.'
                  : language === 'en'
                  ? 'Smart and sustainable homes with bioclimatic design principles to optimize energy consumption, improve comfort and reduce environmental impact.'
                  : language === 'fr'
                  ? 'Maisons intelligentes et durables avec des principes de conception bioclimatique pour optimiser la consommation d\'énergie, améliorer le confort et réduire l\'impact environnemental.'
                  : language === 'de'
                  ? 'Intelligente und nachhaltige Häuser mit bioklimatischen Designprinzipien zur Optimierung des Energieverbrauchs, Verbesserung des Komforts und Verringerung der Umweltauswirkungen.'
                  : 'منازل ذكية ومستدامة مع مبادئ التصميم البيومناخي لتحسين استهلاك الطاقة وتحسين الراحة وتقليل التأثير البيئي.'}
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {language === 'es'
                  ? 'Un sistema de gestión que tiene en cuenta los valores del cliente incluso después de la construcción. Contamos con un sistema que da soporte detallado y mantenimiento en la posventa una vez finalizada.'
                  : language === 'en'
                  ? 'A management system that takes into account customer values even after construction. We have a system that provides detailed support and post-sale maintenance once completed.'
                  : language === 'fr'
                  ? 'Un système de gestion qui tient compte des valeurs des clients même après la construction. Nous avons un système qui fournit un support détaillé et une maintenance après-vente une fois terminé.'
                  : language === 'de'
                  ? 'Ein Verwaltungssystem, das die Werte der Kunden auch nach dem Bau berücksichtigt. Wir haben ein System, das detaillierte Unterstützung und Kundenservice nach dem Verkauf bietet.'
                  : 'نظام إدارة يأخذ في الاعتبار قيم العملاء حتى بعد البناء. لدينا نظام يوفر دعماً مفصلاً وصيانة ما بعد البيع بمجرد الانتهاء.'}
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {language === 'es'
                  ? 'Nuestro trabajo es garantizar la satisfacción completa de nuestros clientes. "Satisfacción del cliente" - MANZOKU (palabra Japonesa que significa SATISFACCIÓN).'
                  : language === 'en'
                  ? 'Our work is to guarantee complete customer satisfaction. "Customer Satisfaction" - MANZOKU (Japanese word meaning SATISFACTION).'
                  : language === 'fr'
                  ? 'Notre travail est de garantir la satisfaction complète des clients. "Satisfaction client" - MANZOKU (mot japonais signifiant SATISFACTION).'
                  : language === 'de'
                  ? 'Unsere Arbeit ist es, vollständige Kundenzufriedenheit zu garantieren. "Kundenzufriedenheit" - MANZOKU (japanisches Wort, das ZUFRIEDENHEIT bedeutet).'
                  : 'عملنا هو ضمان رضا العملاء الكامل. "رضا العملاء" - MANZOKU (كلمة يابانية تعني الرضا).'}
              </p>
              <button className="bg-[#d4af37] hover:bg-[#c9a02d] text-[#1a2f4a] px-8 py-3 rounded-lg font-bold transition-colors">
                {language === 'es'
                  ? 'Solicitar Información'
                  : language === 'en'
                  ? 'Request Information'
                  : language === 'fr'
                  ? 'Demander des Informations'
                  : language === 'de'
                  ? 'Informationen Anfordern'
                  : 'طلب معلومات'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#1a2f4a] text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('getInTouch')}</h2>
          <p className="text-lg text-gray-200 mb-8">{t('constructionDesc')}</p>
          <button className="bg-[#d4af37] hover:bg-[#c9a02d] text-[#1a2f4a] px-8 py-3 rounded-lg font-bold transition-colors">
            {t('requestQuote')}
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

