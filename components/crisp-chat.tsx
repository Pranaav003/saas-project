"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("3494b2b2-8c05-4501-9f06-d71b468289e0")
    }, []);

    return null;
}