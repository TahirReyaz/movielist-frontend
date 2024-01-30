import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getUserDetail } from "../../lib/api";
import { listItemType, profileType } from ".";
import LowerLayout from "../../components/UI/LowerLayout";
import MediaListGroup from "../../components/UI/MediaListGroup";

const MovieList = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState<profileType>();

  const navigate = useNavigate();

  useEffect(() => {
    let tempuser = [];
    async function fetchMedia() {
      tempuser = await getUserDetail(username);
      if (tempuser.error) {
        navigate("/404");
      }
      setProfile(tempuser);
    }
    fetchMedia();
  }, [username]);

  return (
    <LowerLayout
      {...{
        left: (
          <div>
            <div>Search box</div>
            <div>Lists</div>
            <div>Filters</div>
            <div>Year</div>
            <div>Sort</div>
            <div>Button</div>
          </div>
        ),
        right: (
          <div className="flex flex-col">
            {profile && profile.lists.length > 0 ? (
              <>
                <div className="self-end">Buttons</div>
                {profile.lists.map((item: listItemType) => (
                  <MediaListGroup {...{ ...item, key: item.listtype }} />
                ))}
              </>
            ) : (
              <h3 className="text-2xl">No entries. Add some!!</h3>
            )}
          </div>
        ),
      }}
    />
  );
};

export default MovieList;
