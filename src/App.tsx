import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PlantIdentifier } from './components/PlantIdentifier';
import { PlantDetailView } from './components/PlantDetailView';
import { MyGarden } from './components/MyGarden';
import { PlantDoctor } from './components/PlantDoctor';
import { CareGuideLibrary } from './components/CareGuideLibrary';
import { BotanistChatModal } from './components/BotanistChatModal';
import { SAMPLE_PLANTS, SamplePlantSpecimen } from './data/samplePlants';
import { PlantIdentificationResult, GardenPlant } from './types/plant';
import { Camera, Heart, Stethoscope, BookOpen } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'identify' | 'garden' | 'doctor' | 'guides'>('identify');
  const [activeDossierPlant, setActiveDossierPlant] = useState<PlantIdentificationResult | null>(null);
  const [activeDossierImage, setActiveDossierImage] = useState<string | null>(null);

  // Doctor consultation context
  const [doctorPlant, setDoctorPlant] = useState<PlantIdentificationResult | null>(null);
  const [doctorImage, setDoctorImage] = useState<string | null>(null);

  // Chat modal
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatPlant, setChatPlant] = useState<PlantIdentificationResult | null>(null);

  // My Garden Persistence
  const [gardenPlants, setGardenPlants] = useState<GardenPlant[]>(() => {
    try {
      const saved = localStorage.getItem('floracare_garden');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse garden storage:', e);
    }
    return [];
  });

  // Save to LocalStorage on update
  useEffect(() => {
    try {
      localStorage.setItem('floracare_garden', JSON.stringify(gardenPlants));
    } catch (e) {
      console.error('Failed to save garden storage:', e);
    }
  }, [gardenPlants]);

  const handlePlantIdentified = (result: PlantIdentificationResult, imageUrl: string) => {
    setActiveDossierPlant(result);
    setActiveDossierImage(imageUrl);
    setCurrentTab('identify');
  };

  const handleSelectSample = (sample: SamplePlantSpecimen) => {
    setActiveDossierPlant(sample.sampleData);
    setActiveDossierImage(sample.image);
    setCurrentTab('identify');
  };

  const handleAddToGarden = (
    plant: PlantIdentificationResult,
    nickname: string,
    location: string,
    wateringDays: number,
    imageUrl: string
  ) => {
    setGardenPlants((prev) => {
      const existingIdx = prev.findIndex((p) => p.plantData.scientificName === plant.scientificName);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          nickname,
          location,
          wateringFrequencyDays: wateringDays,
          photoUrl: imageUrl,
        };
        return updated;
      }

      const newPlant: GardenPlant = {
        id: `plant-${Date.now()}`,
        nickname: nickname || plant.commonName,
        location: location || 'Living Room',
        acquiredDate: new Date().toISOString(),
        lastWateredDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        wateringFrequencyDays: wateringDays || 7,
        photoUrl: imageUrl,
        plantData: plant,
      };
      return [newPlant, ...prev];
    });
  };

  const handleWaterPlant = (id: string) => {
    setGardenPlants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, lastWateredDate: new Date().toISOString() } : p))
    );
  };

  const handleRemovePlant = (id: string) => {
    setGardenPlants((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddSamplePlants = () => {
    const seeded: GardenPlant[] = SAMPLE_PLANTS.map((sample, idx) => {
      // Stagger last watered dates for realistic variety
      const daysAgo = (idx * 3 + 1) % 10;
      return {
        id: `seed-${sample.id}`,
        nickname: sample.name,
        location: idx % 2 === 0 ? 'Living Room' : idx === 1 ? 'Office Window' : 'Balcony',
        acquiredDate: new Date().toISOString(),
        lastWateredDate: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
        wateringFrequencyDays: idx === 2 ? 18 : 7,
        photoUrl: sample.image,
        plantData: sample.sampleData,
      };
    });
    setGardenPlants(seeded);
  };

  const handleOpenDoctor = (plant: PlantIdentificationResult, imageUrl: string) => {
    setDoctorPlant(plant);
    setDoctorImage(imageUrl);
    setCurrentTab('doctor');
  };

  const handleOpenChat = (plant: PlantIdentificationResult) => {
    setChatPlant(plant);
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          if (tab === 'identify') {
            setActiveDossierPlant(null);
            setActiveDossierImage(null);
          }
        }}
        gardenCount={gardenPlants.length}
      />

      {/* Main Page Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentTab === 'identify' && (
          <>
            {activeDossierPlant && activeDossierImage ? (
              <PlantDetailView
                plant={activeDossierPlant}
                imageUrl={activeDossierImage}
                onBack={() => {
                  setActiveDossierPlant(null);
                  setActiveDossierImage(null);
                }}
                onAddToGarden={handleAddToGarden}
                onOpenChat={handleOpenChat}
                onOpenDoctor={handleOpenDoctor}
                isAlreadyInGarden={gardenPlants.some(
                  (p) => p.plantData.scientificName === activeDossierPlant.scientificName
                )}
              />
            ) : (
              <PlantIdentifier
                onIdentified={handlePlantIdentified}
                onSelectSample={handleSelectSample}
              />
            )}
          </>
        )}

        {currentTab === 'garden' && (
          <MyGarden
            plants={gardenPlants}
            onWaterPlant={handleWaterPlant}
            onRemovePlant={handleRemovePlant}
            onViewDossier={(plantData, imageUrl) => {
              setActiveDossierPlant(plantData);
              setActiveDossierImage(imageUrl);
              setCurrentTab('identify');
            }}
            onOpenIdentify={() => {
              setActiveDossierPlant(null);
              setActiveDossierImage(null);
              setCurrentTab('identify');
            }}
            onAddSamplePlants={handleAddSamplePlants}
          />
        )}

        {currentTab === 'doctor' && (
          <PlantDoctor initialPlant={doctorPlant} initialImage={doctorImage} />
        )}

        {currentTab === 'guides' && <CareGuideLibrary />}
      </main>

      {/* Interactive AI Botanist Consultation Modal */}
      {isChatOpen && (
        <BotanistChatModal plant={chatPlant} onClose={() => setIsChatOpen(false)} />
      )}

      {/* Mobile Bottom Navigation Bar (Thumb ergonomic zone) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 grid grid-cols-4 items-center h-16 pb-safe">
        <button
          onClick={() => {
            setCurrentTab('identify');
            setActiveDossierPlant(null);
            setActiveDossierImage(null);
          }}
          className={`flex flex-col items-center justify-center h-full ${
            currentTab === 'identify' ? 'text-emerald-800 font-semibold' : 'text-stone-500'
          }`}
        >
          <Camera className="w-5 h-5" />
          <span className="text-[10px] mt-1">Identify</span>
        </button>

        <button
          onClick={() => setCurrentTab('garden')}
          className={`flex flex-col items-center justify-center h-full relative ${
            currentTab === 'garden' ? 'text-emerald-800 font-semibold' : 'text-stone-500'
          }`}
        >
          <Heart className="w-5 h-5" />
          <span className="text-[10px] mt-1">Garden</span>
          {gardenPlants.length > 0 && (
            <span className="absolute top-2 right-6 w-2 h-2 bg-emerald-700 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setCurrentTab('doctor')}
          className={`flex flex-col items-center justify-center h-full ${
            currentTab === 'doctor' ? 'text-emerald-800 font-semibold' : 'text-stone-500'
          }`}
        >
          <Stethoscope className="w-5 h-5" />
          <span className="text-[10px] mt-1">Doctor</span>
        </button>

        <button
          onClick={() => setCurrentTab('guides')}
          className={`flex flex-col items-center justify-center h-full ${
            currentTab === 'guides' ? 'text-emerald-800 font-semibold' : 'text-stone-500'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] mt-1">Guides</span>
        </button>
      </nav>

      {/* Footer */}
      <footer className="mt-auto border-t border-stone-200/80 py-6 text-center text-xs text-stone-500 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <p>FloraCare Botanical Intelligence · Horticultural Care &amp; Identification</p>
          <p className="font-mono text-[11px] text-stone-400">Powered by Gemini Vision</p>
        </div>
      </footer>
    </div>
  );
}
