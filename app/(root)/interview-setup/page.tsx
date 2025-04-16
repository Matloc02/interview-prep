"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function InterviewSetupPage() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [duration, setDuration] = useState("10");
  const [style, setStyle] = useState("formal");
  const [resume, setResume] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Send to Vapi + AI backend
    console.log({ jobTitle, jobDescription, duration, style, resume });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-neutral-800 rounded-3xl p-8 shadow-lg"
      >
        <div className="mb-6">
          <Link href="/" className="flex items-center gap-3 mb-2">
            <Image src="/logo.svg" alt="OhLura Logo" width={64} height={48} />
            <h2 className="text-xl font-bold text-purple-300">OhLura</h2>
          </Link>
          <p className="text-gray-400 text-sm leading-tight">
            “From anxious to awesome — Interview prep that works.”
          </p>
        </div>

        <p className="text-gray-400 mb-6">Create your personalized mock interview</p>

        <label className="block text-white mb-1">Job Title</label>
        <input
          className="w-full mb-4 px-4 py-2 rounded bg-neutral-700 text-white"
          placeholder="e.g. Medical Secretary"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />

        <label className="block text-white mb-1">Job Description</label>
        <textarea
          className="w-full mb-4 px-4 py-2 rounded bg-neutral-700 text-white"
          placeholder="Paste job description or type a few role details..."
          rows={4}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        <label className="block text-white mb-1">Interview Style</label>
        <select
          className="w-full mb-4 px-4 py-2 rounded bg-neutral-700 text-white"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        >
          <option value="formal">Formal</option>
          <option value="casual">Casual</option>
          <option value="panel">Panel</option>
          <option value="phone">Phone Screening</option>
        </select>

        <label className="block text-white mb-1">Interview Duration</label>
        <select
          className="w-full mb-4 px-4 py-2 rounded bg-neutral-700 text-white"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          <option value="5">5 minutes</option>
          <option value="10">10 minutes</option>
          <option value="15">15 minutes</option>
          <option value="20">20 minutes</option>
        </select>

        <label className="block text-white mb-1">Upload Resume (Optional)</label>
        <input
          type="file"
          className="w-full mb-6 file:bg-neutral-700 file:text-white file:rounded file:px-4 file:py-2"
          onChange={(e) => setResume(e.target.files?.[0] ?? null)}
        />

        <button
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2"
        >
          <Image src="/upload.svg" alt="Upload Icon" width={19} height={16} />
          <span>Create Interview</span>
        </button>
      </form>
    </div>
  );
}
