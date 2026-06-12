import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy-initialized Gemini Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not defined");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Custom Quote Proposal Route
app.post("/api/gemini/proposal", async (req, res) => {
  try {
    const client = getGeminiClient();
    const {
      eventType,
      guestCount,
      selectedTheme,
      decorationLevel,
      cateringPreference,
      photographyRequired,
      beautyStyling,
      estimatedBudget
    } = req.body;

    const prompt = `
Generate a luxurious, bespoke Event Planning & Makeover Proposal based on these premium requirements:
- Event: ${eventType}
- Guests: ${guestCount}
- Vision/Theme: ${selectedTheme}
- Decor Level: ${decorationLevel}
- Culinary style: ${cateringPreference}
- Portrait/Photography: ${photographyRequired ? "Professional Coverage" : "Excluded"}
- Portrait Makeup and Hair: ${beautyStyling?.makeupStyle || "N/A"}, Style: ${beautyStyling?.hairstyle || "N/A"}${beautyStyling?.outfitAssistance ? ", with bespoke styling/outfit draping advice" : ""}
- Budget Category: ${estimatedBudget}

Provide highly descriptive, exquisite recommendations reflecting top-tier, luxury standards (soft warm beiges, golds, velvet royal purples, curated bespoke floral arrays, premium high-contrast backdrops).
`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the head creative director of an ultra-luxury events & haute couture makeover salon, known worldwide for creating visual wonders and personal style transformations.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            eventThemes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 unique high-end visual design and decor styling suggestions"
            },
            makeoverDesign: {
              type: Type.STRING,
              description: "Bespoke beauty, hair, outfit draper styling, and high-fashion makeover suggestions matching the event vibe"
            },
            suggestedTimeline: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phase: { type: Type.STRING, description: "Planning milestone phase title" },
                  activity: { type: Type.STRING, description: "Milestone detail" },
                  timing: { type: Type.STRING, description: "Relative time (e.g., 'Month 1', 'Morning 08:00')" }
                },
                required: ["phase", "activity", "timing"]
              }
            },
            itemizedCost: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING, description: "e.g., Luxe Stage Styling, High-Fashion Makeover, Cinematic Photography" },
                  service: { type: Type.STRING, description: "Detailed description of premium service deliverables" },
                  estimatedCost: { type: Type.STRING, description: "Pricing tier in USD or Gold Luxury range" }
                },
                required: ["category", "service", "estimatedCost"]
              }
            },
            luxeSummary: {
              type: Type.STRING,
              description: "An elegant creative review welcoming the client and explaining why their custom event matches absolute luxury."
            }
          },
          required: ["eventThemes", "makeoverDesign", "suggestedTimeline", "itemizedCost", "luxeSummary"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Unable to generate text proposal");
    }

    res.json(JSON.parse(text));
  } catch (error: any) {
    console.error("Gemini API Error in proposal:", error);
    res.status(500).json({
      error: error.message || "Bespoke proposal could not be compiled. Please configure your API key."
    });
  }
});

// Interactive AI Consultant Chat Route
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const client = getGeminiClient();
    const { messages, userMessage } = req.body;

    const chatHistory = (messages || []).map((msg: any) => ({
      role: msg.role === "assistant" ? "model" as const : "user" as const,
      parts: [{ text: msg.content }]
    }));

    // System instruction is supplied via the chat options
    const chat = client.chats.create({
      model: "gemini-3.5-flash",
      history: chatHistory,
      config: {
        systemInstruction: "You are 'Aura', the Senior Bespoke Event & Style Coordinator. Speak with absolute elegance, charm, warmth, and luxury. Help the client brainstorm event themes, wedding logistics, bridal makeup packages, grooming suggestions, venue setup heights, and floral arrangements. Do not apologize unnecessarily, be professional, helpful, and highly insightful. Recommend Luxe Event & Makeover Services.",
      }
    });

    const response = await chat.sendMessage({ message: userMessage });
    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Gemini API Error in chat:", error);
    res.status(500).json({
      error: error.message || "Consultation chat is unavailable. Check API credentials."
    });
  }
});

// Server-side endpoints for saving inquiries/bookings
// Since Firestore isn't provisioned due to TOS, we handle them via local simulation,
// but let's provide standard JSON storage placeholder endpoints to allow easy full-stack expansion if needed.
const activeBookings: any[] = [];
app.post("/api/bookings", (req, res) => {
  const newBooking = { id: `b_${Date.now()}`, createdAt: new Date().toISOString(), ...req.body };
  activeBookings.push(newBooking);
  res.status(201).json({ success: true, booking: newBooking });
});

app.get("/api/bookings", (req, res) => {
  res.json({ bookings: activeBookings });
});

// Vite Middleware & Static Assets serving
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Luxury Full-Stack Server running on port ${PORT}`);
  });
}

initServer().catch((err) => {
  console.error("Error starting server:", err);
});
