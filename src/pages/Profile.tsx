import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getUserDetail } from "../lib/api";

type ProfileParams = {
  username: string;
};

type profileType = {
  dp: string;
};

const Profile = () => {
  const { username } = useParams<ProfileParams>();

  console.log({ usernameinprofile: username });

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

  console.log({ profile });

  return (
    <main>
      {profile && (
        <>
          {/* Image and overview */}
          <div className="bg-bgSecondary">
            {/* Backdrop image */}
            <div>
              <img src={``} alt={username} />
            </div>
            {/* Poster and overview */}
            <div className="flex px-28">
              {/* Poster and buttons */}
              <div className="w-2/12">
                <img
                  src={`https://image.tmdb.org/t/p/original${profile.dp}`}
                  alt={username}
                />
              </div>
              {/* title and overview */}
              <div className="w-9/12 ms-4 p-4">
                <div>{username}</div>
              </div>
            </div>
            {/* Links */}
            <div>Links</div>
          </div>
          <div className="px-28 pt-4">Blah blah</div>
        </>
      )}
    </main>
  );
};

export default Profile;
