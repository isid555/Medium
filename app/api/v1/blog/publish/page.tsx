"use client"
import { Appbar } from "@/components/Appbar";
import axios from "axios";

import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { useState } from "react";

const BACKEND_URL = "http://localhost:3000";
export default  function (){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();

    const handlePublish = async () => {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/routings/blog`,
                {

                    title,
                    content: description,
                    published:true,
                    authorId:"2459d1f7-ee44-498d-b5db-3429401dcca3"
                },

            );
            router.push(`http://localhost:3000/api/v1/blog/${response.data.id}`);
        } catch (error) {
            console.error("Error publishing the post:", error);
        }
    };

    return (
        <div>
            <Appbar />
            <div className="flex justify-center w-full pt-8">
                <div className="max-w-screen-lg w-full">
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Title"
                    />
                    <TextEditor
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button
                        onClick={handlePublish}
                        type="submit"
                        className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    >
                        Publish post
                    </button>
                </div>
            </div>
        </div>
    );
};

function TextEditor({
                        onChange,
                    }: {
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
    return (
        <div className="mt-2">
            <div className="w-full mb-4">
                <div className="flex items-center justify-between border">
                    <div className="my-2 bg-white rounded-b-lg w-full">
                        <label className="sr-only">Publish post</label>
                        <textarea
                            onChange={onChange}
                            id="editor"
                            rows={8}
                            className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
                            placeholder="Write an article..."
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
