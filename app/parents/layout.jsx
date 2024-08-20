"use client"
import { ParentProvider } from "@/providers/parentProvider";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function RootLayout({ children }) {

    return (
        <ParentProvider>
       {children}
       </ParentProvider>
    )
}