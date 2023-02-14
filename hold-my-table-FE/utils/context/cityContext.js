/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext, //
  useContext,
  useMemo,
  useState,
} from 'react';

const CityContext = createContext();

CityContext.displayName = 'CityContext';

const City = (props) => {
  const [city, setCity] = useState('Nashville');

  const value = useMemo(
    () => ({
      city,
      setCity,
    }),
    [city, setCity],
  );

  return <CityContext.Provider value={value} {...props} />;
};

const CityConsumer = CityContext.Consumer;

const useCity = () => {
  const context = useContext(CityContext);

  return context;
};

export { City, useCity, CityConsumer };
