import { useState } from 'react';
import { Card } from '@/ui/card';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Camera } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
    address: '123 Main St, City',
    bio: 'Professional home service provider with 5 years of experience.',
  });

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="p-6 text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <img
              src="/placeholder-avatar.jpg"
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-emerald-600 p-2 rounded-full text-white hover:bg-emerald-700">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          
          <h2 className="text-xl font-semibold">
            {profileData.firstName} {profileData.lastName}
          </h2>
          <p className="text-gray-500 mt-1">{profileData.email}</p>
          
          <div className="mt-6">
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
              className="w-full"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </Card>

        {/* Profile Details */}
        <Card className="p-6 lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>First Name</Label>
              <Input
                value={profileData.firstName}
                disabled={!isEditing}
                onChange={(e) => 
                  setProfileData({ ...profileData, firstName: e.target.value })
                }
              />
            </div>
            
            <div>
              <Label>Last Name</Label>
              <Input
                value={profileData.lastName}
                disabled={!isEditing}
                onChange={(e) => 
                  setProfileData({ ...profileData, lastName: e.target.value })
                }
              />
            </div>
            
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={profileData.email}
                disabled={!isEditing}
                onChange={(e) => 
                  setProfileData({ ...profileData, email: e.target.value })
                }
              />
            </div>
            
            <div>
              <Label>Phone</Label>
              <Input
                value={profileData.phone}
                disabled={!isEditing}
                onChange={(e) => 
                  setProfileData({ ...profileData, phone: e.target.value })
                }
              />
            </div>
            
            <div className="md:col-span-2">
              <Label>Address</Label>
              <Input
                value={profileData.address}
                disabled={!isEditing}
                onChange={(e) => 
                  setProfileData({ ...profileData, address: e.target.value })
                }
              />
            </div>
            
            <div className="md:col-span-2">
              <Label>Bio</Label>
              <textarea
                value={profileData.bio}
                disabled={!isEditing}
                onChange={(e) => 
                  setProfileData({ ...profileData, bio: e.target.value })
                }
                className="w-full p-2 border rounded-md"
                rows={4}
              />
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave} className="bg-emerald-600">
                Save Changes
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Profile;