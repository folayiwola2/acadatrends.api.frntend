import React, { useEffect, useState } from 'react'
import BlogContent from './BlogContent';
import PagedBlog from './PagedBlog';

const Blogs = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currPage, setCurrPage] = useState(1)
    const [postsPerPage, setPostsPerpage] = useState(10);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            fetch(`http://localhost:4000/api/news`).then(res => {
                return res.json()
            }).then(data => {
                setPosts(data.data);
                setLoading(false);
            })
        }

        fetchPosts();
    }, []);

    console.log(posts)

    const indexOfLastPost = currPage * postsPerPage;
    const indexofFirstPost = indexOfLastPost - postsPerPage;
    const currPosts = posts.slice(indexofFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrPage(pageNumber)

    return (
        <div>
            <h3> My Blogs</h3>
            <BlogContent posts={currPosts} loading={loading} />
            <PagedBlog postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
        </div>
    )
}

export default Blogs
