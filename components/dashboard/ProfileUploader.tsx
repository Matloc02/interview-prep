"use client";

import { useState } from "react";
import Image from "next/image";
import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "@/firebase/client";
import { setLogLevel } from "firebase/app";

setLogLevel("debug");


type ProfileUploaderProps = {
  userId: string;
  initialImage: string;
};

const ProfileUploader = ({ userId, initialImage }: ProfileUploaderProps) => {
  const [profileURL, setProfileURL] = useState(initialImage);
  const [uploading, setUploading] = useState(false);
  console.log("🔐 Client UID:", auth.currentUser?.uid);
  

  const handleUpload = async (file: File) => {
    if (!file || !auth.currentUser) {
      console.error("❌ No file or user");
      return;
    }
    console.log("📤 Path:", `profile_pictures/${auth.currentUser?.uid}/${file.name}`);
    const userId = auth.currentUser.uid;
    const filePath = `profile_pictures/${userId}/${file.name}`;
    const storageRef = ref(storage, filePath);
  
    try {
      console.log("📤 Uploading to:", filePath);
      await uploadBytes(storageRef, file);
  
      const downloadURL = await getDownloadURL(storageRef);
      console.log("✅ Uploaded. Download URL:", downloadURL);
  
      await updateDoc(doc(db, "users", userId), {
        profileImageURL: downloadURL,
      });
  
      alert("✅ Profile picture updated!");
    } catch (error) {
      console.error("❌ Upload failed:", error);
    }
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
          if (file) {
            console.log("📁 File selected:", file);
            handleUpload(file);
          }
        }}
        className="text-white"
      />
    </div>
  );
};

export default ProfileUploader;
