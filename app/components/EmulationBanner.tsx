"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Eye, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface EmulationBannerProps {
  emulatingUser: {
    id: string;
    name: string;
    email: string;
  };
  realUser: {
    id: string;
    name: string;
    email: string;
    admin: boolean;
  };
}

export default function EmulationBanner({ emulatingUser, realUser }: EmulationBannerProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleStopEmulation = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/emulate", {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to stop emulation");
      }

      toast.success("Returned to your account");
      router.push("/");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to stop emulation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-amber-950 px-4 py-1 shadow-sm">
      <div className="container mx-auto flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          <span>
            Viewing as <strong>{emulatingUser.name}</strong>
            <span className="ml-1 text-amber-800 hidden sm:inline">({emulatingUser.email})</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-amber-800 hidden md:inline">
            {realUser.name}
          </span>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleStopEmulation}
            disabled={isLoading}
            className="h-6 px-2 text-xs bg-amber-100 hover:bg-amber-200 text-amber-900"
          >
            {isLoading ? (
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            ) : (
              <X className="h-3 w-3 mr-1" />
            )}
            Stop
          </Button>
        </div>
      </div>
    </div>
  );
}
