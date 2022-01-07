import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useData from "./useData";
import './login.css';
import getCookie from './getCookie';

function Login({ nightMode, handleChangeLogged, logged, usernam }) {
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    const [data, setData] = useState([]);
    const history = useHistory();
    useEffect(() => {
        if (getCookie('usn'))
            history.push('/user');
    }, []);

    const checkUserInfo = (e) => {
        e.preventDefault();
        fetch('http://localhost:8000/admins/')
            .then(res => {
                if (res.ok)
                    return res.json()
            }).then((data) => {
                const alertText = document.getElementById('alertText');
                alertText.style.display = 'none';

                let check = false;
                data.map(item => {
                    if (email === item.username && pass === item.pass)
                        check = true;
                });
                if (check) {
                    handleChangeLogged(email);
                    // save To cookie
                    let time = new Date();
                    time.setTime(time.getTime() + (1 * 24 * 60 * 60 * 1000));
                    let expires = "expires=" + time.toUTCString();
                    let ck = document.cookie = 'usn=' + email + ';' + expires + ';path=/';
                    // move to user page
                    history.push('/user');
                }
                else {

                    alertText.style.display = 'block';
                }
            });


    }
    return (
        <div className="loginDivContainer">
            <img src="/imgs/loginImg.png" alt="login image" className="loginImg" />
            <div className="loginDiv">
                <h2 className={nightMode ? 'loginHeader loginHeaderNight' : 'loginHeader'}>Wellcome</h2>
                <form className="loginForm" onSubmit={checkUserInfo}>
                    <div className="inpputDiv emailDiv">
                        <label style={{ color: nightMode ? '#bbb' : '' }}>Email :</label>
                        <input style={{ color: nightMode ? '#999' : '' }} value={email} onChange={(e) => setEmail(e.target.value)} className="username" type="email" name="username" placeholder="Enter Your Email" required />
                    </div>
                    <div className="inpputDiv passDiv">
                        <label style={{ color: nightMode ? '#bbb' : '' }}>Password :</label>
                        <input style={{ color: nightMode ? '#ccc' : '' }} value={pass} onChange={(e) => setPass(e.target.value)} type="password" name="pass" required placeholder="Enter Your Password" />
                    </div>
                    <button>Login</button>
                </form>
                <p className="alertText" id="alertText">Wrong Email or password </p>
                <p style={{ color: nightMode ? '#888' : '' }} className="signupInfo">For signin you must contact us</p>
            </div>

        </div>
    );
}

export default Login;