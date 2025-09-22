import React from 'react';

interface Category {
  id: number;
  name: string;
  professionals: number;
  growth: number;
  icon: string;
}

const BrowseCategories: React.FC = () => {
  const categories: Category[] = [
    { id: 1, name: "Home Cleaning", professionals: 125, growth: 12, icon: "🧹" },
    { id: 2, name: "Handyman Services", professionals: 89, growth: 8, icon: "🔧" },
    { id: 3, name: "Pet Care & Grooming", professionals: 67, growth: 15, icon: "🐾" },
    { id: 4, name: "Beauty & Wellness", professionals: 54, growth: 20, icon: "💅" },
    { id: 5, name: "Fitness & Training", professionals: 43, growth: 25, icon: "💪" },
    { id: 6, name: "Tutoring & Education", professionals: 78, growth: 10, icon: "📚" },
    { id: 7, name: "Tech Support", professionals: 32, growth: 18, icon: "💻" },
    { id: 8, name: "Event Services", professionals: 29, growth: 22, icon: "🎉" },
  ];

return (
  <div className="max-w-6xl mx-auto px-4 py-12">
    {/* Header */}
    <div className="text-center mb-12">
      <h1 className="text-xl md:text-xl font-bold text-gray-900 mb-4">
        Browse by Category
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Discover trusted professionals across all service categories. Each
        provider is verified, insured, and rated by real customers.
      </p>
    </div>

    {/* Divider */}
    <div className="border-t border-gray-200 mb-12"></div>

    {/* Categories Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-white p-6 rounded-xl border border-gray-200 
                     hover:border-emerald-200 hover:shadow-md 
                     transition-all duration-300 cursor-pointer group"
        >
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3 group-hover:scale-110 transition-transform duration-300">
              {category.icon}
            </span>
            <h3 className="text-l font-semibold text-gray-900">
              {category.name}
            </h3>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-600">{category.professionals} professionals</p>
            <div className="flex items-center text-emerald-600 font-medium">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              <span>+{category.growth}%</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">this month</p>
        </div>
      ))}
    </div>
  </div>
);
};

export default BrowseCategories;