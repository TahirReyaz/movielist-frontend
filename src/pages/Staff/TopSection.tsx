import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { AiFillHeart } from "react-icons/ai";

import { toggleFav } from "../../lib/api/user";
import { RootState, favAction } from "../../store/AuthSlice";

interface TopSectionProps {
  name: string;
  id: string;
}

const TopSection = ({ name, id }: TopSectionProps) => {
  const { userid, fav } = useSelector((state: RootState) => state.auth);

  const isFav = fav?.staff?.includes(id);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleFavToggle = async (toFav: boolean) => {
    const res = await toggleFav(userid, id, "staff", toFav);
    if (!res.error) {
      toast.success(toFav ? "Added to Favourites" : "Removed from Favourites", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });

      dispatch(
        favAction({
          fav: res.fav,
        })
      );
      queryClient.invalidateQueries({
        queryKey: ["staff", id],
      });
    } else {
      toast.error(res.messsage, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <div className="pt-20 pb-12 ps-80 bg-bgForeground">
      <div className="ps-60 grid grid-cols-2 justify-between">
        <h1 className="font-extrabold text-5xl">{name}</h1>
        <div
          className="p-2 bg-favRed rounded grid items-center justify-center cursor-pointer"
          onClick={() => handleFavToggle(!isFav)}
        >
          <AiFillHeart
            className={`text-2xl ${isFav ? "text-favPink" : "text-white"}`}
          />
        </div>
      </div>
    </div>
  );
};

export default TopSection;
