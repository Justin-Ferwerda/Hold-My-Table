/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { AuthProvider } from '../utils/context/authContext';
import { City } from '../utils/context/cityContext';
import { Restaurant } from '../utils/context/restaurantContext';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <City>
        <Restaurant>
          {' '}
          <ViewDirectorBasedOnUserAuthStatus
            component={Component}
            pageProps={pageProps}
          />
        </Restaurant>
      </City>
    </AuthProvider>
  );
}

export default MyApp;
