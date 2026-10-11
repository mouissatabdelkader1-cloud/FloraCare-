import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Sparkles, RefreshCw, X, AlertCircle, ArrowRight } from 'lucide-react';
import { SAMPLE_PLANTS, SamplePlantSpecimen } from '../data/samplePlants';
import { PlantIdentificationResult } from '../types/plant';

interface PlantIdentifierProps {
  onIdentified: (result: PlantIdentificationResult, imageUrl: string) => void;
  onSelectSample: (sample: SamplePlantSpecimen) => void;
}

export const PlantIdentifier: React.FC<PlantIdentifierProps> = ({ onIdentified, onSelectSample }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [userNotes, setUserNotes] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<string>('Inspecting leaf morphology...');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Camera state
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Stop camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      setErrorMessage(null);
      stopCamera();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.error('Camera access error:', err);
      setErrorMessage('Unable to access camera. Please allow camera permissions or upload an image file instead.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 800;
    canvas.height = video.videoHeight || 600;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setSelectedImage(dataUrl);
      stopCamera();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setErrorMessage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setErrorMessage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerIdentify = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setErrorMessage(null);

    const steps = [
      'Inspecting leaf venation & margin structure...',
      'Comparing with 25,000+ botanical taxonomy records...',
      'Evaluating photosynthetic health & leaf turgor...',
      'Formulating tailored watering & light parameters...',
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      stepIndex = (stepIndex + 1) % steps.length;
      setAnalysisStep(steps[stepIndex]);
    }, 1500);

    try {
      const response = await fetch('/api/identify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: selectedImage,
          userNotes: userNotes.trim() || undefined,
        }),
      });

      const data = await response.json();
      clearInterval(interval);

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to identify the plant.');
      }

      onIdentified(data.plant, selectedImage);
    } catch (err: any) {
      clearInterval(interval);
      console.error(err);
      setErrorMessage(err.message || 'Identification failed. Please try a clearer photo with good lighting.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Hero Header Area */}
      <div className="text-center max-w-2xl mx-auto pt-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 font-display">
          Identify Any Plant in Seconds
        </h1>
        <p className="mt-3 text-base sm:text-lg text-stone-600 leading-relaxed">
          Snap a photo of foliage, stems, or flowers. FloraCare combines AI vision with botanical science to identify the species and deliver an exhaustive care blueprint.
        </p>
      </div>

      {/* Main Upload / Camera Workspace Card */}
      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm p-6 sm:p-8 max-w-3xl mx-auto">
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-sm text-amber-900">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium">Notice</p>
              <p className="mt-0.5 text-amber-800">{errorMessage}</p>
            </div>
            <button onClick={() => setErrorMessage(null)} className="text-amber-700 hover:text-amber-900">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 1. Live Camera View */}
        {isCameraActive && (
          <div className="relative rounded-2xl overflow-hidden bg-stone-950 aspect-[4/3] flex items-center justify-center">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            <div className="absolute inset-0 border-2 border-emerald-400/40 rounded-2xl pointer-events-none flex items-center justify-center">
              <div className="w-48 h-48 sm:w-64 sm:h-64 border border-dashed border-emerald-400/70 rounded-2xl" />
            </div>

            {/* Camera Floating Controls */}
            <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-4 px-4">
              <button
                type="button"
                onClick={() => {
                  setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
                  startCamera();
                }}
                className="p-3 rounded-full bg-stone-900/80 text-white hover:bg-stone-800 backdrop-blur-sm transition-all"
                title="Switch Camera"
              >
                <RefreshCw className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={capturePhoto}
                className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-2 shadow-lg shadow-emerald-950/40 active:scale-95 transition-all"
              >
                <Camera className="w-5 h-5" />
                <span>Snap Photo</span>
              </button>

              <button
                type="button"
                onClick={stopCamera}
                className="p-3 rounded-full bg-stone-900/80 text-white hover:bg-stone-800 backdrop-blur-sm transition-all"
                title="Cancel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* 2. Image Selected Preview */}
        {!isCameraActive && selectedImage && (
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden bg-stone-100 aspect-[4/3] max-h-96 w-full border border-stone-200">
              <img
                src={selectedImage}
                alt="Selected Plant"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-stone-900/70 text-white hover:bg-stone-900 backdrop-blur-sm transition-all"
                title="Remove photo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Optional Grower Symptoms Notes */}
            <div>
              <label htmlFor="user-notes" className="block text-sm font-medium text-stone-700 mb-1.5">
                Add optional grower observations (optional)
              </label>
              <input
                id="user-notes"
                type="text"
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="e.g., Kept indoors, yellowing lower leaves, potting in clay soil"
                className="w-full px-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all placeholder:text-stone-400"
              />
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={triggerIdentify}
                disabled={isAnalyzing}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:bg-emerald-800/60 text-white font-medium text-base shadow-sm flex items-center justify-center gap-2.5 active:scale-[0.99] transition-all"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>{analysisStep}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Run Botanical Identification</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                disabled={isAnalyzing}
                className="w-full sm:w-auto py-3 px-5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-sm font-medium transition-all"
              >
                Choose Another
              </button>
            </div>
          </div>
        )}

        {/* 3. Drag & Drop / Upload / Camera Picker Mode */}
        {!isCameraActive && !selectedImage && (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-stone-200 hover:border-emerald-700/50 rounded-2xl p-8 sm:p-12 text-center transition-all bg-stone-50/50 hover:bg-emerald-50/20"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />

            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Upload className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-semibold text-stone-900 mb-1">
              Upload Plant Photo or Drag & Drop
            </h3>
            <p className="text-sm text-stone-500 max-w-sm mx-auto mb-6">
              Supports high-res JPG, PNG, and WebP. For optimal identification, frame leaves clearly in natural light.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium transition-all shadow-sm flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>Browse Files</span>
              </button>

              <button
                type="button"
                onClick={startCamera}
                className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-medium transition-all shadow-sm flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                <span>Open Camera</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Demo Specimens Strip */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-stone-900">Try Instant Sample Plants</h3>
            <p className="text-xs text-stone-500">Test the botanical care intelligence without taking a photo right now.</p>
          </div>
          <span className="text-xs text-emerald-800 font-medium hidden sm:inline">Click any specimen</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SAMPLE_PLANTS.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => onSelectSample(sample)}
              className="group text-left rounded-2xl bg-white border border-stone-200/80 hover:border-emerald-700/60 hover:shadow-md transition-all overflow-hidden flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100">
                <img
                  src={sample.image}
                  alt={sample.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-stone-900 group-hover:text-emerald-800 transition-colors">
                    {sample.name}
                  </h4>
                  <p className="text-xs italic text-stone-500 font-serif">
                    {sample.scientificName}
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-emerald-800 font-medium">
                  <span>View dossier</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
