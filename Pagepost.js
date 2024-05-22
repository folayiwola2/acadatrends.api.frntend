import React from 'react'

export default function Pagepost({ posts, loading }) {
    if (loading) {
        return <li>Loading</li>
    }
    return (
        <div>
            <ul className="list-group mb-4">
                {
                    posts.map(post => {
                        return (<li key={post._id} className="list-group-item">
                            {post.title}
                        </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
