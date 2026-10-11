import React, { useState } from 'react';
import { Droplets, Sun, Layers, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

interface GuideCategory {
  id: string;
  title: string;
  family: string;
  overview: string;
  waterRule: string;
  lightRule: string;
  soilFormula: string;
  goldenRule: string;
  commonMistake: string;
}

const CARE_GUIDES: GuideCategory[] = [
  {
    id: 'aroids',
    title: 'Tropical Aroids (Monsteras & Philodendrons)',
    family: 'Araceae',
    overview: 'Climbing or vining tropical understory plants prized for broad, architecturally fenestrated or velvety foliage.',
    waterRule: 'Drench thoroughly only when the top 50% of the potting medium dries completely. Discard drainage catch water.',
    lightRule: 'Generous indirect sunlight (200-400 foot-candles). Avoid burning direct afternoon sunbeams.',
    soilFormula: 'Chunky Aroid Mix: 40% high-grade potting soil, 30% coarse orchid bark, 20% perlite, 10% horticultural charcoal.',
    goldenRule: 'Provide a vertical moss pole or cedar trellis early. Upright climbing triggers leaves to double in size.',
    commonMistake: 'Planting in dense, heavy garden soil with zero aeration, triggering swift Pythium root rot.',
  },
  {
    id: 'ficus',
    title: 'Ficus & Indoor Trees (Fiddle Leaf & Rubber)',
    family: 'Moraceae',
    overview: 'Majestic broadleaf evergreen trees that anchor room spaces with sculptural woody trunks and thick foliage.',
    waterRule: 'Consistent weekly soaking in spring/summer. Reduce to every 10-14 days in winter. Never allow standing water.',
    lightRule: 'High light requirement (400-800 foot-candles). Position right against East or lightly-shaded South windows.',
    soilFormula: 'Fast-draining houseplant mix: 60% peat/coir soil, 25% pumice or perlite, 15% pine bark fines.',
    goldenRule: 'Rotate the pot 90° weekly and gently shake the main trunk for 30 seconds to stimulate structural thickening.',
    commonMistake: 'Relocating the pot frequently across rooms. Ficus drops leaves in protest to sudden changes in light or humidity.',
  },
  {
    id: 'succulents',
    title: 'Succulents & Cacti (Sansevieria & Jade)',
    family: 'Crassulaceae & Asparagaceae',
    overview: 'Desert survivors evolved to store moisture in fleshy stems and leaves using nocturnal CAM photosynthesis.',
    waterRule: 'The "Soak & Dry" law: Soil must be bone dry from top to bottom before deep watering. Water 1x every 3-4 weeks.',
    lightRule: 'Bright direct to indirect sun. Most thrive in south-facing sun-drenched window sills.',
    soilFormula: 'Desert Gritty Mix: 40% organic potting soil, 40% coarse quartz sand/pumice, 20% perlite.',
    goldenRule: 'Always use unglazed porous terracotta pots with open drainage holes. Terracotta breathes and evaporates excess moisture.',
    commonMistake: 'Light frequent sips of water. Drench deeply, then let the soil dry completely.',
  },
  {
    id: 'ferns',
    title: 'Ferns & Forest Epiphytes (Boston & Bird’s Nest)',
    family: 'Polypodiaceae',
    overview: 'Prehistoric non-flowering spore producers that thrive in humid, damp, sheltered microclimates.',
    waterRule: 'Keep root ball consistently moist like a wrung-out sponge. Never allow to dry completely to crispness.',
    lightRule: 'Medium to gentle indirect ambient light (100-200 foot-candles). Excellent for north windows or bathrooms.',
    soilFormula: 'Moisture-retentive blend: 50% peat moss/coco coir, 30% potting soil, 20% vermiculite.',
    goldenRule: 'High ambient humidity (>65%) is mandatory. Place on wide pebble trays or right next to an ultrasonic humidifier.',
    commonMistake: 'Watering straight into the central rosette crown of Bird’s Nest ferns, inducing crown rot.',
  },
  {
    id: 'herbs',
    title: 'Kitchen Herbs (Basil, Rosemary, Mint)',
    family: 'Lamiaceae',
    overview: 'Sun-worshipping culinary plants packed with aromatic essential oils that thrive on frequent harvesting.',
    waterRule: 'Water whenever the top 1 inch is dry. Basil wilts visibly when thirsty; rosemary prefers slightly drier roots.',
    lightRule: 'Minimum 6 hours of strong direct sunlight per day, or 12 hours under a high-output LED grow light.',
    soilFormula: 'Aerated organic potting compost: 70% potting soil, 20% perlite, 10% worm castings.',
    goldenRule: 'Pinch top leaf nodes weekly to prevent flowering. Pinching stimulates bushy multi-branch growth.',
    commonMistake: 'Harvesting lower leaves first. Always snip the top tips above a set of leaf pairs to encourage new branches.',
  },
];

export const CareGuideLibrary: React.FC = () => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>('aroids');
  const activeGuide = CARE_GUIDES.find((g) => g.id === selectedGuideId) || CARE_GUIDES[0];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Botanical Reference Library</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 font-display">
          Master Houseplant Care Guides
        </h1>
        <p className="mt-2 text-base text-stone-600">
          Proven horticultural standards and soil recipes for the 5 major indoor plant families.
        </p>
      </div>

      {/* Guide Category Selector Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-stone-100 rounded-2xl overflow-x-auto scrollbar-hide">
        {CARE_GUIDES.map((guide) => (
          <button
            key={guide.id}
            onClick={() => setSelectedGuideId(guide.id)}
            className={`px-4 py-2.5 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap shrink-0 transition-colors ${
              selectedGuideId === guide.id ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {guide.title.split('(')[0].trim()}
          </button>
        ))}
      </div>

      {/* Active Guide Card */}
      <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <span>Botanical Family: {activeGuide.family}</span>
          </div>
          <h2 className="text-2xl font-bold text-stone-900 font-display mt-1">
            {activeGuide.title}
          </h2>
          <p className="text-sm text-stone-600 mt-2 leading-relaxed">
            {activeGuide.overview}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-100 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
              <Droplets className="w-4 h-4 text-blue-600" />
              <span>Hydration Rule</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {activeGuide.waterRule}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-100 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
              <Sun className="w-4 h-4 text-amber-600" />
              <span>Sunlight &amp; Placement</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {activeGuide.lightRule}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-100 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>Recommended Soil Blend</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {activeGuide.soilFormula}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-100 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>The Master Golden Rule</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {activeGuide.goldenRule}
            </p>
          </div>
        </div>

        {/* Critical Mistake to Avoid */}
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/70 border border-rose-200/70 text-rose-950 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <strong className="block font-semibold text-rose-900 mb-0.5">Fatal Mistake to Avoid</strong>
            <span>{activeGuide.commonMistake}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
