import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

const Home = () => {

    const [loggedBtn, setLoggedBtn] = useState(false);

    useEffect(() => {
        const cookie = Cookies.get('user');
        if (cookie === undefined) {
            return setLoggedBtn(false);
        }

        const loginStatus = JSON.parse(cookie).isLoggedIn;
        if (loginStatus === 'true') {
            setLoggedBtn(true);
        }
    }, []);

    return (<>
        <section id="home" className="banner-wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-md-7 order-md-1 order-2 banner-content">
                        <h2 className="subheading"><span style={{ color: "rgb(38, 38, 38)" }}><span
                            style={{ color: "var(--blush)" }}>WANT</span> TO LEARN</span><br /></h2>
                        <h1 style={{ color: "rgb(54 58 69/1)" }}>
                            <Typewriter
                                options={{
                                    autoStart: true,
                                    loop: true,
                                }}
                                onInit={(typewriter) => {
                                    typewriter
                                        .typeString('Pro<span style="color: #df3b69; text-decoration: underline">gramming</span>')
                                        .pauseFor(2000)
                                        .deleteAll()
                                        .typeString('Dev<span style="color: #df3b69; text-decoration: underline">elopment</span>')
                                        .pauseFor(2000)
                                        .deleteAll()
                                        .typeString('Des<span style="color: #df3b69; text-decoration: underline">igning</span>')
                                        .pauseFor(2000)
                                        .deleteAll()
                                        .typeString('Much<span style="color: #df3b69; text-decoration: underline">More</span> ?')
                                        .pauseFor(2000)
                                        .deleteAll()
                                        .start();
                                }}
                            />
                        </h1>
                        <h4>Join Now And Start Learning<br />From Leading Teachers In Industry.</h4>
                        {loggedBtn ? <Link className="btn my-btn-outline" style={{ width: "6.2rem" }} to={"/dashboard"}>Dashboard</Link> : <Link className="btn my-btn-outline" to={"/register"}>Sign Up</Link>}
                        <Link className="btn my-btn" to={"/course"}>Courses</Link>
                    </div>
                    <div className="col-md-5 order-md-2 order-1 banner-img" style={{ textAlign: "center" }}>
                        <video className='banner-video' autoPlay loop muted playsInline disablePictureInPicture style={{ paddingBottom: "0px", paddingTop: "0px", marginTop: "-20px" }}>
                            <source src="https://res.cloudinary.com/dhfuu5omv/video/upload/v1711208222/braintube/vizmmlzfsbsbopewkfg8.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
        </section></>);
}

export default Home;