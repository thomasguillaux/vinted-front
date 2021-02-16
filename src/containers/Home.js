import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import axios from 'axios';

const Home = () => {

const [data, setData] = useState();
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    const fetchData = async () => {
    const response = await axios.get("https://vinted-andromeda-tguillaux.herokuapp.com/offers");
    setData(response.data);
    console.log(response.data)
    setIsLoading(false);
    };
    fetchData();
  }, []);


    return (
        isLoading ? (
            <span>Loading...</span>
        ) : (
            <div>
            <Hero/>
                <div className="offers__container">
                {data.offers.map((offer, index) => {
                let id = data.offers[index]._id;
                   return (
                    
                    <Link to={`/offer/${id}`} style={{textDecoration: 'none'}}>
                    <div className="offer__page">
                        <div className="user__info">
                            <div className="avatar">
                                <img src={data.offers[index].owner.avatar.secure_url} alt=""/>
                            </div>
                            <div className="user__name">
                                <span>{data.offers[index].owner.account.username}</span>
                            </div>
                        </div>
                        <div className="product__img">
                            <img src={data.offers[index].product_image.secure_url} alt=""/>
                        </div>
                        <div className="product__info">
                            <div>{data.offers[index].product_price} €</div>
                            <div>{data.offers[index].product_details[0].BRAND}</div>
                            <div>{data.offers[index].product_details[1].SIZE}</div>

                        </div>  
                    </div>
                    </Link> 

                   )
                })}
                </div>
            
            </div>
        )
    );
}

export default Home;