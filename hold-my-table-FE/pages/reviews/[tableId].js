/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import getSingleTable from '../../utils/data/api/tableData';

export default function TableReviewPage() {
  const router = useRouter();
  const { tableId } = router.query;
  const [/* reviews */, setReviews] = useState({});

  const getTheTable = () => {
    getSingleTable(tableId).then((res) => {
      setReviews(res.reviews);
    });
  };

  useEffect(() => {
    getTheTable();
  }, []);

  return (
    <div />
  );
}
