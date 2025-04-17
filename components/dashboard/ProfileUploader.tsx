"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";

type ProfileUploaderProps = {
  userId: string;
  initialImage: string;
};

const ProfileUploader = ({ userId, initialImage }: ProfileUploaderProps) => {
  const [profileURL, setProfileURL] = useState(initialImage);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);

    const filePath = `profile-pictures/${userId}/${file.name}`;

    const { data, error } = await supabase.storage
      .from("profile-pictures")
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error("❌ Upload error:", error);
      setUploading(false);
      return;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("profile-pictures")
      .getPublicUrl(filePath);

    const publicURL = publicUrlData?.publicUrl;
    if (!publicURL) {
      console.error("❌ Failed to get public URL");
      setUploading(false);
      return;
    }

    // Update user's profile image URL in Supabase DB
    const { error: updateError } = await supabase
      .from("users")
      .update({ profileImageURL: publicURL })
      .eq("id", userId);

    if (updateError) {
      console.error("❌ Failed to update profile URL:", updateError);
    } else {
      alert("✅ Profile picture updated!");
      setProfileURL(publicURL);
    }

    setUploading(false);
  };

  return (
    <div className="text-center flex flex-col items-center gap-4">
      <div className="w-24 h-24 relative">
        <Image
          src={profileURL}
          alt="Profile Image"
          width={96}
          height={96}
          className="rounded-full object-cover border-2 border-purple-500"
        />
      </div>

      <label className="text-white font-medium">
        {uploading ? "Uploading..." : "Change Profile Picture"}
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
        className="text-white"
      />
    </div>
  );
};

export default ProfileUploader;
