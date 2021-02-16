import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'

const Login = ({ setUser }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const history = useHistory();
    
    const handleSubmit = async (event) => {
        try {
            
        event.preventDefault();
        const response = await axios.post("https://vinted-andromeda-tguillaux.herokuapp.com/user/login", {
            email: email,
            password: password
        });
        const token = response.data.token
        setUser(token)
        history.push("/");

        } catch (error) {
            console.log(error.message);
        }
        
    };

    return (
        <div className="login__section">
            <div>
            <h1>Log In</h1>
            </div>
            <div>
            <form onSubmit={handleSubmit} className="login__module">
                <input onChange={(event) => setEmail(event.target.value)} type="text" placeholder="Email"/>
                <input onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password"/>
                <button type="submit">Log In</button>
            </form>
            </div>
            
        </div>
    )
}

export default Login;