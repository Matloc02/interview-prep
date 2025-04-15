"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { auth, db, storage } from "@/firebase/client";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function ProfileUploader() {
  const [userId, setUserId] = useState<string | null>(null);
  const [preview, setPreview] = useState("/profile.svg");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUserId(firebaseUser.uid);
        const docSnap = await getDoc(doc(db, "users", firebaseUser.uid));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPreview(data.profileImageURL || "/profile.svg");
        }
      }
    });
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    const storageRef = ref(storage, `users/${userId}/profile.jpg`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Upload error:", error);
        setUploading(false);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        await updateDoc(doc(db, "users", userId), {
          profileImageURL: url,
        });
        setPreview(url);
        setUploading(false);
      }
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Image
        src={preview}
        alt="Profile Preview"
        width={96}
        height={96}
        className="rounded-full border border-purple-500"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="text-sm text-white"
      />

      {uploading && <p className="text-sm text-purple-300">Uploading...</p>}
    </div>
  );
}
