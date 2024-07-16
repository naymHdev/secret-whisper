import Link from "next/link";

export default function NotFound() {
  return (
    <div className=" flex flex-col items-center justify-center h-screen space-y-3">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <button className="btn border border-black px-6 py-2">
        <Link href="/">Return Home</Link>
      </button>
    </div>
  );
}
