import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { urlFor } from '@/lib/sanity';
import { useLocation } from 'wouter';
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
  const [, setLocation] = useLocation();

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
  
  // Get image from Sanity or use fallback
  const getImageUrl = () => {
    if (currentProperty.imageUrl) {
      return currentProperty.imageUrl;
    }
    // Fallback placeholder image if no image from Sanity
    return 'https://via.placeholder.com/1920x1080?text=No+Image+Available';
  };
  
  const currentImageUrl = getImageUrl();
  const isVideoUrl = (url: string | null) => {
    if (!url) return false;
    return /\.(mp4|webm|mov|ogg)(\?|$)/i.test(url);
  };

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
        {isVideoUrl(currentImageUrl) ? (
          <video className="w-full h-full object-cover" src={currentImageUrl || undefined} autoPlay muted loop playsInline />
        ) : (
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
        )}
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
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
            {getTitle()}
          </h1>
          
          {/* Location below title */}
          <div className="flex items-center gap-2 mb-8">
            <span className="text-lg text-[#d4af37] font-semibold drop-shadow-lg">📍</span>
            <p className="text-xl text-white drop-shadow-lg">
              {currentProperty.location || 'N/A'}
            </p>
          </div>


          <div className="flex space-x-4">
            <button 
              onClick={() => setLocation(`/property/${currentProperty.id}`)}
              className="bg-[#d4af37] hover:bg-[#c9a02d] text-[#1a2f4a] px-8 py-3 rounded-lg font-bold transition-colors"
            >
              {language === 'ar' ? 'عرض التفاصيل' : language === 'es' ? 'Ver Detalles' : language === 'en' ? 'View Details' : language === 'fr' ? 'Voir Détails' : 'Details Ansehen'}
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1a2f4a] px-8 py-3 rounded-lg font-bold transition-colors">
              {language === 'ar' ? 'اتصل بنا' : language === 'es' ? 'Contactar' : language === 'en' ? 'Contact' : language === 'fr' ? 'Contacter' : 'Kontakt'}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center">


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


        </div>
      </div>
    </div>
  );
}

