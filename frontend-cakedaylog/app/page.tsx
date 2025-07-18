"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>Home page</div>
      <div>Go to Community Members page</div>
      <div>
        <button className="button">
          <Link href={"/community-members"}>Go</Link>
        </button>
      </div>
    </div>
  );
}
