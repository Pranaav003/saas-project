import { surpriseMePrompts } from "@/app/prompts/imgprompt";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getRandomPrompt(prompt: any[]) {
  const randomIndex = Math.floor(Math.random() * prompt.length);
  return prompt[randomIndex]
}

export function absoluteUrl(path: string){
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}