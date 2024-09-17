

"use client"; // Ensures this component is rendered on the client side
import  { Appbar } from "@/components/Appbar"
import { BlogCard } from "@/components/BlogCard"
import { BlogSkeleton } from "@/components/BlogSkeleton";
import { useBlogs } from "@/app/hooks";
import {Quote} from "@/components/Quote";
import {Spinner} from "@/components/Spinner";
import {FullBlog} from "@/components/FullBlog";


export default  function (){
    const { loading, blogs } = useBlogs();

    if (loading) {
        return (
            <div>
                <Appbar />
                <div className="flex justify-center">
                    <div>
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Appbar/>
            <div className="flex justify-center">
                <div>
                    {Array.isArray(blogs) && blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <BlogCard
                                key={blog.id} // Add a unique key for each BlogCard
                                id={blog.id}
                                authorName={blog.authorId || "Anonymous"}
                                title={blog.title}
                                content={blog.content}
                                publishedDate={blog.published}
                            />
                        ))
                    ) : (
                        <div>No blogs available</div>
                    )}
                </div>
            </div>
        </div>
    );
};

