import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import userAvatar from "../../assets/userAvatar.png";

import { getStaffDetails } from "../../lib/api/staff";
import Loading from "../../components/UI/Loading";
import Error from "../../components/UI/Error";
import { tmdbImgEndPoint, translateGender } from "../../constants/tmdb";
import TopSection from "./TopSection";
import Credits from "./Credits";
import { PersonDetail } from "../../constants/types/media";

const Staff = () => {
  const { staffid } = useParams();

  const {
    data: staff,
    isLoading,
    isError,
  } = useQuery<PersonDetail>({
    queryKey: ["staff", staffid],
    queryFn: () => getStaffDetails(staffid),
    enabled: !!staffid,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <main>
      {staff && <TopSection {...{ name: staff.name, id: staff.id }} />}
      {staff && (
        <div className="px-12 md:px-24">
          <div className="px:0 md:px-8 grid grid-cols-1 md:grid-cols-5">
            <div className="px-20 md:px-0">
              <img
                src={
                  staff.profile_path
                    ? `${tmdbImgEndPoint}${staff.profile_path}`
                    : userAvatar
                }
                alt={staff.name}
                className="rounded -mt-28"
              />
            </div>
            <div className="col-span-4 ps-0 md:ps-20 pt-8">
              {/* Detail fields */}
              <div className="mb-8">
                <DetailSection {...{ title: "Birth", value: staff.birthday }} />
                <DetailSection {...{ title: "Age", value: "" }} />
                <DetailSection
                  {...{
                    title: "Gender",
                    value: translateGender[staff.gender],
                  }}
                />
                <DetailSection {...{ title: "Years active", value: "" }} />
                <DetailSection
                  {...{
                    title: "Hometown",
                    value: staff.place_of_birth,
                  }}
                />
              </div>
              {/* Links */}
              {staff.homepage && (
                <div className="mb-8">
                  <Link
                    to={staff.homepage}
                    className="text-actionPrimary text-[1.4rem]"
                  >
                    Homepage
                  </Link>
                </div>
              )}
              {/* Bio */}
              <div className="mb-8 text-[1.4rem]">{staff.biography}</div>
              {/* Awards */}
              <div></div>
            </div>
          </div>
        </div>
      )}
      {staffid && <Credits {...{ id: staffid }} />}
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
