"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCommunityMembers } from "@/lib/hooks/communityMembersHooks";
import { Member } from "@/lib/types/member";
import DeleteMember from "./DeleteMember.client";
import EditMember from "./EditMember.client";

interface Props {
  communityId: string;
}

const CommunityMembersList = ({ communityId }: Props) => {
  const { data: membersList } = useCommunityMembers(communityId);

  return (
    <div>
      <Table>
        <TableCaption>Members List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Firstname</TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead>Birthdate</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {membersList?.map((member: Member) => (
            <TableRow key={member._id}>
              <TableCell>{member.firstname}</TableCell>
              <TableCell>{member.lastname}</TableCell>
              <TableCell>{member.birthdate}</TableCell>

              <TableCell className="flex gap-1.5">
                <DeleteMember member={member} communityId={communityId} />

                <EditMember member={member} communityId={communityId} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CommunityMembersList;
