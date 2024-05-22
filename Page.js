import React, { useState, useEffect } from 'react'
import Pagepost from './Pagepost';
import Pagination from './Pagination';

export default function Page() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currPage, setCurrPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);

    useEffect(() => {
        // works like componentDidMount but gets update if there is any change
        const fetchPosts = async () => {
            setLoading(true);
            await fetch(`http://localhost:4000/api/news`).then(res => {
                return res.json()
            }).then(data => {
                setPosts(data.data)
                setLoading(false)
            })
        }
        fetchPosts()
    }, []); //to avoid multiple updates use []
    console.log("posts", posts)

    const indexofLastPost = currPage * postsPerPage;
    const indexofFirstPost = indexofLastPost - postsPerPage;
    const currPosts = posts.slice(indexofFirstPost, indexofLastPost)

    const paginate = (pageNumber) => setCurrPage(pageNumber)

    return (
        <div className="container">
            <h1 className="text-primary mb-3">My blog</h1>
            <Pagepost posts={currPosts} loading={loading} />
            <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
        </div>
    )
}
