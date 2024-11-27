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
    setIsFavorite(!isFavorite);
    try {
      toast.promise(toggleFavorite(user, queryId), {
        error: "Error updating favorite",
        success: "Successfully Updated favorite",
        loading: "Updating favorite",
      });
    } catch (error) {
      setIsFavorite(!isFavorite);
      console.error("Error updating favorite:", error);
    }
  }

  return (
    <div className="flex items-center my-2">
      {/* <span className="mr-2">Favorite</span> */}
      <Tooltip>
        <TooltipTrigger asChild>
      <button
        onClick={handleToggleFavorite}
        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
        <Star
          className={`w-6 h-6 ${
              isFavorite 
              ? "fill-yellow-400 text-yellow-400" 
              : "text-gray-400"
            }`}
            />
      </button>
            </TooltipTrigger>
            <TooltipContent>
                Add to favorites
            </TooltipContent>
            </Tooltip>
    </div>
  );
};

export default FavoriteStarSwitch;