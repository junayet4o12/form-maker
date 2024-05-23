import { BiLogoGoogle } from 'react-icons/bi';
import useGoogleLogin from '../../hooks/useGoogleLogin';

const GoogleLogin = () => {
    const handleGoogleLogin = useGoogleLogin()
  
    return (
        <p onClick={handleGoogleLogin}
        className='btn text-white rounded-sm w-full md:min-w-[200px]  font-bold text-sm bg-primary/10 border border-primary/80 hover:bg-primary/10 hover:text-white hover:border-primary'>Log in with <span className="text-lg"><BiLogoGoogle></BiLogoGoogle></span></p>
    );
};

export default GoogleLogin;