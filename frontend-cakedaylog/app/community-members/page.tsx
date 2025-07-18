import AddCommunityMemberForm from "./AddCommunityMemberForm.client";
import CommunityMembersList from "./CommunityMembersList.client";
import { prefetchCommunityMembers } from "../../lib/hooks/communityMembersHooks";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const CommunityMembers = async () => {
  const queryClient = await prefetchCommunityMembers();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="py-10 max-w-xl mx-auto">
        <div className="flex flex-col w-full h-full justify-center">
          <AddCommunityMemberForm />
          <CommunityMembersList />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default CommunityMembers;
