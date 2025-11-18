import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Property } from '../../../drizzle/schema';

interface PropertySlideshowProps {
  properties: Property[];
  videoUrl?: string | null;
  isLoading?: boolean;
}

// Create placeholder properties for when there are no real properties
const createPlaceholderProperties = (): Property[] => {
  return Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    titleEs: `Propiedad Destacada ${i + 1}`,
    titleEn: `Featured Property ${i + 1}`,
    titleFr: `Propriété en Vedette ${i + 1}`,
    titleDe: `Ausgewählte Immobilie ${i + 1}`,
    titleAr: `عقار مميز ${i + 1}`,
    descriptionEs: 'Hermosa propiedad disponible',
    descriptionEn: 'Beautiful property available',
    descriptionFr: 'Belle propriété disponible',
    descriptionDe: 'Schöne Immobilie verfügbar',
    descriptionAr: 'عقار جميل متاح',
    type: 'venta' as const,
    price: 500000 + (i * 50000),
    currency: 'EUR',
    location: 'Spain',
    imageUrl: null,
    imageKey: null,
    bedrooms: 3 + i,
    bathrooms: 2,
    squareMeters: 100 + (i * 20),
    squareFeet: null,
    yearBuilt: 2020,
    propertyType: 'apartment',
    featured: true,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
};

export default function PropertySlideshow({ properties, isLoading = false }: PropertySlideshowProps) {
  const { language, currency, exchangeRates } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Map properties to real Spanish property images
  const propertyImages = [
    '/property-1.jpg',      // Leon architecture
    '/property-2.jpg',      // Leon luxury home
    '/property-3.jpg',      // Leon villa with garden
    '/property-4.jpg',      // Barcelona modern apartment interior
    '/property-5.jpg',      // Barcelona luxury apartment
    '/property-6.webp',     // Barcelona historic modern design
    '/property-7.webp',     // Spanish inspired villa
    '/property-8.jpg',      // Mediterranean luxury villa
  ];

  // Use placeholder properties if no real properties are available
  const displayProperties = properties.length > 0 ? properties : createPlaceholderProperties();
  const maxSlides = Math.min(displayProperties.length, 8);

  useEffect(() => {
    if (!isPlaying || maxSlides === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % maxSlides);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPlaying, maxSlides]);

  const currentProperty = displayProperties[currentIndex];
  const currentImageUrl = propertyImages[currentIndex % 8];

  const convertPrice = (price: number | null) => {
    if (!price) return 0;
    const rate = exchangeRates[currency as keyof typeof exchangeRates] || 1;
    return Math.round(price * rate);
  };

  const convertAreaToSqft = (sqm: number | null) => {
    if (!sqm) return 0;
    return Math.round(sqm * 10.764);
  };

  const getTitle = () => {
    switch (language) {
      case 'es':
        return currentProperty.titleEs || 'Propiedad';
      case 'en':
        return currentProperty.titleEn || 'Property';
      case 'fr':
        return currentProperty.titleFr || currentProperty.titleEn || 'Propriété';
      case 'de':
        return currentProperty.titleDe || currentProperty.titleEn || 'Immobilie';
      case 'ar':
        return currentProperty.titleAr || currentProperty.titleEn || 'عقار';
      default:
        return currentProperty.titleEs || 'Propiedad';
    }
  };

  const getDescription = () => {
    switch (language) {
      case 'es':
        return currentProperty.descriptionEs || '';
      case 'en':
        return currentProperty.descriptionEn || '';
      case 'fr':
        return currentProperty.descriptionFr || currentProperty.descriptionEn || '';
      case 'de':
        return currentProperty.descriptionDe || currentProperty.descriptionEn || '';
      case 'ar':
        return currentProperty.descriptionAr || currentProperty.descriptionEn || '';
      default:
        return currentProperty.descriptionEs || '';
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + maxSlides) % maxSlides);
    setIsPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % maxSlides);
    setIsPlaying(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={currentImageUrl}
          alt={getTitle()}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback if image fails to load
            console.warn(`Failed to load image: ${currentImageUrl}`);
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'linear-gradient(135deg, rgba(26, 47, 74, 0.5) 0%, rgba(58, 58, 58, 0.5) 100%)',
          }}
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-16">
        {/* Top Counter */}
        <div className="flex justify-start items-start">
          <span className="text-white text-sm font-semibold bg-black bg-opacity-60 px-4 py-2 rounded-full">
            {currentIndex + 1} / {maxSlides}
            {isLoading && <span className="ml-2">(Loading...)</span>}
          </span>
        </div>

        {/* Property Information */}
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {getTitle()}
          </h1>
          <p className="text-xl text-gray-200 mb-6 drop-shadow-lg">
            {getDescription()}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-black bg-opacity-60 p-4 rounded-lg">
              <p className="text-gray-300 text-sm">
                {language === 'ar' ? 'السعر' : language === 'es' ? 'Precio' : language === 'en' ? 'Price' : language === 'fr' ? 'Prix' : 'Preis'}
              </p>
              <p className="text-[#d4af37] text-2xl font-bold">
                {currency} {convertPrice(currentProperty.price).toLocaleString()}
              </p>
            </div>

            <div className="bg-black bg-opacity-60 p-4 rounded-lg">
              <p className="text-gray-300 text-sm">
                {language === 'ar' ? 'الموقع' : language === 'es' ? 'Ubicación' : language === 'en' ? 'Location' : language === 'fr' ? 'Localisation' : 'Standort'}
              </p>
              <p className="text-white text-lg font-semibold">{currentProperty.location || 'N/A'}</p>
            </div>

            <div className="bg-black bg-opacity-60 p-4 rounded-lg">
              <p className="text-gray-300 text-sm">
                {language === 'ar' ? 'الحجم' : language === 'es' ? 'Tamaño' : language === 'en' ? 'Size' : language === 'fr' ? 'Taille' : 'Größe'}
              </p>
              <p className="text-white text-lg font-semibold">
                {currentProperty.squareMeters || 'N/A'} m² / {currentProperty.squareMeters ? convertAreaToSqft(currentProperty.squareMeters) : 'N/A'} sq ft
              </p>
            </div>

            <div className="bg-black bg-opacity-60 p-4 rounded-lg">
              <p className="text-gray-300 text-sm">
                {language === 'ar' ? 'النوع' : language === 'es' ? 'Tipo' : language === 'en' ? 'Type' : language === 'fr' ? 'Type' : 'Typ'}
              </p>
              <p className="text-[#d4af37] text-lg font-semibold">
                {currentProperty.type === 'venta'
                  ? language === 'ar'
                    ? 'للبيع'
                    : language === 'es'
                    ? 'Venta'
                    : language === 'en'
                    ? 'Sale'
                    : language === 'fr'
                    ? 'Vente'
                    : 'Verkauf'
                  : currentProperty.type === 'alquiler'
                  ? language === 'ar'
                    ? 'للإيجار'
                    : language === 'es'
                    ? 'Alquiler'
                    : language === 'en'
                    ? 'Rent'
                    : language === 'fr'
                    ? 'Location'
                    : 'Miete'
                  : language === 'ar'
                  ? 'استثمار'
                  : language === 'es'
                  ? 'Inversión'
                  : language === 'en'
                  ? 'Investment'
                  : language === 'fr'
                  ? 'Investissement'
                  : 'Investition'}
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <button className="bg-[#d4af37] hover:bg-[#c9a02d] text-[#1a2f4a] px-8 py-3 rounded-lg font-bold transition-colors">
              {language === 'ar' ? 'عرض التفاصيل' : language === 'es' ? 'Ver Detalles' : language === 'en' ? 'View Details' : language === 'fr' ? 'Voir Détails' : 'Details Ansehen'}
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1a2f4a] px-8 py-3 rounded-lg font-bold transition-colors">
              {language === 'ar' ? 'اتصل بنا' : language === 'es' ? 'Contactar' : language === 'en' ? 'Contact' : language === 'fr' ? 'Contacter' : 'Kontakt'}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            className="bg-[#d4af37] hover:bg-[#c9a02d] text-[#1a2f4a] p-3 rounded-full transition-colors"
            title="Previous"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Slide Indicators */}
          <div className="flex space-x-2">
            {Array.from({ length: maxSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsPlaying(false);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-[#d4af37] w-8' : 'bg-white bg-opacity-50 w-2 hover:bg-opacity-75'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="bg-[#d4af37] hover:bg-[#c9a02d] text-[#1a2f4a] p-3 rounded-full transition-colors"
            title="Next"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
    </div>
  );
}

