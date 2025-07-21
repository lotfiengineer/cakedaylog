import AddCommunityMemberForm from "./AddCommunityMemberForm.client";
import CommunityMembersList from "./CommunityMembersList.client";
import { getCommunityById, prefetchCommunityMembers } from "../../../lib/hooks/communityMembersHooks";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
  params: { id: string };
}

const CommunityMembers = async ({ params }: Props) => {
  const { id: communitId } = await params;
  const queryClient = await prefetchCommunityMembers(communitId);
  const res = await getCommunityById(communitId);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="py-10 max-w-xl mx-auto">
        <div className="flex flex-col w-full h-full justify-center">
          <div className="mb-3 text-center">
            This is the members of community with id: {res.author}
          </div>
          <AddCommunityMemberForm communitId={communitId} />
          <CommunityMembersList communitId={communitId} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default CommunityMembers;
