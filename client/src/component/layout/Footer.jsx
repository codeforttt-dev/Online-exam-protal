import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        
        {/* About */}
        <div>
          <h3 className="font-semibold text-lg mb-3">
            National Science Olympiad
          </h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Empowering young minds through scientific exploration and
            competition since 1995.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition">Dashboard</a></li>
            <li><a href="#" className="hover:text-white transition">My Olympiads</a></li>
            <li><a href="#" className="hover:text-white transition">Practice Tests</a></li>
            <li><a href="#" className="hover:text-white transition">Study Materials</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-lg mb-3">
            Contact Support
          </h3>

          <p className="text-sm text-gray-400 mb-2">
            📧 student-support@nso2026.org
          </p>

          <p className="text-sm text-gray-400 mb-2">
            📞 +1 (234) 567-8900
          </p>

          <p className="text-sm text-gray-400">
            🕒 Mon-Fri: 9 AM - 6 PM
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-400">
        © 2026 National Science Olympiad. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
