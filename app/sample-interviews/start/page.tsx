// app/sample-interviews/start/page.tsx

import { redirect } from "next/navigation";
import { startSampleInterview } from "@/lib/actions/startSampleInterview";

export default async function SampleInterviewStartPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const newInterview = await startSampleInterview(id);

  if (!newInterview?.id) {
    // Optionally log error
    return redirect("/sample-interviews");
  }

  return redirect(`/interview/${newInterview.id}`);
}
