"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/lib/supabase/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Props = {
  userId: string;
  initialImage: string;
  initialName?: string;
  initialEmail?: string;
  initialPhone?: string;
  initialWebsite?: string;
  initialResumeUrl?: string;
};

const ProfileUploader = ({
  userId,
  initialImage,
  initialName = "",
  initialEmail = "",
  initialPhone = "",
  initialWebsite = "",
  initialResumeUrl = "",
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const resumeInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState(initialImage);
  const [refreshCount, setRefreshCount] = useState(0);
  const [resumeURL, setResumeURL] = useState(initialResumeUrl);
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);
  const [website, setWebsite] = useState(initialWebsite);

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    setUploading(true);
    setRefreshCount((prev) => prev + 1);

    const filePath = `${userId}/profile-image-${Date.now()}`;

    const { error: uploadError } = await supabase.storage
      .from("profile-assets")
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type,
      });
      

    if (uploadError) {
      console.error("❌ Upload failed:", uploadError);
      setUploading(false);
      return;
    }

    const publicURL = `https://${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/profile-assets/${filePath}`;

    const { error: updateError } = await supabase
      .from("users")
      .update({ profile_image_url: publicURL })
      .eq("id", userId);

    if (updateError) {
      console.error("❌ Failed to update Supabase user record:", updateError);
    } else {
      setImageURL(publicURL);
    }
    setUploading(false);
  };

  const handleResumeUpload = async (file: File) => {
    if (!file || file.type !== "application/pdf") return;
    const filePath = `${userId}/${file.name}`;

    const { error } = await supabase.storage
      .from("profile-assets")
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type,
      });

    if (error) {
      console.error("❌ Resume upload failed:", error);
      return;
    }

    const publicURL = `https://${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/profile-assets/${filePath}`;

    const { error: updateError } = await supabase
      .from("users")
      .update({ resume_url: publicURL })
      .eq("id", userId);

    if (!updateError) {
      setResumeURL(publicURL);
    } else {
      console.error("❌ Resume update failed:", updateError);
    }
  };

  const handleSaveInfo = async () => {
    const { error } = await supabase
      .from("users")
      .update({ name, email, phone, website })
      .eq("id", userId);

    if (error) console.error("❌ Failed to update user info:", error);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center flex flex-col items-center gap-4">
        <div
          className="relative cursor-pointer group"
          onClick={() => fileInputRef.current?.click()}
        >
          <Image
            src={imageURL || "/profile.svg"}
            alt="Profile"
            width={96}
            height={96}
            className="rounded-full border-2 border-purple-500 object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white text-sm">Change</span>
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          hidden
          ref={fileInputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file);
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm">Full Name</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        
        <label className="text-sm">Email</label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />

        <label className="text-sm">Phone</label>
        <Input value={phone} onChange={(e) => setPhone(e.target.value)} />

        <label className="text-sm">Website or LinkedIn</label>
        <Input value={website} onChange={(e) => setWebsite(e.target.value)} />

        <Button className="mt-3" onClick={handleSaveInfo}>
          Save Info
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm">Upload Resume (PDF only)</label>
        <input
          type="file"
          accept="application/pdf"
          ref={resumeInputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleResumeUpload(file);
          }}
        />
        {resumeURL && (
          <a
            href={resumeURL}
            target="_blank"
            className="text-sm text-blue-500 underline"
          >
            View Uploaded Resume
          </a>
        )}
      </div>
    </div>
  );
};

export default ProfileUploader;
