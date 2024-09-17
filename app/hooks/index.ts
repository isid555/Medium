"use client"; // Ensures it's a client-side component
import { useEffect, useState } from "react";
import axios from "axios";

// Use environment variable for backend URL
const BACKEND_URL ="http://localhost:3000";

export interface Blog {
    content: string;
    title: string;
    id: string;
    published:boolean;
   authorId: string;
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog | undefined>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

        axios.get(`${BACKEND_URL}/routings/blog?id=${id}`)
            .then((response) => {
                setBlog(response.data.blog);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching blog:", error);
                setError("Failed to load blog");
                setLoading(false);
            });
    }, [id]);

    return {
        loading,
        blog,
        error,
    };
};

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        axios.get(`${BACKEND_URL}/routings/blog/all`)
            .then((response) => {
                console.log(response.data);
                setBlogs(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching blogs:", error);
                setError("Failed to load blogs");
                setLoading(false);
            });
    }, []);

    return {
        loading,
        blogs,
        error,
    };
};
