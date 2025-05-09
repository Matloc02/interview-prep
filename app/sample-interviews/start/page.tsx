export const dynamic = "force-dynamic"; // Ensures it's treated as dynamic at build time
import { redirect } from "next/navigation";
import { sampleInterviews } from "@/lib/interviews/sampleSets";
import { startSampleInterview } from "@/lib/actions/startSampleInterview";
import type { JSX } from "react";


export default async function SampleInterviewStartPage({
  params,
}: {
  params: { id: string };
}) {
  const interview = sampleInterviews.find((i) => i.id === params.id);

  if (!interview) {
    redirect("/sample-interviews");
  }

  const newInterview = await startSampleInterview(interview);
  redirect(`/interview/${newInterview.id}`);
}
