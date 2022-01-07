import { Link } from 'react-router-dom';
import NightButton from './nightButton';
import './headerSection.css';
function HeaderSection({ activeNight, deactiveNight, nightMode, logged }) {
    return (
        <header className={nightMode ? 'headerNight' : ''}>
            <Link className={nightMode ? 'logo logoNight' : 'logo'} to='/'><p >BranNews</p></Link>
            <div className="icons">
                <Link className={nightMode ? ' user userNight' : 'user'} to={logged ? '/user' : '/login'}>perm_identity</Link>
                <NightButton activeNight={activeNight} deactiveNight={deactiveNight} nightMode={nightMode} />
            </div>

        </header>
    );
}

export default HeaderSection;