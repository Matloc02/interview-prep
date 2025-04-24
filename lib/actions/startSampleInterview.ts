// lib/actions/startSampleInterview.ts
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Database } from "@/lib/supabase/types";

export async function startSampleInterview(sample: {
  id: string;
  title: string;
  questions: string[];
  duration: number;
}) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) return null;

  // Insert interview
  const { data: interviewData, error: interviewError } = await supabase
    .from("interviews")
    .insert({
      user_id: user.id,
      role: sample.title,
      type: "Sample",
      duration: sample.duration,
      created_at: new Date().toISOString(),
      source_id: sample.id,
      feedback_status: "pending",
    })
    .select("id")
    .single();
    
    console.log("🚀 Creating sample interview for user:", user.id);
    console.log("📄 Sample title:", sample.title);
    console.log("🧠 Sample questions:", sample.questions);

  if (!interviewData || interviewError) {
    console.error("❌ Interview insert error:", interviewError);
    return null;
  }

  const interviewId = interviewData.id;

  // Insert associated questions
  const { error: questionInsertError } = await supabase
    .from("interview_questions")
    .insert(
      sample.questions.map((q, index) => ({
        interview_id: interviewId,
        question: q,
        order: index + 1,
      }))
    );

  if (questionInsertError) {
    console.error("❌ Question insert error:", questionInsertError);
    return null;
  }

  return interviewId;
}


  