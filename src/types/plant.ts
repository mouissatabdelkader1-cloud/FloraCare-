export interface PlantIdentificationResult {
  commonName: string;
  scientificName: string;
  family: string;
  nativeRegion: string;
  plantType: string;
  difficultyLevel: 'Beginner Friendly' | 'Moderate' | 'Advanced' | string;
  confidence: number;
  botanicalDescription: string;
  alternativeMatches: Array<{
    commonName: string;
    scientificName: string;
    keyDifferences: string;
  }>;
  healthAnalysis: {
    status: 'Thriving' | 'Healthy' | 'Needs Attention' | 'Stressed' | string;
    observations: string;
    issuesDetected: string[];
    immediateRemedies: string[];
  };
  care: {
    watering: {
      frequency: string;
      amountAndTechnique: string;
      soilMoistureCheck: string;
      seasonalAdvice: string;
    };
    light: {
      requirement: string;
      footCandlesOrLux: string;
      exposureTolerance: string;
      idealPlacement: string;
    };
    soilAndPotting: {
      recommendedMix: string;
      pH: string;
      drainageImportance: string;
      repottingFrequency: string;
    };
    temperatureAndHumidity: {
      idealTempRange: string;
      minimumColdTolerance: string;
      targetHumidityPercent: string;
      humidityBoostMethods: string;
    };
    fertilizer: {
      schedule: string;
      recommendedNPK: string;
      cautionNotes: string;
    };
    pruningAndMaintenance: {
      pruningTips: string;
      leafCleaning: string;
      propagationTechnique: string;
    };
    toxicity: {
      toxicToCats: boolean;
      toxicToDogs: boolean;
      toxicToHumans: boolean;
      toxicPrincipleAndSymptoms: string;
    };
    commonPestsAndDiseases: Array<{
      name: string;
      symptoms: string;
      preventionAndCure: string;
    }>;
    proGardenerTips: string[];
  };
}

export interface GardenPlant {
  id: string;
  nickname: string;
  location: string;
  acquiredDate: string;
  lastWateredDate: string;
  wateringFrequencyDays: number;
  photoUrl: string;
  plantData: PlantIdentificationResult;
  notes?: string;
}

export interface DiagnosisResult {
  primaryDiagnosis: string;
  pathogenOrCause: string;
  severity: 'Mild' | 'Moderate' | 'Critical' | string;
  visualEvidence: string;
  contributingFactors: string[];
  emergencyActionSteps: string[];
  sevenDayRecoveryPlan: Array<{
    day: string;
    action: string;
  }>;
  preventativeMeasures: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
