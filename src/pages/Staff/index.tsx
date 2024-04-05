import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import userAvatar from "../../assets/userAvatar.png";

import { getStaffDetails } from "../../lib/api/media";
import Loading from "../../components/UI/Loading";
import Error from "../../components/UI/Error";
import { tmdbImgEndPoint, translateGender } from "../../constants/tmdb";
import { Link } from "react-router-dom";

const Staff = () => {
  const { staffid } = useParams();

  const staffsQuery = useQuery({
    queryKey: ["staff", staffid],
    queryFn: () => getStaffDetails(staffid),
    enabled: !!staffid,
  });

  if (staffsQuery.isLoading) {
    return <Loading />;
  }

  if (staffsQuery.isError) {
    return <Error />;
  }

  return (
    <main>
      <div className="pt-20 pb-12 ps-80 bg-bgForeground">
        <div className="ps-60">
          <h1 className="font-extrabold text-5xl">{staffsQuery.data.name}</h1>
        </div>
      </div>
      <div className="px-24">
        <div className="px-8 grid grid-cols-5">
          <img
            src={
              staffsQuery.data.profile_path
                ? `${tmdbImgEndPoint}${staffsQuery.data.profile_path}`
                : userAvatar
            }
            alt={staffsQuery.data.name}
            className="rounded -mt-28"
          />
          <div className="col-span-4 ps-20 pt-8">
            {/* Detail fields */}
            <div className="mb-8">
              <DetailSection
                {...{ title: "Birth", value: staffsQuery.data.birthday }}
              />
              <DetailSection {...{ title: "Age", value: "" }} />
              <DetailSection
                {...{
                  title: "Gender",
                  value: translateGender[staffsQuery.data.gender],
                }}
              />
              <DetailSection {...{ title: "Years active", value: "" }} />
              <DetailSection
                {...{
                  title: "Hometown",
                  value: staffsQuery.data.place_of_birth,
                }}
              />
            </div>
            {/* Links */}
            <div className="mb-8">
              <Link
                to={staffsQuery.data.homepage}
                className="text-actionPrimary text-[1.4rem]"
              >
                Homepage
              </Link>
            </div>
            {/* Bio */}
            <div className="mb-8 text-[1.4rem]">
              {staffsQuery.data.biography}
            </div>
            {/* Awards */}
            <div></div>
          </div>
        </div>
      </div>
    </main>
  );
};

interface DetailSectionProps {
  title: string;
  value: string;
}

const DetailSection = ({ title, value }: DetailSectionProps) => {
  return (
    <div>
      <span className="text-[1.4rem] font-bold">{title}: </span>
      <span className="text-[1.4rem]">{value}</span>
    </div>
  );
};

export default Staff;
