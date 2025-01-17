'use client'
import BackButton from "@/app/components/BackButton";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";


export default function Loading() {
    return (
        <div>
          <Button
          variant={"link"}>
            <div 
              
              className="hover:underline text-primary flex"
            ><ArrowLeft className="h-4 w-4 mr-2 text-primary " />Home</div>
          
        </Button>
          <Skeleton className="h-10 w-48 mb-4" /> {/* Title */}
          
                    
          Description: 
          <Skeleton className="h-20 w-full mb-4" /> {/* Description content */}
          
          Public/Private: <Skeleton className="h-6 w-48 mb-2" /> {/* Public/Private info */}
          Created By: <Skeleton className="h-6 w-64 mb-4" /> {/* Created By info */}
          
          {/* QueryInput or DataTable skeleton */}
          <Skeleton className="h-8 w-48 mb-4" /> {/* Subheading */}
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      )
}