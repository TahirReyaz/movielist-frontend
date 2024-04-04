import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { ProfileParams } from "..";
import Loading from "../../../components/UI/Loading";
import PageContainer from "../../../components/UI/PageContainer";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import { getUserDetail } from "../../../lib/api";

const Overview = () => {
  const { username } = useParams<ProfileParams>();
  const profileQuery = useQuery({
    queryKey: [`getUserProfile`],
    enabled: !!username,
    queryFn: () => getUserDetail(username),
  });

  if (profileQuery.isLoading) {
    return <Loading />;
  }

  return (
    <PageContainer>
      <div className="grid grid-cols-10 gap-4">
        <LeftSection {...profileQuery.data} />
        <RightSection />
      </div>
    </PageContainer>
  );
};

export default Overview;
