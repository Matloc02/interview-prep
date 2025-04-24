// app/sample-interviews/start/route.ts
import { NextResponse } from "next/server";
import { startSampleInterview } from "@/lib/actions/startSampleInterview";
import { sampleInterviews } from "@/lib/interviews/sampleSets";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sampleId = searchParams.get("id");

  if (!sampleId) {
    return NextResponse.redirect(new URL("/sample-interviews", request.url));
  }

  // Validate and get full sample interview
  const sample = sampleInterviews.find((sample) => sample.id === sampleId);
  if (!sample) {
    return NextResponse.redirect(new URL("/sample-interviews", request.url));
  }

  try {
    const interviewId = await startSampleInterview({
      id: sample.id,
      title: sample.title,
      questions: sample.questions,
      duration: sample.duration,
    });

    if (!interviewId) {
      throw new Error("Interview creation failed");
    }

    return NextResponse.redirect(new URL(`/interview/${interviewId}`, request.url));
  } catch (err) {
    console.error("❌ Failed to start sample interview:", err);
    return NextResponse.redirect(new URL("/sample-interviews", request.url));
  }
}