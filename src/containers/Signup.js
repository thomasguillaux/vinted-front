import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'

const Signup = ({ setUser }) => {

    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [avatar, setAvatar] = useState();
    const [profileRender, setProfileRender] = useState('https://az-pe.com/wp-content/uploads/2018/05/kemptons-blank-profile-picture.jpg');

    const history = useHistory();

    const handleSubmit = async (event) => {
        try {
            
            event.preventDefault();

            const formData = new FormData();
            formData.append("email", email)
            formData.append("username", username)
            formData.append("phone", phone)
            formData.append("password", password)
            formData.append("avatar", avatar)

            const response = await axios.post("https://vinted-andromeda-tguillaux.herokuapp.com/user/signup", formData);
       
            const token = response.data.token;
            console.log(response)
            setUser(token)
            history.push("/")
 
        } catch (error) {
            console.log(error.message);
        }
         
    }

    const imageHandler = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setProfileRender(reader.result)
            }
        }
        reader.readAsDataURL(event.target.files[0])
        setAvatar(event.target.files[0])
    }


    return (
        <div className="login__section"> 
         
        <div>
            <form onSubmit={handleSubmit} className="login__module">

                <div className="container">
                    <div className="img-holder">
                        <img src={profileRender} id="img" className="img" alt="avatar"></img>
                    </div>
                    <input type="file" name="image-upload" id="input" accept="image/*" onChange={imageHandler}/>
                    <div className="label">
                        <label htmlFor="input" className="image-upload">
                            Choose your profile picture
                        </label>
                    </div>
                </div>

            <input onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Email"/>
            <input onChange={(event) => setUsername(event.target.value)} type="text" placeholder="Username"/>
            <input onChange={(event) => setPhone(event.target.value)} type="text" placeholder="Phone"/>
            <input onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password"/>
            <button type="submit">Sign up</button>
            </form>
        </div>
        </div>
        
    )
};

export default Signup;