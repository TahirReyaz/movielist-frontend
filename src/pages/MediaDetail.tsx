import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillHeart, AiOutlineDown } from "react-icons/ai";
import Tippy from "@tippyjs/react";

import "tippy.js/dist/tippy.css";

import { getMediaDetail } from "../lib/api";
import MediaDetailField from "../components/UI/MediaDetailField";
import MediaDetailCard from "../components/UI/MediaDetailCard";
import Button from "../components/UI/Button";
import MediaActionMenu from "../components/UI/MediaActionMenu";
import LowerLayout from "../components/UI/LowerLayout";

type MediaDetailParams = {
  mediaid: string;
};

export type MediaDetailType = {
  title: string;
  overview: string | undefined;
  poster_path: string;
  backdrop_path: string;
  status: string;
  number_of_episodes: string | undefined;
  first_air_date: string | undefined;
  release_date: string | undefined;
  runtime: string | undefined;
  vote_average: string | undefined;
  vote_count: string | undefined;
  popularity: string | undefined;
  production_companies: { id: number; name: string }[] | [];
  genres: { id: number; name: string }[] | [];
  original_name: string | undefined;
  original_title: string | undefined;
};

const MediaDetail = () => {
  const { mediaid } = useParams<MediaDetailParams>();
  const navigate = useNavigate();
  const [mediaDetails, setMediaDetails] = useState<MediaDetailType>();

  useEffect(() => {
    let tempMedia = [];
    async function fetchMedia() {
      tempMedia = await getMediaDetail("movie", mediaid);
      if (tempMedia.error) {
        navigate("/404");
      }
      setMediaDetails(tempMedia);
    }
    fetchMedia();
  }, [mediaid]);

  console.log({ mediaDetails });
  return (
    <main>
      {mediaDetails && (
        <>
          {/* Image and overview */}
          <div className="bg-bgSecondary">
            {/* Backdrop image */}
            <div className="h-[50vh] overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/original${mediaDetails.backdrop_path}`}
                alt={mediaDetails.title}
                className="object-top"
              />
            </div>
            {/* Poster and overview */}
            <div className="flex px-28">
              {/* Poster and buttons */}
              <div className="w-2/12">
                <img
                  src={`https://image.tmdb.org/t/p/original${mediaDetails.poster_path}`}
                  alt={mediaDetails.title}
                />
                <div className="flex w-full gap-2">
                  <Button
                    title="Add to List"
                    type="button"
                    endElement={
                      <Tippy
                        interactive={true}
                        placement="bottom-end"
                        arrow={true}
                        trigger="click"
                        content={
                          <MediaActionMenu
                            {...{
                              mediaid,
                              mediaDetails,
                            }}
                          />
                        }
                        className="py-2 bg-white"
                      >
                        <div className="bg-actionSecondary p-2 h-full rounded-r-lg">
                          <AiOutlineDown />
                        </div>
                      </Tippy>
                    }
                  />
                  <div className="p-2 bg-red rounded">
                    <AiFillHeart />
                  </div>
                </div>
              </div>
              {/* title and overview */}
              <div className="w-9/12 ms-4 p-4">
                <div>{mediaDetails.title}</div>
                {mediaDetails.overview && <div>{mediaDetails.overview}</div>}
              </div>
            </div>
            {/* Links */}
            <div>Links</div>
          </div>
          {/* Rest of the details */}
          <LowerLayout
            {...{
              left: (
                <>
                  <MediaDetailCard>
                    <>#75 Highest Rated All Time</>
                  </MediaDetailCard>
                  <MediaDetailCard>
                    <>#5 Most Popular All Time</>
                  </MediaDetailCard>
                  <MediaDetailCard>
                    <>
                      {mediaDetails.status && (
                        <MediaDetailField
                          fieldName="status"
                          value={mediaDetails.status}
                        />
                      )}

                      {mediaDetails.number_of_episodes && (
                        <MediaDetailField
                          fieldName="number_of_episodes"
                          value={mediaDetails.number_of_episodes}
                        />
                      )}

                      {mediaDetails.first_air_date && (
                        <MediaDetailField
                          fieldName="first_air_date"
                          value={mediaDetails.first_air_date}
                        />
                      )}

                      {mediaDetails.release_date && (
                        <MediaDetailField
                          fieldName="release_date"
                          value={mediaDetails.release_date}
                        />
                      )}

                      {mediaDetails.runtime && (
                        <MediaDetailField
                          fieldName="runtime"
                          value={mediaDetails.runtime}
                        />
                      )}

                      {mediaDetails.vote_average && (
                        <MediaDetailField
                          fieldName="vote_average"
                          value={mediaDetails.vote_average}
                        />
                      )}

                      {mediaDetails.vote_count && (
                        <MediaDetailField
                          fieldName="vote_count"
                          value={mediaDetails.vote_count}
                        />
                      )}

                      {mediaDetails.popularity && (
                        <MediaDetailField
                          fieldName="popularity"
                          value={mediaDetails.popularity}
                        />
                      )}

                      {mediaDetails.production_companies && (
                        <MediaDetailField
                          fieldName="production_companies"
                          values={mediaDetails.production_companies}
                          valkey="name"
                        />
                      )}

                      {mediaDetails.genres && (
                        <MediaDetailField
                          fieldName="genres"
                          values={mediaDetails.genres}
                          valkey="name"
                        />
                      )}

                      {mediaDetails.original_name && (
                        <MediaDetailField
                          fieldName="original_name"
                          value={mediaDetails.original_name}
                        />
                      )}

                      {mediaDetails.original_title && (
                        <MediaDetailField
                          fieldName="original_title"
                          value={mediaDetails.original_title}
                        />
                      )}
                    </>
                  </MediaDetailCard>
                </>
              ),
              right: <div>Right</div>,
            }}
          />
        </>
      )}
    </main>
  );
};

export default MediaDetail;
