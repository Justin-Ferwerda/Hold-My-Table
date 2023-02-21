import geoAuth from '../../geolocation';

const getLocation = () => new Promise((resolve, reject) => {
  fetch(`https://geolocation-db.com/json/${geoAuth.geoKey}`)
    .then((response) => response.json())
    .then(resolve)
    .catch((error) => reject(error));
});

export default getLocation;
