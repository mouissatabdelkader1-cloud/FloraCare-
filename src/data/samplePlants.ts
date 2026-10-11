import { PlantIdentificationResult } from '../types/plant';

export interface SamplePlantSpecimen {
  id: string;
  name: string;
  scientificName: string;
  family: string;
  image: string;
  tagline: string;
  sampleData: PlantIdentificationResult;
}

export const SAMPLE_PLANTS: SamplePlantSpecimen[] = [
  {
    id: 'monstera',
    name: 'Monstera Deliciosa',
    scientificName: 'Monstera deliciosa',
    family: 'Araceae',
    image: '/src/assets/images/sample_monstera_1791732403470.jpg',
    tagline: 'Swiss Cheese Plant · Iconic split foliage',
    sampleData: {
      commonName: 'Monstera Deliciosa (Swiss Cheese Plant)',
      scientificName: 'Monstera deliciosa',
      family: 'Araceae',
      nativeRegion: 'Tropical rainforests of Southern Mexico to Panama',
      plantType: 'Indoor Climbing Aroid / Tropical Epiphyte',
      difficultyLevel: 'Beginner Friendly',
      confidence: 99,
      botanicalDescription: 'Renowned for its glossy, dark green heart-shaped leaves that develop characteristic perforations (fenestrations) as they mature. Features aerial roots used for climbing host trees in nature.',
      alternativeMatches: [
        {
          commonName: 'Split-Leaf Philodendron',
          scientificName: 'Thaumatophyllum bipinnatifidum',
          keyDifferences: 'Has deeply ruffly serrated margins without enclosed interior leaf perforations.',
        },
        {
          commonName: 'Monstera Adansonii',
          scientificName: 'Monstera adansonii',
          keyDifferences: 'Much smaller foliage with closed fenestrations along the central leaf blade.',
        },
      ],
      healthAnalysis: {
        status: 'Thriving',
        observations: 'Deep emerald color, crisp margins, excellent turgor pressure, clean leaf fenestration development without signs of edema or scorched tips.',
        issuesDetected: [],
        immediateRemedies: ['Continue current regimen; gently wipe leaves with a damp microfiber cloth to remove dust and maximize photosynthetic efficiency.'],
      },
      care: {
        watering: {
          frequency: 'Every 7 to 10 days in spring/summer; every 14 days in winter',
          amountAndTechnique: 'Water thoroughly until water flows freely from the drainage holes. Empty any excess standing water from the saucer within 15 minutes.',
          soilMoistureCheck: 'Allow top 2 to 3 inches (5-8 cm) of soil to dry out completely before watering. Soil should feel crumbly, not soggy.',
          seasonalAdvice: 'Significantly reduce volume in late autumn and winter when metabolic activity slows.',
        },
        light: {
          requirement: 'Bright, indirect sunlight',
          footCandlesOrLux: '250 - 500 foot-candles (2,500 - 5,000 lux)',
          exposureTolerance: 'Can tolerate medium filtered light, but fenestrations develop best with generous indirect sun. Avoid harsh direct afternoon rays.',
          idealPlacement: 'Position 3 to 6 feet away from an East or South-facing window protected by sheer linen curtains.',
        },
        soilAndPotting: {
          recommendedMix: 'Chunky, airy aroid mix: 40% organic potting soil, 25% perlite, 25% orchid bark, and 10% horticultural charcoal.',
          pH: '5.5 - 6.5 (slightly acidic)',
          drainageImportance: 'Critical. Never allow the root system to sit in stagnant water, which can trigger Pythium root rot.',
          repottingFrequency: 'Every 18 to 24 months in early spring into a container 2 inches wider with drainage holes.',
        },
        temperatureAndHumidity: {
          idealTempRange: '68°F - 85°F (20°C - 29°C)',
          minimumColdTolerance: '55°F (13°C) - protect strictly from cold drafts and air conditioner vents.',
          targetHumidityPercent: '60% - 75%',
          humidityBoostMethods: 'Pair with a room humidifier, cluster alongside other tropicals, or utilize a pebble water tray.',
        },
        fertilizer: {
          schedule: 'Once every 3-4 weeks from April through September',
          recommendedNPK: 'Balanced 20-20-20 or 3-1-2 organic liquid fertilizer diluted to half label strength.',
          cautionNotes: 'Never feed dry soil; always moisten the root zone with plain water prior to applying fertilizer.',
        },
        pruningAndMaintenance: {
          pruningTips: 'Prune away damaged lower petioles at the stem base using sterilized shears. Direct aerial roots back into the potting substrate.',
          leafCleaning: 'Wipe broad leaves every 2 weeks with room-temperature water. Avoid chemical leaf shine products that clog stomata.',
          propagationTechnique: 'Take a stem cutting just below an active node with at least one visible aerial root bud; root in water or moist sphagnum moss.',
        },
        toxicity: {
          toxicToCats: true,
          toxicToDogs: true,
          toxicToHumans: true,
          toxicPrincipleAndSymptoms: 'Contains insoluble calcium oxalate raphide crystals. Chewing causes intense oral irritation, drooling, and throat swelling.',
        },
        commonPestsAndDiseases: [
          {
            name: 'Spider Mites (Tetranychidae)',
            symptoms: 'Fine silken webbing on leaf undersides, pale stippling spots along veins.',
            preventionAndCure: 'Shower foliage with lukewarm water; treat with cold-pressed organic neem oil spray or insecticidal soap weekly.',
          },
          {
            name: 'Thrips',
            symptoms: 'Silvery sheen patches with tiny black fecal specks; twisted new foliage.',
            preventionAndCure: 'Isolate plant immediately; apply systemic insect granules and spinosad foliar spray.',
          },
        ],
        proGardenerTips: [
          'Install a sturdy moss pole or cedar plank early; climbing upright stimulates leaves to double in size and develop secondary fenestrations.',
          'Never cut off aerial roots entirely; tuck them gently into the soil to absorb extra ambient moisture and anchor the plant.',
          'Rotate the pot 90 degrees every week so all foliage receives balanced light and avoids one-sided leaning.',
        ],
      },
    },
  },
  {
    id: 'fiddle_fig',
    name: 'Fiddle Leaf Fig',
    scientificName: 'Ficus lyrata',
    family: 'Moraceae',
    image: '/src/assets/images/sample_fiddle_fig_1791732414152.jpg',
    tagline: 'Violin-shaped leaves · Architectural statement',
    sampleData: {
      commonName: 'Fiddle Leaf Fig',
      scientificName: 'Ficus lyrata',
      family: 'Moraceae',
      nativeRegion: 'Lowland tropical rainforests of Western Africa',
      plantType: 'Indoor Tree / Evergreen Broadleaf',
      difficultyLevel: 'Moderate',
      confidence: 98,
      botanicalDescription: 'Renowned interior design tree featuring large, leathery violin-shaped foliage with prominent pale veins. Can grow into a magnificent 10-foot indoor specimen when provided consistent light and moisture.',
      alternativeMatches: [
        {
          commonName: 'Ficus Audrey',
          scientificName: 'Ficus benghalensis',
          keyDifferences: 'Thicker, velvet-textured oval leaves with lighter petioles and higher pest resilience.',
        },
        {
          commonName: 'Rubber Tree',
          scientificName: 'Ficus elastica',
          keyDifferences: 'Glossy oblong leaves with reddish-bronze sheath casing on emerging foliage.',
        },
      ],
      healthAnalysis: {
        status: 'Healthy',
        observations: 'Sturdy central trunk, robust upright leaf angle, rich chlorophyll pigmentation with clear venation.',
        issuesDetected: [],
        immediateRemedies: ['Maintain consistent location; avoid relocating as Ficus lyrata is sensitive to sudden environmental shifts.'],
      },
      care: {
        watering: {
          frequency: 'Every 7 to 10 days',
          amountAndTechnique: 'Water slowly until roughly 10-20% flows through the bottom drainage holes, ensuring the entire root ball is hydrated.',
          soilMoistureCheck: 'Check moisture with a wooden chopstick or meter; water only when the top 50% of the pot depth is dry.',
          seasonalAdvice: 'Reduce watering during darker winter months; inspect roots to avoid edema (red speckles from burst cell walls).',
        },
        light: {
          requirement: 'Consistent bright, filtered direct and indirect light',
          footCandlesOrLux: '400 - 800 foot-candles (4,000 - 8,000 lux)',
          exposureTolerance: 'Requires abundant light. Survives poorly in dim rooms, resulting in lower leaf drop.',
          idealPlacement: 'Directly in front of an unobstructed East or slightly shaded South-facing window.',
        },
        soilAndPotting: {
          recommendedMix: 'Fast-draining, rich indoor potting soil amended with 30% perlite, pumice, and pine bark fines.',
          pH: '6.0 - 7.0 (neutral to slightly acidic)',
          drainageImportance: 'Paramount. Stagnant moisture in the bottom of the planter rapidly causes bacterial root rot.',
          repottingFrequency: 'Every 2 to 3 years when roots encircle the interior or poke through drainage holes.',
        },
        temperatureAndHumidity: {
          idealTempRange: '65°F - 80°F (18°C - 27°C)',
          minimumColdTolerance: '60°F (15°C) - very vulnerable to cold window glass contact and sudden winter drafts.',
          targetHumidityPercent: '50% - 65%',
          humidityBoostMethods: 'Room humidifier or placing away from dry furnace vents.',
        },
        fertilizer: {
          schedule: 'Once every 3 to 4 weeks during spring and summer',
          recommendedNPK: 'High-nitrogen formula like 3-1-2 liquid houseplant fertilizer.',
          cautionNotes: 'Do not fertilize during winter or when the tree is experiencing acclimation stress.',
        },
        pruningAndMaintenance: {
          pruningTips: 'Notch or pinch apical buds in spring to encourage branching and a bushy tree canopy.',
          leafCleaning: 'Dust leaves monthly with clean water. Dust blocks sunlight from penetrating the broad surface.',
          propagationTechnique: 'Stem or air layering during vigorous spring growth.',
        },
        toxicity: {
          toxicToCats: true,
          toxicToDogs: true,
          toxicToHumans: true,
          toxicPrincipleAndSymptoms: 'Milky sap contains ficin and furocoumarins causing dermatitis, stomach upset, and drooling.',
        },
        commonPestsAndDiseases: [
          {
            name: 'Bacterial Leaf Spot',
            symptoms: 'Irregular dark brown to black spots with yellow halos across both young and mature leaves.',
            preventionAndCure: 'Prune affected leaves; increase air circulation; avoid wetting foliage; treat with copper fungicide.',
          },
          {
            name: 'Scale Insects',
            symptoms: 'Small brownish waxy bumps adhered to leaf veins; sticky honeydew residue.',
            preventionAndCure: 'Dab individual scale with 70% isopropyl alcohol on a cotton swab; spray with horticultural neem oil.',
          },
        ],
        proGardenerTips: [
          'Give the trunk a gentle 30-second shake once a week; mechanical movement mimics wind and triggers trunk thickening (thigmomorphogenesis).',
          'Tiny reddish spots on new emerging leaves are usually edema from irregular watering; maintain consistent moisture intervals to prevent it.',
          'Never place near an active heating radiator or air conditioning vent.',
        ],
      },
    },
  },
  {
    id: 'snake_plant',
    name: 'Snake Plant',
    scientificName: 'Sansevieria trifasciata',
    family: 'Asparagaceae',
    image: '/src/assets/images/sample_snake_plant_1791732424429.jpg',
    tagline: 'Mother-in-Law’s Tongue · Air-purifying survivor',
    sampleData: {
      commonName: 'Snake Plant (Mother-in-Law’s Tongue)',
      scientificName: 'Dracaena trifasciata (syn. Sansevieria trifasciata)',
      family: 'Asparagaceae',
      nativeRegion: 'Tropical West Africa from Nigeria east to the Congo',
      plantType: 'Succulent Perennial / Architectural Houseplant',
      difficultyLevel: 'Beginner Friendly',
      confidence: 99,
      botanicalDescription: 'Hardy succulent perennial with stiff, sword-shaped leaves growing vertically from a creeping rhizome. Features dark green marbling with golden-yellow margins.',
      alternativeMatches: [
        {
          commonName: 'Sansevieria Cylindrica',
          scientificName: 'Dracaena angolensis',
          keyDifferences: 'Features rounded, spear-like cylindrical leaves rather than broad flat blades.',
        },
        {
          commonName: 'Cast Iron Plant',
          scientificName: 'Aspidistra elatior',
          keyDifferences: 'Soft flexible leaves on long stalks, not succulent or rhizomatous.',
        },
      ],
      healthAnalysis: {
        status: 'Thriving',
        observations: 'Firm vertical posture, crisp tips, vivid variegation, zero signs of softness or base discoloration.',
        issuesDetected: [],
        immediateRemedies: ['Plant is in peak health; maintain conservative watering.'],
      },
      care: {
        watering: {
          frequency: 'Every 2 to 4 weeks depending on ambient light and season',
          amountAndTechnique: 'Water thoroughly until it drains out, then empty the catch tray completely. Water the soil perimeter, not into the center rosette.',
          soilMoistureCheck: 'Soil must be 100% bone dry throughout the entire pot depth before watering again.',
          seasonalAdvice: 'In winter, watering can be paused to once every 6 to 8 weeks.',
        },
        light: {
          requirement: 'Highly adaptable: Low light to bright indirect sunlight (even direct morning sun)',
          footCandlesOrLux: '50 - 400 foot-candles (500 - 4,000 lux)',
          exposureTolerance: 'One of the few houseplants that tolerates low-light corners, though growth speed increases with brighter light.',
          idealPlacement: 'Any room, from bright living rooms to shaded bedrooms or office desks.',
        },
        soilAndPotting: {
          recommendedMix: 'Coarse succulent & cactus soil: 50% potting mix, 30% coarse sand/pumice, 20% perlite.',
          pH: '5.5 - 7.5',
          drainageImportance: 'Extremely high. Susceptible to rhizome rot if soil retains moisture for more than 4 days.',
          repottingFrequency: 'Rarely (every 3 to 5 years). Prefers being slightly rootbound in heavy terracotta pots.',
        },
        temperatureAndHumidity: {
          idealTempRange: '60°F - 85°F (16°C - 29°C)',
          minimumColdTolerance: '50°F (10°C) - avoid prolonged cold exposure.',
          targetHumidityPercent: '30% - 50% (thrives in average dry indoor air)',
          humidityBoostMethods: 'No extra humidity needed; tolerates dry conditioned air with ease.',
        },
        fertilizer: {
          schedule: 'Once or twice per year in mid-spring and mid-summer',
          recommendedNPK: 'Dilute cactus/succulent fertilizer (e.g. 2-7-7 or 10-10-10 at 1/4 strength).',
          cautionNotes: 'Over-fertilization causes leaves to flop and become soft.',
        },
        pruningAndMaintenance: {
          pruningTips: 'Cut damaged or bent leaves off at soil level using a sterile razor.',
          leafCleaning: 'Wipe down leaves occasionally to keep dust from diminishing the clean graphic appearance.',
          propagationTechnique: 'Divide rhizomes with roots during repotting, or root leaf cuttings in water/soil.',
        },
        toxicity: {
          toxicToCats: true,
          toxicToDogs: true,
          toxicToHumans: false,
          toxicPrincipleAndSymptoms: 'Contains saponins. Causes mild gastrointestinal upset, nausea, and vomiting if pets chew foliage.',
        },
        commonPestsAndDiseases: [
          {
            name: 'Root / Rhizome Rot',
            symptoms: 'Leaves turn mushy, yellow, and collapse at the soil line with a foul odor.',
            preventionAndCure: 'Allow soil to dry thoroughly; unpot immediately, trim rotten roots, and repot in fresh dry substrate.',
          },
        ],
        proGardenerTips: [
          'When in doubt, DO NOT water. Snake plants forgive underwatering by months, but die quickly from overwatering.',
          'Employs Crassulacean Acid Metabolism (CAM), meaning it opens stomata at night to absorb CO2 and release oxygen, making it ideal for bedrooms.',
          'Use heavy terracotta planters to prevent tall top-heavy leaves from tipping over.',
        ],
      },
    },
  },
  {
    id: 'peace_lily',
    name: 'Peace Lily',
    scientificName: 'Spathiphyllum wallisii',
    family: 'Araceae',
    image: '/src/assets/images/sample_peace_lily_1791732433847.jpg',
    tagline: 'Pure white spathes · Expressive watering communicator',
    sampleData: {
      commonName: 'Peace Lily',
      scientificName: 'Spathiphyllum wallisii',
      family: 'Araceae',
      nativeRegion: 'Tropical rainforests of Central and South America',
      plantType: 'Flowering Herbaceous Perennial / Indoor Foliage',
      difficultyLevel: 'Beginner Friendly',
      confidence: 99,
      botanicalDescription: 'Classic evergreen perennial with glossy lance-shaped leaves and elegant white spathes enclosing a spadix flower spike. Known as a dramatic communicator that wilts visibly when thirsty.',
      alternativeMatches: [
        {
          commonName: 'Anthurium (Flamingo Flower)',
          scientificName: 'Anthurium andraeanum',
          keyDifferences: 'Features waxy, heart-shaped red, pink, or white spathes with stiffer leaf stems.',
        },
        {
          commonName: 'Chinese Evergreen',
          scientificName: 'Aglaonema modestum',
          keyDifferences: 'Similar foliage shape but does not produce white upright spathe flowers.',
        },
      ],
      healthAnalysis: {
        status: 'Thriving',
        observations: 'Upright flowering spathes, glossy deep green leaves without brown crispy margins or tip burn.',
        issuesDetected: [],
        immediateRemedies: ['Maintain filtered water watering cycle; deadhead fading green blooms at their base.'],
      },
      care: {
        watering: {
          frequency: 'Every 5 to 7 days',
          amountAndTechnique: 'Keep soil consistently damp like a wrung-out sponge, but never saturated in standing water.',
          soilMoistureCheck: 'Water when top 1 inch (2.5 cm) begins to dry or when leaves begin to show the slightest loss of turgor.',
          seasonalAdvice: 'Water with room-temperature filtered water to prevent brown fluoride leaf tips.',
        },
        light: {
          requirement: 'Low to medium bright indirect light',
          footCandlesOrLux: '100 - 300 foot-candles (1,000 - 3,000 lux)',
          exposureTolerance: 'Extremely tolerant of low-light interiors; direct sunlight will quickly scorch and bleach leaves.',
          idealPlacement: '6 to 8 feet away from a window or in a room with ambient diffused natural light.',
        },
        soilAndPotting: {
          recommendedMix: 'Rich, moisture-retentive yet well-aerated mix: 60% potting soil, 20% peat moss/coco coir, 20% perlite.',
          pH: '5.8 - 6.5',
          drainageImportance: 'High. Soil must drain excess water freely to preserve fine feeder roots.',
          repottingFrequency: 'Every 1 to 2 years in spring when roots crowd the surface.',
        },
        temperatureAndHumidity: {
          idealTempRange: '65°F - 80°F (18°C - 27°C)',
          minimumColdTolerance: '55°F (13°C) - avoid drafts and air conditioner vents.',
          targetHumidityPercent: '55% - 70%',
          humidityBoostMethods: 'Gentle misting, pebble water tray, or placing in a bathroom with shower steam.',
        },
        fertilizer: {
          schedule: 'Every 6 weeks during spring and summer',
          recommendedNPK: 'Balanced houseplant fertilizer at 1/4 label strength to avoid salt buildup.',
          cautionNotes: 'Over-fertilization causes black tip burn on delicate leaf tips.',
        },
        pruningAndMaintenance: {
          pruningTips: 'Trim spent flower stems down at the soil line once blooms turn pale green.',
          leafCleaning: 'Wipe broad leaves regularly with a damp sponge.',
          propagationTechnique: 'Easily propagated by root clump division during spring repotting.',
        },
        toxicity: {
          toxicToCats: true,
          toxicToDogs: true,
          toxicToHumans: true,
          toxicPrincipleAndSymptoms: 'Contains insoluble calcium oxalates (unlike true toxic lilies, Spathiphyllum causes oral irritation but rarely acute kidney failure).',
        },
        commonPestsAndDiseases: [
          {
            name: 'Fungus Gnats',
            symptoms: 'Small gnats hovering around damp surface soil.',
            preventionAndCure: 'Allow top inch to dry; use yellow sticky traps and water with Bacillus thuringiensis israelensis (BTI / Mosquito Bits).',
          },
        ],
        proGardenerTips: [
          'If your Peace Lily wilts completely flat, do not panic! Place the pot in a bowl of lukewarm water for 30 minutes; it will bounce back within 2-4 hours.',
          'Use filtered, rainwater, or distilled water; Peace Lilies are very sensitive to tap fluoride and chlorine which cause brown tip burn.',
          'If your plant refuses to bloom, move it slightly closer to a brighter indirect light source.',
        ],
      },
    },
  },
];
