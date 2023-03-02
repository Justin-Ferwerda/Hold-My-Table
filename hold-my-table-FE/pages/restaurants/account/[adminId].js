import { useEffect, useState } from 'react';
import ReviewForm from '../../../components/forms/ReviewForm';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleTable } from '../../../utils/data/api/tableData';

export default function RestaurantAccount() {
  const { user } = useAuth();

  return (
    <ReviewForm user={user} />
  );
}
