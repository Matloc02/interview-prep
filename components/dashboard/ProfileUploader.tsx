"use client";

import { useState } from "react";
import Image from "next/image";
import { auth, db, storage } from "@/firebase/client";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

export default function ProfileUploader({ userId, initialImage }: { userId: string; initialImage: string }) {
  const [imageURL, setImageURL] = useState(initialImage);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const fileRef = ref(storage, `profile_pictures/${userId}/${file.name}`);

    try {
      console.log("📤 Uploading to:", fileRef.fullPath);
      await uploadBytes(fileRef, file);
      console.log("✅ Upload successful");

      const downloadURL = await getDownloadURL(fileRef);
      console.log("🔗 Download URL:", downloadURL);

      await updateDoc(doc(db, "users", userId), {
        profileImageURL: downloadURL,
      });
      console.log("📄 Firestore updated");

      setImageURL(downloadURL);
    } catch (err: any) {
      console.error("❌ Upload failed:", err.message);
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="text-center">
      <div className="relative w-24 h-24 mx-auto mb-4">
        <Image
          src={imageURL}
          alt="Profile"
          fill
          className="rounded-full object-cover border-2 border-purple-500"
        />
      </div>

      <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
      {uploading && <p className="text-sm text-purple-300 mt-2">Uploading...</p>}
      {error && <p className="text-sm text-red-400 mt-2">❌ {error}</p>}
    </div>
  );
}
