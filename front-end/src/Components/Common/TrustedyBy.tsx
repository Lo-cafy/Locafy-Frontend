import { ShieldCheck, Heart, TrendingUp, Star } from "lucide-react";

export default function TrustedByThousands() {
  const stats = [
    {
      icon: <ShieldCheck className="w-7 h-7 text-emerald-600" />,
      value: "15,000+",
      title: "Verified Professionals",
      desc: "Background checked & insured",
    },
    {
      icon: <Heart className="w-7 h-7 text-emerald-600" />,
      value: "75,000+",
      title: "Happy Customers",
      desc: "Satisfied with our services",
    },
    {
      icon: <TrendingUp className="w-7 h-7 text-emerald-600" />,
      value: "150+",
      title: "Service Categories",
      desc: "From home to business needs",
    },
    {
      icon: <Star className="w-7 h-7 text-emerald-600" />,
      value: "4.9/5",
      title: "Average Rating",
      desc: "Based on 50,000+ reviews",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-emerald-50/40 to-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
            Join our growing community of satisfied customers and verified
            professionals.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 bg-white rounded-2xl shadow-md p-8 md:p-12">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="text-center flex flex-col items-center transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl p-4"
            >
              <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110">
                {stat.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {stat.value}
              </h3>
              <p className="font-medium text-gray-800 mt-1">{stat.title}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
