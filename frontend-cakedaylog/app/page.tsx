import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>Home page</div>
      <div>Go to employees page</div>
      <div>
        <button className="button">
          <Link href={"/employees"}>Go</Link>
        </button>
      </div>
    </div>
  );
}
