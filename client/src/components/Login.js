import React, { useEffect, useState, } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// import Google from '../img/Social-google.svg';

const Login = (props) => {

    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const [data, setData] = useState("");
    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData("");
        setUser(
            { ...user, [name]: value }
        );
    }

    const formSubmit = async (e) => {
        e.preventDefault();
        setShow(false);
        setData("");

        if (!user.username || !user.password) {
            return;
        }

        try {
            const response = await axios.post('/login', user);
            if (response.status === 200) {
                props.setLoggedIn(response.data.name);
                navigate("/dashboard");
            }
        } catch (error) {
            const { status, data } = error.response;
            if (status === 400) {
                setUser({
                    ...user,
                    password: ""
                });
                setData(data.msg);
            }

            if (data.msg === "Account not verified, please verify!") setShow(true);
        }
    }

    useEffect(() => {
        if (props.setLoggedOff()) {
            navigate("/dashboard");
        } else {
            props.setLoggedOff();
        }
    }, []);

    return (<>
        <section>
            <div className="login-holder">
                <div className="login">
                    <h4>Log in to Coursely</h4>
                    {/* <div>
                        <button className="google-btn btn">
                            <Link className='custom-link' to={"/auth/google"}>
                                <img src={Google} alt='google' />&nbsp;Continue with Google
                            </Link>
                        </button>
                    </div> */}
                    <div className='emailOrgoogle'>
                        <span className='emailOrgoogle-text'>Continue with email</span>
                    </div>

                    <form method='POST'>
                        <div>
                            <div>
                                <input className='form-control login-input' type="email" onChange={handleChange} autoComplete="off"
                                    placeholder="Email" name='username' required value={user.email} />
                            </div>
                            <div>
                                <input className='form-control login-input' type="password" onChange={handleChange} autoComplete="off"
                                    placeholder="password" name='password' required value={user.password} />

                            </div>
                            {data && <><div className='login-input verify' style={{ backgroundColor: "#dc5a5a" }}>
                                <span>{data}</span>
                            </div>
                                {show && <><span style={{ color: "#656d77", fontSize: "0.79rem" }} data-bs-toggle="modal" data-bs-target="#notreceived">
                                    Can't find Email?
                                </span>
                                    <div className="modal fade" id="notreceived" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-sm">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    If you can't find email in inbox, kindly check spam folder and rest other folders too.
                                                </div>
                                            </div>
                                        </div>
                                    </div></>}</>}
                            <div>
                                <button className="btn my-btn btn-lg-rg" onClick={(e) => formSubmit(e)}>Login</button>
                            </div>
                        </div>
                    </form>
                    <div className='my-2'>
                        <span><strong><Link className="custom-link alter-lg-rg" to={"/users/reset"}>Forgot password?</Link></strong></span>
                    </div>
                    <div className='switch-holder'>
                        <span className='acc-switch'>Don't have an Account?&nbsp;<strong><Link className="custom-link alter-lg-rg" to={"/register"}>Sign up</Link></strong></span>
                    </div>
                </div>
            </div >
        </section >
    </>);
}

export default Login;