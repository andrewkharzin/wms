import { GoogleGenAI } from "@google/genai";
import { MOCK_ITEMS, MOCK_WAREHOUSES, MOCK_ALERTS, MOCK_LOCATIONS } from '../constants';

// Initialize the API
// Note: In a real app, this key would be securely injected.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const askInventoryAssistant = async (question: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key is missing. Please check your environment configuration.";
  }

  try {
    // Create a context string based on the current "state" of the warehouse
    const context = `
      You are an expert AI Assistant for a Warehouse Management System called NexusAI.
      
      Here is the current snapshot of the database:
      
      LOCATIONS:
      ${JSON.stringify(MOCK_LOCATIONS.map(l => ({ name: l.name, city: l.city, type: l.type, code: l.location_code, active: l.is_active })))}
      
      ITEMS (Sample):
      ${JSON.stringify(MOCK_ITEMS.map(i => ({ title: i.title, qty: i.available_quantity, price: i.price, location: i.location_id, status: i.status })))}
      
      WAREHOUSES:
      ${JSON.stringify(MOCK_WAREHOUSES.map(w => ({ name: w.name, capacity: w.capacity_volume, zones: w.zones?.length })))}
      
      ACTIVE ALERTS:
      ${JSON.stringify(MOCK_ALERTS)}

      Rules:
      1. Answer questions concisely.
      2. If asked to find items, look at the JSON provided.
      3. If asked about potential issues, analyze the alerts or low stock levels.
      4. Use formatting (markdown) to make tables or lists if helpful.
      5. Assume the user is a Warehouse Manager.
    `;

    const model = "gemini-2.5-flash";
    const response = await ai.models.generateContent({
      model: model,
      contents: [
        { role: 'user', parts: [{ text: context }] }, // System instruction as first user turn for simple context
        { role: 'user', parts: [{ text: question }] }
      ],
      config: {
        temperature: 0.2, // Low temperature for factual data
      }
    });

    return response.text || "I couldn't process that request.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the neural core. Please try again later.";
  }
};

export const analyzeItemImage = async (base64Image: string): Promise<{ title: string; category: string; estimated_price: string; condition_assessment: string }> => {
   if (!process.env.API_KEY) {
    throw new Error("API Key missing");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
          { text: `Analyze this image for a warehouse inventory system. 
                   Identify the item. 
                   Return a JSON object with: 
                   - title (short descriptive name)
                   - category (guess the category)
                   - estimated_price (a number representing USD)
                   - condition_assessment (new, used_good, used_fair, or damaged)` 
          }
        ]
      },
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text);

  } catch (error) {
    console.error("Vision Analysis Error:", error);
    throw error;
  }
};