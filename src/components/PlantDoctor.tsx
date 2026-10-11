import React, { useState } from 'react';
import {
  Stethoscope,
  Upload,
  Camera,
  RefreshCw,
  AlertTriangle,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  X,
} from 'lucide-react';
import { DiagnosisResult, PlantIdentificationResult } from '../types/plant';

interface PlantDoctorProps {
  initialPlant?: PlantIdentificationResult | null;
  initialImage?: string | null;
}

export const PlantDoctor: React.FC<PlantDoctorProps> = ({ initialPlant, initialImage }) => {
  const [plantName, setPlantName] = useState<string>(initialPlant?.commonName || '');
  const [symptoms, setSymptoms] = useState<string>('');
  const [photo, setPhoto] = useState<string | null>(initialImage || null);
  const [isDiagnosing, setIsDiagnosing] = useState<boolean>(false);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRunDiagnosis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo && !symptoms.trim()) {
      setError('Please provide either an image of the plant symptoms or describe what you observe.');
      return;
    }

    setIsDiagnosing(true);
    setError(null);

    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: photo,
          symptoms: symptoms.trim() || undefined,
          plantName: plantName.trim() || undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to complete plant diagnosis.');
      }

      setDiagnosis(data.diagnosis);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Diagnosis service encountered an issue. Please try again.');
    } finally {
      setIsDiagnosing(false);
    }
  };

  const commonSymptomChips = [
    'Yellowing lower leaves',
    'Brown crispy leaf edges',
    'Black mushy spots on stem',
    'White powdery film on leaves',
    'Leaves drooping despite moist soil',
    'Tiny webbing under leaf nodes',
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
          <Stethoscope className="w-3.5 h-3.5" />
          <span>AI Plant Pathologist Clinic</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 font-display">
          Plant Doctor &amp; Symptom Diagnosis
        </h1>
        <p className="mt-2 text-base text-stone-600">
          Upload an image of leaf discoloration, pests, or rot. Receive a clinical diagnosis and an exact 7-day recovery roadmap.
        </p>
      </div>

      {/* Input Card */}
      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm p-6 sm:p-8 space-y-6">
        {error && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-sm text-amber-900">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-amber-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <form onSubmit={handleRunDiagnosis} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Plant Species / Name (Optional)
              </label>
              <input
                type="text"
                value={plantName}
                onChange={(e) => setPlantName(e.target.value)}
                placeholder="e.g. Fiddle Leaf Fig, Peace Lily, Tomato"
                className="w-full px-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Photo of Afflicted Area
              </label>
              <div className="flex items-center gap-2">
                <label className="flex-1 px-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl hover:bg-stone-100 text-stone-700 flex items-center justify-center gap-2 cursor-pointer transition-all">
                  <Upload className="w-4 h-4 text-stone-500" />
                  <span className="truncate">{photo ? 'Change Leaf Photo' : 'Upload Affected Leaf'}</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
                {photo && (
                  <button
                    type="button"
                    onClick={() => setPhoto(null)}
                    className="p-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-500"
                    title="Remove photo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {photo && (
            <div className="relative aspect-[16/9] max-h-56 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
              <img src={photo} alt="Symptom photo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Describe What You Notice
            </label>
            <textarea
              rows={3}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g. Over the past 4 days, lower foliage turned translucent yellow and fell off. Soil stays wet for over 10 days."
              className="w-full px-4 py-3 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all placeholder:text-stone-400"
            />

            {/* Quick symptom selector pills as interactive button options */}
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {commonSymptomChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSymptoms((prev) => (prev ? `${prev}, ${chip}` : chip))}
                  className="px-2.5 py-1 text-xs rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-600 transition-colors"
                >
                  + {chip}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isDiagnosing}
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:bg-emerald-800/60 text-white font-medium text-base shadow-sm flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
          >
            {isDiagnosing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Pathologist AI Analyzing Symptoms...</span>
              </>
            ) : (
              <>
                <Stethoscope className="w-5 h-5" />
                <span>Diagnose &amp; Generate 7-Day Recovery Plan</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Diagnosis Results Section */}
      {diagnosis && (
        <div className="space-y-6 animate-in fade-in">
          {/* Clinical Overview Card */}
          <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-stone-400">Diagnosis Report</span>
                <h2 className="text-2xl font-bold text-stone-900 font-display mt-0.5">
                  {diagnosis.primaryDiagnosis}
                </h2>
                <div className="text-xs text-stone-500 mt-1 flex items-center gap-2">
                  <span>Category: {diagnosis.pathogenOrCause}</span>
                </div>
              </div>

              <div
                className={`self-start sm:self-auto px-3.5 py-1.5 rounded-full text-xs font-semibold border ${
                  diagnosis.severity === 'Critical'
                    ? 'bg-rose-50 text-rose-800 border-rose-200'
                    : diagnosis.severity === 'Moderate'
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}
              >
                Severity: {diagnosis.severity}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Visual Evidence &amp; Clinical Finding
              </h4>
              <p className="text-sm text-stone-600 bg-stone-50 p-4 rounded-2xl border border-stone-100 leading-relaxed">
                {diagnosis.visualEvidence}
              </p>
            </div>

            {/* Contributing Factors */}
            <div>
              <h4 className="text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                Contributing Factors
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {diagnosis.contributingFactors.map((factor, idx) => (
                  <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-xs text-stone-700 flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">·</span>
                    <span>{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Action Steps */}
            <div>
              <h4 className="text-xs font-semibold text-rose-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>Immediate Emergency Steps</span>
              </h4>
              <div className="space-y-2">
                {diagnosis.emergencyActionSteps.map((step, idx) => (
                  <div key={idx} className="p-3.5 bg-rose-50/60 rounded-xl border border-rose-200/60 text-xs text-rose-900 flex items-start gap-2.5">
                    <span className="font-bold text-rose-700 shrink-0">Step {idx + 1}:</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 7-Day Recovery Roadmap */}
          <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900 font-display">7-Day Treatment Protocol</h3>
                <p className="text-xs text-stone-500">Follow day-by-day to rehabilitate plant health.</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {diagnosis.sevenDayRecoveryPlan.map((planItem, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-stone-50 border border-stone-100 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
                >
                  <span className="w-24 shrink-0 font-mono text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    {planItem.day}
                  </span>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {planItem.action}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Long-term prevention */}
          <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-stone-900">Long-Term Prevention Measures</h3>
            </div>
            <ul className="space-y-2 text-sm text-stone-600 pt-1">
              {diagnosis.preventativeMeasures.map((measure, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-stone-50 p-3 rounded-xl border border-stone-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{measure}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
