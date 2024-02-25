"use client";

import * as z from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Heading } from "@/components/heading";
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getRandomPrompt } from "@/lib/utils";
import { surpriseMePrompts } from "@/app/prompts/musicprompt";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";
import { error } from "console";



const MusicPage = () => {
    const proModal = useProModal();
    const [music, setMusic] = useState<string>();
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
      setMusic(undefined);  

        const response = await axios.post("/api/music", values);

        setMusic(response.data.audio);

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
        title="Music Generator"
        description="Generate music with our powerful AI model."
        icon={Music}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
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
            {!music && !isLoading && (
                <div>
                    <Empty label = "No music generated."/>
                </div>
            )}
            {music && (
              <audio controls className = "w-full mt-8">
                <source src = {music}/>
              </audio>
            )}
        </div>
      
      </div>
    
    </div>
  );
}

export default MusicPage;
