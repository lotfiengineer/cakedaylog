import AddCommunityMemberForm from "./AddCommunityMemberForm.client";
import CommunityMembersList from "./CommunityMembersList.client";
import { prefetchCommunityMembers } from "../../../lib/hooks/communityMembersHooks";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
  params: { id: string };
}

const CommunityMembers = async ({ params }: Props) => {
  const queryClient = await prefetchCommunityMembers();

  // todo: implement the feature to get one community and show the author here
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="py-10 max-w-xl mx-auto">
        <div className="flex flex-col w-full h-full justify-center">
          <div className="mb-3 text-center">
            This is the members of community with id: {params.id}
          </div>
          <AddCommunityMemberForm />
          <CommunityMembersList />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default CommunityMembers;
