"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/schemas/signinSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

const SignIn = () => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
    } catch (error) {}
  };

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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="exapmle@gmail.com" {...field} />
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
              <Button type="submit">Sign in</Button>
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
