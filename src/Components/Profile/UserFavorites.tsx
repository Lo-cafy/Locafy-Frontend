import { useState } from 'react';
import { Heart, MapPin, Star, Calendar, Grid3x3, List, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/ui/card';
import { Button } from '@/ui/button';
import { Badge } from '@/ui/badge';

interface Favorite {
  id: string;
  serviceName: string;
  providerName: string;
  category: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  location: string;
  type: 'service' | 'provider';
}

// Dummy data for favorites
const dummyFavorites: Favorite[] = [
  {
    id: 'FAV001',
    serviceName: 'Deep Home Cleaning',
    providerName: 'CleanPro Services',
    category: 'Cleaning',
    rating: 4.8,
    reviews: 245,
    price: 150,
    image: '/api/placeholder/400/300',
    location: 'Downtown',
    type: 'service'
  },
  {
    id: 'FAV002',
    serviceName: 'Expert Plumbing',
    providerName: 'QuickFix Plumbers',
    category: 'Plumbing',
    rating: 4.9,
    reviews: 389,
    price: 80,
    image: '/api/placeholder/400/300',
    location: 'Midtown',
    type: 'service'
  },
  {
    id: 'FAV003',
    serviceName: 'Garden Maintenance',
    providerName: 'Green Thumb Landscaping',
    category: 'Landscaping',
    rating: 4.7,
    reviews: 156,
    price: 120,
    image: '/api/placeholder/400/300',
    location: 'Uptown',
    type: 'service'
  },
  {
    id: 'FAV004',
    serviceName: 'Professional Painting',
    providerName: 'ColorCraft Painters',
    category: 'Painting',
    rating: 4.9,
    reviews: 421,
    price: 400,
    image: '/api/placeholder/400/300',
    location: 'Eastside',
    type: 'provider'
  }
];

export default function UserFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>(dummyFavorites);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(f => f.id !== id));
  };

  const FavoriteCard = ({ favorite }: { favorite: Favorite }) => {
    if (viewMode === 'list') {
      return (
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-48 h-32 sm:h-auto">
              <img 
                src={favorite.image} 
                alt={favorite.serviceName}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{favorite.serviceName}</h3>
                    <Badge className="bg-emerald-100 text-emerald-800">
                      {favorite.type}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">by {favorite.providerName}</p>
                  
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{favorite.rating}</span>
                      <span>({favorite.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {favorite.location}
                    </div>
                  </div>
                  
                  <div className="text-xl font-bold text-emerald-600">
                    ${favorite.price.toFixed(2)}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={() => navigate(`/services/${favorite.id}/booking`)}
                    className="bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Now
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => removeFavorite(favorite.id)}
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      );
    }

    return (
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all group">
        <div className="relative">
          <img 
            src={favorite.image} 
            alt={favorite.serviceName}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={() => removeFavorite(favorite.id)}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors"
          >
            <Heart className="w-5 h-5 fill-red-500 text-red-500" />
          </button>
          <Badge className="absolute top-3 left-3 bg-emerald-600 text-white">
            {favorite.category}
          </Badge>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{favorite.serviceName}</h3>
          <p className="text-sm text-gray-600 mb-3">by {favorite.providerName}</p>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{favorite.rating}</span>
              <span className="text-gray-500">({favorite.reviews})</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              {favorite.location}
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="text-xl font-bold text-emerald-600">
              ${favorite.price.toFixed(2)}
            </div>
            <Button
              onClick={() => navigate(`/services/${favorite.id}/booking`)}
              size="sm"
              className="bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Favorites</h2>
        <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-white shadow-sm' : ''}
          >
            <Grid3x3 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-white shadow-sm' : ''}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {favorites.length === 0 ? (
        <Card className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
          <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Favorites Yet</h3>
          <p className="text-gray-500 mb-6">Start adding your favorite services and providers</p>
          <Button
            onClick={() => navigate('/all-services')}
            className="bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Browse Services
          </Button>
        </Card>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
          {favorites.map(favorite => (
            <FavoriteCard key={favorite.id} favorite={favorite} />
          ))}
        </div>
      )}
    </div>
  );
}
