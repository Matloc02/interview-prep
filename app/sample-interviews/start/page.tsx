// app/sample-interviews/start/page.tsx
import { redirect } from "next/navigation";
import { sampleInterviews } from "@/lib/interviews/sampleSets";
import { startSampleInterview } from "@/lib/actions/startSampleInterview";

export default async function SampleInterviewStartPage({
  params,
}: {
  params: { id: string };
}) {
  const interview = sampleInterviews.find((i) => i.id === params.id);
  if (!interview) {
    return redirect("/sample-interviews");
  }

  const newInterview = await startSampleInterview(interview);
  return redirect(`/interview/${newInterview.id}`);
}
