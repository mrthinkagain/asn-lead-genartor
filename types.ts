
export interface Lead {
  businessName: string;
  website: string;
  potentialPainPoint: string;
  personalizedPitch: string;
}

export interface LeadsResponse {
  leads: Lead[];
}
