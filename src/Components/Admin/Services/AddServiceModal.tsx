import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/ui/dialog';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Textarea } from '@/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { Card, CardContent } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Plus, Upload, X, Save, Loader2 } from 'lucide-react';
import type { Service, Category } from '@/types/service.types';

interface AddServiceModalProps {
  onServiceAdded: (service: Service) => void;
}

interface ServiceFormData {
  name: string;
  description: string;
  price: number;
  priceUnit: 'hour' | 'day' | 'session' | 'project';
  categoryId: string;
  location: string;
  features: string[];
  images: string[];
  providerName: string;
  isActive: boolean;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({ onServiceAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFeature, setCurrentFeature] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    description: '',
    price: 0,
    priceUnit: 'hour',
    categoryId: '',
    location: '',
    features: [],
    images: [],
    providerName: '',
    isActive: true,
  });

  // Mock categories - replace with actual API call
  const categories: Category[] = [
    { id: '1', name: 'Home Cleaning', slug: 'home-cleaning', icon: '🏠' },
    { id: '2', name: 'Plumbing', slug: 'plumbing', icon: '🔧' },
    { id: '3', name: 'Electrical', slug: 'electrical', icon: '⚡' },
    { id: '4', name: 'Gardening', slug: 'gardening', icon: '🌱' },
    { id: '5', name: 'Pet Care', slug: 'pet-care', icon: '🐕' },
    { id: '6', name: 'Tutoring', slug: 'tutoring', icon: '📚' },
  ];

  const handleInputChange = (field: keyof ServiceFormData, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addFeature = () => {
    if (currentFeature.trim() && !formData.features.includes(currentFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, currentFeature.trim()]
      }));
      setCurrentFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  const addImage = () => {
    if (currentImage.trim() && !formData.images.includes(currentImage.trim())) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, currentImage.trim()]
      }));
      setCurrentImage('');
    }
  };

  const removeImage = (image: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img !== image)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const selectedCategory = categories.find(cat => cat.id === formData.categoryId);
      
      const newService: Service = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        price: {
          amount: formData.price,
          currency: 'USD',
          unit: formData.priceUnit
        },
        priceUnit: formData.priceUnit,
        category: selectedCategory || categories[0],
        provider: {
          id: '1',
          name: formData.providerName,
          email: 'provider@example.com',
          phone: '+1234567890',
          rating: 4.5,
          verified: true,
          location: {
            address: formData.location,
            city: 'City',
            state: 'State',
            country: 'Country',
            postalCode: '12345'
          },
          specialties: [],
          experience: 2
        },
        providerName: formData.providerName,
        images: formData.images,
        rating: 0,
        reviewCount: 0,
        status: 'pending',
        isActive: formData.isActive,
        location: formData.location,
        availability: {
          schedule: [],
          exceptions: [],
          timezone: 'UTC'
        },
        features: formData.features,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      onServiceAdded(newService);
      setIsOpen(false);
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: 0,
        priceUnit: 'hour',
        categoryId: '',
        location: '',
        features: [],
        images: [],
        providerName: '',
        isActive: true,
      });
    } catch (error) {
      console.error('Failed to add service:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600/80 backdrop-blur hover:bg-blue-700/80 text-white shadow-sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800/90 backdrop-blur-xl border-gray-700/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Add New Service</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="bg-gray-700/30 border-gray-600/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">Service Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter service name"
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="providerName" className="text-gray-300">Provider Name *</Label>
                  <Input
                    id="providerName"
                    value={formData.providerName}
                    onChange={(e) => handleInputChange('providerName', e.target.value)}
                    placeholder="Enter provider name"
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2 mt-4">
                <Label htmlFor="description" className="text-gray-300">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your service..."
                  rows={3}
                  className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Category */}
          <Card className="bg-gray-700/30 border-gray-600/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Pricing & Category</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-gray-300">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceUnit" className="text-gray-300">Price Unit *</Label>
                  <Select value={formData.priceUnit} onValueChange={(value: 'hour' | 'day' | 'session' | 'project') => handleInputChange('priceUnit', value)}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-600/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="hour">Per Hour</SelectItem>
                      <SelectItem value="day">Per Day</SelectItem>
                      <SelectItem value="session">Per Session</SelectItem>
                      <SelectItem value="project">Per Project</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-gray-300">Category *</Label>
                  <Select value={formData.categoryId} onValueChange={(value) => handleInputChange('categoryId', value)}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-600/50 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.icon} {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="bg-gray-700/30 border-gray-600/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Location</h3>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-gray-300">Service Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter service location"
                  className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="bg-gray-700/30 border-gray-600/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Service Features</h3>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={currentFeature}
                    onChange={(e) => setCurrentFeature(e.target.value)}
                    placeholder="Add a feature"
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  />
                  <Button type="button" onClick={addFeature} variant="outline" className="border-gray-600/50 text-gray-300 hover:text-white">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feature, index) => (
                    <Badge key={index} className="bg-blue-600/20 text-blue-300 border-blue-400/30 flex items-center gap-1">
                      {feature}
                      <button
                        type="button"
                        onClick={() => removeFeature(feature)}
                        className="ml-1 hover:text-red-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card className="bg-gray-700/30 border-gray-600/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Service Images</h3>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={currentImage}
                    onChange={(e) => setCurrentImage(e.target.value)}
                    placeholder="Image URL"
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                  />
                  <Button type="button" onClick={addImage} variant="outline" className="border-gray-600/50 text-gray-300 hover:text-white">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Service image ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==';
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card className="bg-gray-700/30 border-gray-600/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Status</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="isActive" className="text-gray-300">Active Service</Label>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="border-gray-600/50 text-gray-300 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600/80 hover:bg-blue-700/80 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding Service...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Add Service
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceModal;
