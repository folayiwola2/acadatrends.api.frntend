import React, { useState, useEffect } from 'react'
import Logo from './assets/logo-acada-black.svg'
import { Link } from "react-router-dom";
import image1 from './assets/image1.jpg';
import image2 from './assets/image2.jpg';

const Sample = () => {

    const [clicked, setClicked] = useState(0)
    const handleClick = (e) => {
        e.preventDefault()
        // console.log("clicked", clicked)
        if (clicked) {
            setClicked(0);
        } else {
            setClicked(1);
        }

    }

    return (
        <section>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">
                    <img src={Logo} alt="Hello" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active" id="headingOne">
                            <Link to="/privacy" className="nav-link"><button className="btn btn-primary">Privacy Policies</button> <span className="sr-only">(current)</span></Link>
                        </li> </ul>
                </div>
            </nav>
            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div className="card-body">
                    {
                        clicked ? (
                            (
                                <div>  We do not share personal information with third-parties nor do we store
                                information we collect about your visit to this blog for use other than
                                 to analyze content performance through the use of cookies, which you
                                  can turn off at any time by modifying your Internet browser's settings.
                                   We are not responsible for the republishing
                               of the content found on this blog on other Web sites or media
                                without our permission. This privacy policy is subject to change without notice.</div>
                            )
                        ) : null
                    }

                </div>
            </div>

            <div className="d-flex justify-content-center align-items-center container" style={image_div_style}>
                <div className="col-md-6 image-1" style={image_one_style}></div>
                <div className="col-md-6 image-2" style={image_two_style}></div>
            </div>
        </section>
    )
}



export default Sample


const image_one_style = {
    background: `url(${image1}) no-repeat center center/cover`,
    height: `108vh`
}

const image_two_style = {
    background: `url(${image2}) no-repeat center center/cover`,
    height: `108vh`
}


const image_div_style = {
    marginTop: `12vh`,
    /* border: 2px solid; */
    height: `108vh`
}