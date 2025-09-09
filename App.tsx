import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LeadCard } from './components/LeadCard';
import { generateLeads } from './services/geminiService';
import type { Lead } from './types';
import { ClipboardIcon } from './components/icons/ClipboardIcon';
import { DownloadIcon } from './components/icons/DownloadIcon';

const EmptyState: React.FC = () => (
    <div className="text-center p-8">
        <svg className="mx-auto h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h3 className="mt-2 text-xl font-medium text-white">No Leads Generated</h3>
        <p className="mt-1 text-sm text-gray-500">Use the settings on the left to generate your first batch of leads.</p>
    </div>
);

const Loader: React.FC = () => (
    <div className="text-center p-8 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
        <h3 className="mt-4 text-xl font-medium text-white">AI is Generating Leads...</h3>
        <p className="mt-1 text-sm text-gray-500">This might take a moment. Please wait.</p>
    </div>
);

const App: React.FC = () => {
    const [industry, setIndustry] = useState<string>('e-commerce stores using Shopify');
    const [location, setLocation] = useState<string>('California, USA');
    const [count, setCount] = useState<number>(5);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [notification, setNotification] = useState<string>('');

    const showNotification = (message: string) => {
        setNotification(message);
        setTimeout(() => setNotification(''), 3000);
    };

    const handleGenerateLeads = useCallback(async () => {
        if (!industry || !location) {
            setError("Please fill in both industry and location fields.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setLeads([]);
        try {
            const generated = await generateLeads(industry, location, count);
            setLeads(generated);
        } catch (err: any) {
            setError(err.message || "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    }, [industry, location, count]);

    const exportToCSV = () => {
        if(leads.length === 0) return;
        const headers = ["Business Name", "Website", "Potential Pain Point", "Personalized Pitch"];
        const rows = leads.map(lead => [
            `"${lead.businessName.replace(/"/g, '""')}"`,
            `"${lead.website.replace(/"/g, '""')}"`,
            `"${lead.potentialPainPoint.replace(/"/g, '""')}"`,
            `"${lead.personalizedPitch.replace(/"/g, '""')}"`
        ]);
        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "leads.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showNotification('Leads exported as CSV!');
    };
    
    const copyToClipboard = () => {
      if(leads.length === 0) return;
      const text = leads.map(lead => 
        `Business Name: ${lead.businessName}\nWebsite: ${lead.website}\nPain Point: ${lead.potentialPainPoint}\nPitch: ${lead.personalizedPitch}`
      ).join("\n\n---\n\n");
      navigator.clipboard.writeText(text).then(() => {
        showNotification('Leads copied to clipboard!');
      });
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 font-sans">
            <Sidebar 
                industry={industry} setIndustry={setIndustry}
                location={location} setLocation={setLocation}
                count={count} setCount={setCount}
                onGenerate={handleGenerateLeads}
                isLoading={isLoading}
            />

            <main className="flex-1 flex flex-col">
                <Header />
                <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
                    {leads.length > 0 && (
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">Generated Leads ({leads.length})</h2>
                            <div className="flex gap-2">
                                <button onClick={copyToClipboard} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition flex items-center gap-2">
                                    <ClipboardIcon className="w-5 h-5" /> Copy
                                </button>
                                <button onClick={exportToCSV} className="bg-primary hover:bg-primary-focus text-primary-content font-bold py-2 px-4 rounded-md transition flex items-center gap-2">
                                    <DownloadIcon className="w-5 h-5" /> Export CSV
                                </button>
                            </div>
                        </div>
                    )}
                    {error && (
                        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-md relative mb-6" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {isLoading ? (
                        <Loader />
                    ) : leads.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {leads.map((lead, index) => (
                                <LeadCard key={`${lead.businessName}-${index}`} lead={lead} index={index} />
                            ))}
                        </div>
                    )}
                </div>
                 <footer className="text-center p-4 text-gray-500 text-sm border-t border-gray-800">
                    Powered by <a href="https://asncreativeagency.in" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">asncreativeagency.in</a>
                </footer>
            </main>
            {notification && (
                <div className="fixed bottom-5 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg animate-pulse-fast">
                    {notification}
                </div>
            )}
        </div>
    );
};

export default App;