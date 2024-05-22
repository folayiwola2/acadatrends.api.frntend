import React from 'react'

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
        console.log(i)
    }
    return (
        <nav>
            <ul className="pagination">
                {
                    pageNumbers.map(no => (
                        <li key={no} className="page-item">
                            <a href="#" className="page-link"
                                onClick={() => paginate(no)}
                            >
                                {no}
                            </a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Pagination
