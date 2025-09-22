import { useState } from "react";
import { Camera, Edit, MapPin, Calendar, Star, Shield, Linkedin, Instagram, X, Plus } from "lucide-react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import { ImageWithFallback } from "../../pages/fallback";

export default function ProfileCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState(["React", "MERN", "UI/UX"]);
  const [newSkill, setNewSkill] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [profileImg, setProfileImg] = useState("https://images.unsplash.com/photo-1659353220597-71b8c6a56259");

  // Handle adding a skill
  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  // Handle profile image upload
  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImg(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Card className="bg-white shadow-sm border border-gray-100 p-8 mb-8 relative hover:shadow-xl transform hover:-translate-y-1 transition-all rounded-2xl">
        <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r from-emerald-400 to-emerald-600"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Profile Image */}
          <div className="relative group">
            <ImageWithFallback
              src={profileImg}
              alt="Profile"
              className="w-24 h-24 rounded-2xl object-cover group-hover:scale-105 transition-transform"
            />
            <label className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-lg flex justify-center items-center cursor-pointer">
              <Camera className="h-4 w-4 text-white" />
              <input type="file" accept="image/*" className="hidden" onChange={handleProfileUpload} />
            </label>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <h1 className="text-3xl font-bold text-gray-900">Sarah Johnson</h1>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1" title="Verified Member">
                <Shield className="h-4 w-4" /> Verified Member
              </Badge>
            </div>
            <p className="text-gray-600 mb-4">Premium Member since March 2023</p>

            {/* Location / Join / Rating */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-emerald-600" />
                <span>New York, NY</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-emerald-600" />
                <span>Joined March 2023</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current animate-pulse" />
                  ))}
                </div>
                <span>4.9 average rating</span>
              </div>
            </div>

            {/* Skills / Interests */}
            <div className="flex flex-wrap gap-2 mt-4">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  className="bg-emerald-50 text-emerald-700 border-emerald-200"
                  title={skill}
                >
                  {skill}
                </Badge>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              {linkedin && (
                <Button size="icon" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Linkedin className="h-4 w-4" />
                </Button>
              )}
              {instagram && (
                <Button size="icon" className="bg-pink-500 hover:bg-pink-600 text-white">
                  <Instagram className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Edit Profile Button */}
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center mt-4 md:mt-0"
          >
            <Edit className="h-4 w-4 mr-2" /> Edit Profile
          </Button>
        </div>
      </Card>

      {/* Edit Modal */}
      {isEditing && (
  <div className="fixed inset-0 flex justify-center items-center z-50">
    {/* Backdrop */}
    <div className="absolute inset-0 bg-white/20 backdrop-blur-md"></div>

    {/* Modal Card */}
    <Card className="relative bg-white/70 p-6 rounded-2xl w-96 shadow-lg border border-white/30">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Edit Profile</h2>
        <Button size="icon" onClick={() => setIsEditing(false)}><X /></Button>
      </div>

            {/* Edit Skills */}
            <div className="mb-4">
              <label className="block font-medium mb-2">Skills</label>
              <div className="flex gap-2 flex-wrap mb-2">
                {skills.map(skill => (
                  <Badge key={skill} className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1">
                    {skill}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSkills(skills.filter(s => s !== skill))} />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add new skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                />
                <Button onClick={handleAddSkill}><Plus className="h-4 w-4" /></Button>
              </div>
            </div>

            {/* Edit Social Links */}
            <div className="mb-4">
              <label className="block font-medium mb-2">LinkedIn</label>
              <Input placeholder="LinkedIn URL" value={linkedin} onChange={e => setLinkedin(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Instagram</label>
              <Input placeholder="Instagram URL" value={instagram} onChange={e => setInstagram(e.target.value)} />
            </div>

            {/* Save / Cancel */}
            <div className="flex justify-end gap-3 mt-4">
              <Button onClick={() => setIsEditing(false)} variant="outline">Cancel</Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Save</Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
