import React from 'react'

export default function PagedBlog({ postsPerPage, totalPosts, paginate }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }
    console.log("pnos", pageNumbers)
    return (
        <nav>
            <ul className="pagination">
                {
                    pageNumbers.map(numbers => {
                        return (
                            <li className="page-item" key={numbers}><a href="#" className="page-link" onClick={() => paginate(numbers)}>{numbers}</a></li>
                        )
                    })
                }

            </ul>
        </nav>
    )
}
