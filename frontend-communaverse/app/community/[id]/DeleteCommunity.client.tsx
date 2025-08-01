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
import { useDeleteCommunity } from "@/lib/hooks/communityHooks";

import { useRef } from "react";

const DeleteCommunity = ({ communityId }: { communityId: string }) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { mutate: deleteCommunity } = useDeleteCommunity();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-error hover:bg-error-300 mt-7">
          Delete Community
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Commuunity</DialogTitle>
          <DialogDescription>
            You are about to delete the community.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>

          <Button
            onClick={() => {
              deleteCommunity(communityId);
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

export default DeleteCommunity;
