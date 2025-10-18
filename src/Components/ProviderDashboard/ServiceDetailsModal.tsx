import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/ui/dialog";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { DollarSign, Star, Wrench } from "lucide-react";
import type { Service } from "./ServiceCard";

interface ServiceDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service | null;
}

export default function ServiceDetailsModal({ open, onOpenChange, service }: ServiceDetailsModalProps) {
  if (!service) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-white/80 backdrop-blur-xl rounded-2xl border border-white/50 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Wrench className="w-6 h-6 text-emerald-600" />
            Service Details
          </DialogTitle>
          <DialogDescription className="text-gray-500">Overview of this service.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4">
          <Card className="p-4 border-gray-200 bg-white/70">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">{service.category}</Badge>
                  <Badge className="text-xs">{service.status}</Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>{service.price}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{service.rating.toFixed(1)}</span>
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
