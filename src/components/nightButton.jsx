import '../components/component.css'
function NightButton({ activeNight, deactiveNight, nightMode }) {
    return (
        <div className={nightMode ? "nightButtonContainer nightButtonContainerNight" : "nightButtonContainer"} onClick={() => nightMode ? deactiveNight() : activeNight()}>
            <p className='back'>dark_mode</p>
            <p className='front'>wb_sunny</p>
        </div>
    );
}

export default NightButton;