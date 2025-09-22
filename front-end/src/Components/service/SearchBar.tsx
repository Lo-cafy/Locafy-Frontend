import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { useAppDispatch } from '@/hooks/redux';
import { updateFilter } from '@/store/serviceStore';

export function SearchBar() {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    dispatch(updateFilter({
      queryText: searchText,
      locationFilter: location,
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search for services..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-10 h-12"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 h-12"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        
        <Button 
          onClick={handleSearch}
          className="bg-emerald-600 hover:bg-emerald-700 h-12 px-8"
        >
          Search
        </Button>
      </div>
    </div>
  );
}