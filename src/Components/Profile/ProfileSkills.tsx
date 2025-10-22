import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Linkedin, Instagram } from "lucide-react";

export function ProfileSkills({ skills, linkedin, instagram }: any) {
  return (
    <div className="pt-6 mt-6 border-t border-white/40 flex flex-col sm:flex-row items-center gap-4">
      <h3 className="text-sm font-semibold text-gray-700 shrink-0">Skills:</h3>
      <div className="flex flex-wrap gap-2 justify-center">
        {skills.map((skill: string) => (
          <Badge key={skill} className="bg-emerald-50 text-emerald-800 border-emerald-200">
            {skill}
          </Badge>
        ))}
      </div>

      <div className="flex gap-3 sm:ml-auto">
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <Button size="icon" variant="ghost" className="bg-gray-200 hover:bg-blue-600 hover:text-white text-gray-600">
              <Linkedin className="h-4 w-4" />
            </Button>
          </a>
        )}
        {instagram && (
          <a href={instagram} target="_blank" rel="noopener noreferrer">
            <Button size="icon" variant="ghost" className="bg-gray-200 hover:bg-pink-500 hover:text-white text-gray-600">
              <Instagram className="h-4 w-4" />
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}
