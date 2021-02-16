import banner from '../hero_banner.jpeg'

const Hero = () => {
    return (
        <div>
            <div className="banner__img">
                <img src={banner} alt=""/>
                <div className="banner__link">
                    <h1>Ready to declutter your wardrobe?</h1>
                    <button>Sell now</button>
                    <span>Learn how it works</span>
                </div>
            </div>
        </div>
    );
};

export default Hero;