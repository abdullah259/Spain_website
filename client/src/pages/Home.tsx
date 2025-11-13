import { useState, useEffect } from 'react';
import { ChevronRight, Home as HomeIcon, TrendingUp, Wrench, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import PropertySlideshow from '@/components/PropertySlideshow';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';

export default function Home() {
  const { language, t } = useLanguage();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Fetch data
  const { data: allProperties = [] } = trpc.properties.getAll.useQuery({ type: 'venta' });
  const { data: featuredProjects = [] } = trpc.projects.getFeatured.useQuery();
  const { data: testimonials = [] } = trpc.testimonials.getFeatured.useQuery();

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
      {allProperties.length > 0 && (
        <PropertySlideshow
          properties={allProperties}
          videoUrl="https://videos.pexels.com/video-files/3571999/3571999-sd_640_360_25fps.mp4"
        />
      )}

      {/* Three Pillars Section */}
      <section className="py-16 bg-white">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <a
                  key={index}
                  href={pillar.href}
                  className={`${pillar.color} ${pillar.borderColor} p-8 rounded-lg hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-2`}
                >
                  <Icon size={48} className="text-[#d4af37] mb-4" />
                  <h3 className="text-2xl font-bold text-[#1a2f4a] mb-3">{t(pillar.titleKey)}</h3>
                  <p className="text-gray-700 mb-4">{t(pillar.descKey)}</p>
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
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#1a2f4a] mb-12 text-center">
            {t('featuredProperties')}
          </h2>

          {allProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProperties.slice(0, 3).map((property) => (
                <div key={property.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all">
                  {property.imageUrl && (
                    <img
                      src={property.imageUrl}
                      alt={property.titleEs}
                      className="w-full h-48 object-cover"
                    />
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
                    <p className="text-gray-600 text-sm mb-4">{property.location}</p>
                    <p className="text-2xl font-bold text-[#d4af37] mb-4">
                      {property.price ? `${(property.price).toLocaleString()} EUR` : 'N/A'}
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
                  ? 'لا توجد عقارات متاحة حالياً'
                  : language === 'es'
                  ? 'No hay propiedades disponibles'
                  : language === 'en'
                  ? 'No properties available'
                  : language === 'fr'
                  ? 'Aucune propriété disponible'
                  : 'Keine Immobilien verfügbar'}
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

