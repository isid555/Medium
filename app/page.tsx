"use client"
import Image from "next/image";
import {Appbar} from "@/components/Appbar";
import axios from "axios";
import {useRouter} from "next/navigation";
export default function Home() {

const router = useRouter();

  return (
  <div>
    <Appbar/>

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
          onClick={() => {
            router.push("http://localhost:3000/api/v1/blog/blogs");
          }}
          className="px-5 py-3 bg-blue-700 text-white rounded-lg text-md hover:bg-blue-800"
      >
        The Blogs
      </button>
    </div>
  </div>
  );
}
