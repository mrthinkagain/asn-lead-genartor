import { GoogleGenAI, Type } from "@google/genai";
import type { Lead, LeadsResponse } from '../types';

const leadGenerationSchema = {
  type: Type.OBJECT,
  properties: {
    leads: {
      type: Type.ARRAY,
      description: "A list of generated business leads.",
      items: {
        type: Type.OBJECT,
        properties: {
          businessName: { 
            type: Type.STRING, 
            description: "The name of the business." 
          },
          website: { 
            type: Type.STRING, 
            description: "The business's website URL. Should be 'N/A' if not found." 
          },
          potentialPainPoint: { 
            type: Type.STRING, 
            description: "A specific, plausible problem this business might face with their current online presence (e.g., 'Outdated design not mobile-friendly', 'Slow page load speed affecting user experience', 'Lack of a clear call-to-action')." 
          },
          personalizedPitch: { 
            type: Type.STRING, 
            description: "A concise, compelling 2-3 sentence pitch that introduces the web development agency and highlights how it can solve the identified pain point." 
          }
        },
        required: ["businessName", "website", "potentialPainPoint", "personalizedPitch"]
      }
    }
  },
  required: ["leads"]
};

export const generateLeads = async (
  industry: string, 
  location: string, 
  count: number,
  apiKey: string
): Promise<Lead[]> => {
  if (!apiKey) {
    throw new Error("Gemini API Key is missing. Please add it in the sidebar configuration.");
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });
    
  try {
    const prompt = `Act as an expert B2B lead generation specialist. Your task is to generate a list of ${count} potential clients for a web development agency. The target is "${industry}" located in "${location}". For each lead, provide the required information in the specified JSON format. The pain points should be specific and actionable, and the pitch should be directly tied to solving that pain point.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: leadGenerationSchema,
        temperature: 0.8,
      },
    });

    const jsonString = response.text.trim();
    const parsedResponse: LeadsResponse = JSON.parse(jsonString);
    
    if (!parsedResponse.leads || !Array.isArray(parsedResponse.leads)) {
        throw new Error("Invalid response format from AI. Expected a 'leads' array.");
    }

    return parsedResponse.leads;

  } catch (error) {
    console.error("Error generating leads:", error);
    if (error instanceof Error) {
        // Check for specific API key related errors from the service
        if (error.message.includes('API key not valid')) {
             throw new Error('The provided Gemini API Key is invalid. Please check and try again.');
        }
        throw new Error(`Failed to generate leads: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating leads.");
  }
};