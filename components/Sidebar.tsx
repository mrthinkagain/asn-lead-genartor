
import React from 'react';

interface SidebarProps {
  industry: string;
  setIndustry: (value: string) => void;
  location: string;
  setLocation: (value:string) => void;
  count: number;
  setCount: (value: number) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  industry, setIndustry, location, setLocation, count, setCount, 
  onGenerate, isLoading 
}) => {
  return (
    <aside className="w-full md:w-96 bg-gray-900 p-6 flex flex-col gap-8 h-full overflow-y-auto">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4 border-b-2 border-primary pb-2">Generation Settings</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-300 mb-1">Target Industry / Niche</label>
            <input 
              type="text" 
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g., Restaurants in New York" 
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-primary-focus focus:border-primary-focus transition"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">Target Location</label>
            <input 
              type="text" 
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., London, UK" 
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-primary-focus focus:border-primary-focus transition"
            />
          </div>
          <div>
            <label htmlFor="count" className="block text-sm font-medium text-gray-300 mb-1">Number of Leads ({count})</label>
            <input 
              type="range"
              id="count"
              min="1"
              max="20"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary" 
            />
          </div>
        </div>
      </div>
      
      <button 
        onClick={onGenerate}
        disabled={isLoading || !industry || !location}
        className="w-full bg-primary hover:bg-primary-focus text-primary-content font-bold py-3 px-4 rounded-md transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : 'Generate Leads'}
      </button>
    </aside>
  );
};