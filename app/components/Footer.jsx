import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-2 mb-2">
          {/* Unique Logo - a simple shield + key icon combined */}
          <div className="flex items-center justify-center w-8 h-8 bg-indigo-500 rounded-full">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="font-semibold text-lg">AuthMaster</span>
        </div>
        <p className="text-sm text-gray-300">
          © {new Date().getFullYear()} AuthMaster. All rights reserved.
        </p>
      </div>
    </footer>
  );
}