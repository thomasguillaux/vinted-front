import logo from '../logo.png'
import { Link } from 'react-router-dom'

const Header = ({ setUser, userToken }) => {
    return (
        <div className="navbar">
            <div className="logo">
                <Link to="/">
                <img src={logo} alt="logoVinted"/>
                </Link>
            </div>
            <div className="input__search">
                <input type="text" placeholder="Search for items"/>
            </div>
            <div>
                {userToken ? (
                    <button onClick={() => setUser(null)}>Sign out</button>
                ) : (
                <>
                <div className="login__signup">
                <div>
                    <Link to="/login" style={{ 
                        textDecoration: 'none',
                        color: '#09B1BA', 
                        fontSize: '13px',
                        fontFamily: 'Font 1',
                        }}>Log in</Link>
                    </div>
                    
                    <div>
                    <Link to="/signup" style={{ 
                         textDecoration: 'none',
                         color: '#09B1BA', 
                         fontSize: '13px',
                         fontFamily: 'Font 1',
                        }}>Sign up </Link>
                    </div>
                </div>
                    
                    
                </>
      )}
            </div>
            <div className="sell__articles">
                <button>Sell now</button>
            </div>
        </div>
    );
};

export default Header;
