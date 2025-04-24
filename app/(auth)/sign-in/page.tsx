import AuthForm from "@/components/AuthForm";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <AuthForm type="sign-in" />      

    </div>
  );
};

export default SignInPage;
