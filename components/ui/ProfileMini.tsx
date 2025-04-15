"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { auth, db } from "@/firebase/client";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

export default function ProfileMini() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        const data = userDoc.data();
        setImageUrl(data?.profileImageUrl || "/profile.svg");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="ml-auto">

        <Link href="/dashboard">
        <Image
            src={imageUrl || "/profile.svg"}
            alt="User"
            width={36}
            height={36}
            className="rounded-full border border-purple-500 cursor-pointer hover:ring-2 hover:ring-purple-500"
        />
        </Link>
    </div>
  );
}
