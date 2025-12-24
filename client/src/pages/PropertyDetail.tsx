import { useParams, useLocation } from 'wouter';
import { ChevronLeft, ChevronRight, MapPin, DollarSign, Ruler, Bed, Bath, Calendar, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProperties } from '@/hooks/useSanityQuery';
import { convertSanityProperty } from '@/lib/sanityUtils';
import { urlFor, PROJECT_ID, DATASET } from '@/lib/sanity';
import type { Property } from '../../../drizzle/schema';
import { useMemo, useState, useEffect } from 'react';

export default function PropertyDetail() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { language, currency, exchangeRates } = useLanguage();
  const { t } = useLanguage();

  // Fetch all properties
  const { data: propertiesRaw = [] } = useProperties();
  
  // Convert and find the current property
  const allProperties = useMemo(() => {
    if (!Array.isArray(propertiesRaw)) return [];
    return propertiesRaw.map(convertSanityProperty);
  }, [propertiesRaw]) as Property[];

  // Find property by ID from URL params
  const property = useMemo(() => {
    return allProperties.find(p => p.sanityId === params?.id);
  }, [allProperties, params?.id]);

  // Find the raw Sanity property for full image array access
  const rawProperty = useMemo(() => {
    if (!Array.isArray(propertiesRaw)) return null;
    return propertiesRaw.find((p: any) => p._id === params?.id) || null;
  }, [propertiesRaw, params?.id]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Resolve image sources (handle single image or array)
  const resolveImageSources = (imgSource: any): string[] => {
    if (!imgSource) return [];
    const toArray = Array.isArray(imgSource) ? imgSource : [imgSource];
    const results: string[] = [];
    for (const item of toArray) {
      try {
        if (!item) continue;
        if (typeof item === 'string') {
          try {
            results.push(urlFor(item).width(1200).url());
            continue;
          } catch {}
          results.push(item);
          continue;
        }
        const asAny = item as any;
        if (asAny.url && typeof asAny.url === 'string') {
          results.push(asAny.url);
          continue;
        }
        if (asAny.asset && typeof asAny.asset._ref === 'string') {
          const ref: string = asAny.asset._ref;
          if (ref.startsWith('image-')) {
            results.push(urlFor(asAny).width(1200).url());
            continue;
          }
          if (ref.startsWith('file-')) {
            const parts = ref.split('-');
            if (parts.length >= 3) {
              const ext = parts.pop();
              const assetId = parts.slice(1).join('-');
              results.push(`https://cdn.sanity.io/files/${PROJECT_ID}/${DATASET}/${assetId}.${ext}`);
              continue;
            }
          }
        }
        if (asAny._ref && typeof asAny._ref === 'string') {
          const ref: string = asAny._ref;
          if (ref.startsWith('image-')) {
            results.push(urlFor({ asset: { _ref: ref } }).width(1200).url());
            continue;
          }
        }
        // Fallback to builder
        results.push(urlFor(asAny).width(1200).url());
      } catch (err) {
        // ignore single failures
      }
    }
    return results.filter(Boolean);
  };

  const imageGallery = rawProperty ? resolveImageSources(rawProperty.image) : (property ? [property.imageUrl].filter(Boolean) as string[] : []);

  // Lightbox keyboard handlers (hook placed after imageGallery is defined)
  useEffect(() => {
    if (!isLightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') setSelectedImageIndex((i) => (i + 1) % Math.max(imageGallery.length, 1));
      if (e.key === 'ArrowLeft') setSelectedImageIndex((i) => (i - 1 + Math.max(imageGallery.length, 1)) % Math.max(imageGallery.length, 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isLightboxOpen, imageGallery.length]);

  const convertPrice = (price: number | null) => {
    if (!price) return 0;
    const rate = exchangeRates[currency as keyof typeof exchangeRates] || 1;
    return Math.round(price * rate);
  };

  const convertAreaToSqft = (sqm: number | null) => {
    if (!sqm) return 0;
    return Math.round(sqm * 10.764);
  };

  const getTitle = (prop: Property) => {
    switch (language) {
      case 'es':
        return prop.titleEs || 'Propiedad';
      case 'en':
        return prop.titleEn || 'Property';
      case 'fr':
        return prop.titleFr || prop.titleEn || 'Propriété';
      case 'de':
        return prop.titleDe || prop.titleEn || 'Immobilie';
      case 'ar':
        return prop.titleAr || prop.titleEn || 'عقار';
      default:
        return prop.titleEs || 'Propiedad';
    }
  };

  const getDescription = (prop: Property) => {
    switch (language) {
      case 'es':
        return prop.descriptionEs || '';
      case 'en':
        return prop.descriptionEn || '';
      case 'fr':
        return prop.descriptionFr || prop.descriptionEn || '';
      case 'de':
        return prop.descriptionDe || prop.descriptionEn || '';
      case 'ar':
        return prop.descriptionAr || prop.descriptionEn || '';
      default:
        return prop.descriptionEs || '';
    }
  };

  const getPropertyTypeLabel = () => {
    switch (language) {
      case 'ar':
        return property?.type === 'venta' ? 'للبيع' : property?.type === 'alquiler' ? 'للإيجار' : 'استثمار';
      case 'es':
        return property?.type === 'venta' ? 'Venta' : property?.type === 'alquiler' ? 'Alquiler' : 'Inversión';
      case 'en':
        return property?.type === 'venta' ? 'Sale' : property?.type === 'alquiler' ? 'Rent' : 'Investment';
      case 'fr':
        return property?.type === 'venta' ? 'Vente' : property?.type === 'alquiler' ? 'Location' : 'Investissement';
      case 'de':
        return property?.type === 'venta' ? 'Verkauf' : property?.type === 'alquiler' ? 'Miete' : 'Investition';
      default:
        return 'Property';
    }
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {language === 'es' ? 'Propiedad no encontrada' : language === 'en' ? 'Property not found' : 'Propriété non trouvée'}
          </h1>
          <button
            onClick={() => setLocation('/')}
            className="bg-[#d4af37] hover:bg-[#c9a02d] text-[#1a2f4a] px-6 py-3 rounded-lg font-bold transition-colors"
          >
            {language === 'es' ? 'Volver al inicio' : language === 'en' ? 'Back to home' : 'Retour à l\'accueil'}
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => setLocation('/')}
            className="flex items-center gap-2 text-[#1a2f4a] hover:text-[#d4af37] font-semibold transition-colors"
          >
            <ChevronLeft size={20} />
            {language === 'es' ? 'Volver' : language === 'en' ? 'Back' : 'Retour'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="w-full h-96 rounded-lg shadow-lg overflow-hidden mb-4">
            <img
              src={imageGallery[selectedImageIndex] || property.imageUrl || 'https://via.placeholder.com/1200x600?text=No+Image'}
              alt={getTitle(property)}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => {
                if (imageGallery.length > 0) setIsLightboxOpen(true);
              }}
            />
          </div>

          {imageGallery.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {imageGallery.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`flex-shrink-0 rounded-lg overflow-hidden border-2 ${idx === selectedImageIndex ? 'border-[#d4af37]' : 'border-transparent'}`}
                >
                  <img src={src} alt={`${getTitle(property)} ${idx + 1}`} className="w-32 h-20 object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2">
            {/* Title and Type */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-[#1a2f4a] mb-2">
                    {getTitle(property)}
                  </h1>
                  <div className="flex items-center gap-2 text-lg text-gray-600 mb-4">
                    <MapPin size={20} className="text-[#d4af37]" />
                    <span>{property.location || 'N/A'}</span>
                  </div>
                </div>
                <span className="bg-[#d4af37] text-[#1a2f4a] px-4 py-2 rounded-lg font-bold">
                  {getPropertyTypeLabel()}
                </span>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-[#1a2f4a] to-[#2d4a6e] text-white p-6 rounded-lg mb-8">
                <p className="text-gray-200 mb-2">
                  {language === 'ar' ? 'السعر' : language === 'es' ? 'Precio' : language === 'en' ? 'Price' : language === 'fr' ? 'Prix' : 'Preis'}
                </p>
                <p className="text-4xl font-bold text-[#d4af37]">
                  {currency} {convertPrice(property.price).toLocaleString()}
                </p>
              </div>

              {/* Description */}
              {getDescription(property) && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#1a2f4a] mb-4">
                    {language === 'es' ? 'Descripción' : language === 'en' ? 'Description' : 'Description'}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {getDescription(property)}
                  </p>
                </div>
              )}

              {/* Details Grid */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                <h2 className="text-2xl font-bold text-[#1a2f4a] mb-6">
                  {language === 'es' ? 'Características' : language === 'en' ? 'Features' : 'Caractéristiques'}
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {/* Size */}
                  {property.squareMeters && (
                    <div className="flex items-start gap-4">
                      <Ruler className="text-[#d4af37] mt-1 flex-shrink-0" size={24} />
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          {language === 'ar' ? 'الحجم' : language === 'es' ? 'Tamaño' : language === 'en' ? 'Size' : language === 'fr' ? 'Taille' : 'Größe'}
                        </p>
                        <p className="font-bold text-[#1a2f4a]">
                          {property.squareMeters} m² / {convertAreaToSqft(property.squareMeters)} sq ft
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Bedrooms */}
                  {property.bedrooms && (
                    <div className="flex items-start gap-4">
                      <Bed className="text-[#d4af37] mt-1 flex-shrink-0" size={24} />
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          {language === 'ar' ? 'غرف النوم' : language === 'es' ? 'Habitaciones' : language === 'en' ? 'Bedrooms' : language === 'fr' ? 'Chambres' : 'Schlafzimmer'}
                        </p>
                        <p className="font-bold text-[#1a2f4a]">{property.bedrooms}</p>
                      </div>
                    </div>
                  )}

                  {/* Bathrooms */}
                  {property.bathrooms && (
                    <div className="flex items-start gap-4">
                      <Bath className="text-[#d4af37] mt-1 flex-shrink-0" size={24} />
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          {language === 'ar' ? 'الحمامات' : language === 'es' ? 'Baños' : language === 'en' ? 'Bathrooms' : language === 'fr' ? 'Salles de Bain' : 'Badezimmer'}
                        </p>
                        <p className="font-bold text-[#1a2f4a]">{property.bathrooms}</p>
                      </div>
                    </div>
                  )}

                  {/* Year Built */}
                  {property.yearBuilt && (
                    <div className="flex items-start gap-4">
                      <Calendar className="text-[#d4af37] mt-1 flex-shrink-0" size={24} />
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          {language === 'ar' ? 'سنة البناء' : language === 'es' ? 'Año de construcción' : language === 'en' ? 'Year Built' : language === 'fr' ? 'Année de construction' : 'Baujahr'}
                        </p>
                        <p className="font-bold text-[#1a2f4a]">{property.yearBuilt}</p>
                      </div>
                    </div>
                  )}

                  {/* Property Type */}
                  {property.propertyType && (
                    <div className="flex items-start gap-4">
                      <DollarSign className="text-[#d4af37] mt-1 flex-shrink-0" size={24} />
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          {language === 'ar' ? 'نوع العقار' : language === 'es' ? 'Tipo de propiedad' : language === 'en' ? 'Property Type' : language === 'fr' ? 'Type de propriété' : 'Immobilientyp'}
                        </p>
                        <p className="font-bold text-[#1a2f4a] capitalize">{property.propertyType}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Contact Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-8 sticky top-24">
              <h3 className="text-2xl font-bold text-[#1a2f4a] mb-6">
                {language === 'es' ? '¿Interesado?' : language === 'en' ? 'Interested?' : 'Intéressé?'}
              </h3>

              <div className="space-y-4">
                <button className="w-full bg-[#d4af37] hover:bg-[#c9a02d] text-[#1a2f4a] px-6 py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2">
                  <span>💬</span>
                  {language === 'es' ? 'Contactar por WhatsApp' : language === 'en' ? 'Contact on WhatsApp' : 'Contacter sur WhatsApp'}
                </button>

                <button className="w-full bg-[#1a2f4a] hover:bg-[#2d4a6e] text-white px-6 py-3 rounded-lg font-bold transition-colors">
                  {language === 'es' ? 'Enviar Mensaje' : language === 'en' ? 'Send Message' : 'Envoyer un message'}
                </button>

                <button className="w-full border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#1a2f4a] px-6 py-3 rounded-lg font-bold transition-colors">
                  {language === 'es' ? 'Guardar Propiedad' : language === 'en' ? 'Save Property' : 'Enregistrer la propriété'}
                </button>
              </div>

              {/* Info */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center mb-4">
                  {language === 'es'
                    ? 'Responderemos en el menor tiempo posible'
                    : language === 'en'
                    ? 'We will respond as soon as possible'
                    : 'Nous répondrons dès que possible'}
                </p>
                <p className="text-xs text-gray-500 text-center">
                  {language === 'es'
                    ? 'ID de propiedad: ' + property.id
                    : language === 'en'
                    ? 'Property ID: ' + property.id
                    : 'ID de propriété: ' + property.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <WhatsAppButton />
      <Footer />

      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            className="absolute top-6 right-6 text-white bg-black bg-opacity-30 rounded-full p-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(false);
            }}
            aria-label="Close"
          >
            <X size={24} />
          </button>

          <button
            className="absolute left-6 text-white bg-black bg-opacity-30 rounded-full p-2"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex((i) => (i - 1 + Math.max(imageGallery.length, 1)) % Math.max(imageGallery.length, 1));
            }}
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>

          <img
            src={imageGallery[selectedImageIndex] || property.imageUrl || 'https://via.placeholder.com/1600x900?text=No+Image'}
            alt={getTitle(property)}
            className="max-w-[90%] max-h-[90%] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-6 text-white bg-black bg-opacity-30 rounded-full p-2"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex((i) => (i + 1) % Math.max(imageGallery.length, 1));
            }}
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </div>
  );
}

// Lightbox overlay rendered at end of file via portal-less inline component
