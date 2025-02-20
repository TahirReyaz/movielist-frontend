import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import noImg from "../../assets/no_img_long.jpg";

import { getStaffDetails } from "../../lib/api";
import Loading from "../../components/UI/Loading";
import {
  profileSizes,
  tmdbImgBaseUrl,
  translateGender,
} from "../../constants/tmdb";
import TopSection from "./TopSection";
import Credits from "./Credits";
import { PersonDetail } from "../../constants/types/media";
import { Helmet } from "react-helmet-async";
import ExternalLinks from "./ExternalLinks";

const Staff = () => {
  const { staffid } = useParams();

  const navigate = useNavigate();

  const {
    data: staff,
    isLoading,
    isError,
  } = useQuery<PersonDetail>({
    queryKey: ["staff", staffid],
    queryFn: () => getStaffDetails(staffid!),
    enabled: !!staffid,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen p-20">
        <Loading />
      </div>
    );
  }

  if (isError) {
    navigate("/404");
  }

  return (
    <>
      <Helmet>
        <title>{`${staff?.name} · MovieList`}</title>
      </Helmet>
      <main>
        {staff && staff.id && (
          <TopSection {...{ name: staff.name, id: staff.id }} />
        )}
        {staff && (
          <div className="px-12 md:px-24">
            <div className="px:0 md:px-8 grid grid-cols-1 md:grid-cols-5">
              <div className="px-20 md:px-0">
                <img
                  src={
                    staff.profile_path
                      ? `${tmdbImgBaseUrl}/${profileSizes.md}${staff.profile_path}`
                      : noImg
                  }
                  alt={staff.name}
                  className="rounded -mt-28"
                />
              </div>
              <div className="col-span-4 ps-0 md:ps-20 pt-8">
                {/* Detail fields */}
                <div className="mb-8">
                  <DetailSection
                    {...{ title: "Birth", value: staff.birthday }}
                  />
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
                <ExternalLinks
                  {...{
                    homepage: staff.homepage,
                    ...staff?.external_ids,
                  }}
                />

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
    </>
  );
};

interface DetailSectionProps {
  title: string;
  value?: string;
}

const DetailSection = ({ title, value }: DetailSectionProps) => {
  if (!value) {
    return;
  }

  return (
    <div>
      <span className="text-[1.4rem] font-bold">{title}: </span>
      <span className="text-[1.4rem]">{value}</span>
    </div>
  );
};

export default Staff;
