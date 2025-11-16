import React from 'react';

export function CSSTest() {
  return (
    <div className="fixed top-4 right-4 z-50 p-4 bg-black bg-opacity-80 text-white rounded-lg max-w-sm">
      <h3 className="text-lg font-bold mb-2 text-yellow-400">🎨 CSS Debug Panel</h3>
      
      {/* Test TailwindCSS Basic Classes */}
      <div className="mb-3">
        <div className="text-sm mb-1">Basic Colors:</div>
        <div className="flex gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <div className="w-4 h-4 bg-green-500 rounded"></div>
        </div>
      </div>

      {/* Test Custom Colors from Config */}
      <div className="mb-3">
        <div className="text-sm mb-1">Custom Colors:</div>
        <div className="flex gap-2">
          <div className="w-4 h-4 bg-primary rounded"></div>
          <div className="w-4 h-4 bg-secondary rounded"></div>
        </div>
      </div>

      {/* Test Layout Classes */}
      <div className="mb-3">
        <div className="text-sm mb-1">Layout Test:</div>
        <div className="flex items-center justify-between p-2 bg-gray-700 rounded text-xs">
          <span>Flexbox</span>
          <span>✓</span>
        </div>
      </div>

      {/* Test Responsive & Interactive */}
      <button 
        className="w-full mt-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm transition-colors"
        onClick={() => alert('TailwindCSS hover and transitions working!')}
      >
        Test Interactions
      </button>

      <div className="text-xs mt-2 opacity-70">
        If you see colors and layouts, TailwindCSS is working!
      </div>
    </div>
  );
}
