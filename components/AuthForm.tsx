"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import FormField from "@/components/formField"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signIn, signUp } from "@/lib/actions/auth.action"
import { supabase } from "@/lib/supabase/client"

type FormType = "sign-in" | "sign-up"

const authFormSchema = (type: FormType) =>
  z.object({
    name: type === "sign-up" ? z.string().min(3).max(50) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6).max(100),
  })

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter()
  const formSchema = authFormSchema(type)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, password } = values

    try {
      if (type === "sign-up") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
            },
          },
        })

        if (error) {
          toast.error(error.message)
          return
        }

        if (!data.user) {
          toast.error("Sign up failed.")
          return
        }

        const result = await signUp({
          uid: data.user.id,
          name: name!,
          email,
        })

        if (!result?.success) {
          toast.error(result?.message)
          return
        }

        toast.success("Account created successfully. Please sign in.")
        router.push("/sign-in")
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          toast.error(error.message)
          return
        }

        const session = data.session
        if (!session) {
          toast.error("No session returned from Supabase.")
          return
        }

        await signIn({
          email,
          idToken: session.access_token,
        })

        toast.success("Sign in successful")
        router.push("/")
      }
    } catch (error: any) {
      console.log(error)
      toast.error(`There was an error: ${error.message}`)
    }
  }

  const isSignIn = type === "sign-in"

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
        <div className="flex items-center justify-center mb-4"> <img src="/Lt_Blue_logo.png" alt="logo" style={{ borderRadius: "9px" }} width={330} height={100} /></div>
          
        </div>
        <h3>Practice job interviews with AI</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Link
              href="/forgot-password"
              className="text-sm text-purple-400 hover:underline block mt-2 text-right"
            >
              Forgot password?
            </Link>

            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link href={!isSignIn ? "/sign-in" : "/sign-up"} className="font-bold text-user-primary ml-1">
            {!isSignIn ? "Sign-in" : "Sign-up"}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthForm
