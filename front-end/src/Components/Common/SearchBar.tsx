import { useState, useEffect } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { updateFilter } from '@/store/serviceStore';
import { Search } from 'lucide-react';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';

export function SearchBar() {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  
  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(updateFilter({ 
        searchTerm,
        location,
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, location, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateFilter({ 
      searchTerm,
      location,
    }));
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto"
    >
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-md">
        <div className="flex-1">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
        
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2"
          />
        </div>

        <Button 
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6"
        >
          Search
        </Button>
      </div>
    </form>
  );
}