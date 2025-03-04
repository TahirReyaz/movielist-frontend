import React from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";

import ModSection from "./ModSection";
import LoadingPage from "../../components/UI/Loading/LoadingPage";
import Error from "../../components/UI/Error";
import { getMods } from "../../lib/api";
import { TMod } from "../../constants/Interfaces/mods";

const Moderators = () => {
  const {
    data: mods,
    isLoading,
    isError,
  } = useQuery<{ admins: TMod[] }>({
    queryKey: ["mods"],
    queryFn: () => getMods(),
  });

  if (isLoading) {
    return <LoadingPage />;
  }
  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Helmet>
        <title>{`Moderators · MovieList`}</title>
      </Helmet>
      <main className="pt-12 px-8 md:px-80 md:pt-20 min-h-[60vh]">
        {mods?.admins && (
          <ModSection
            {...{
              key: "admins",
              label: "Admins",
              type: "admin",
              list: mods.admins,
            }}
          />
        )}
      </main>
    </>
  );
};

export default Moderators;
