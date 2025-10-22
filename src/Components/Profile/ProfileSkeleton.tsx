import { Card } from "../../ui/card";

export function ProfileSkeleton() {
  return (
    <Card className="bg-white/60 backdrop-blur-lg border border-white/30 p-8 rounded-2xl animate-pulse">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-gray-200" />
        <div className="flex-1 space-y-3">
          <div className="h-8 bg-gray-200 rounded w-48" />
          <div className="h-4 bg-gray-200 rounded w-64" />
        </div>
      </div>
    </Card>
  );
}
