/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReviewCard from '../../components/reviews/ReviewCard';
import { getSingleTable } from '../../utils/data/api/tableData';

export default function TableReviewPage() {
  const router = useRouter();
  const { tableId } = router.query;
  const [reviews, setReviews] = useState([]);

  const getTheTable = () => {
    getSingleTable(tableId).then((res) => {
      setReviews(res.reviews);
      console.warn(res.reviews);
    });
  };

  useEffect(() => {
    getTheTable();
  }, []);

  return (
    reviews.length ? (
      <div className="review-container">
        {reviews?.map((review) => <ReviewCard key={review.id} review={review} onUpdate={getTheTable} />)}
      </div>
    ) : (
      <h1 className="no-reviews">no reviews yet, check back soon!</h1>
    )

  );
}
