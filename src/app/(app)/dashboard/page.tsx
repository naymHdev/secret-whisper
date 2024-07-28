"use client";

import { useToast } from "@/components/ui/use-toast";
import { Message } from "@/model/User";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Dashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const { toast } = useToast();

  const handelDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;

  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);

    try {
      const res = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("AcceptMessages", res.data.isAcceptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Failed to fetch message settings",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue, toast]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(false);
      setIsSwitchLoading(false);

      try {
        const res = await axios.get<ApiResponse>("/api/get-messages");
        setMessages(res.data.messages || []);
        if (refresh) {
          toast({
            title: "Refreshed Messages",
            description: "Showing Latest messages",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: "Error",
          description:
            axiosError.response?.data.message ||
            "Failed to fetch message settings",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [toast, setIsLoading, setMessages]
  );

  useEffect(() => {
    if (!session || session.user) return;
    fetchMessages();
    fetchAcceptMessages();
  }, [session, setValue, fetchAcceptMessages, fetchMessages]);

  const handelSwitchMessage = async () => {
    try {
      const res = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("AcceptMessages", !acceptMessages);
      toast({
        title: res.data.message,
        description: "Default",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Failed to fetch message settings",
        variant: "destructive",
      });
    }
  };

  const { username } = session?.user as User;

  // TODO: do more research
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/{username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "URL copied",
      description: "Profile URL has been copied to clipboard",
    });
  };

  if (!session || !session.user) {
    return <div>Please Login</div>;
  }

  return (
    <>
      <div>Dashboard</div>
    </>
  );
};

export default Dashboard;
