import Link from "next/link";
import React from "react";

export default function Property(){
return(
    <div className="bg-red-300">
        <Link href={"/settings"}>my details </Link>
    </div>
)
}