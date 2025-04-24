import { redirect } from "next/navigation";
import { startSampleInterview } from "@/lib/actions/startSampleInterview";
import { sampleInterviews } from "@/lib/interviews/sampleSets";

export default async function SampleInterviewStartPage({
  params,
}: {
  params: { id: string };
}) {
  const interview = sampleInterviews.find((set) => set.id === params.id);

  if (!interview) {
    return redirect("/sample-interviews");
  }

  const newInterview = await startSampleInterview(interview);

  if (!newInterview?.id) {
    return redirect("/sample-interviews");
  }

  return redirect(`/interview/${newInterview.id}`);
}
