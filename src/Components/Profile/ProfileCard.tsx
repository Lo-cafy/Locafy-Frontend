// src/Components/Profile/ProfileCard.tsx
import { useState, useEffect } from "react";
import { Camera, Edit, MapPin, Calendar, Star, Shield, Linkedin, Instagram, X, Plus, Save } from "lucide-react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import { ImageWithFallback } from "../../Components/fallback";
import { useAuthStore } from "@/store/authStore"; // Import auth store

export default function ProfileCard() {
  const { user } = useAuthStore(); // Get user data from the store
  
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState(["React", "MERN", "UI/UX"]);
  const [newSkill, setNewSkill] = useState("");
  const [linkedin, setLinkedin] = useState("https://linkedin.com/in/sarahjohnson");
  const [instagram, setInstagram] = useState("");
  
  // Set initial profile image from auth store or use a fallback
  const [profileImg, setProfileImg] = useState(user?.picture || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80");

  useEffect(() => {
    if (user?.picture) {
      setProfileImg(user.picture);
    }
  }, [user]);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };
  
  const handleSaveChanges = () => {
      // Logic to save changes would go here
      console.log("Changes saved!");
      setIsEditing(false); // Close modal on save
  };

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
      {/* --- Main Profile Card with Glassy Theme --- */}
      <Card className="bg-white/60 backdrop-blur-lg border border-white/30 p-6 sm:p-8 mb-8 relative shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all rounded-2xl">
        <div className="absolute top-0 left-0 w-full h-1.5 rounded-t-2xl bg-gradient-to-r from-emerald-400 to-green-500"></div>

        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Profile Image */}
          <div className="relative group shrink-0">
            <ImageWithFallback
              src={profileImg}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover shadow-md group-hover:scale-105 transition-transform border-4 border-white"
            />
            <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-lg flex justify-center items-center cursor-pointer ring-2 ring-white">
              <Camera className="h-4 w-4 text-white" />
              <input type="file" accept="image/*" className="hidden" onChange={handleProfileUpload} />
            </label>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-x-3 gap-y-1 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{user?.name || "Sarah Johnson"}</h1>
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 flex items-center gap-1.5 py-1 px-2.5">
                <Shield className="h-4 w-4" /> Verified Member
              </Badge>
            </div>
            <p className="text-gray-600 mb-4">Premium Member since March 2025</p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 justify-center md:justify-start">
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-emerald-600" /><span>New York, NY</span></div>
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-emerald-600" /><span>Joined March 2025</span></div>
              <div className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-500 fill-current" /><span>4.9 average rating</span></div>
            </div>
          </div>

          {/* Edit Button */}
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center shrink-0 mt-4 md:mt-0 shadow-md"
          >
            <Edit className="h-4 w-4 mr-2" /> Edit Profile
          </Button>
        </div>
        
        {/* Skills & Socials moved to bottom for better layout */}
        <div className="pt-6 mt-6 border-t border-white/40 flex flex-col sm:flex-row items-center gap-4">
            <h3 className="text-sm font-semibold text-gray-700 shrink-0">Skills:</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {skills.map((skill) => (
                <Badge key={skill} className="bg-emerald-50 text-emerald-800 border-emerald-200">{skill}</Badge>
              ))}
            </div>
             <div className="flex gap-3 sm:ml-auto">
              {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer"><Button size="icon" variant="ghost" className="bg-gray-200 hover:bg-blue-600 hover:text-white text-gray-600"><Linkedin className="h-4 w-4" /></Button></a>}
              {instagram && <a href={instagram} target="_blank" rel="noopener noreferrer"><Button size="icon" variant="ghost" className="bg-gray-200 hover:bg-pink-500 hover:text-white text-gray-600"><Instagram className="h-4 w-4" /></Button></a>}
            </div>
        </div>
      </Card>

      {/* --- Edit Modal with Glassy Theme --- */}
      {isEditing && (
        <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsEditing(false)}></div>
          <Card className="relative bg-white/80 backdrop-blur-xl p-6 rounded-2xl w-full max-w-md shadow-2xl border border-white/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Edit Profile</h2>
              <Button size="icon" variant="ghost" onClick={() => setIsEditing(false)}><X className="w-5 h-5"/></Button>
            </div>

            <div className="space-y-4">
               <div>
                  <label className="block text-sm font-medium mb-1">Skills</label>
                  <div className="flex gap-2 flex-wrap mb-2 p-2 bg-gray-50 rounded-md border">
                    {skills.map(skill => (
                      <Badge key={skill} className="bg-emerald-100 text-emerald-800 border-emerald-200 flex items-center gap-1.5">
                        {skill}
                        <X className="h-3 w-3 cursor-pointer hover:text-red-500" onClick={() => setSkills(skills.filter(s => s !== skill))} />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Add new skill" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} />
                    <Button onClick={handleAddSkill} className="bg-gray-700 hover:bg-black text-white"><Plus className="h-4 w-4" /></Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
                  <Input placeholder="https://linkedin.com/in/..." value={linkedin} onChange={e => setLinkedin(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Instagram URL</label>
                  <Input placeholder="https://instagram.com/..." value={instagram} onChange={e => setInstagram(e.target.value)} />
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <Button onClick={() => setIsEditing(false)} variant="outline">Cancel</Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleSaveChanges}>
                <Save className="h-4 w-4 mr-2"/> Save Changes
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}