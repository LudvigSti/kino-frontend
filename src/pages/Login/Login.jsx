import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className='login-page'>
      <div className='login-card'>
        <h2>Login</h2>
        <form>
          <div className='input-group'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              placeholder='Enter your username'
            />
          </div>
          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              placeholder='Enter your password'
            />
          </div>
          <Link to='/'>
            <button type='submit' className='login-button'>
              Log In
            </button>
          </Link>
        </form>
        <p className='register-link'>
          Don’t have an account? <a href='#register'>Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
