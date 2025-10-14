import { ShieldCheck, Star, Users } from "lucide-react";

export default function WhyChooseLocafy() {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
      title: "Verified Professionals",
      description:
        "Every service provider undergoes thorough background checks, license verification, and skills assessment.",
      bg: "bg-emerald-50",
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: "Quality Guaranteed",
      description:
        "All services come with our satisfaction guarantee. Not happy? We'll make it right or refund your money.",
      bg: "bg-yellow-50",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Community Driven",
      description:
        "Real reviews from real customers help you make informed decisions about local service providers.",
      bg: "bg-blue-50",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border border-emerald-200 bg-emerald-50 text-emerald-700 mb-6">
          <ShieldCheck className="w-4 h-4 mr-1 text-emerald-600" />
          Trust & Safety
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Why Choose Locafy?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          We're committed to connecting you with the most reliable, professional,
          and trustworthy service providers in your community.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300"
            >
              {/* Centered Icon */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-6 ${feature.bg} group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
