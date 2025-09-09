import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="bg-gray-800/50 backdrop-blur-sm p-4 sticky top-0 z-10 border-b border-gray-700">
            <div className="container mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center font-bold text-primary-content text-2xl">
                        L
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-white tracking-wider">Lead Generation AI</h1>
                    </div>
                </div>
                 <div className="hidden sm:block text-sm text-gray-400">
                    Powered by{' '}
                    <a 
                        href="https://asncreativeagency.in" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-semibold text-primary hover:underline"
                    >
                        asncreativeagency
                    </a>
                </div>
            </div>
        </header>
    );
};