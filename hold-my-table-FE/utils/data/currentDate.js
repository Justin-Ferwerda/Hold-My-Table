const getCurrentDate = () => {
  const date = new Date();
  const currentDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    .toISOString()
    .split('T')[0];
  return currentDate;
};

export default getCurrentDate;
