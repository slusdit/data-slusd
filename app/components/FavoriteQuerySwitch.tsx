"use client";

import { SessionUser } from "@/auth";
import { Switch } from "@/components/ui/switch";
import { toggleFavorite } from "@/lib/userFunctions";
import { toast } from "sonner";
import TestLogButton from "./TestLogButton";
import { useState } from "react";

const FavoriteQuerySwitch = ({
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
    <div className="flex my-2">
      <label htmlFor="favorite" className="mr-2">
        Favorite
      </label>

      <Switch
        id="favorite"
        className="mr-2"
        checked={isFavorite}
        onCheckedChange={handleToggleFavorite}
      />
     
    </div>
  );
};

export default FavoriteQuerySwitch;
