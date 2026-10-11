import React, { useState } from 'react';
import {
  Droplets,
  Sun,
  Layers,
  Thermometer,
  ShieldAlert,
  Bug,
  Scissors,
  Lightbulb,
  Heart,
  MessageSquare,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Stethoscope,
  Sparkles,
} from 'lucide-react';
import { PlantIdentificationResult } from '../types/plant';

interface PlantDetailViewProps {
  plant: PlantIdentificationResult;
  imageUrl: string;
  onBack: () => void;
  onAddToGarden: (plant: PlantIdentificationResult, nickname: string, location: string, wateringDays: number, imageUrl: string) => void;
  onOpenChat: (plant: PlantIdentificationResult) => void;
  onOpenDoctor: (plant: PlantIdentificationResult, imageUrl: string) => void;
  isAlreadyInGarden?: boolean;
}

export const PlantDetailView: React.FC<PlantDetailViewProps> = ({
  plant,
  imageUrl,
  onBack,
  onAddToGarden,
  onOpenChat,
  onOpenDoctor,
  isAlreadyInGarden = false,
}) => {
  const [activeTab, setActiveTab] = useState<'care' | 'health' | 'pests' | 'propagation' | 'safety'>('care');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>(plant.commonName);
  const [location, setLocation] = useState<string>('Living Room');
  const [wateringDays, setWateringDays] = useState<number>(7);
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  const handleSaveToGarden = (e: React.FormEvent) => {
    e.preventDefault();
    onAddToGarden(plant, nickname, location, wateringDays, imageUrl);
    setShowAddModal(false);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Top Breadcrumb & Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Identify Another Plant</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenDoctor(plant, imageUrl)}
            className="px-3.5 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors"
          >
            <Stethoscope className="w-4 h-4 text-emerald-700" />
            <span>Health Doctor</span>
          </button>

          <button
            onClick={() => onOpenChat(plant)}
            className="px-3.5 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-emerald-700" />
            <span>Ask Botanist</span>
          </button>
        </div>
      </div>

      {/* Main Hero Card: Photo + Taxonomic Dossier */}
      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-0">
        {/* Left Column: Plant Photo */}
        <div className="md:col-span-5 relative bg-stone-900 min-h-[300px] md:min-h-full">
          <img
            src={imageUrl}
            alt={plant.commonName}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
          <div className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-md text-white text-xs font-mono px-3 py-1 rounded-full border border-white/20">
            {plant.confidence}% Match
          </div>
        </div>

        {/* Right Column: Species Identity & Quick Actions */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
              <span>{plant.family}</span>
              <span aria-hidden="true">·</span>
              <span>{plant.plantType}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-800 font-semibold">{plant.difficultyLevel}</span>
            </div>

            <h1 className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 font-display">
              {plant.commonName}
            </h1>

            <p className="mt-0.5 text-base italic text-emerald-800 font-serif">
              {plant.scientificName}
            </p>

            <p className="mt-4 text-sm text-stone-600 leading-relaxed">
              {plant.botanicalDescription}
            </p>

            <div className="mt-4 pt-4 border-t border-stone-100 text-xs text-stone-500 flex flex-wrap gap-y-1.5 gap-x-4">
              <span>
                <strong className="text-stone-700 font-semibold">Native Origin:</strong> {plant.nativeRegion}
              </span>
              <span>
                <strong className="text-stone-700 font-semibold">Diagnosis:</strong>{' '}
                <span className={plant.healthAnalysis.status === 'Thriving' ? 'text-emerald-700' : 'text-amber-700'}>
                  {plant.healthAnalysis.status}
                </span>
              </span>
            </div>
          </div>

          {/* Quick CTA button */}
          <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex-1 min-w-[200px] py-3 px-5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>{isAlreadyInGarden ? 'Update in My Garden' : 'Add to My Garden'}</span>
            </button>

            <button
              onClick={() => onOpenChat(plant)}
              className="py-3 px-4 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-sm font-medium flex items-center gap-2 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Consult AI</span>
            </button>
          </div>

          {addedNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Plant saved to your virtual garden collection!</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Filter Tabs for Deep Care Dossier */}
      <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-2xl overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setActiveTab('care')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap shrink-0 transition-colors ${
            activeTab === 'care' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Droplets className="w-4 h-4 text-emerald-700" />
          <span>Care Routine</span>
        </button>

        <button
          onClick={() => setActiveTab('health')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap shrink-0 transition-colors ${
            activeTab === 'health' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <CheckCircle className="w-4 h-4 text-emerald-700" />
          <span>Health Assessment</span>
        </button>

        <button
          onClick={() => setActiveTab('pests')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap shrink-0 transition-colors ${
            activeTab === 'pests' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Bug className="w-4 h-4 text-emerald-700" />
          <span>Pests &amp; Diseases</span>
        </button>

        <button
          onClick={() => setActiveTab('propagation')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap shrink-0 transition-colors ${
            activeTab === 'propagation' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Scissors className="w-4 h-4 text-emerald-700" />
          <span>Pruning &amp; Propagation</span>
        </button>

        <button
          onClick={() => setActiveTab('safety')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap shrink-0 transition-colors ${
            activeTab === 'safety' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-emerald-700" />
          <span>Pet Safety &amp; Tips</span>
        </button>
      </div>

      {/* TAB CONTENT 1: Care Routine */}
      {activeTab === 'care' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Watering Card */}
          <div className="bg-white rounded-3xl border border-stone-200/80 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-stone-900">Watering Protocol</h3>
                <p className="text-xs text-stone-500 font-medium">{plant.care.watering.frequency}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
              <div>
                <strong className="text-stone-800 block text-xs uppercase tracking-wider mb-0.5">Technique &amp; Volume</strong>
                <p>{plant.care.watering.amountAndTechnique}</p>
              </div>

              <div>
                <strong className="text-stone-800 block text-xs uppercase tracking-wider mb-0.5">Moisture Check</strong>
                <p>{plant.care.watering.soilMoistureCheck}</p>
              </div>

              <div>
                <strong className="text-stone-800 block text-xs uppercase tracking-wider mb-0.5">Seasonal Adjustment</strong>
                <p>{plant.care.watering.seasonalAdvice}</p>
              </div>
            </div>
          </div>

          {/* 2. Light Card */}
          <div className="bg-white rounded-3xl border border-stone-200/80 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-stone-900">Sunlight &amp; Placement</h3>
                <p className="text-xs text-stone-500 font-medium">{plant.care.light.requirement}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
              <div>
                <strong className="text-stone-800 block text-xs uppercase tracking-wider mb-0.5">Ideal Placement</strong>
                <p>{plant.care.light.idealPlacement}</p>
              </div>

              <div>
                <strong className="text-stone-800 block text-xs uppercase tracking-wider mb-0.5">Exposure Tolerance</strong>
                <p>{plant.care.light.exposureTolerance}</p>
              </div>

              <div>
                <strong className="text-stone-800 block text-xs uppercase tracking-wider mb-0.5">Intensity Guideline</strong>
                <p className="font-mono text-xs text-stone-700">{plant.care.light.footCandlesOrLux}</p>
              </div>
            </div>
          </div>

          {/* 3. Soil and Potting Card */}
          <div className="bg-white rounded-3xl border border-stone-200/80 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-stone-900">Soil &amp; Repotting</h3>
                <p className="text-xs text-stone-500 font-medium">Substrate specifications</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
              <div>
                <strong className="text-stone-800 block text-xs uppercase tracking-wider mb-0.5">Substrate Blend</strong>
                <p>{plant.care.soilAndPotting.recommendedMix}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <strong className="text-stone-800 block text-xs uppercase tracking-wider mb-0.5">Ideal pH</strong>
                  <p className="font-mono text-xs text-stone-700">{plant.care.soilAndPotting.pH}</p>
                </div>
                <div>
                  <strong className="text-stone-800 block text-xs uppercase tracking-wider mb-0.5">Repotting Cycle</strong>
                  <p className="text-xs text-stone-700">{plant.care.soilAndPotting.repottingFrequency}</p>
                </div>
              </div>

              <div>
                <strong className="text-stone-800 block text-xs uppercase tracking-wider mb-0.5">Drainage Need</strong>
                <p>{plant.care.soilAndPotting.drainageImportance}</p>
              </div>
            </div>
          </div>

          {/* 4. Temperature and Humidity Card */}
          <div className="bg-white rounded-3xl border border-stone-200/80 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <Thermometer className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-stone-900">Temperature &amp; Humidity</h3>
                <p className="text-xs text-stone-500 font-medium">{plant.care.temperatureAndHumidity.idealTempRange}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <strong className="text-stone-800 block text-xs uppercase tracking-wider mb-0.5">Cold Threshold</strong>
                  <p className="text-xs text-stone-700">{plant.care.temperatureAndHumidity.minimumColdTolerance}</p>
                </div>
                <div>
                  <strong className="text-stone-800 block text-xs uppercase tracking-wider mb-0.5">Target Humidity</strong>
                  <p className="text-xs font-semibold text-emerald-800">{plant.care.temperatureAndHumidity.targetHumidityPercent}</p>
                </div>
              </div>

              <div>
                <strong className="text-stone-800 block text-xs uppercase tracking-wider mb-0.5">Humidity Boosters</strong>
                <p>{plant.care.temperatureAndHumidity.humidityBoostMethods}</p>
              </div>

              <div>
                <strong className="text-stone-800 block text-xs uppercase tracking-wider mb-0.5">Fertilizer Schedule</strong>
                <p>{plant.care.fertilizer.schedule} — {plant.care.fertilizer.recommendedNPK}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: Health & Diagnostics */}
      {activeTab === 'health' && (
        <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div>
              <h3 className="text-lg font-bold text-stone-900 font-display">Photo Visual Health Diagnosis</h3>
              <p className="text-xs text-stone-500">Based on leaf color, edge integrity, turgidity, and stem health.</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                plant.healthAnalysis.status === 'Thriving'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              Status: {plant.healthAnalysis.status}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-stone-900 mb-1">Visual Observations</h4>
              <p className="text-sm text-stone-600 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-100">
                {plant.healthAnalysis.observations}
              </p>
            </div>

            {plant.healthAnalysis.issuesDetected.length > 0 ? (
              <div>
                <h4 className="text-sm font-semibold text-stone-900 mb-2">Detected Concerns</h4>
                <div className="space-y-2">
                  {plant.healthAnalysis.issuesDetected.map((issue, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-amber-900 bg-amber-50 p-3 rounded-xl border border-amber-200/60">
                      <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span>{issue}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-900 text-sm flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>Zero pathological leaf lesions or pest infestations observed in this sample.</span>
              </div>
            )}

            <div>
              <h4 className="text-sm font-semibold text-stone-900 mb-2">Immediate Recommended Actions</h4>
              <ul className="space-y-2 text-sm text-stone-600">
                {plant.healthAnalysis.immediateRemedies.map((remedy, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-stone-50 p-3 rounded-xl border border-stone-100">
                    <span className="text-emerald-700 font-bold">·</span>
                    <span>{remedy}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: Pests & Diseases */}
      {activeTab === 'pests' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-stone-900 font-display mb-1">Common Pests &amp; Pathogens</h3>
            <p className="text-xs text-stone-500 mb-6">Early detection signs and biological control measures.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plant.care.commonPestsAndDiseases.map((pest, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-stone-200/80 bg-stone-50/50 space-y-2.5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
                    <Bug className="w-4 h-4 text-rose-700" />
                    <span>{pest.name}</span>
                  </div>
                  <div>
                    <strong className="text-xs text-stone-700 block uppercase tracking-wider mb-0.5">Symptoms</strong>
                    <p className="text-xs text-stone-600 leading-relaxed">{pest.symptoms}</p>
                  </div>
                  <div>
                    <strong className="text-xs text-emerald-800 block uppercase tracking-wider mb-0.5">Organic Treatment</strong>
                    <p className="text-xs text-stone-600 leading-relaxed">{pest.preventionAndCure}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: Pruning & Propagation */}
      {activeTab === 'propagation' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-stone-200/80 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <Scissors className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-stone-900">Pruning &amp; Cleaning</h3>
            </div>
            <div className="space-y-3 text-sm text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
              <div>
                <strong className="text-stone-800 block text-xs uppercase tracking-wider mb-0.5">Pruning Guidelines</strong>
                <p>{plant.care.pruningAndMaintenance.pruningTips}</p>
              </div>
              <div>
                <strong className="text-stone-800 block text-xs uppercase tracking-wider mb-0.5">Leaf Cleanliness</strong>
                <p>{plant.care.pruningAndMaintenance.leafCleaning}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200/80 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-stone-900">Propagation Method</h3>
            </div>
            <div className="space-y-3 text-sm text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
              <div>
                <strong className="text-stone-800 block text-xs uppercase tracking-wider mb-0.5">Multiplying this Plant</strong>
                <p>{plant.care.pruningAndMaintenance.propagationTechnique}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: Pet Safety & Master Tips */}
      {activeTab === 'safety' && (
        <div className="space-y-6">
          {/* Toxicity Card */}
          <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    plant.care.toxicity.toxicToCats || plant.care.toxicity.toxicToDogs
                      ? 'bg-rose-50 text-rose-700'
                      : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900">Domestic Toxicity Status</h3>
                  <p className="text-xs text-stone-500">Pet and family safety precautions</p>
                </div>
              </div>

              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  plant.care.toxicity.toxicToCats || plant.care.toxicity.toxicToDogs
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {plant.care.toxicity.toxicToCats || plant.care.toxicity.toxicToDogs ? 'Toxic if Ingested' : 'Pet Safe'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center pt-1">
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-100">
                <span className="text-xs text-stone-500 block mb-1">Cats</span>
                <span className={`text-xs font-bold ${plant.care.toxicity.toxicToCats ? 'text-rose-700' : 'text-emerald-700'}`}>
                  {plant.care.toxicity.toxicToCats ? 'Toxic' : 'Non-Toxic'}
                </span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-100">
                <span className="text-xs text-stone-500 block mb-1">Dogs</span>
                <span className={`text-xs font-bold ${plant.care.toxicity.toxicToDogs ? 'text-rose-700' : 'text-emerald-700'}`}>
                  {plant.care.toxicity.toxicToDogs ? 'Toxic' : 'Non-Toxic'}
                </span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-100">
                <span className="text-xs text-stone-500 block mb-1">Humans</span>
                <span className={`text-xs font-bold ${plant.care.toxicity.toxicToHumans ? 'text-rose-700' : 'text-emerald-700'}`}>
                  {plant.care.toxicity.toxicToHumans ? 'Mild/Irritant' : 'Safe'}
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-600 bg-stone-50 p-4 rounded-2xl border border-stone-100 leading-relaxed">
              {plant.care.toxicity.toxicPrincipleAndSymptoms}
            </p>
          </div>

          {/* Master Tips Card */}
          <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-stone-900">Master Horticultural Secrets</h3>
            </div>
            <ul className="space-y-3 text-sm text-stone-600 pt-2 border-t border-stone-100">
              {plant.care.proGardenerTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-100 leading-relaxed">
                  <span className="text-emerald-700 font-bold shrink-0 mt-0.5">#{idx + 1}</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Modal: Add to My Garden */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-xl border border-stone-200 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="text-lg font-bold text-stone-900 font-display">Add to My Garden</h3>
              <button onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-stone-700">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveToGarden} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Plant Nickname
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  required
                  placeholder="e.g. Monty, Green Queen"
                  className="w-full px-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Location / Room
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all"
                >
                  <option value="Living Room">Living Room Window</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Office / Desk">Office Desk</option>
                  <option value="Balcony / Patio">Balcony / Patio</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Bathroom">Bathroom</option>
                  <option value="Garden Bed">Outdoor Garden Bed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Watering Interval (Days)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="2"
                    max="30"
                    value={wateringDays}
                    onChange={(e) => setWateringDays(parseInt(e.target.value, 10))}
                    className="flex-1 accent-emerald-700"
                  />
                  <span className="font-mono text-sm font-semibold text-emerald-800 w-16 text-right">
                    {wateringDays} days
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-1">Suggested by AI based on species transpiration rate.</p>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/3 py-2.5 px-4 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-medium shadow-sm transition-all"
                >
                  Save Plant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
