import { Heart, MapPin, Bed, Bath, Ruler, Trash2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

export default function Watchlist() {
  const { language, t, unitOfMeasure } = useLanguage();
  const [watchlist, setWatchlist] = useState<any[]>([]);

  const getAreaLabel = () => {
    return unitOfMeasure === 'sqm' ? 'm²' : 'sq ft';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#1a2f4a] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('watchlist')}
          </h1>
          <p className="text-xl text-gray-300">
            {language === 'es'
              ? 'Tus propiedades favoritas guardadas'
              : language === 'en'
              ? 'Your saved favorite properties'
              : language === 'fr'
              ? 'Vos propriétés préférées enregistrées'
              : 'Ihre gespeicherten Lieblingseigenschaften'}
          </p>
        </div>
      </section>

      {/* Watchlist Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {watchlist.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {watchlist.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={property.imageUrl || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop'}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute top-4 right-4 bg-[#d4af37] text-[#1a2f4a] p-2 rounded-full hover:bg-opacity-90 transition-all">
                      <Heart size={20} fill="currentColor" />
                    </button>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#1a2f4a] mb-2">{property.title}</h3>

                    <div className="flex items-center text-gray-600 text-sm mb-4">
                      <MapPin size={16} className="mr-1" />
                      {property.location}
                    </div>

                    <p className="text-2xl font-bold text-[#d4af37] mb-4">{property.price}</p>

                    <div className="grid grid-cols-3 gap-2 mb-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Bed size={16} />
                        <span>{property.bedrooms} {t('bedrooms')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Bath size={16} />
                        <span>{property.bathrooms} {t('bathrooms')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Ruler size={16} />
                        <span>{property.squareMeters} {getAreaLabel()}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 btn-primary text-sm">
                        {t('viewDetails')}
                      </button>
                      <button
                        onClick={() => setWatchlist(watchlist.filter((p) => p.id !== property.id))}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Heart size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-2xl font-bold text-[#1a2f4a] mb-2">
                {language === 'es'
                  ? 'Tu lista de deseos está vacía'
                  : language === 'en'
                  ? 'Your watchlist is empty'
                  : language === 'fr'
                  ? 'Votre liste de surveillance est vide'
                  : 'Ihre Merkliste ist leer'}
              </h3>
              <p className="text-gray-600 mb-6">
                {language === 'es'
                  ? 'Comienza a agregar propiedades a tu lista de deseos'
                  : language === 'en'
                  ? 'Start adding properties to your watchlist'
                  : language === 'fr'
                  ? 'Commencez à ajouter des propriétés à votre liste de surveillance'
                  : 'Beginnen Sie, Immobilien zu Ihrer Merkliste hinzuzufügen'}
              </p>
              <a href="/buy-rent" className="btn-primary inline-block">
                {language === 'es'
                  ? 'Explorar Propiedades'
                  : language === 'en'
                  ? 'Explore Properties'
                  : language === 'fr'
                  ? 'Explorer les Propriétés'
                  : 'Immobilien Erkunden'}
              </a>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

