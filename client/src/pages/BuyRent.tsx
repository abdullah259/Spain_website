import { useState, useMemo } from 'react';
import { Search, ChevronDown, MapPin, Bed, Bath, Ruler, X, Sliders } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';

export default function BuyRent() {
  const { language, t, currency, exchangeRates } = useLanguage();
  const [searchType, setSearchType] = useState<'venta' | 'alquiler'>('venta');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Advanced Filter States
  const [filters, setFilters] = useState({
    location: '',
    priceMin: 0,
    priceMax: 5000000,
    sizeMin: 0,
    sizeMax: 1000,
    propertyType: '',
    bedroomsMin: 0,
    bathroomsMin: 0,
    yearBuiltMin: 1950,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Fetch properties
  const { data: allProperties = [] } = trpc.properties.getAll.useQuery({
    type: searchType,
  });

  const convertPrice = (price: number, baseCurrency: string = 'EUR') => {
    const rate = exchangeRates[currency as keyof typeof exchangeRates] || 1;
    return Math.round(price * rate);
  };

  const convertAreaToSqft = (sqm: number | null | undefined) => {
    if (!sqm) return null;
    return Math.round(sqm * 10.764);
  };

  // Advanced Filtering Logic
  const filteredProperties = useMemo(() => {
    return allProperties.filter((prop) => {
      // Location filter
      if (filters.location && !prop.location?.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Price filter
      if (prop.price) {
        const convertedPrice = convertPrice(prop.price);
        if (convertedPrice < filters.priceMin || convertedPrice > filters.priceMax) {
          return false;
        }
      }

      // Size filter (in m²)
      if (prop.squareMeters) {
        if (prop.squareMeters < filters.sizeMin || prop.squareMeters > filters.sizeMax) {
          return false;
        }
      }

      // Property type filter
      if (filters.propertyType && prop.propertyType !== filters.propertyType) {
        return false;
      }

      // Bedrooms filter
      if (filters.bedroomsMin > 0 && (!prop.bedrooms || prop.bedrooms < filters.bedroomsMin)) {
        return false;
      }

      // Bathrooms filter
      if (filters.bathroomsMin > 0 && (!prop.bathrooms || prop.bathrooms < filters.bathroomsMin)) {
        return false;
      }

      // Year built filter
      if (filters.yearBuiltMin > 0 && (!prop.yearBuilt || prop.yearBuilt < filters.yearBuiltMin)) {
        return false;
      }

      return true;
    });
  }, [allProperties, filters, currency, exchangeRates]);

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({
      location: '',
      priceMin: 0,
      priceMax: 5000000,
      sizeMin: 0,
      sizeMax: 1000,
      propertyType: '',
      bedroomsMin: 0,
      bathroomsMin: 0,
      yearBuiltMin: 1950,
    });
    setCurrentPage(1);
  };

  const isFilterActive = () => {
    return (
      filters.location ||
      filters.priceMin > 0 ||
      filters.priceMax < 5000000 ||
      filters.sizeMin > 0 ||
      filters.sizeMax < 1000 ||
      filters.propertyType ||
      filters.bedroomsMin > 0 ||
      filters.bathroomsMin > 0 ||
      filters.yearBuiltMin > 1950
    );
  };

  const propertyTypes = [
    { value: 'apartment', label: language === 'es' ? 'Apartamento' : language === 'en' ? 'Apartment' : language === 'fr' ? 'Appartement' : 'Wohnung' },
    { value: 'house', label: language === 'es' ? 'Casa' : language === 'en' ? 'House' : language === 'fr' ? 'Maison' : 'Haus' },
    { value: 'land', label: language === 'es' ? 'Terreno' : language === 'en' ? 'Land' : language === 'fr' ? 'Terrain' : 'Grundstück' },
    { value: 'commercial', label: language === 'es' ? 'Comercial' : language === 'en' ? 'Commercial' : language === 'fr' ? 'Commercial' : 'Gewerblich' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#1a2f4a] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {searchType === 'venta' ? t('buyDreamHome') : t('rent')}
          </h1>
          <p className="text-xl text-gray-300">
            {searchType === 'venta'
              ? language === 'es'
                ? 'Encuentra la propiedad perfecta para ti'
                : language === 'en'
                ? 'Find the perfect property for you'
                : language === 'fr'
                ? 'Trouvez la propriété parfaite pour vous'
                : 'Finden Sie die perfekte Immobilie für Sie'
              : language === 'es'
              ? 'Alquila la propiedad ideal'
              : language === 'en'
              ? 'Rent the ideal property'
              : language === 'fr'
              ? 'Louez la propriété idéale'
              : 'Mieten Sie die ideale Immobilie'}
          </p>
        </div>
      </section>

      {/* Buy/Rent Toggle */}
      <section className="bg-white py-6 border-b sticky top-20 z-30">
        <div className="container mx-auto px-4">
          <div className="flex space-x-4">
            <button
              onClick={() => {
                setSearchType('venta');
                setCurrentPage(1);
              }}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                searchType === 'venta'
                  ? 'bg-[#1a2f4a] text-white'
                  : 'bg-gray-200 text-[#1a2f4a] hover:bg-gray-300'
              }`}
            >
              {t('buy')}
            </button>
            <button
              onClick={() => {
                setSearchType('alquiler');
                setCurrentPage(1);
              }}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                searchType === 'alquiler'
                  ? 'bg-[#1a2f4a] text-white'
                  : 'bg-gray-200 text-[#1a2f4a] hover:bg-gray-300'
              }`}
            >
              {t('rent')}
            </button>
          </div>
        </div>
      </section>

      {/* Advanced Filters Toggle */}
      <section className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center space-x-2 text-[#1a2f4a] hover:text-[#d4af37] font-semibold transition-colors"
          >
            <Sliders size={20} />
            <span>
              {language === 'es'
                ? 'Filtros Avanzados'
                : language === 'en'
                ? 'Advanced Filters'
                : language === 'fr'
                ? 'Filtres Avancés'
                : 'Erweiterte Filter'}
            </span>
            <ChevronDown size={20} className={`transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </section>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <section className="bg-white py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-[#1a2f4a] mb-2">
                  {language === 'es' ? 'Ubicación' : language === 'en' ? 'Location' : language === 'fr' ? 'Localisation' : 'Standort'}
                </label>
                <input
                  type="text"
                  placeholder={language === 'es' ? 'Buscar...' : language === 'en' ? 'Search...' : language === 'fr' ? 'Rechercher...' : 'Suchen...'}
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-[#1a2f4a] mb-2">
                  {language === 'es' ? 'Precio Mín' : language === 'en' ? 'Min Price' : language === 'fr' ? 'Prix Min' : 'Mindestpreis'}
                </label>
                <input
                  type="number"
                  value={filters.priceMin}
                  onChange={(e) => handleFilterChange('priceMin', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1a2f4a] mb-2">
                  {language === 'es' ? 'Precio Máx' : language === 'en' ? 'Max Price' : language === 'fr' ? 'Prix Max' : 'Höchstpreis'}
                </label>
                <input
                  type="number"
                  value={filters.priceMax}
                  onChange={(e) => handleFilterChange('priceMax', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-semibold text-[#1a2f4a] mb-2">
                  {language === 'es' ? 'Tipo de Propiedad' : language === 'en' ? 'Property Type' : language === 'fr' ? 'Type de Propriété' : 'Immobilientyp'}
                </label>
                <select
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="">
                    {language === 'es' ? 'Todos' : language === 'en' ? 'All' : language === 'fr' ? 'Tous' : 'Alle'}
                  </option>
                  {propertyTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Size Range (m²) */}
              <div>
                <label className="block text-sm font-semibold text-[#1a2f4a] mb-2">
                  {language === 'es' ? 'Tamaño Mín (m²)' : language === 'en' ? 'Min Size (m²)' : language === 'fr' ? 'Taille Min (m²)' : 'Mindestgröße (m²)'}
                </label>
                <input
                  type="number"
                  value={filters.sizeMin}
                  onChange={(e) => handleFilterChange('sizeMin', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1a2f4a] mb-2">
                  {language === 'es' ? 'Tamaño Máx (m²)' : language === 'en' ? 'Max Size (m²)' : language === 'fr' ? 'Taille Max (m²)' : 'Maximale Größe (m²)'}
                </label>
                <input
                  type="number"
                  value={filters.sizeMax}
                  onChange={(e) => handleFilterChange('sizeMax', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-semibold text-[#1a2f4a] mb-2">
                  {language === 'es' ? 'Dormitorios Mín' : language === 'en' ? 'Min Bedrooms' : language === 'fr' ? 'Chambres Min' : 'Mindestschlafzimmer'}
                </label>
                <input
                  type="number"
                  min="0"
                  value={filters.bedroomsMin}
                  onChange={(e) => handleFilterChange('bedroomsMin', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Bathrooms */}
              <div>
                <label className="block text-sm font-semibold text-[#1a2f4a] mb-2">
                  {language === 'es' ? 'Baños Mín' : language === 'en' ? 'Min Bathrooms' : language === 'fr' ? 'Salles de Bain Min' : 'Mindestbäder'}
                </label>
                <input
                  type="number"
                  min="0"
                  value={filters.bathroomsMin}
                  onChange={(e) => handleFilterChange('bathroomsMin', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Year Built */}
              <div>
                <label className="block text-sm font-semibold text-[#1a2f4a] mb-2">
                  {language === 'es' ? 'Año Construido Mín' : language === 'en' ? 'Min Year Built' : language === 'fr' ? 'Année de Construction Min' : 'Mindestbaujahr'}
                </label>
                <input
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={filters.yearBuiltMin}
                  onChange={(e) => handleFilterChange('yearBuiltMin', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            {/* Clear Filters Button */}
            {isFilterActive() && (
              <button
                onClick={clearAllFilters}
                className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
              >
                <X size={18} />
                <span>
                  {language === 'es'
                    ? 'Limpiar Filtros'
                    : language === 'en'
                    ? 'Clear Filters'
                    : language === 'fr'
                    ? 'Effacer les Filtres'
                    : 'Filter Löschen'}
                </span>
              </button>
            )}
          </div>
        </section>
      )}

      {/* Active Filters Tags */}
      {isFilterActive() && (
        <section className="bg-gray-100 py-4 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2">
              {filters.location && (
                <div className="bg-[#d4af37] text-[#1a2f4a] px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-2">
                  <span>{filters.location}</span>
                  <button onClick={() => handleFilterChange('location', '')}>
                    <X size={16} />
                  </button>
                </div>
              )}
              {filters.propertyType && (
                <div className="bg-[#d4af37] text-[#1a2f4a] px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-2">
                  <span>{propertyTypes.find((t) => t.value === filters.propertyType)?.label}</span>
                  <button onClick={() => handleFilterChange('propertyType', '')}>
                    <X size={16} />
                  </button>
                </div>
              )}
              {(filters.priceMin > 0 || filters.priceMax < 5000000) && (
                <div className="bg-[#d4af37] text-[#1a2f4a] px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-2">
                  <span>
                    {currency} {filters.priceMin.toLocaleString()} - {filters.priceMax.toLocaleString()}
                  </span>
                  <button
                    onClick={() => {
                      handleFilterChange('priceMin', 0);
                      handleFilterChange('priceMax', 5000000);
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              {(filters.sizeMin > 0 || filters.sizeMax < 1000) && (
                <div className="bg-[#d4af37] text-[#1a2f4a] px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-2">
                  <span>
                    {filters.sizeMin} - {filters.sizeMax} m²
                  </span>
                  <button
                    onClick={() => {
                      handleFilterChange('sizeMin', 0);
                      handleFilterChange('sizeMax', 1000);
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Results Count */}
      <section className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <p className="text-gray-600">
            {language === 'es'
              ? `${filteredProperties.length} propiedades encontradas`
              : language === 'en'
              ? `${filteredProperties.length} properties found`
              : language === 'fr'
              ? `${filteredProperties.length} propriétés trouvées`
              : `${filteredProperties.length} Immobilien gefunden`}
          </p>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {paginatedProperties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedProperties.map((property) => (
                  <div
                    key={property.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={property.imageUrl || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop'}
                        alt={property.titleEs}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-[#d4af37] text-[#1a2f4a] px-3 py-1 rounded-full text-sm font-semibold">
                        {searchType === 'venta'
                          ? language === 'es'
                            ? 'Venta'
                            : language === 'en'
                            ? 'Sale'
                            : language === 'fr'
                            ? 'Vente'
                            : 'Verkauf'
                          : language === 'es'
                          ? 'Alquiler'
                          : language === 'en'
                          ? 'Rent'
                          : language === 'fr'
                          ? 'Location'
                          : 'Miete'}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold text-[#1a2f4a] mb-2">
                        {language === 'es'
                          ? property.titleEs
                          : language === 'en'
                          ? property.titleEn
                          : language === 'fr'
                          ? property.titleFr
                          : property.titleDe}
                      </h3>

                      <div className="flex items-center text-gray-600 text-sm mb-4">
                        <MapPin size={16} className="mr-1" />
                        {property.location}
                      </div>

                      <p className="text-2xl font-bold text-[#d4af37] mb-4">
                        {currency} {convertPrice(property.price || 0).toLocaleString()}
                      </p>

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
                          <span>{property.squareMeters} m²</span>
                        </div>
                      </div>

                      {/* Display both m² and sq ft */}
                      <div className="bg-gray-50 p-3 rounded-lg mb-4 text-xs text-gray-700">
                        <p>
                          {language === 'es' ? 'Tamaño: ' : language === 'en' ? 'Size: ' : language === 'fr' ? 'Taille: ' : 'Größe: '}
                          <span className="font-semibold">{property.squareMeters} m²</span>
                          {' / '}
                          <span className="font-semibold">{convertAreaToSqft(property.squareMeters)} sq ft</span>
                        </p>
                      </div>

                      <button className="w-full btn-primary">
                        {t('viewDetails')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-12">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 text-[#1a2f4a] rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-colors"
                  >
                    {language === 'es' ? 'Anterior' : language === 'en' ? 'Previous' : language === 'fr' ? 'Précédent' : 'Zurück'}
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        currentPage === page
                          ? 'bg-[#1a2f4a] text-white'
                          : 'bg-gray-200 text-[#1a2f4a] hover:bg-gray-300'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 text-[#1a2f4a] rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-colors"
                  >
                    {language === 'es' ? 'Siguiente' : language === 'en' ? 'Next' : language === 'fr' ? 'Suivant' : 'Weiter'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <Search size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-2xl font-bold text-[#1a2f4a] mb-2">
                {language === 'es'
                  ? 'No se encontraron propiedades'
                  : language === 'en'
                  ? 'No properties found'
                  : language === 'fr'
                  ? 'Aucune propriété trouvée'
                  : 'Keine Immobilien gefunden'}
              </h3>
              <p className="text-gray-600">
                {language === 'es'
                  ? 'Intenta ajustar tus filtros'
                  : language === 'en'
                  ? 'Try adjusting your filters'
                  : language === 'fr'
                  ? 'Essayez d\'ajuster vos filtres'
                  : 'Versuchen Sie, Ihre Filter anzupassen'}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

