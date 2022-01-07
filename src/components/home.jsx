import useData from "./useData";
import './home.css';
import { Link } from "react-router-dom";
function Home({ nightMode }) {
    const { data, error, loading } = useData('http://localhost:8000/blog');
    const loadingLoop = [1, 2, 3];
    return (
        <>
            {loading &&
                loadingLoop.map(item => (
                    <div className={nightMode ? "homeLoadingSectionNight" : "homeLoadingSection"} key={item} >
                        <div className="homeHeaderLoadingSection">
                            <div className="homeHeaderLoadingImg" style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }}></div>
                            <div className="homeHeaderLoadingAuthorName">
                                <div className="hoemHeaderAuthorNameDate" style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }}></div>
                                <div className="hoemHeaderAuthorNameOf" style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }}></div>
                            </div>
                        </div>
                        <div className="homeLoadingPostHeader" style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }}></div>
                        <div className="homeLoadingPostBody" style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }}></div>
                        <div className="homeLoadingPostBody" style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }}></div>
                        <div className="homeLoadingPostBody" style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }}></div>
                        <div className="homeLoadingPostSee" style={{ backgroundColor: nightMode ? 'rgba(80,80,80,.2)' : '' }}></div>
                    </div>
                ))

            }
            {data && data.map(item => (
                <div key={item.id} className="postContainer">
                    <div className="postHeader">
                        <div className="postAuthorImg">{item.author.charAt(0).toUpperCase()}</div>
                        <div className='postAuthorDetail'>
                            <p className={nightMode ? "postDate postDateNight" : "postDate"} >{item.date}</p>
                            <p className={nightMode ? "postAuther postAutherNight" : "postAuther"}>{item.author}</p>
                        </div>
                    </div>
                    <h4 className={nightMode ? 'postTitle postTitleNight' : 'postTitle'}>{item.title.slice(0, 60) + ' ...'}</h4>
                    <p className={nightMode ? 'postContent postContentNight' : 'postContent'}>{item.body.slice(0, 140) + ' ...'}</p>
                    <Link className={nightMode ? 'postSeeMore postSeeMoreNight' : 'postSeeMore'} to={'/blog/' + item.id}>See more</Link>
                </div>
            ))}
            {
                error && <div>{error.message}</div>
            }
        </>
    );
}

export default Home;