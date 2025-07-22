"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef } from "react";

import { useDeleteCommunityMember } from "@/lib/hooks/communityMembersHooks";
import { Member } from "@/lib/types/member";

const DeleteMember = ({
  member,
  communityId,
}: {
  member: Member;
  communityId: string;
}) => {
  const { mutate: deleteCommunityMember } = useDeleteCommunityMember();

  const closeRef = useRef<HTMLButtonElement>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Delete</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Community Member</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {member.firstname} {member.lastname}
            ?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button
            onClick={async () => {
              await deleteCommunityMember({
                communityId: communityId,
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
  );
};

export default DeleteMember;
