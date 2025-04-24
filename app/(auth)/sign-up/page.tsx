import AuthForm from "@/components/AuthForm";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <AuthForm type="sign-up" />

      
    </div>
  );
};

export default SignUpPage;
