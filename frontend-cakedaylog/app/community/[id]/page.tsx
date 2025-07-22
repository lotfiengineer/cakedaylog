import { getCommunityById } from "@/lib/hooks/communityMembersHooks";
import React from "react";

const CommunityDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const communityDetails = await getCommunityById(id);
  return (
    <div>
      <div>You can see community birthdates here And edit the community</div>
      {communityDetails.author}
    </div>
  );
};

export default CommunityDetail;
