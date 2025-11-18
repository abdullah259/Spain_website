import { useState, useEffect, useMemo } from 'react';
import { ChevronRight, Home as HomeIcon, TrendingUp, Wrench, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import PropertySlideshow from '@/components/PropertySlideshow';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProperties, useFeaturedProperties, useFeaturedProjects, useFeaturedTestimonials } from '@/hooks/useSanityQuery';
import { convertSanityProperty, convertSanityProject, convertSanityTestimonial } from '@/lib/sanityUtils';
import type { Property, Project, Testimonial } from '../../../drizzle/schema';

export default function Home() {
  const { language, t } = useLanguage();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Fetch data from Sanity
  // Note: 'venta' maps to 'sale' in Sanity schema
  const { data: allPropertiesRaw = [], isLoading: isLoadingProperties, error: propertiesError } = useProperties('venta');
  const { data: featuredPropertiesRaw = [], isLoading: isLoadingFeaturedProperties, error: featuredError } = useFeaturedProperties(4);
  const { data: featuredProjectsRaw = [], isLoading: isLoadingFeaturedProjects } = useFeaturedProjects(3);
  const { data: testimonialsRaw = [], isLoading: isLoadingTestimonials } = useFeaturedTestimonials(4);

  // Convert Sanity data to component format
  const allProperties = useMemo(() => {
    if (!Array.isArray(allPropertiesRaw)) return [];
    return allPropertiesRaw.map(convertSanityProperty);
  }, [allPropertiesRaw]) as Property[];

  const featuredProperties = useMemo(() => {
    if (!Array.isArray(featuredPropertiesRaw)) return [];
    const converted = featuredPropertiesRaw.map(convertSanityProperty);
    // If no featured properties, fallback to showing first 3 active properties
    console.log('converted', featuredPropertiesRaw);
    if (converted.length === 0 && allProperties.length > 0) {
      return allProperties.slice(0, 3);
    }
    return converted;
  }, [featuredPropertiesRaw, allProperties]) as Property[];

  const featuredProjects = useMemo(() => {
    if (!Array.isArray(featuredProjectsRaw)) return [];
    return featuredProjectsRaw.map(convertSanityProject);
  }, [featuredProjectsRaw]) as Project[];

  const testimonials = useMemo(() => {
    if (!Array.isArray(testimonialsRaw)) return [];
    return testimonialsRaw.map(convertSanityTestimonial);
  }, [testimonialsRaw]) as Testimonial[];


  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [testimonials.length]);

  const pillars = [
    {
      icon: HomeIcon,
      titleKey: 'realEstate',
      descKey: 'realEstateDesc',
      color: 'bg-blue-50',
      borderColor: 'border-l-4 border-[#1a2f4a]',
      href: '/buy-rent',
    },
    {
      icon: TrendingUp,
      titleKey: 'investment',
      descKey: 'investmentDesc',
      color: 'bg-yellow-50',
      borderColor: 'border-l-4 border-[#d4af37]',
      href: '/invest',
    },
    {
      icon: Wrench,
      titleKey: 'technical',
      descKey: 'technicalDesc',
      color: 'bg-gray-50',
      borderColor: 'border-l-4 border-[#3a3a3a]',
      href: '/contact',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Interactive Property Slideshow */}
      <PropertySlideshow
        properties={allProperties}
        videoUrl="https://videos.pexels.com/video-files/3571999/3571999-sd_640_360_25fps.mp4"
        isLoading={isLoadingProperties}
      />

      {/* Three Pillars Section */}
      <section className="py-16 bg-white relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#1a2f4a] mb-12 text-center">
            {language === 'ar'
              ? 'خدماتنا'
              : language === 'es'
              ? 'Nuestros Servicios'
              : language === 'en'
              ? 'Our Services'
              : language === 'fr'
              ? 'Nos Services'
              : 'Unsere Dienstleistungen'}
          </h2>

          {pillars && pillars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                const title = t(pillar.titleKey);
                const description = t(pillar.descKey);
                return (
                  <a
                    key={index}
                    href={pillar.href}
                    className={`${pillar.color} ${pillar.borderColor} p-8 rounded-lg hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-2 block min-h-[300px]`}
                  >
                    <Icon size={48} className="text-[#d4af37] mb-4" />
                    <h3 className="text-2xl font-bold text-[#1a2f4a] mb-3">{title || pillar.titleKey}</h3>
                    <p className="text-gray-700 mb-4">{description || pillar.descKey}</p>
                    <div className="flex items-center text-[#d4af37] font-semibold hover:text-[#1a2f4a] transition-colors">
                      <span>
                        {language === 'ar'
                          ? 'معرفة المزيد'
                          : language === 'es'
                          ? 'Conocer más'
                          : language === 'en'
                          ? 'Learn more'
                          : language === 'fr'
                          ? 'En savoir plus'
                          : 'Mehr erfahren'}
                      </span>
                      <ChevronRight size={20} className="ml-2" />
                    </div>
                  </a>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No services available</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 bg-gray-50 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#1a2f4a] mb-12 text-center">
            {t('featuredProperties')}
          </h2>

          {isLoadingFeaturedProperties ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {language === 'ar'
                  ? 'جاري التحميل...'
                  : language === 'es'
                  ? 'Cargando...'
                  : language === 'en'
                  ? 'Loading...'
                  : language === 'fr'
                  ? 'Chargement...'
                  : 'Wird geladen...'}
              </p>
            </div>
          ) : featuredError ? (
            <div className="text-center py-12">
              <p className="text-red-600">
                {language === 'ar'
                  ? 'حدث خطأ في تحميل البيانات'
                  : language === 'es'
                  ? 'Error al cargar las propiedades'
                  : language === 'en'
                  ? 'Error loading properties'
                  : language === 'fr'
                  ? 'Erreur lors du chargement des propriétés'
                  : 'Fehler beim Laden der Immobilien'}
              </p>
              <p className="text-sm text-gray-500 mt-2">{featuredError.message}</p>
            </div>
          ) : featuredProperties && featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.slice(0, 3).map((property) => (
                <div key={property.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all">
                  {property.imageUrl ? (
                    <img
                      src={property.imageUrl}
                      alt={property.titleEs || 'Property'}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        // Fallback to placeholder if image fails
                        (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#1a2f4a] mb-2">
                      {language === 'es'
                        ? property.titleEs
                        : language === 'en'
                        ? property.titleEn
                        : language === 'fr'
                        ? property.titleFr || property.titleEn
                        : language === 'de'
                        ? property.titleDe || property.titleEn
                        : property.titleAr || property.titleEn}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{property.location || 'N/A'}</p>
                    <p className="text-2xl font-bold text-[#d4af37] mb-4">
                      {property.price ? `${(property.price).toLocaleString()} ${property.currency || 'EUR'}` : 'N/A'}
                    </p>
                    <button className="w-full btn-primary">
                      {t('viewDetails')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {language === 'ar'
                  ? 'لا توجد عقارات مميزة متاحة حالياً'
                  : language === 'es'
                  ? 'No hay propiedades destacadas disponibles'
                  : language === 'en'
                  ? 'No featured properties available'
                  : language === 'fr'
                  ? 'Aucune propriété en vedette disponible'
                  : 'Keine ausgewählten Immobilien verfügbar'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#1a2f4a] mb-12 text-center">
            {t('featuredProjects')}
          </h2>

          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <div key={project.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all">
                  <img
                    src={project.imageUrl || 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=300&fit=crop'}
                    alt={project.titleEs}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#1a2f4a] mb-2">
                      {language === 'es'
                        ? project.titleEs
                        : language === 'en'
                        ? project.titleEn
                        : language === 'fr'
                        ? project.titleFr || project.titleEn
                        : language === 'de'
                        ? project.titleDe || project.titleEn
                        : project.titleAr || project.titleEn}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {language === 'es'
                        ? project.descriptionEs
                        : language === 'en'
                        ? project.descriptionEn
                        : language === 'fr'
                        ? project.descriptionFr || project.descriptionEn
                        : language === 'de'
                        ? project.descriptionDe || project.descriptionEn
                        : project.descriptionAr || project.descriptionEn}
                    </p>
                    <button className="w-full btn-primary">
                      {t('viewProject')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {language === 'ar'
                  ? 'لا توجد مشاريع متاحة حالياً'
                  : language === 'es'
                  ? 'No hay proyectos disponibles'
                  : language === 'en'
                  ? 'No projects available'
                  : language === 'fr'
                  ? 'Aucun projet disponible'
                  : 'Keine Projekte verfügbar'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#1a2f4a] mb-12 text-center">
            {t('testimonialsTitle')}
          </h2>

          {testimonials.length > 0 ? (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < (testimonials[activeTestimonial]?.rating || 5) ? 'text-[#d4af37] fill-[#d4af37]' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-4 italic">
                  "{language === 'es'
                    ? testimonials[activeTestimonial]?.contentEs
                    : language === 'en'
                    ? testimonials[activeTestimonial]?.contentEn
                    : language === 'fr'
                    ? testimonials[activeTestimonial]?.contentFr || testimonials[activeTestimonial]?.contentEn
                    : language === 'de'
                    ? testimonials[activeTestimonial]?.contentDe || testimonials[activeTestimonial]?.contentEn
                    : testimonials[activeTestimonial]?.contentAr || testimonials[activeTestimonial]?.contentEn}"
                </p>
                <p className="text-[#1a2f4a] font-bold">
                  {testimonials[activeTestimonial]?.clientName}
                </p>
                <p className="text-gray-600 text-sm">
                  {testimonials[activeTestimonial]?.clientTitle || 'Client'}
                </p>

                {/* Testimonial Indicators */}
                <div className="flex justify-center space-x-2 mt-6">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === activeTestimonial ? 'bg-[#d4af37] w-8' : 'bg-gray-300 w-2'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {language === 'ar'
                  ? 'لا توجد آراء متاحة حالياً'
                  : language === 'es'
                  ? 'No hay testimonios disponibles'
                  : language === 'en'
                  ? 'No testimonials available'
                  : language === 'fr'
                  ? 'Aucun témoignage disponible'
                  : 'Keine Bewertungen verfügbar'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1a2f4a] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            {t('readyNextStep')}
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('contactToday')}
          </p>
          <a href="/contact" className="inline-block bg-[#d4af37] text-[#1a2f4a] px-8 py-3 rounded-lg font-semibold hover:bg-white transition-colors">
            {t('contactBtn')}
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

