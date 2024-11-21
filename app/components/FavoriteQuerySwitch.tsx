"use client";

import { SessionUser } from "@/auth";
import { Switch } from "@/components/ui/switch";
import { toggleFavorite } from "@/lib/userFunctions";
import { toast } from "sonner";
import TestLogButton from "./TestLogButton";

const FavoriteQuerySwitch = ({
  queryId,
  user,
}: {
  queryId: string;
  user: SessionUser;
}) => {
  async function handleToggleFavorite() {
    toast.promise(toggleFavorite(user, queryId), {
      error: "Error updating favorite",
      success: "Successfully Updated favorite",
      loading: "Updating favorite",
    });
  }
  return (
    <div className="flex">
      <label
        htmlFor="favorite"
        className="mr-2"
      >
        Favorite
      </label>

      <Switch
        id="favorite"
        className="mr-2"
        // checked={isFavorite}
        onCheckedChange={handleToggleFavorite}
          />
          <TestLogButton data={user.favorites} /> 
    </div>
  );
};

export default FavoriteQuerySwitch;
