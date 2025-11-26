'use client';

import { useMemo, useState, type ReactElement } from 'react';

import { useUserProfile } from '@/hooks/useUserProfile';
import { AlertCircle, Check, FileText, Loader2, Sparkles, Upload, X } from 'lucide-react';

type UploadStatus = 'idle' | 'scanning' | 'complete';

const formatBytes = (size: number): string => {
  if (size === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.floor(Math.log(size) / Math.log(1024));
  return `${(size / Math.pow(1024, index)).toFixed(1)} ${units[index]}`;
};

export function ProfileUpload(): ReactElement {
  const { user, updateUser } = useUserProfile();
  const [phase, setPhase] = useState<'idle' | 'scanning'>('idle');
  const [isDragging, setIsDragging] = useState(false);
  const [isReading, setIsReading] = useState(false);

  const cvData = user?.cv ?? null;
  const status: UploadStatus = phase === 'scanning' ? 'scanning' : cvData ? 'complete' : 'idle';

  const processFile = (file: File): void => {
    setPhase('scanning');
    setIsReading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const preview = typeof reader.result === 'string' ? reader.result.slice(0, 5000) : undefined;
      const payload = {
        name: file.name,
        sizeLabel: formatBytes(file.size),
        lastModified: file.lastModified,
        preview,
      };
      updateUser({ cv: payload });
      setPhase('idle');
      setIsReading(false);
    };
    reader.onerror = () => {
      setPhase('idle');
      setIsReading(false);
    };
    reader.readAsText(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLElement>): void => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleBrowse = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
      event.target.value = '';
    }
  };

  const resetUpload = (): void => {
    updateUser({ cv: null });
    setPhase('idle');
  };

  const statusLabel = useMemo(() => {
    if (status === 'complete' && cvData) {
      return `Ready · ${cvData.sizeLabel}`;
    }
    return 'Analysis complete';
  }, [status, cvData]);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-8 flex items-center gap-4">
        {['Upload CV', 'Review skills', 'Preferences'].map((label, index) => {
          const step = index + 1;
          const isActive = index === 0;
          return (
            <div key={label} className="flex items-center gap-2 text-sm font-semibold">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm ${
                  isActive ? 'border-teal-200 bg-teal-50 text-teal-700' : 'border-slate-200 text-slate-400'
                }`}
              >
                {step}
              </span>
              <span className={isActive ? 'text-teal-700' : 'text-slate-400'}>{label}</span>
              {index < 2 ? <span className="h-px w-10 bg-slate-200" /> : null}
            </div>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-slate-50 px-6 py-6">
          <h2 className="text-2xl font-bold text-slate-900">Let&rsquo;s build your profile</h2>
          <p className="mt-2 text-sm text-slate-500">
            Upload your current CV/Resume. Our AI will extract your skills, education, internships, and certifications to build your match profile.
          </p>
        </div>

        <div className="p-8">
          {status === 'idle' ? (
            <label
              htmlFor="cv-upload"
              className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 text-center transition ${
                isDragging ? 'border-teal-500 bg-teal-50' : 'border-slate-300 hover:border-teal-400 hover:bg-slate-50'
              }`}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                <Upload className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{isDragging ? 'Drop your CV here' : 'Drag & drop your CV'}</h3>
              <p className="mt-2 text-sm text-slate-500">PDF, DOCX · up to 10MB</p>
              <span className="mt-6 inline-flex items-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600">
                Or browse files
              </span>
              <input id="cv-upload" type="file" className="hidden" accept=".pdf,.doc,.docx,.txt" onChange={handleBrowse} />
            </label>
          ) : null}

          {status === 'scanning' ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-indigo-100 bg-indigo-50/60 py-16 text-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-indigo-200 opacity-40 blur-xl" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg">
                  <Loader2 className="h-10 w-10 animate-spin text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Analyzing your document</h3>
              <p className="flex items-center gap-2 text-sm text-indigo-900">
                <Sparkles className="h-4 w-4" />
                {isReading ? 'Reading your CV securely…' : 'Identifying key experiences to boost your match score'}
              </p>
            </div>
          ) : null}

          {status === 'complete' && cvData ? (
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-200 bg-white text-emerald-600">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{cvData.name}</h3>
                    <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-emerald-600">
                      <Check className="h-4 w-4" />
                      {statusLabel}
                    </p>
                  </div>
                </div>
                <button className="rounded-full p-2 text-slate-400 transition hover:bg-white hover:text-slate-600" type="button" onClick={resetUpload}>
                  <X className="h-5 w-5" />
                </button>
              </div>

              {cvData.preview ? (
                <div className="mt-6 rounded-2xl border border-white bg-white/80 p-4 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Preview</p>
                  <p className="mt-2 whitespace-pre-line text-sm text-slate-600">{cvData.preview}</p>
                  <p className="mt-2 text-xs text-slate-400">Stored locally. Preview truncated for privacy.</p>
                </div>
              ) : null}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-slate-500">We&rsquo;ll only use this CV when you choose to apply.</p>
                <button
                  className="inline-flex items-center gap-2 rounded-2xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-200 transition hover:bg-teal-700"
                  type="button"
                >
                  Use this CV in cover letters
                  <Check className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex items-start gap-3 border-t border-slate-100 bg-slate-50 px-6 py-5 text-sm text-slate-500">
          <AlertCircle className="h-5 w-5 text-slate-400" />
          <span>
            <strong>Privacy note:</strong> Your CV never leaves your device unless you explicitly share it when applying. You can delete it anytime.
          </span>
        </div>
      </div>
    </div>
  );
}

