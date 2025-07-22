"use client";

import MemberForm from "./MemberForm.client";

interface Props {
  communityId: string;
}

const AddCommunityMemberForm = ({ communityId }: Props) => {
  return (
    <div className="flex justify-center">
      <div className="w-full">
        <MemberForm communityId={communityId} />
      </div>
    </div>
  );
};

export default AddCommunityMemberForm;
