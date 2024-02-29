"use client";

import { MessageSquare, ImageIcon, Code, VideoIcon, Music } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

const tools = [
    {
      name: "Chatbot",
      description: "Access high performance models like GPT-4 to answer questions and generate content",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      image: MessageSquare,
    },
    {
      name: "Image",
      description: "Generate defining and impactful images with Stable Diffusion",
      color: "text-pink-700",
      bgColor: "bg-pink-700/10",
      image: ImageIcon,
    },
    {
      name: "Coder",
      description: "Generate code snippets and code completions with a bot trained to understand code and programming languages.",
      color: "text-green-700",
      bgColor: "bg-green-700/10",
      image: Code,
    },
    {
      name: "Video",
      description: "Generate vibrant and creative videos using DALLE",
      color: "text-orange-700",
      bgColor: "bg-orange-700/10",
      image: VideoIcon,
    },
    {
      name: "Music",
      description: "Create music from prompts using high performance models like Whisper",
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
      image: Music,
    },
  ]

const LandingTools = () => {
  return (
    <div className="px-10 pb-20">
          <h2 className="text-center text-4xl text-white font-extrabold mb-10">Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {tools.map((item) => (
              <Card key={item.description} className="bg-[#192339] border-none text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-x-2">
                    <div>
                      <div className = {cn("inline-flex gap-x-2 p-1 fit rounded-md", item.bgColor)}>
                        <item.image className = {cn("w-8 h-8", item.color)}/>
                      </div>
                      <p className="text-zinc-400 text-sm">{item.name}</p>
                    </div>
                  </CardTitle>
                  <CardContent className="pt-4 px-0">
                    {item.description}
                  </CardContent>
                </CardHeader>
              </Card>
            ))}
          </div>
         
        </div>
        
  )
};

export default LandingTools;