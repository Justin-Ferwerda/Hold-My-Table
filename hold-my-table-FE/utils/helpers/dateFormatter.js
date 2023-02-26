const formattedDate = (date) => {
  const year = date.$y;
  const month = `${date.$M < 10 ? '0' : ''}${date.$M}`;
  const day = `${date.$D < 10 ? '0' : ''}${date.$D}`;
  const newDate = ''.concat(year, '-', month, '-', day);
  return newDate;
};

export default formattedDate;
