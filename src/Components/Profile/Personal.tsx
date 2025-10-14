import { useState } from "react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Save, Edit2, X } from "lucide-react";

export default function Personal() {
  const [isEditing, setIsEditing] = useState(false);

  const [firstName, setFirstName] = useState("Sarah");
  const [lastName, setLastName] = useState("Johnson");
  const [email, setEmail] = useState("sarah.johnson@email.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [address, setAddress] = useState("123 Main St, New York, NY 10001");
  const [bio, setBio] = useState("I love discovering new services...");

  return (
    <Card className="bg-white shadow-sm border border-gray-100 p-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Personal Information
        </h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-gray-700"
          >
            <Edit2 className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Form / Readonly Mode */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label className="block font-medium text-gray-900 mb-2">First Name</label>
          {isEditing ? (
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          ) : (
            <p className="text-gray-700">{firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block font-medium text-gray-900 mb-2">Last Name</label>
          {isEditing ? (
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
          ) : (
            <p className="text-gray-700">{lastName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium text-gray-900 mb-2">Email Address</label>
          {isEditing ? (
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          ) : (
            <p className="text-gray-700">{email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium text-gray-900 mb-2">Phone Number</label>
          {isEditing ? (
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          ) : (
            <p className="text-gray-700">{phone}</p>
          )}
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block font-medium text-gray-900 mb-2">Address</label>
          {isEditing ? (
            <Input value={address} onChange={(e) => setAddress(e.target.value)} />
          ) : (
            <p className="text-gray-700">{address}</p>
          )}
        </div>

        {/* Bio */}
        <div className="md:col-span-2">
          <label className="block font-medium text-gray-900 mb-2">Bio</label>
          {isEditing ? (
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
            />
          ) : (
            <p className="text-gray-700">{bio}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <div className="mt-8 flex justify-end space-x-3">
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
          <Button
            className="bg-emerald-600 text-white"
            onClick={() => setIsEditing(false)}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      )}
    </Card>
  );
}
