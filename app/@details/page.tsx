import Link from "next/link";
import React from "react";

export default function Details(){
return(
    <div className="bg-blue-300">
        <Link href={"/settings"}>my details settings</Link>
    </div>
)
}