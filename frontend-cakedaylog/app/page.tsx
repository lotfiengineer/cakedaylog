import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import { getAllCommunities } from "@/lib/hooks/communityMembersHooks";
import Link from "next/link";

export default async function Home() {
  const communityList = await getAllCommunities();

  return (
    <div className="flex flex-col items-center gap-3">
      <Link href={"/community"}>
        <Button>Create a community</Button>
      </Link>

      {communityList?.map((community) => (
        <Card key={community._id} className="w-full">
          <CardHeader>
            <CardTitle>Author: {community.author}</CardTitle>
            <CardDescription>Created at: {community.createdAt}</CardDescription>
          </CardHeader>

          <CardFooter>
            <Link
              className="w-full"
              href={`/community/${community._id}/members`}
            >
              <Button className="w-full">Add Member</Button>
            </Link>

            <Link className="w-full" href={`/community/${community._id}/`}>
              <Button variant={"secondary"} className="text-neutral-100 w-full">
                View Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
