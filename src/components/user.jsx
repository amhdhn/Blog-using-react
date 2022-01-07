import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import useData from './useData';
import './user.css';
import getCookie from './getCookie';
function User({ nightMode, handleLogOut, logged, username }) {
    const history = useHistory();
    const [profileActive, setProfileActive] = useState(true);
    const [postActive, setPostActive] = useState(false);
    const [addPostActive, setAddPostActive] = useState(false);
    const [changePassActive, setChangePassActive] = useState(false);
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');

    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [addNewPostTitleValue, setAddNewPostTitleValue] = useState('');
    const [addNewPostBodyValue, setAddNewPostBodyValue] = useState('');

    const loadingLoop = [1, 2, 3];
    useEffect(() => {
        if (!getCookie('usn'))
            history.push('/login');
    }, []);
    const onLogOut = () => {
        clearCookie();
        handleLogOut();
        history.push('/login/');
    }

    const onProfile = () => {
        if (!profileActive) {
            setProfileActive(true);
            setPostActive(false);
            setAddPostActive(false);
        }
    }

    const onPost = () => {
        if (!postActive) {
            if (!data)
                getItems();
            setPostActive(true);
            setProfileActive(false);
            setChangePassActive(false);
            setAddPostActive(false);
        }
    }
    const onAddPost = () => {
        if (!addPostActive) {
            setPostActive(false);
            setProfileActive(false);
            setChangePassActive(false);
            setAddPostActive(true);
        }
    }
    const onChangePassActive = () => {
        if (!changePassActive) {
            setChangePassActive(true);
        }
    }
    const onChangePassDeActive = () => {
        if (changePassActive) {
            setChangePassActive(false);
            setPass1('');
            setPass2('');
        }
    }
    const handleDeletePost = (itemsId, position) => {
        fetch('http://localhost:8000/blog/' + itemsId, {
            method: "DELETE"
        }).then(res => {
            getItems();
        });
    }

    const getItems = () => {
        setTimeout(() => {
            fetch('http://localhost:8000/blog').
                then(res => {
                    if (!res.ok) {
                        throw Error('Error : ' + res.status);
                    }
                    else {
                        return res.json();
                    }
                }).then(res => {
                    let authorData = [];
                    let authorName = username.slice(0, username.indexOf('@')).toLowerCase();
                    res.map(item => {
                        if (item.author.toLowerCase() === authorName) {
                            authorData.push(item);
                        }
                    })
                    setData(authorData);
                    setLoading(false);
                    setError(null);
                }).catch(err => {
                    setError(err);
                    setLoading(false);
                });
        }, 2000);
    }
    const changePassReq = (e) => {

        e.preventDefault();
        if (pass1 !== pass2)
            console.log('passWords dosent match');
        else {
            fetch('http://localhost:8000/admins/')
                .then(res => {
                    if (res.ok)
                        return res.json()
                }).then((result) => {
                    let changeUserInfo = [];
                    result.map(user => {
                        if (user.username === username) {
                            changeUserInfo = user;
                        }
                    });
                    changeUserInfo.pass = pass1;

                    fetch('http://localhost:8000/admins/' + changeUserInfo.id, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(changeUserInfo)
                    }).then((src) => {
                    });

                    onChangePassDeActive();
                });

        }

    }
    const submitPost = (e) => {
        e.preventDefault();
        const date = getDate();
        const blog = { title: addNewPostTitleValue, body: addNewPostBodyValue, author: username.slice(0, username.indexOf('@')), date };
        fetch('http://localhost:8000/blog', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then((src) => {
            console.log(src);
            console.log('added');
            setAddNewPostBodyValue('');
            setAddNewPostTitleValue('');
        });
    }
    return (
        <>
            <div className="userContainer">
                <div className="userHeader" style={{ backgroundColor: nightMode ? '#1b2330' : '' }}>
                    <p className="wellcome" style={{ color: nightMode ? '#ccc' : '' }}>Wellcome {username}</p>
                    <p className="logout" onClick={onLogOut} style={{ color: nightMode ? '#aaa' : '' }}>Logout</p>
                </div>
                <div className="userControllBox" >
                    <div className="userControllIcons" style={{ backgroundColor: nightMode ? '#1b2330' : '' }}>
                        <p onClick={onProfile} className={profileActive ? nightMode ? 'controllButtunActiveNight' : 'controllButtunActive' : nightMode ? 'controllButtunNight' : 'controllButtun'} >Profile</p>
                        <p onClick={onPost} className={postActive ? nightMode ? 'controllButtunActiveNight' : 'controllButtunActive' : nightMode ? 'controllButtunNight' : 'controllButtun'}>Delete post</p>
                        <p onClick={onAddPost} className={addPostActive ? nightMode ? 'controllButtunActiveNight' : 'controllButtunActive' : nightMode ? 'controllButtunNight' : 'controllButtun'} >Add new post</p>

                    </div>
                    <div onSubmit={changePassReq} className="profileEditSection" style={{ display: profileActive ? '' : 'none' }}>
                        <form className="changePassSection">
                            <p className="changePassButton" onClick={onChangePassActive} style={{ color: nightMode ? '#aaa' : '' }}>Change Password</p>
                            <div className="changePassDiv" style={{ display: changePassActive ? '' : 'none' }}>
                                <p className="closeChangePassDiv" onClick={onChangePassDeActive} style={{ color: nightMode ? '#aaa' : '' }}>close</p>
                                <div className="changePassInputDiv">
                                    <label style={{ color: nightMode ? '#999' : '' }}>Password</label>
                                    <input style={{ color: nightMode ? '#999' : '' }} value={pass1} onChange={(e) => setPass1(e.target.value)} type="password" required placeholder="Enter new Password" />
                                </div>
                                <div className="changePassInputDiv">
                                    <label style={{ color: nightMode ? '#999' : '' }}>Confirm Password</label>
                                    <input style={{ color: nightMode ? '#999' : '' }} value={pass2} onChange={(e) => setPass2(e.target.value)} type="password" required placeholder="Confirm your Password" />
                                </div>
                                <button>Confirm</button>
                            </div>
                        </form>
                    </div>

                    <div className="addPostSection" style={{ display: addPostActive ? '' : 'none' }}>
                        <form onSubmit={submitPost} className="addNewPostForm">
                            <label style={{ color: nightMode ? '#aaa' : '' }}>Title</label>
                            <input style={{ color: nightMode ? '#999' : '' }} placeholder="insert Title here ..." type="text" className="addNewPostTitle" required value={addNewPostTitleValue} onChange={(e) => setAddNewPostTitleValue(e.target.value)} />
                            <label style={{ color: nightMode ? '#aaa' : '' }}>Body</label>
                            <textarea style={{ color: nightMode ? '#999' : '' }} placeholder="insert post Body here ..." className="addNewPostBody" required value={addNewPostBodyValue} onChange={(e) => setAddNewPostBodyValue(e.target.value)}></textarea>
                            <button className="addNewPostButt">Add Post</button>
                        </form>
                    </div>
                    <div className="postEditSection" style={{ display: postActive ? '' : 'none' }}>
                        {
                            data && data.map(item => (
                                <div key={item.id} className="postEditSectionItem">
                                    <p style={{ color: nightMode ? '#ccc' : '' }} className="postListHeader">{item.title}</p>
                                    <p style={{ color: nightMode ? '#999' : '' }} className="postEditContent">{item.body}</p>
                                    <p onClick={() => handleDeletePost(item.id)} className="postDelete">Delete post</p>
                                </div>

                            ))
                        }
                        {loading &&
                            loadingLoop.map(value => (
                                <section key={value} className={nightMode ? 'postEditLoadingSectionNight' : 'postEditLoadingSection'}>
                                    <div style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }} className="postEditLoadingHeader"></div>
                                    <div className="postEditLoadingPost" style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }}></div>
                                    <div className="postEditLoadingPost" style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }}></div>
                                    <div className="postEditLoadingPost" style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }}></div>
                                    <div className="postEditLoadingbutton" style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }}></div>
                                </section>
                            ))


                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default User;
function clearCookie() {
    let time = new Date();
    time.setFullYear(2000);
    let expires = "expires=" + time.toUTCString();
    let ck = document.cookie = 'usn=me' + ';' + expires + ';path=/';
}
const getDate = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const d = new Date();
    return d.getDay() + ' ' + monthNames[d.getMonth()] + ' ' + d.getFullYear();
}