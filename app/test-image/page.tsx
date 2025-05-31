'use client';

import { useState, useRef } from 'react';

export default function TestImagePage() {
  const [imageData, setImageData] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Test: File selected:', file.name, file.type, file.size);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        console.log('Test: FileReader success');
        console.log('Test: Data URL length:', dataUrl?.length);
        console.log('Test: Data URL start:', dataUrl?.substring(0, 100));
        setImageData(dataUrl);
      };
      reader.onerror = (error) => {
        console.error('Test: FileReader error:', error);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Image Upload Test</h1>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      
      {imageData && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Preview Results:</h2>
          
          {/* Test 1: Basic img tag */}
          <div className="border p-4">
            <h3 className="font-medium mb-2">Test 1: Basic img tag</h3>
            <img
              src={imageData}
              alt="Test 1"
              className="max-w-xs max-h-48 border"
              onLoad={() => console.log('Test 1: IMG loaded')}
              onError={(e) => console.error('Test 1: IMG error', e)}
            />
          </div>
          
          {/* Test 2: img with object-contain */}
          <div className="border p-4">
            <h3 className="font-medium mb-2">Test 2: img with object-contain in fixed container</h3>
            <div className="w-64 h-48 bg-gray-100 border">
              <img
                src={imageData}
                alt="Test 2"
                className="w-full h-full object-contain"
                onLoad={() => console.log('Test 2: IMG loaded')}
                onError={(e) => console.error('Test 2: IMG error', e)}
              />
            </div>
          </div>
          
          {/* Test 3: Data URL info */}
          <div className="border p-4">
            <h3 className="font-medium mb-2">Test 3: Data URL Information</h3>
            <p><strong>Length:</strong> {imageData.length}</p>
            <p><strong>Type:</strong> {imageData.split(';')[0]}</p>
            <p><strong>Encoding:</strong> {imageData.split(';')[1]?.split(',')[0]}</p>
            <p><strong>First 100 chars:</strong> {imageData.substring(0, 100)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
