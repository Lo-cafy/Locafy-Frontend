"use client";
import { MapPin, ShieldCheck, Clock, Phone, Star, Heart } from "lucide-react";

type Service = {
  id: number; category: string; price: string; image: string;
  title: string; provider: string; rating: number; reviews: number;
  duration: string; location: string; verified?: boolean;
};

const services: Service[] = [
  { id: 1, category: "Home Cleaning", price: "$120/session",
    image:"https://images.unsplash.com/photo-1581579187181-d8f6e2d7a6f3?q=80&w=1400&auto=format&fit=crop",
    title:"Professional Deep House Cleaning", provider:"SparklePro Cleaning Services",
    rating:4.9, reviews:287, duration:"15 min", location:"Manhattan, NY", verified:true },
  { id: 2, category:"HVAC Services", price:"$200/service",
    image:"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1400&auto=format&fit=crop",
    title:"Emergency AC Repair & Installation", provider:"CoolAir Expert Technicians",
    rating:4.8, reviews:156, duration:"30 min", location:"Brooklyn, NY", verified:true },
  { id: 3, category:"Fitness & Health", price:"$80/session",
    image:"https://images.unsplash.com/photo-1546484959-fc6a04d0d66a?q=80&w=1400&auto=format&fit=crop",
    title:"Certified Personal Training Sessions", provider:"FitLife Pro Coaching",
    rating:5.0, reviews:94, duration:"1 hour", location:"Queens, NY", verified:true }
];

const Pill = ({ children, className }: { children: React.ReactNode; className?: string }) =>
  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${className}`}>{children}</span>;

function ServiceCard({ s }: { s: Service }) {
  return (
    <article className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition flex flex-col overflow-hidden">
      <div className="relative">
        <img src={s.image} alt={s.title} className="w-full h-48 object-cover" />
        <Pill className="absolute top-3 left-3 bg-emerald-700 text-white">{s.category}</Pill>
        <Pill className="absolute top-3 right-3 bg-white shadow text-gray-800">{s.price}</Pill>
        <button className="absolute right-3 bottom-3 w-9 h-9 bg-white shadow rounded-full flex justify-center items-center hover:bg-gray-100">
          <Heart className="w-4 h-4 text-gray-500" />
        </button>
        {s.verified && (
          <div className="absolute left-3 bottom-3 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Verified
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold mb-1">{s.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{s.provider}</p>

        <div className="flex justify-between text-sm mb-3">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-yellow-400" /><span>{s.rating}</span>
            <span className="text-gray-500">({s.reviews})</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <Clock className="w-4 h-4" /> {s.duration}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-4">
          <MapPin className="w-4 h-4 text-emerald-600" /> {s.location}
        </div>

        <div className="text-xs text-gray-500 flex gap-2 mb-6">
          <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-600"/> Background checked</span>
          | <span>Insured & Bonded</span>
        </div>

        <div className="mt-auto flex gap-3">
          <button className="flex-1 h-11 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Book Now</button>
          <button className="w-11 h-11 border rounded-lg flex justify-center items-center hover:bg-gray-50">
            <Phone className="w-5 h-5 text-emerald-600" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function FeaturedServices() {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-emerald-50">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h2 className="text-2xl font-bold">Featured Local Services</h2>
          <p className="text-gray-600 mt-2 max-w-xl">Hand-picked professionals with the highest ratings and customer satisfaction scores in your area.</p>
        </div>
        <button className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700">Explore All Services</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(s => <ServiceCard key={s.id} s={s} />)}
      </div>
    </section>
  );
}
