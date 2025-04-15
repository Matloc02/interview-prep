"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/client"; // your client-side Firestore instance
import { auth } from "@/firebase/client";
import ProfileUploader from "@/components/dashboard/ProfileUploader";



type UserData = {
  name: string;
  email: string;
  profileImageUrl?: string;
  resumeUrl?: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data() as UserData);
        }
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="text-white">Loading profile...</div>;

  if (!user) return <div className="text-white">No user found.</div>;

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4">
      <div className="bg-neutral-800 rounded-2xl p-8 w-full max-w-lg shadow-xl text-white">
        <div className="flex flex-col items-center mb-6">
          <ProfileUploader />
          <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Resume</h3>
          {user.resumeUrl ? (
            <a
              href={user.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 underline"
            >
              View uploaded resume
            </a>
          ) : (
            <p className="text-gray-400">No resume uploaded.</p>
          )}
        </div>
      </div>
    </div>
  );
}
