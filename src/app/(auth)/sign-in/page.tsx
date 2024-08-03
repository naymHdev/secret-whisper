"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/schemas/signinSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    console.log("data___", data);

    const res = await signIn("credentials", {
      identifier: data.identifier,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      console.log("error_", res.error);

      toast({
        title: "Login failed!",
        description: "Incorrect username or password!",
        variant: "destructive",
      });
    } else {
      console.log("res___", res);
      toast({
        title: "Error",
        description: res?.error,
        variant: "destructive",
      });
    }

    if (res?.url) {
      router.replace("/dashboard");
    }
  };

  // Handle form submission logic here
  setTimeout(() => {
    setShowLoader(false);
    setIsSubmitting(false);
  }, 5000);

  return (
    <>
      <div className=" flex flex-col items-center justify-center h-screen">
        <div className="max-w-7xl w-full lg:w-5/12 mx-auto px-4 md:px-6 lg:px-10 shadow-md bg-slate-100 py-10 rounded">
          <div className=" text-center py-8">
            <h1 className=" text-4xl font-extrabold">Sign In Your Account</h1>
            <p className="mt-3 font-medium">
              Sign in to start your antonymous adventure
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email/Username</FormLabel>
                    <FormControl>
                      <Input placeholder="email or username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    {showLoader && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Please wait...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </Form>
          <div className=" mt-5 text-center">
            <p>
              Are you do not create a account?
              <Link
                href="/sign-up"
                className=" text-blue-600 hover:text-blue-800"
              >
                <span> Sign up now.</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
