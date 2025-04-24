"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/lib/supabase/types";
import { Button } from "@/components/ui/button";

type Props = {
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    website?: string;
  };
};

const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function UpdateContactForm({ user }: Props) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.phone || "",
    website: user.website || "",
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);

    const { error } = await supabase
      .from("users")
      .update(formData)
      .eq("id", user.id);

    if (error) {
      console.error("❌ Failed to update user info:", error);
      alert("❌ Failed to save changes.");
    } else {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }

    setSaving(false);
  };

  return (
    <div className="bg-muted p-6 rounded-xl w-full border border-border shadow-sm">
      <h2 className="text-lg font-semibold mb-4">📇 Contact Information</h2>

      <div className="space-y-3">
        <div>
          <label className="text-sm block mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded border text-black"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="text-sm block mb-1">Email (read-only)</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full p-2 rounded border text-black bg-gray-200"
          />
        </div>

        <div>
          <label className="text-sm block mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 rounded border text-black"
            placeholder="(optional)"
          />
        </div>

        <div>
          <label className="text-sm block mb-1">LinkedIn or Website</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full p-2 rounded border text-black"
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>

      <Button
        className="mt-4 w-full"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "Saving..." : success ? "✅ Saved!" : "Save Changes"}
      </Button>
    </div>
  );
}
