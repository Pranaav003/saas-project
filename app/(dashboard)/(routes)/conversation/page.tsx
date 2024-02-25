"use client";

import * as z from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ChatCompletionRequestMessage } from "openai";

import { Heading } from "@/components/heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn, getRandomPrompt } from "@/lib/utils";
import { surpriseMePrompts } from "@/app/prompts/convprompt";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";


const ConversationPage = () => {
  const proModal = useProModal();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
    const router = useRouter();
  // Initialize the form using react-hook-form and zodResolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  // onSubmit function for handling form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        // Make a POST request to the API endpoint
        const userMessage: ChatCompletionRequestMessage = {
            role: "user",
            content: values.prompt
        };
        const newMessages = [...messages, userMessage];
        //Referencing file created in /api/conversation/route.ts, which contains POST function call
        const response = await axios.post("/api/conversation", {
            messages: newMessages
        });

        setMessages((current) => [...current, userMessage, response.data]);

        form.reset();
    } catch (error: any) {
        if(error?.response?.status === 403){
          proModal.onOpen();
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
    } finally {
        router.refresh();
    }
  };

  // Return JSX representing the component structure
  return (
    
    <div>
      {/* Heading component with specific title, description, icon, iconColor, and bgColor */}
      <Heading 
        title="Conversation"
        description="Our most advanced AI conversation model"
        icon={MessageSquare}
        iconColor="text-green-500"
        bgColor="bg-green-500/10"
      />

      {/* Form section containing a form with a single form field for "prompt" */}
      {/* Must need Form outside form element with FormField as an element inside form, FormItem=>FormControl=>Input for words */}
      <div className="px-4 lg:px-8">
        
        <div className="">
            
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
              {/* FormField component for "prompt" input */}
              <FormField 
                name="prompt" 
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      {/* Input component for "prompt" */}
                      <Input
                      disabled = {isLoading}
                      placeholder = {getRandomPrompt(surpriseMePrompts)}
                      {...field}
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
                <Button disabled = {isLoading} className = "col-span-12 lg:col-span-2 w-full">
                    Generate
                </Button>
            </form>
          </Form>
        </div>
        
        <div className="space-y-4 mt-4">
            {isLoading && (
                <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                    <Loader />
                </div>
            )}
            {messages.length === 0 && !isLoading && (
                <div>
                    <Empty label = "No conversation started."/>
                </div>
            )}
            <div className="flex flex-col-reverse gap-y-4">
                {messages.map((message, index) => (
                    <div key = {message.content} className = {cn("p-8 w-full flex items-start gap-x-8 rounded-lg", message.role === "user" ? "bg-white border border-black/10" : "bg-muted")}>
                        {/* if user then render UserAvatar, otherwise render BotAvatar */}
                        {message.role == "user"? <UserAvatar/> : <BotAvatar/>}
                        <p className = "text-sm">
                            {message.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
      
      </div>
    
    </div>
  );
}

export default ConversationPage;
