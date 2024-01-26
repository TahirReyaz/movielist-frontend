import React from "react";
import { Link } from "react-router-dom";
import { FaCircleChevronRight } from "react-icons/fa6";

import appIcon from "../../assets/apps.svg";
import statsIcon from "../../assets/stats.svg";
import socialIcon from "../../assets/social.svg";
import customIcon from "../../assets/custom.svg";

const Landing = () => {
  const cards = [
    {
      title: "Discover your obsessions",
      description:
        "What are your highest rated genres or most watched actors? Follow your watching habits over time with in-depth statistics.",
      img: statsIcon,
    },
    {
      title: "Bring MovieList anywhere",
      description:
        "Keep track of your progress on-the-go with one of many MovieList apps across iOS, Android, macOS, and Windows.",
      img: appIcon,
    },
    {
      title: "Join the conversation",
      description:
        "Share your thoughts with our thriving community, make friends, socialize, and receive recommendations.",
      img: socialIcon,
    },
    {
      title: "Tweak it to your liking",
      description:
        "Customize your scoring system, title format, color scheme, and much more! Also, we have a dark mode.",
      img: customIcon,
    },
  ];

  return (
    <section className="bg-bgPrimary px-56 pt-20">
      <h1 className="text-textWhite text-5xl font-bold">
        The next-generation movie platform
      </h1>
      <h2 className="text-textLightBlue text-4xl">
        Track, share, and discover your favorite movie and show with MovieList.
      </h2>
      <div className="flex flex-wrap justify-between">
        {cards.map((item) => (
          <div key={item.title} className="w-5/12 flex gap-2">
            <img src={item.img} className="size-sm w-1/4" />
            <div className="w-3/4">
              <h3 className="text-textWhite font-semibold text-3xl">
                {item.title}
              </h3>
              <div className="text-textLightBlue text-2xl">
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/signup" className="">
        <div className="flex bg-actionNav rounded-full p-2 items-center gap-4 w-52 mx-auto hover:shadow-[0_2px_40px_rgba(0,0,0,0.4)] hover:transition-shadow hover:duration-[0.4s] hover:ease-out hover:shadow-actionPrimary">
          <span className="font-extrabold text-textWhite text-3xl w-9/12 text-center">
            Join Now
          </span>
          <FaCircleChevronRight className="h-full text-textWhite w-3/12" />
        </div>
      </Link>
    </section>
  );
};

export default Landing;
