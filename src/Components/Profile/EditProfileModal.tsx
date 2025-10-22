import { useState } from "react";
import { X, Plus, Save } from "lucide-react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Badge } from "../../ui/badge";

export function EditProfileModal({ skills, setSkills, onClose }: any) {
  const [newSkill, setNewSkill] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <Card className="relative bg-white/80 backdrop-blur-xl p-6 rounded-2xl w-full max-w-md shadow-2xl border border-white/50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <Button size="icon" variant="ghost" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Skills</label>
            <div className="flex gap-2 flex-wrap mb-2 p-2 bg-gray-50 rounded-md border">
              {skills.map((skill: string) => (
                <Badge key={skill} className="bg-emerald-100 text-emerald-800 border-emerald-200 flex items-center gap-1.5">
                  {skill}
                  <X className="h-3 w-3 cursor-pointer hover:text-red-500" onClick={() => setSkills(skills.filter((s: string) => s !== skill))} />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add new skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
              />
              <Button onClick={handleAddSkill} className="bg-gray-700 hover:bg-black text-white">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
            <Input placeholder="https://linkedin.com/in/..." value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Instagram URL</label>
            <Input placeholder="https://instagram.com/..." value={instagram} onChange={(e) => setInstagram(e.target.value)} />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={onClose}>
            <Save className="h-4 w-4 mr-2" /> Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );
}
