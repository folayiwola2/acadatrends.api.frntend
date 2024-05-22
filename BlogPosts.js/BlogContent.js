import React from 'react'

const BlogContent = ({ posts, loading }) => {
    console.log("other posts", posts, loading)
    if (loading) {
        return (<li>Loading Data...</li>)
    }
    return (
        <div>
            {
                posts.map(o => {
                    return (
                        <li key={o._id} className="list-group-item">
                            {o.title}
                        </li>
                    )
                })
            }
        </div>
    )
}

export default BlogContent
