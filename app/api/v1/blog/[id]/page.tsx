// app/blog/[id]/page.tsx
'use client'; // Ensure this file is rendered as a client component

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios'; // To fetch dynamic route params
import { FullBlog } from '@/components/FullBlog'; // Import the FullBlog component
import { Blog } from '@/app/hooks'; // Import the Blog type

export default function BlogPage() {
    const { id } = useParams(); // Get blog ID from the dynamic route

    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get<Blog>(`http://localhost:3000/routings/blog?id=${id}`);
                setBlog(response.data);
            } catch (error) {
                setError('Error fetching blog');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBlog();
        }
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {blog ? (
                <FullBlog blog={blog} /> // Render the blog using the FullBlog component
            ) : (
                <p>Blog post not found</p>
            )}
        </div>
    );
}
