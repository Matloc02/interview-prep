import AuthForm from "@/components/AuthForm";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <AuthForm type="sign-up" />

      <p className="mt-4 text-sm text-gray-400">
        Forgot your password?{" "}
        <Link href="/forgot-password" className="text-purple-400 hover:underline">
          Reset it here
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
