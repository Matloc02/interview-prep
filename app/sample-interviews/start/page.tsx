// app/sample-interviews/start/page.tsx

import { redirect } from "next/navigation";
import { startSampleInterview } from "@/lib/actions/startSampleInterview";

export default async function SampleInterviewStartPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const sampleData = {
    id,
    title: "Sample Title", // Replace with actual title
    questions: ["Question 1", "Question 2"], // Replace with actual questions
    duration: 30, // Replace with actual duration
  };

  const newInterview = await startSampleInterview(sampleData);

  if (!newInterview?.id) {
    return redirect("/sample-interviews");
  }

  return redirect(`/interview/${newInterview.id}`);
}
