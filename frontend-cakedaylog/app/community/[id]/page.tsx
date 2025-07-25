import { getCommunityById } from "@/lib/hooks/communityMembersHooks";
import React from "react";
import CommunityDetails from "./CommunityDetails.client";

const CommunityDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const communityDetails = await getCommunityById(id);

  return (
    <div>
      <CommunityDetails communityId={id} author={communityDetails.author} />
    </div>
  );
};

export default CommunityDetail;
