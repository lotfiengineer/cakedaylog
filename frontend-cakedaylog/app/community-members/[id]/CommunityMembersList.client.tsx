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
import React, { useRef, useState } from "react";
import {
  useCommunityMembers,
  useDeleteCommunityMember,
} from "../../../lib/hooks/communityMembersHooks";
import { Member } from "../../../lib/types/member";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  communitId: string;
}

const CommunityMembersList = ({ communitId }: Props) => {
  const closeRef = useRef<HTMLButtonElement>(null);
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Delete</Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Delete Community Member</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete {member.firstname}{" "}
                        {member.lastname}?
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant={"outline"}>Cancel</Button>
                      </DialogClose>
                      <Button
                        onClick={async () => {
                          await deleteCommunityMember({
                            communityId: communitId,
                            memberId: member._id,
                          });
                          closeRef.current?.click();
                        }}
                      >
                        Yes!
                      </Button>
                      <DialogClose asChild>
                        <button ref={closeRef} className="hidden" />
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CommunityMembersList;
