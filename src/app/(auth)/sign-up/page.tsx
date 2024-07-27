"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
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
import { Loader2 } from "lucide-react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [usernameMessages, setUsernameMessages] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debounced = useDebounceCallback(setUsername, 300);

  const { toast } = useToast();
  const router = useRouter();

  // Define a form with Zod
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // Username checking
  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessages("");
        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${username}`
          );
          // console.log("checkUsernameUnique response >", response);
          setUsernameMessages(response.data.message);
        } catch (error) {
          // console.error("User name messages error", error);

          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessages(
            axiosError.response?.data.message ?? "Error checking user name"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };

    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);

    try {
      const res = await axios.post<ApiResponse>("/api/sign-up", data);
      // console.log("User sign up response data", res.data);
      toast({
        title: "Sign up successfully completed",
        description: res.data.message,
      });
      router.replace(`/verify/${username}`);
    } catch (error) {
      // console.error("User name messages error", error);

      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Sign up failed!",
        description: axiosError.response?.data.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className=" flex flex-col items-center justify-center h-screen">
        <div className="max-w-7xl w-full lg:w-5/12 mx-auto px-4 md:px-6 lg:px-10 shadow-md bg-slate-100 py-10 rounded">
          <div className=" text-center py-8">
            <h1 className=" text-4xl font-extrabold">Join Secret Message</h1>
            <p className="mt-3 font-medium">
              Sign up to start your antonymous adventure
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="username"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          debounced(e.target.value);
                        }}
                      />
                    </FormControl>
                    {isCheckingUsername && (
                      <Loader2 className=" mr-2 h-4 w-4 animate-spin" />
                    )}
                    <p
                      className={`text-sm ${
                        usernameMessages === "Username is unique"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      Test {usernameMessages}
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
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
                      <Input type="password" placeholder="pass***" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className=" mr-2 h-4 w-4 animate-spin" /> Please
                    wait...
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>
            </form>
          </Form>
          <div className=" mt-5 text-center">
            <p>
              Already a member?{" "}
              <Link
                href="/sign-in"
                className=" text-blue-600 hover:text-blue-800"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
