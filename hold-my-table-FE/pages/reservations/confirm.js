/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Confirm() {
  const router = useRouter();
  const {
    dateValue, timeValue, guestValue, tableId, restaurantName,
  } = router.query;

  const checkData = () => {

  };

  useEffect(() => {
    checkData();
  }, []);

  return (
    <div />
  );
}
