"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export default function Profile() {
  const { toast } = useToast();
  const { address } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (address) {
      // Fetch user details based on the address
      axios
        .get(`/api/profile/${address}`)
        .then((response) => {
          const userData = response.data;
          form.setValue("name", userData.name);
          form.setValue("email", userData.email);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            form.setValue("name", "");
            form.setValue("email", "");
          } else {
            console.error("Error fetching user details:", error);
          }
        });
    }
  }, [address]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (address) {
      const postData = { ...data, address };

      axios
        .post("/api/profile/create", postData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          toast({
            title: "You submitted the following values:",
            description: (
              <>
                <p>Name: {response.data.name}</p>
                <p>Email: {response.data.email}</p>
              </>
            ),
          });
          router.push("/");
        })
        .catch((error) => {
          console.error("An error occurred:", error);
          console.error("Error in adding profile for user:", error.message);
        });
    } else {
      toast({ title: "Please connect your wallet!" });
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <ConnectButton />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} required />
                </FormControl>
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
                  <Input placeholder="Your email" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Link href="/">
              <Button>Back</Button>
            </Link>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
