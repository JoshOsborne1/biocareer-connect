'use client';

import { FormEvent, useState } from 'react';
import { Sparkles, FileText, Upload, Briefcase, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

function extractHighlights(cvText: string): string[] {
  const lines = cvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const bulletLike = lines.filter((line) => /^[-•–]/.test(line)).map((line) => line.replace(/^[-•–]\s*/, ''));
  if (bulletLike.length >= 3) return bulletLike.slice(0, 3);
  return lines.slice(0, 3);
}

function makeCoverLetter(cvText: string, jobDescription: string): string {
  const highlights = extractHighlights(cvText);
  const jdLines = jobDescription.split(/\r?\n/).filter(Boolean);
  const openingRole = jdLines[0] ?? 'the biomedical science opportunity';

  return [
    `Dear Hiring Manager,`,
    '',
    `I’m excited to be considered for ${openingRole}. My biomedical science background in Bristol has focused on delivering high-integrity lab results, supporting NHS partners, and translating research into patient-ready insights.`,
    '',
    `Here are a few ways my experience aligns with your needs:`,
    ...highlights.map((highlight) => `• ${highlight}`),
    '',
    `I’m particularly drawn to this role because it offers the chance to contribute to Bristol’s healthcare ecosystem while continuing to grow my expertise in advanced diagnostics. I’d welcome the opportunity to discuss how I can support your team’s goals.`,
    '',
    `Thank you for your time and consideration.`,
    '',
    `Kind regards,`,
    `[Your Name]`,
  ].join('\n');
}

export default function CoverLetterPage(): JSX.Element {
  const [cvText, setCvText] = useState('');
  const [cvFileName, setCvFileName] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [letter, setLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === 'string' ? reader.result : '';
      setCvText(text);
      setCvFileName(file.name);
    };
    reader.readAsText(file);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!cvText.trim() || !jobDescription.trim()) {
      setLetter('Please add both CV content and a job description to generate a cover letter.');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      setLetter(makeCoverLetter(cvText, jobDescription));
      setIsGenerating(false);
    }, 600);
  };

  const handleCopy = () => {
    if (!letter) return;
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-24 pb-20 space-y-10 animate-fade-in">
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600">
          <Sparkles className="h-3 w-3" />
          <span>AI-Powered Writer</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Craft your perfect application.
        </h1>
        <p className="text-lg text-slate-600">
          Paste your CV and a job description. We&apos;ll blend them into a professional cover letter tailored for Bristol&apos;s biomedical sector.
        </p>
      </section>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-2">
        {/* Left Column: Inputs */}
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 shadow-sm space-y-4 transition-all focus-within:ring-2 focus-within:ring-teal-100">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FileText className="h-4 w-4 text-teal-500" />
                Your Experience (CV)
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="cv-upload"
                  accept=".txt,.doc,.docx"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="cv-upload"
                  className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-200"
                >
                  <Upload className="h-3 w-3" />
                  {cvFileName ? 'Change File' : 'Upload File'}
                </label>
              </div>
            </div>
            
            {cvFileName && (
              <div className="flex items-center gap-2 rounded-lg border border-teal-100 bg-teal-50/50 px-3 py-2 text-xs text-teal-700">
                <Check className="h-3 w-3" />
                Loaded: {cvFileName}
              </div>
            )}

            <textarea
              value={cvText}
              onChange={(event) => setCvText(event.target.value)}
              placeholder="Paste your CV highlights, skills, and placements here..."
              className="min-h-[200px] w-full resize-none rounded-xl border border-slate-200 bg-white/50 p-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-0"
            />
          </div>

          <div className="glass-card rounded-3xl p-6 shadow-sm space-y-4 transition-all focus-within:ring-2 focus-within:ring-teal-100">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Briefcase className="h-4 w-4 text-teal-500" />
              Target Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              placeholder="Paste the job requirements and responsibilities here..."
              className="min-h-[200px] w-full resize-none rounded-xl border border-slate-200 bg-white/50 p-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-0"
            />
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="group w-full rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-teal-200 transition-all hover:shadow-xl hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="flex items-center justify-center gap-2">
              {isGenerating ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin" />
                  Generating Magic...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Cover Letter
                </>
              )}
            </span>
          </button>
        </div>

        {/* Right Column: Preview */}
        <div className="lg:sticky lg:top-32 h-fit">
          <div className={cn(
            "relative min-h-[600px] rounded-3xl border border-slate-200 bg-white p-8 shadow-xl transition-all duration-500",
            letter ? "opacity-100 translate-y-0" : "opacity-50 translate-y-4 bg-slate-50"
          )}>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Draft Preview
              </span>
              {letter && (
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                  {copied ? 'Copied!' : 'Copy Text'}
                </button>
              )}
            </div>

            {letter ? (
              <div className="prose prose-sm prose-slate max-w-none font-medium leading-relaxed text-slate-800 animate-fade-in whitespace-pre-wrap">
                {letter}
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <div className="mb-4 rounded-full bg-slate-100 p-4">
                  <FileText className="h-8 w-8 text-slate-300" />
                </div>
                <p className="text-sm font-medium text-slate-500">
                  Your generated letter will appear here ready for review.
                </p>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
