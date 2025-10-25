import Image from "next/image";
import Link from 'next/link';
export default function Home() {
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Link href="/login"><button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        login
      </button>
      </Link>
    </div>
  );
}
