import AuthForm from "@/components/AuthForm";
import Link from "next/link";

const Page = () => {
  return <AuthForm type="sign-in" />;
};
<p className="mt-4 text-sm text-gray-400">
  Forgot your password?{" "}
  <Link href="/forgot-password" className="text-purple-400 hover:underline">
    Reset it here
  </Link>
</p>

export default Page;
