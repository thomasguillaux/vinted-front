import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const Payment = ({ userToken}) => {

    const { id } = useParams();
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState("");
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


    const handleSubmit = async (event) => {

        try {
            
            event.preventDefault();

            const cardElements = elements.getElement(CardElement);
            const stripeResponse = await stripe.createToken(cardElements, {
                name: data.owner.account.username,
            });

            const stripeToken = stripeResponse.token.id;

            const response = await axios.post(`https://vinted-andromeda-tguillaux.herokuapp.com/payment/${id}`, {
                stripeToken: stripeToken,
            });

            if (response.status === 200) {
                setSucceeded("Payment succeeded")
            }
            
        } catch (error) {
            console.log(error.message);
        }

    }

    return isLoading ? (
        <span>Loading...</span>
    ) : (
        <div className="order__container">
            <div className="payment__section">
            <div className="order__summary">
                <h1>Order summary</h1>
                <div className="order__details">
                    <div><span>Order</span><span>{data.product_price} €</span></div>
                    <div><span>Fees buyer's protection</span><span>{(data.product_price * 0.04).toFixed(2)} €</span></div>
                    <div><span>Delivery costs</span><span>{(data.product_price * 0.07).toFixed(2)} €</span></div>
                </div>
                <div className="order__total">
                    <span>Total</span><span>{Number((data.product_price) + (data.product_price * 0.04) + (data.product_price * 0.07)).toFixed(2)} €</span>
                </div>
                <div className="text__recap">
                    <p>You are about to buy the following article:</p>
                    <p>{data.product_name}</p>
                    <p>The total price for this article is {Number((data.product_price) + (data.product_price * 0.04) + (data.product_price * 0.07)).toFixed(2)} € (including fees and delivery costs)</p>
                </div>
            </div>
             <div>
                <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit">Confirm payment</button>
                </form>
                <span>{succeeded}</span>
            </div>
            </div>
        </div>
    )
}

export default Payment;
