
import Link from "next/link";
import { Wrench } from "lucide-react";


export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Information */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-5">
              <Wrench className="text-blue-500" size={28} />
              <span className="text-2xl font-bold text-white">
                Fix<span className="text-blue-500">Mate</span>
              </span>
            </Link>

            <p className="text-sm leading-7 text-gray-400">
              Your trusted partner for smartphone, computer
              and home appliance repair services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-blue-400">Home</Link></li>
              <li><Link href="/services" className="hover:text-blue-400">Services</Link></li>
              <li><Link href="/about" className="hover:text-blue-400">How It Works</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">
              Popular Categories
            </h3>

            <ul className="space-y-3 text-sm">
              <li>Smartphone</li>
              <li>Laptop & PC</li>
              <li>Air Conditioner</li>
              <li>Refrigerator</li>
              <li>Television</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">
              Contact Us
            </h3>

            <ul className="space-y-3 text-sm text-gray-400">
              <li>Email: support@fixmate.com</li>
              <li>Phone: +880 1700-000000</li>
              <li>Location: Bangladesh</li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
                <div className="border-t border-gray-800 mt-12 pt-6 text-center">
        <p className="text-sm text-gray-500">
            © 2026 FixMate. All rights reserved.
        </p>
        </div>

      </div>
    </footer>
  );
}
