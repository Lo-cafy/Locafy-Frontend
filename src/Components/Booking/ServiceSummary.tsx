import { CheckCircle, Star } from "lucide-react";

interface ServiceSummaryProps {
  service: any;
}

export default function ServiceSummary({ service }: ServiceSummaryProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-black mb-4">Service Summary</h2>
      <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <img 
          src={service.photos?.[0]?.photo_url || "/placeholder-service.jpg"} 
          alt={service.title}
          className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-lg"
        />
        <div className="flex-1 w-full">
          <h3 className="font-semibold text-black">{service.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{service.type} • Home Service</p>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-black">Provider Name</span>
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-xs text-green-600">Verified</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <span className="text-2xl font-bold text-black">${service.price}</span>
            <div className="flex items-center space-x-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < 4 ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-sm text-gray-600">4.2 • 127 reviews</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}