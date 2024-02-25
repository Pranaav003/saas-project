//Client component because it will have routing and will be rendered on the client side
"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";

import { cn } from "@/lib/utils";
import { LayoutDashboard, MessageSquare, ImageIcon, VideoIcon, Music, Code, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { FreeCounter } from "./free-counter";


const montserrat = Montserrat({
    weight: "600", 
    subsets: ["latin"]
});

//Array of route objects to alter route data
const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
        color2: "text-sky-500",
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-emerald-500",
        color2: "text-sky-500",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700",
        color2: "text-sky-500",
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-700",
        color2: "text-sky-500",
    },
    {
        label: "Music Generation",
        icon: Music,
        href: "/music",
        color: "text-violet-500",
        color2: "text-sky-500",
    },
    {
        label: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-green-700",
        color2: "text-sky-500",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
    }
];

interface SidebarProps {
    apiLimitCount: number;
    isPro: boolean;
}
//MAKE IT SO THAT ON SMALL DEVICES THE SIDEBAR TURNS INTO A THINNER VERSION WITH JUST ICONS
//IF POSSIBLE TRY TO MAKE THE SIDEBAR CLOSE WHEN A ROUTE IS CLICKED
const Sidebar = ({apiLimitCount=0, isPro = false}: SidebarProps) => {
    const pathname = usePathname();
    return(
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className = "flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image fill alt="Logo" src="/logo.png"/>
                    </div>
                    <h1 className = {cn("text-2xl font-bold", montserrat.className)}>
                        Genius
                    </h1>
                </Link>
                {/* Spaces all elements evenly by 1 */}
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link 
                            href = {route.href} 
                            key = {route.href} 
                            className = {cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                            pathname === route.href ? "text-white bg-white/10" : "text0-zinc-500"
                        )}>
                            <div className="flex items-center flex-1">
                                <route.icon className = {`h-5 w-5 mr-3 ${route.color}`}/>
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <FreeCounter isPro = {isPro} apiLimitCount={apiLimitCount}/>
        </div>
    );
}

export default Sidebar;