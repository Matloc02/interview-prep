"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { feedbackSchema } from "@/constants";
import { supabaseAdmin } from "@/lib/supabase/server";
import {
  Interview,
  Feedback,
  GetFeedbackByInterviewIdParams,
  CreateFeedbackParams,
  GetLatestInterviewsParams,
} from "@/types";

export async function createFeedback(
  params: CreateFeedbackParams
): Promise<{ success: boolean; feedbackId?: string }> {
  const { interviewId, userId, transcript, feedbackId } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
      `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });

    const { data, error } = await supabaseAdmin
      .from("feedback")
      .upsert([
        {
          id: feedbackId || undefined,
          interview_id: interviewId,
          user_id: userId,
          total_score: object.totalScore,
          category_scores: object.categoryScores,
          strengths: object.strengths,
          areas_for_improvement: object.areasForImprovement,
          final_assessment: object.finalAssessment,
          created_at: new Date().toISOString(),
        },
      ])
      .select("id")
      .single();

    if (error) throw error;

    return { success: true, feedbackId: data.id };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { success: false };
  }
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from("interviews")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;
    return data as Interview;
  } catch (error) {
    console.error("🔥 Error in getInterviewById:", error);
    return null;
  }
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  try {
    const { interviewId, userId } = params;

    const { data, error } = await supabaseAdmin
      .from("feedback")
      .select("*")
      .eq("interview_id", interviewId)
      .eq("user_id", userId)
      .limit(1)
      .single();

    if (error || !data) return null;
    return data as Feedback;
  } catch (error) {
    console.error("🔥 Error in getFeedbackByInterviewId:", error);
    return null;
  }
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  try {
    const { userId, limit = 20 } = params;

    const { data, error } = await supabaseAdmin
      .from("interviews")
      .select("*")
      .eq("user_id", userId)
      .eq("finalized", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error || !data) return null;
    return data as Interview[];
  } catch (error) {
    console.error("🔥 Error in getLatestInterviews:", error);
    return null;
  }
}

export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from("interviews")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error || !data) return null;
    return data as Interview[];
  } catch (error) {
    console.error("🔥 Error in getInterviewsByUserId:", error);
    return null;
  }
}