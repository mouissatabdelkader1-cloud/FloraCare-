import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper to sanitize base64
function extractCleanBase64(dataUriOrRaw: string): { base64: string; mimeType: string } {
  if (dataUriOrRaw.startsWith('data:')) {
    const match = dataUriOrRaw.match(/^data:([^;]+);base64,(.+)$/);
    if (match) {
      return {
        mimeType: match[1],
        base64: match[2],
      };
    }
  }
  return {
    mimeType: 'image/jpeg',
    base64: dataUriOrRaw,
  };
}

// 1. Plant Identification Endpoint
app.post('/api/identify', async (req, res) => {
  try {
    const { image, mimeType: providedMime, userNotes } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'Image is required for plant identification.' });
    }

    const { base64, mimeType } = extractCleanBase64(image);
    const finalMime = providedMime || mimeType || 'image/jpeg';

    const systemInstruction = `You are a world-class master botanist, taxonomist, and certified master gardener.
Your task is to analyze plant photographs with supreme scientific accuracy and practical horticultural wisdom.
Accurately identify the exact plant species, foliage characteristics, health condition, and generate exhaustive, actionable care instructions.
If additional context or user symptoms are provided, integrate them directly into your diagnosis.
Return precise structured JSON matching the provided schema.`;

    const userPrompt = `Identify this plant from the photo and deliver a full botanical dossier and care guide.
${userNotes ? `Additional grower notes from user: "${userNotes}"` : ''}
Focus on practical watering intervals, light levels, soil blends, potential toxicity to domestic pets, and actionable care secrets.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: finalMime,
              data: base64,
            },
          },
          {
            text: userPrompt,
          },
        ],
      },
      config: {
        systemInstruction,
        temperature: 0.2,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            commonName: { type: Type.STRING },
            scientificName: { type: Type.STRING },
            family: { type: Type.STRING },
            nativeRegion: { type: Type.STRING },
            plantType: { type: Type.STRING, description: "e.g. Indoor Foliage, Succulent, Flowering Shrub, Perennial, Aroid, etc." },
            difficultyLevel: { type: Type.STRING, description: "Beginner Friendly, Moderate, or Advanced" },
            confidence: { type: Type.NUMBER, description: "Confidence score between 0 and 100" },
            botanicalDescription: { type: Type.STRING },
            alternativeMatches: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  commonName: { type: Type.STRING },
                  scientificName: { type: Type.STRING },
                  keyDifferences: { type: Type.STRING },
                },
                required: ['commonName', 'scientificName', 'keyDifferences'],
              },
            },
            healthAnalysis: {
              type: Type.OBJECT,
              properties: {
                status: { type: Type.STRING, description: "Thriving, Healthy, Needs Attention, or Stressed" },
                observations: { type: Type.STRING },
                issuesDetected: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                immediateRemedies: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: ['status', 'observations', 'issuesDetected', 'immediateRemedies'],
            },
            care: {
              type: Type.OBJECT,
              properties: {
                watering: {
                  type: Type.OBJECT,
                  properties: {
                    frequency: { type: Type.STRING },
                    amountAndTechnique: { type: Type.STRING },
                    soilMoistureCheck: { type: Type.STRING },
                    seasonalAdvice: { type: Type.STRING },
                  },
                  required: ['frequency', 'amountAndTechnique', 'soilMoistureCheck', 'seasonalAdvice'],
                },
                light: {
                  type: Type.OBJECT,
                  properties: {
                    requirement: { type: Type.STRING },
                    footCandlesOrLux: { type: Type.STRING },
                    exposureTolerance: { type: Type.STRING },
                    idealPlacement: { type: Type.STRING },
                  },
                  required: ['requirement', 'footCandlesOrLux', 'exposureTolerance', 'idealPlacement'],
                },
                soilAndPotting: {
                  type: Type.OBJECT,
                  properties: {
                    recommendedMix: { type: Type.STRING },
                    pH: { type: Type.STRING },
                    drainageImportance: { type: Type.STRING },
                    repottingFrequency: { type: Type.STRING },
                  },
                  required: ['recommendedMix', 'pH', 'drainageImportance', 'repottingFrequency'],
                },
                temperatureAndHumidity: {
                  type: Type.OBJECT,
                  properties: {
                    idealTempRange: { type: Type.STRING },
                    minimumColdTolerance: { type: Type.STRING },
                    targetHumidityPercent: { type: Type.STRING },
                    humidityBoostMethods: { type: Type.STRING },
                  },
                  required: ['idealTempRange', 'minimumColdTolerance', 'targetHumidityPercent', 'humidityBoostMethods'],
                },
                fertilizer: {
                  type: Type.OBJECT,
                  properties: {
                    schedule: { type: Type.STRING },
                    recommendedNPK: { type: Type.STRING },
                    cautionNotes: { type: Type.STRING },
                  },
                  required: ['schedule', 'recommendedNPK', 'cautionNotes'],
                },
                pruningAndMaintenance: {
                  type: Type.OBJECT,
                  properties: {
                    pruningTips: { type: Type.STRING },
                    leafCleaning: { type: Type.STRING },
                    propagationTechnique: { type: Type.STRING },
                  },
                  required: ['pruningTips', 'leafCleaning', 'propagationTechnique'],
                },
                toxicity: {
                  type: Type.OBJECT,
                  properties: {
                    toxicToCats: { type: Type.BOOLEAN },
                    toxicToDogs: { type: Type.BOOLEAN },
                    toxicToHumans: { type: Type.BOOLEAN },
                    toxicPrincipleAndSymptoms: { type: Type.STRING },
                  },
                  required: ['toxicToCats', 'toxicToDogs', 'toxicToHumans', 'toxicPrincipleAndSymptoms'],
                },
                commonPestsAndDiseases: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      symptoms: { type: Type.STRING },
                      preventionAndCure: { type: Type.STRING },
                    },
                    required: ['name', 'symptoms', 'preventionAndCure'],
                  },
                },
                proGardenerTips: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: [
                'watering',
                'light',
                'soilAndPotting',
                'temperatureAndHumidity',
                'fertilizer',
                'pruningAndMaintenance',
                'toxicity',
                'commonPestsAndDiseases',
                'proGardenerTips',
              ],
            },
          },
          required: [
            'commonName',
            'scientificName',
            'family',
            'nativeRegion',
            'plantType',
            'difficultyLevel',
            'confidence',
            'botanicalDescription',
            'alternativeMatches',
            'healthAnalysis',
            'care',
          ],
        },
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json({ success: true, plant: parsed });
  } catch (error: any) {
    console.error('Plant identification error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to identify plant. Please try another clear photo.',
    });
  }
});

// 2. Plant Doctor & Disease Diagnostic Endpoint
app.post('/api/diagnose', async (req, res) => {
  try {
    const { image, symptoms, plantName } = req.body;
    if (!image && !symptoms) {
      return res.status(400).json({ error: 'Please provide either a photo or symptom description.' });
    }

    const parts: any[] = [];
    if (image) {
      const { base64, mimeType } = extractCleanBase64(image);
      parts.push({
        inlineData: {
          mimeType,
          data: base64,
        },
      });
    }

    const prompt = `You are a clinical plant pathologist and diagnostic botanist.
${plantName ? `Plant Name/Species: ${plantName}` : 'Species to identify from image if visible'}
${symptoms ? `Observed symptoms from gardener: "${symptoms}"` : ''}

Examine the visual evidence (leaf discoloration, chlorosis, necrosis, leaf spots, pest signs, drooping, webbing, stem lesions, fungus) or described symptoms.
Provide a clinical botanical diagnosis with immediate treatment protocols.`;

    parts.push({ text: prompt });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: { parts },
      config: {
        systemInstruction: 'You are an elite plant pathologist providing precise botanical disease diagnoses and treatment roadmaps.',
        temperature: 0.2,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            primaryDiagnosis: { type: Type.STRING },
            pathogenOrCause: { type: Type.STRING, description: "Fungal, Bacterial, Pest, Nutrient Deficiency, Watering Error, or Environmental" },
            severity: { type: Type.STRING, description: "Mild, Moderate, or Critical" },
            visualEvidence: { type: Type.STRING },
            contributingFactors: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            emergencyActionSteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            sevenDayRecoveryPlan: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.STRING },
                  action: { type: Type.STRING },
                },
                required: ['day', 'action'],
              },
            },
            preventativeMeasures: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: [
            'primaryDiagnosis',
            'pathogenOrCause',
            'severity',
            'visualEvidence',
            'contributingFactors',
            'emergencyActionSteps',
            'sevenDayRecoveryPlan',
            'preventativeMeasures',
          ],
        },
      },
    });

    const text = response.text || '{}';
    return res.json({ success: true, diagnosis: JSON.parse(text) });
  } catch (error: any) {
    console.error('Diagnosis error:', error);
    return res.status(500).json({ error: error.message || 'Failed to complete diagnosis.' });
  }
});

// 3. Ask Botanist AI Assistant
app.post('/api/botanist-chat', async (req, res) => {
  try {
    const { question, plantContext, chatHistory } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Question is required.' });
    }

    const contextSnippet = plantContext
      ? `Plant in focus: ${plantContext.commonName} (${plantContext.scientificName}), Family: ${plantContext.family}. Plant Type: ${plantContext.plantType}.`
      : 'General gardening inquiry.';

    const conversationHistory = Array.isArray(chatHistory)
      ? chatHistory.map((m: any) => `${m.role === 'user' ? 'Gardener' : 'Botanist'}: ${m.content}`).join('\n')
      : '';

    const prompt = `Context: ${contextSnippet}

Prior conversation:
${conversationHistory}

Gardener's current question:
"${question}"

Provide a warm, botanically accurate, practical, and direct response. Include actionable recommendations, measurements if applicable (e.g. soil ratios, watering depth, light hours), and clear reasoning. Keep formatting clean with bullet points where helpful.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are FloraCare Botanical Assistant, an encouraging master gardener and plant scientist offering trustworthy, practical plant care solutions.',
        temperature: 0.4,
      },
    });

    return res.json({ success: true, reply: response.text });
  } catch (error: any) {
    console.error('Botanist chat error:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate response.' });
  }
});

// Mount Vite or serve static files
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`FloraCare Server running on http://0.0.0.0:${port}`);
  });
}

startServer();
