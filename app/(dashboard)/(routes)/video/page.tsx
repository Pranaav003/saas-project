//try creating an image upload form to create a video with an image
//use the same form as the music generator, but with a different API endpoint
//the API endpoint should contain a function that takes in an image and returns a video
// use replicate.com's stability-ai/stable-video-diffusion model to create the video

"use client";

import * as z from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Heading } from "@/components/heading";
import { VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getRandomPrompt } from "@/lib/utils";
import { surpriseMePrompts } from "@/app/prompts/videoprompt";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";



const VideoPage = () => {
    const proModal = useProModal();
    const [video, setVideo] = useState<string>();
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
      setVideo(undefined);  

        const response = await axios.post("/api/video", values);

        setVideo(response.data[0]);

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
        title="Video Generator"
        description="Generate videos with our powerful AI model."
        icon={VideoIcon}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
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
            {!video && !isLoading && (
                <div>
                    <Empty label = "No video generated."/>
                </div>
            )}
            {video && (
              <video className = "w-full aspect-video mt-8 rounded-lg border bg-black" controls>
                <source src={video}/>
              </video>
            )}
        </div>
      
      </div>
    
    </div>
  );
}

export default VideoPage;
