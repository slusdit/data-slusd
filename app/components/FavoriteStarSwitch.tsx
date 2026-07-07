"use client";
import { SessionUser } from "@/auth";
import { Star } from "lucide-react";
import { toggleFavorite } from "@/lib/userFunctions";
import { toast } from "sonner";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const FavoriteStarSwitch = ({
  queryId,
  user,
}: {
  queryId: string;
  user: SessionUser;
}) => {
  const [isFavorite, setIsFavorite] = useState(
    user.favorites.some((q) => q.id === queryId)
  );

  async function handleToggleFavorite() {
    const previous = isFavorite;
    const next = !isFavorite;
    setIsFavorite(next); // optimistic update

    // Await the same promise the toast tracks, so a failure actually rolls back.
    const promise = toggleFavorite(user, queryId);
    toast.promise(promise, {
      loading: "Updating favorite",
      success: next ? "Added to favorites" : "Removed from favorites",
      error: "Error updating favorite",
    });
    try {
      await promise;
    } catch (error) {
      setIsFavorite(previous); // rollback on failure
      console.error("Error updating favorite:", error);
    }
  }

  return (
    <div className="flex items-center my-2">
      <Tooltip>
        <TooltipTrigger asChild>
      <button
        onClick={handleToggleFavorite}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={isFavorite}
        className="p-1 rounded-full hover:bg-muted transition-colors"
        >
        <Star
          className={`w-6 h-6 ${
              isFavorite
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground"
            }`}
            />
      </button>
            </TooltipTrigger>
            <TooltipContent>
                {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </TooltipContent>
            </Tooltip>
    </div>
  );
};

export default FavoriteStarSwitch;