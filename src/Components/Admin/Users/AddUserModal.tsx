import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/ui/dialog';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { Card, CardContent } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Plus, User as UserIcon, Mail, Phone, MapPin, Save, Loader2, Eye, EyeOff } from 'lucide-react';
import type { User, UserRole, UserStatus } from '@/types/auth.types';

interface AddUserModalProps {
  onUserAdded: (user: User) => void;
}

interface UserFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: UserRole;
  status: UserStatus;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ onUserAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: 'Customer',
    status: 'Active',
  });

  const roles: { value: UserRole; label: string; description: string; icon: string }[] = [
    { value: 'Admin', label: 'Administrator', description: 'Full system access', icon: '👑' },
    { value: 'Provider', label: 'Service Provider', description: 'Can offer services', icon: '🔧' },
    { value: 'Customer', label: 'Customer', description: 'Can book services', icon: '👤' },
  ];

  const statuses: { value: UserStatus; label: string; color: string }[] = [
    { value: 'Active', label: 'Active', color: 'bg-green-500/20 text-green-400 border-green-400/30' },
    { value: 'Inactive', label: 'Inactive', color: 'bg-red-500/20 text-red-400 border-red-400/30' },
    { value: 'Pending', label: 'Pending', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30' },
  ];

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, password }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!formData.email.includes('@')) return 'Valid email is required';
    if (!formData.password.trim()) return 'Password is required';
    if (formData.password.length < 6) return 'Password must be at least 6 characters';
    if (!formData.phone.trim()) return 'Phone number is required';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newUser: User = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        role: formData.role,
        status: formData.status,
        joinDate: new Date().toISOString().split('T')[0],
      };

      onUserAdded(newUser);
      setIsOpen(false);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        role: 'Customer',
        status: 'Active',
      });
    } catch (error) {
      console.error('Failed to add user:', error);
      alert('Failed to add user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedRole = roles.find(r => r.value === formData.role);
  const selectedStatus = statuses.find(s => s.value === formData.status);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-800/90 backdrop-blur-xl border-gray-700/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Add New User</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="bg-gray-700/30 border-gray-600/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <UserIcon className="w-5 h-5 mr-2" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter full name"
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter email address"
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 mt-4">
                <Label htmlFor="password" className="text-gray-300">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter password"
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generatePassword}
                  className="mt-2 border-gray-600/50 text-gray-300 hover:text-white text-xs"
                >
                  Generate Strong Password
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gray-700/30 border-gray-600/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-300">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter phone number"
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-gray-300">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter address"
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Role & Status */}
          <Card className="bg-gray-700/30 border-gray-600/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Role & Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-gray-300">User Role *</Label>
                  <Select value={formData.role} onValueChange={(value: UserRole) => handleInputChange('role', value)}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-600/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          <div className="flex items-center space-x-2">
                            <span>{role.icon}</span>
                            <div>
                              <div className="font-medium">{role.label}</div>
                              <div className="text-xs text-gray-400">{role.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedRole && (
                    <div className="mt-2 p-2 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center space-x-2 text-sm">
                        <span>{selectedRole.icon}</span>
                        <span className="text-gray-300">{selectedRole.label}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{selectedRole.description}</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-gray-300">Account Status *</Label>
                  <Select value={formData.status} onValueChange={(value: UserStatus) => handleInputChange('status', value)}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-600/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {statuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          <div className="flex items-center space-x-2">
                            <Badge className={`${status.color} text-xs`}>
                              {status.label}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedStatus && (
                    <div className="mt-2">
                      <Badge className={`${selectedStatus.color} text-xs`}>
                        {selectedStatus.label}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Preview */}
          <Card className="bg-gray-700/30 border-gray-600/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Preview</h3>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                    {formData.name.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{formData.name || 'User Name'}</p>
                    <p className="text-sm text-gray-400">{formData.email || 'user@example.com'}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.role && (
                    <Badge className="bg-blue-600/20 text-blue-300 border-blue-400/30">
                      {selectedRole?.icon} {selectedRole?.label}
                    </Badge>
                  )}
                  {formData.status && (
                    <Badge className={selectedStatus?.color}>
                      {selectedStatus?.label}
                    </Badge>
                  )}
                </div>
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
              className="bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding User...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Add User
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
