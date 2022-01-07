import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './blog.css';
function Blog({ nightMode }) {
    const { id } = useParams();
    const [getId, setId] = useState(id);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [postDetail, setPostDetail] = useState(null);
    const [moreLink, setMoreLink] = useState(null);

    useEffect(() => {
        getData(id);
    }, []);
    const getData = (itemId) => {
        setLoading(true);
        setError(null);
        setMoreLink(null);
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
                    let postPosition = null;
                    res.map((item, pos) => {
                        if (item.id == itemId) {
                            postPosition = pos;
                            setPostDetail(item);
                        }
                    });
                    res.splice(postPosition, 1);
                    let finalList = [];
                    for (let index = 0; index < 3; index++) {
                        let rnd = getRandomInt(0, res.length - 1)
                        finalList.push(res[rnd]);
                        res.splice(rnd, 1);
                    }
                    setMoreLink(finalList);
                    setLoading(false);
                    setError(null);
                }).catch(err => {
                    setError(err);
                    setLoading(false);
                })

        }, 1000);
    }
    return (
        <>
            {moreLink &&
                <div className="blogSection">
                    <h4 className="blogHeader" style={{ color: nightMode ? '#bbb' : '' }}>{postDetail.title}</h4>
                    <p className="blogBody" style={{ color: nightMode ? '#999' : '' }}>{postDetail.body}</p>

                    <div className="blogFooter">
                        <div className="blogFooterImg" style={{ backgroundColor: nightMode ? '#7f56b1' : '' }}>{postDetail.author.slice(0, 1).toUpperCase()}</div>
                        <div className="blogFooterAuthorName">
                            <div className="blogFooterAuthor" style={{ color: nightMode ? '#aaa' : '' }}>{postDetail.author}</div>
                            <div className="blogFooterDate" style={{ color: nightMode ? '#777' : '' }}>{postDetail.date}</div>
                        </div>
                    </div>
                    <p className={nightMode ? 'seeMoreBlogNight' : 'seeMoreBlog'}>See more post</p>
                    {moreLink.map(item => (
                        <div className="seeMoreSection" key={item.id} onClick={() => getData(item.id)}>
                            <p style={{ color: nightMode ? '#aaa' : '' }} className="seeMoreSectionHeader">{item.title.slice(0, 40) + ' ...'}</p>
                            <p style={{ color: nightMode ? '#666' : '' }} className="seeMoreSectionBody">{item.body.slice(0, 100) + ' ...'}</p>
                        </div>

                    ))}
                </div>
            }
            {
                loading &&
                <div className={nightMode ? "blogLoadingSectionNight" : "blogLoadingSection"} >
                    <div className="blogLoadingSectionTitle" style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }}></div>
                    <div className="blogLoadingSectionBody" style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }}></div>
                    <div className="blogLoadingSectionBody" style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }}></div>
                    <div className="blogLoadingSectionBody" style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }}></div>
                    <div className="blogLoadingSectionBody" style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }}></div>
                    <div className="blogLoadingSectionBody" style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }}></div>
                    <div className="blogLoadingSectionBody" style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }}></div>
                    <div className="homeHeaderLoadingSection">
                        <div className="homeHeaderLoadingImg" style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }}></div>
                        <div className="homeHeaderLoadingAuthorName">
                            <div className="hoemHeaderAuthorNameDate" style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }}></div>
                            <div className="hoemHeaderAuthorNameOf" style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }}></div>
                        </div>
                    </div>
                    <div className="blogLoadingSeeMoreText" style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }}></div>
                    <div className="blogLoadingSeeMoreSection" style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }}></div>
                    <div className="blogLoadingSeeMoreSection" style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }}></div>
                    <div className="blogLoadingSeeMoreSection" style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }}></div>
                </div>
            }
        </>
    );
}

export default Blog;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}