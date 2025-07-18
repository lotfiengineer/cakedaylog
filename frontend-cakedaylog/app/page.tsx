import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { getAllCommunities } from "@/lib/hooks/communityMembersHooks";
import Link from "next/link";

export default async function Home() {
  const communityList = await getAllCommunities();

  return (
    <div className="m-5">
      <div>
        {communityList?.map((community) => (
          <Card key={community._id} className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>{community.author}</CardTitle>
              <CardDescription>{community.createdAt}</CardDescription>
              <CardAction>
                <Button>
                  <Link href={`/community-members/${community._id}`}>Go</Link>
                </Button>
              </CardAction>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
