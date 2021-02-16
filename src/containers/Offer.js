import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const Offer = () => {
  const { id } = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(`https://vinted-andromeda-tguillaux.herokuapp.com/offer/${id}`);
              setData(response.data);
              setIsLoading(false);
          } catch (error) {
              console.log(error.message)
          }
      };
      fetchData();
  }, [id]);

    return isLoading ? (
        <span>Loading...</span>
    ) : (
        <div className="offer__section">
            <div className="offer__img">
                <img src={data.product_image.secure_url} alt="productitem"/>
            </div>
            <div className="offer__description">
                <div>
                    <h3>{data.product_price} €</h3>
                </div>
                <div className="pro_info">
                {data.product_details.map((elem, index) => {
                    const keys = Object.keys(elem);
                    return (
                       <div className="product__information">
                           <div className="keys">
                                <span>{keys[0]}</span>
                           </div>
                           <div className="keys__value">
                                <span>{elem[keys[0]]}</span>
                           </div>
                           
                       </div>
                    )
                })}
                </div>
                <div className="title__cart">
                    <p>{data.product_name}</p>
                    <p>{data.product_description}</p>
                    <div className="offer__userinfo">
                        <div className="avatar__offer">
                            <img src={data.owner.avatar.secure_url} alt=""/>
                        </div>
                        <div>
                            <span>{data.owner.account.username}</span>
                        </div>
                    </div>

                    <Link to={`/payment/${id}`} data={data} setData={setData}>Buy this article</Link>
                </div>
        
               
            </div>
        </div>
    )
  };

export default Offer;