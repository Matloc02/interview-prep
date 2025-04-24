"use client";

import { useRef, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/lib/supabase/types";
import { Button } from "@/components/ui/button";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createBrowserClient<Database>(supabaseUrl, supabaseKey);

type ResumeUploaderProps = {
  userId: string;
  initialResume: string;
};

const ResumeUploader = ({ userId, initialResume }: ResumeUploaderProps) => {
  const [resumeURL, setResumeURL] = useState(initialResume);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file || file.type !== "application/pdf") {
      alert("Only PDF resumes are allowed.");
      return;
    }

    setUploading(true);

    const filePath = `${userId}/resume.pdf`;

    const { error: uploadError } = await supabase.storage
      .from("profile-assets")
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type,
      });

    if (uploadError) {
      console.error("❌ Resume upload failed:", uploadError);
      alert("❌ Upload failed.");
      setUploading(false);
      return;
    }

    const publicURL = `${supabaseUrl}/storage/v1/object/public/profile-assets/${filePath}`;

    const { error: updateError } = await supabase
      .from("users")
      .update({ resume_url: publicURL })
      .eq("id", userId);

    if (updateError) {
      console.error("❌ Failed to update resume_url in user table:", updateError);
      alert("❌ Failed to update profile.");
    } else {
      setResumeURL(publicURL);
      alert("✅ Resume uploaded and saved!");
    }

    setUploading(false);
  };

  const handleRemove = async () => {
    const filePath = `${userId}/resume.pdf`;

    const { error: removeError } = await supabase.storage
      .from("profile-assets")
      .remove([filePath]);

    if (removeError) {
      console.error("❌ Error deleting file:", removeError);
      alert("Failed to remove resume.");
      return;
    }

    const { error: updateError } = await supabase
      .from("users")
      .update({ resume_url: null })
      .eq("id", userId);

    if (updateError) {
      console.error("❌ Error clearing resume_url:", updateError);
      alert("Resume deleted, but failed to update DB.");
    } else {
      setResumeURL("");
      alert("✅ Resume removed!");
    }
  };

  return (
    <div className="text-center flex flex-col items-center gap-4">
      <h3 className="text-lg font-semibold text-white">📄 Upload Resume (PDF)</h3>

      <input
        type="file"
        ref={fileInputRef}
        accept="application/pdf"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
      />

      <Button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        {uploading ? "Uploading..." : resumeURL ? "Update Resume" : "Upload Resume"}
      </Button>

      {resumeURL && (
        <div className="mt-4 text-sm text-white text-center space-y-2">
          <p>Your resume:</p>
          <a
            href={resumeURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline break-all"
          >
            {resumeURL}
          </a>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleRemove}
            className="mt-2"
          >
            Remove Resume
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;
