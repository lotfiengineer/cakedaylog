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
import React from "react";
import {
  useCommunityMembers,
  useDeleteCommunityMember,
} from "../../../lib/hooks/communityMembersHooks";
import { Member } from "../../../lib/types/member";

interface Props {
  communitId: string;
}

const CommunityMembersList = ({ communitId }: Props) => {
  const { data: membersList } = useCommunityMembers(communitId);
  const { mutate: deleteCommunityMember } = useDeleteCommunityMember();

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
              <TableCell>
                <button
                  onClick={async () => {
                    deleteCommunityMember({
                      communityId: communitId,
                      memberId: member._id,
                    });
                  }}
                  className="bg-error text-white rounded-md p-1.5 cursor-pointer"
                >
                  Action
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CommunityMembersList;
