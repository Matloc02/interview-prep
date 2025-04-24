// lib/actions/generateInterviewFeedback.ts

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { OpenAI } from "openai"; // Assume OpenAI is installed & setup

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function generateInterviewFeedback(interviewId: string) {
  const supabase = await createServerSupabaseClient();

  // 1. Get interview data
  const { data: interview, error: interviewError } = await supabase
    .from("interviews")
    .select("*, interview_questions(*)")
    .eq("id", interviewId)
    .single();

  if (!interview || interviewError) {
    console.error("❌ Failed to fetch interview:", interviewError);
    return null;
  }

  const questions = interview.interview_questions.map((q: any) => q.question).join("\n");
  const transcript = interview.transcript || "(No transcript available)";

  // 2. Generate feedback via OpenAI
  const prompt = `You are a career coach. Based on the following transcript and questions, provide constructive feedback on how the candidate performed.\n\nQuestions:\n${questions}\n\nTranscript:\n${transcript}`;

  const aiResponse = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const feedbackText = aiResponse.choices?.[0]?.message?.content || "No feedback generated.";

  // 3. Insert feedback into table
  const { data: feedback, error: feedbackError } = await supabase
    .from("feedback")
    .insert({ interview_id: interviewId, content: feedbackText })
    .select("id")
    .single();

  if (!feedback || feedbackError) {
    console.error("❌ Failed to insert feedback:", feedbackError);
    return null;
  }

  // 4. Update interview with feedback_id and status
  await supabase.from("interviews").update({
    feedback_id: feedback.id,
    feedback_status: "complete",
  }).eq("id", interviewId);

  console.log("✅ Feedback stored successfully:", feedback.id);
  return feedback.id;
}
