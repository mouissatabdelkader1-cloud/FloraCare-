import React, { useState } from 'react';
import {
  Droplets,
  Plus,
  Trash2,
  Calendar,
  Sparkles,
  Search,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { GardenPlant, PlantIdentificationResult } from '../types/plant';

interface MyGardenProps {
  plants: GardenPlant[];
  onWaterPlant: (id: string) => void;
  onRemovePlant: (id: string) => void;
  onViewDossier: (plantData: PlantIdentificationResult, imageUrl: string) => void;
  onOpenIdentify: () => void;
  onAddSamplePlants: () => void;
}

export const MyGarden: React.FC<MyGardenProps> = ({
  plants,
  onWaterPlant,
  onRemovePlant,
  onViewDossier,
  onOpenIdentify,
  onAddSamplePlants,
}) => {
  const [filterLocation, setFilterLocation] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [recentlyWateredId, setRecentlyWateredId] = useState<string | null>(null);

  // Helper to calculate watering status
  const getWateringStatus = (lastWateredStr: string, frequencyDays: number) => {
    const last = new Date(lastWateredStr);
    const now = new Date();
    const diffMs = now.getTime() - last.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const daysUntilNext = frequencyDays - diffDays;

    if (daysUntilNext < 0) {
      return {
        label: `Overdue by ${Math.abs(daysUntilNext)} day${Math.abs(daysUntilNext) > 1 ? 's' : ''}`,
        urgent: true,
        daysUntilNext,
        colorClass: 'text-rose-700 bg-rose-50 border-rose-200',
      };
    }
    if (daysUntilNext === 0) {
      return {
        label: 'Water Today!',
        urgent: true,
        daysUntilNext,
        colorClass: 'text-amber-700 bg-amber-50 border-amber-200',
      };
    }
    return {
      label: `Water in ${daysUntilNext} day${daysUntilNext > 1 ? 's' : ''}`,
      urgent: false,
      daysUntilNext,
      colorClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    };
  };

  const handleWater = (id: string) => {
    onWaterPlant(id);
    setRecentlyWateredId(id);
    setTimeout(() => setRecentlyWateredId(null), 2500);
  };

  // Locations set
  const locations = ['all', ...Array.from(new Set(plants.map((p) => p.location)))];

  // Filtered plants
  const filteredPlants = plants.filter((plant) => {
    const matchesLoc = filterLocation === 'all' || plant.location === filterLocation;
    const matchesSearch =
      plant.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.plantData.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.plantData.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLoc && matchesSearch;
  });

  // Overview stats
  const needWaterCount = plants.filter((p) => {
    const s = getWateringStatus(p.lastWateredDate, p.wateringFrequencyDays);
    return s.urgent;
  }).length;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Top Header Banner & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-stone-900 font-display">
            My Botanical Garden
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Track hydration schedules, light exposures, and health notes for your collection.
          </p>
        </div>

        <button
          onClick={onOpenIdentify}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-medium text-sm flex items-center gap-2 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Plant</span>
        </button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">Total Plants</span>
          <span className="text-3xl font-bold text-stone-900 mt-1 block font-mono tabular-nums">
            {plants.length}
          </span>
          <span className="text-xs text-stone-500 mt-1 block">In your collection</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">Hydration Needs</span>
          <span className={`text-3xl font-bold mt-1 block font-mono tabular-nums ${needWaterCount > 0 ? 'text-amber-600' : 'text-emerald-700'}`}>
            {needWaterCount}
          </span>
          <span className="text-xs text-stone-500 mt-1 block">
            {needWaterCount > 0 ? 'Plants need water now' : 'All plants quenched'}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm col-span-2 sm:col-span-1">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">Health Rate</span>
          <span className="text-3xl font-bold text-emerald-800 mt-1 block font-mono tabular-nums">
            {plants.length > 0 ? '98%' : '—'}
          </span>
          <span className="text-xs text-stone-500 mt-1 block">Vibrant &amp; growing</span>
        </div>
      </div>

      {/* Controls: Search and Location Filters */}
      {plants.length > 0 && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Location Segmented Controls */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl overflow-x-auto scrollbar-hide">
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => setFilterLocation(loc)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                  filterLocation === loc ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {loc === 'all' ? 'All Locations' : loc}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your plants..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all placeholder:text-stone-400"
            />
          </div>
        </div>
      )}

      {/* Empty Garden State */}
      {plants.length === 0 && (
        <div className="bg-white rounded-3xl border border-stone-200/80 p-8 sm:p-14 text-center max-w-xl mx-auto shadow-sm space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-sm">
            <Sparkles className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-stone-900 font-display">Your Garden is Empty</h3>
            <p className="mt-2 text-sm text-stone-600 leading-relaxed">
              Identify your real houseplants from a photo to add them here, or instantly populate your garden with sample plants.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenIdentify}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-medium text-sm shadow-sm transition-all"
            >
              Scan a Plant Photo
            </button>

            <button
              onClick={onAddSamplePlants}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-medium text-sm transition-all"
            >
              Pre-load Sample Garden
            </button>
          </div>
        </div>
      )}

      {/* Plant Grid Cards */}
      {plants.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlants.map((plant) => {
            const status = getWateringStatus(plant.lastWateredDate, plant.wateringFrequencyDays);
            const isJustWatered = recentlyWateredId === plant.id;

            return (
              <div
                key={plant.id}
                className="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden flex flex-col hover:border-emerald-700/50 hover:shadow-md transition-all group"
              >
                {/* Plant Thumbnail */}
                <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
                  <img
                    src={plant.photoUrl}
                    alt={plant.nickname}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/75 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full border border-white/20">
                    {plant.location}
                  </div>
                  <button
                    onClick={() => onRemovePlant(plant.id)}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-stone-900/60 hover:bg-rose-700 text-white backdrop-blur-md transition-colors"
                    title="Remove from garden"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-stone-900 font-display">
                      {plant.nickname}
                    </h3>
                    <p className="text-xs italic text-emerald-800 font-serif">
                      {plant.plantData.scientificName}
                    </p>
                    <p className="mt-1 text-xs text-stone-500">
                      {plant.plantData.commonName}
                    </p>
                  </div>

                  {/* Watering Tracker Capsule */}
                  <div className="pt-3 border-t border-stone-100 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Every {plant.wateringFrequencyDays} days</span>
                      </span>

                      <span className={`px-2 py-0.5 rounded-full font-medium text-xs border ${status.colorClass}`}>
                        {status.label}
                      </span>
                    </div>

                    {/* Quick Water Action Button */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleWater(plant.id)}
                        disabled={isJustWatered}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          isJustWatered
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-sm active:scale-95'
                        }`}
                      >
                        {isJustWatered ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Quenched!</span>
                          </>
                        ) : (
                          <>
                            <Droplets className="w-3.5 h-3.5" />
                            <span>Mark Watered</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => onViewDossier(plant.plantData, plant.photoUrl)}
                        className="py-2 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-medium flex items-center gap-1 transition-colors"
                        title="View Full Care Dossier"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Care</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
