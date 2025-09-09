
import React from 'react';
import type { Lead } from '../types';

interface LeadCardProps {
  lead: Lead;
  index: number;
}

const PainPointIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);

const PitchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM10 11a6 6 0 016 6H4a6 6 0 016-6z" />
        <path fillRule="evenodd" d="M15.314 11.25a.75.75 0 011.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-2.25-2.25a.75.75 0 111.06-1.06L10 14.94l4.25-4.25a.75.75 0 011.06 0z" clipRule="evenodd" />
    </svg>
);

export const LeadCard: React.FC<LeadCardProps> = ({ lead, index }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-[1.02] duration-300"
         style={{ animationDelay: `${index * 100}ms` }}>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-white">{lead.businessName}</h3>
          {lead.website !== 'N/A' && (
            <a 
              href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm bg-primary/20 text-primary-focus px-3 py-1 rounded-full hover:bg-primary/40 transition"
            >
              Website ↗
            </a>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-700 space-y-4">
          <div className="flex items-start">
            <PainPointIcon />
            <div>
                <h4 className="font-semibold text-gray-300">Potential Pain Point</h4>
                <p className="text-gray-400 text-sm">{lead.potentialPainPoint}</p>
            </div>
          </div>
          <div className="flex items-start">
            <PitchIcon />
            <div>
                <h4 className="font-semibold text-gray-300">Personalized Pitch</h4>
                <p className="text-gray-400 text-sm">{lead.personalizedPitch}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
