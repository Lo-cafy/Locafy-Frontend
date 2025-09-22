import {
  Mail,
  Phone,
  Heart,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t pt-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-emerald-600" />
              <span className="font-bold text-lg text-gray-900">Locafy</span>
            </div>
            <p className="text-sm text-emerald-700 bg-emerald-50 inline-block px-3 py-1 rounded-full mb-4">
              The Friendly Trustable Service </p>
            <p className="text-gray-600 text-sm mb-4">
              Connecting communities with trusted local service providers. We
              believe in building lasting relationships between neighbors,
              ensuring quality services that you can rely on with complete peace
              of mind.
            </p>

            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                24/7 Customer Support
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-600" />
                hello@locafy.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                1-800-LOCAFY-1
              </li>
            </ul>

            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="w-9 h-9 rounded-md border flex items-center justify-center hover:bg-emerald-600 hover:text-white text-emerald-600 transition"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-md border flex items-center justify-center hover:bg-emerald-600 hover:text-white text-emerald-600 transition"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-md border flex items-center justify-center hover:bg-emerald-600 hover:text-white text-emerald-600 transition"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-md border flex items-center justify-center hover:bg-emerald-600 hover:text-white text-emerald-600 transition"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              Our Locations
            </h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 hover:shadow-md transition">
                <p className="font-medium">Manhattan</p>
                <p className="text-sm text-gray-600">
                  123 Broadway, Suite 200 <br /> New York, NY 10001
                </p>
                <p className="text-emerald-600 font-medium text-sm mt-1">
                  (212) 555-0123
                </p>
              </div>
              <div className="border rounded-lg p-4 hover:shadow-md transition">
                <p className="font-medium">Brooklyn</p>
                <p className="text-sm text-gray-600">
                  456 Atlantic Avenue <br /> Brooklyn, NY 11217
                </p>
                <p className="text-emerald-600 font-medium text-sm mt-1">
                  (718) 555-0456
                </p>
              </div>
              <div className="border rounded-lg p-4 hover:shadow-md transition">
                <p className="font-medium">Queens</p>
                <p className="text-sm text-gray-600">
                  789 Northern Blvd <br /> Queens, NY 11372
                </p>
                <p className="text-emerald-600 font-medium text-sm mt-1">
                  (718) 555-0789
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-emerald-600 transition">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-600 transition">
                  Service Categories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-600 transition">
                  Become a Provider
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-600 transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-600 transition">
                  Support Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-600 transition">
                  Safety & Trust
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              Resources & Legal
            </h3>
            <ul className="space-y-3 text-sm mb-6">
              <li>
                <a href="#" className="hover:text-emerald-600 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-600 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-600 transition">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-600 transition">
                  Accessibility
                </a>
              </li>
            </ul>

            <div className="bg-white-100 p-4 rounded-lg">
              <p className="font-medium text-gray-900 mb-2">Stay Updated</p>
              <p className="text-sm text-gray-600 mb-3">
                Get the latest updates on new services and special offers.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 rounded-l-md border focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
                <button className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-r-md hover:bg-emerald-700 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>
            © 2025 Locafy. Made with{" "}
            <span className="text-red-500">♥</span> in New York City. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4 mt-3 md:mt-0">
            <span className="text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-medium">
              ● All Systems Operational
            </span>
            <span>Trusted by 75,000+ customers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
