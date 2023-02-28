/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from './context/authContext';
import Loading from '../components/utility/Loading';
import Signin from '../components/utility/Signin';
import NavBar from '../components/nav/NavBar';
import RegisterForm from '../components/forms/RegisterForm';
import StickyFooter from '../components/nav/footer';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { user, userLoading, updateUser } = useAuth();
  const router = useRouter();

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // what the user should see if they are logged in
  if (user) {
    return (
      <div className="whole-page">
        <NavBar /> {/* NavBar only visible if user is logged in and is in every view */}
        <div className="container">{'valid' in user ? <RegisterForm user={user} updateUser={updateUser} /> : user.admin ? router.push(`/restaurants/account/${user.id}`) : <Component {...pageProps} />}
        </div>
        <div className="footer">
          <StickyFooter />
        </div>
      </div>
    );
  }

  return <Signin />;
};

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
