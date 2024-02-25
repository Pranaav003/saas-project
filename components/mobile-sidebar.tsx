 "use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";
import { useState, useEffect } from "react";

interface MobileSidebarProps {
    apiLimitCount: number;
    isPro: boolean;
}

//Causing Hydration error
// Why? because of the use of SheetContent and SheetTrigger components, which are not supported by SSR, so we need to wrap the component with the "useClient" hook to make sure it's only rendered on the client side.
//SSR stands for Server Side Rendering, and it's a technique used to render a client-side application on the server and send it to the client as a fully rendered page. This allows the client to display the page without having to wait for the JavaScript to load and execute.
const MobileSidebar = ({ apiLimitCount = 0, isPro = false }: MobileSidebarProps) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(()=>{
        setIsMounted(true);
    }, []);

    if(!isMounted) return null; //This is to prevent the component from rendering on the server side (SSR)

    return(
        <Sheet>
            <SheetTrigger>
                <Button variant = "ghost" size = "icon" className = "md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side= "left" className ="p-0">
                <Sidebar isPro = {isPro} apiLimitCount={apiLimitCount}/>
            </SheetContent>
        </Sheet>
    );
}

export default MobileSidebar; 