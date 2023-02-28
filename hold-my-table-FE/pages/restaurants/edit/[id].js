import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleRestaurant } from '../../../utils/data/api/restaurantData';
import RestaurantForm from '../../../components/forms/RestaurantForm';

export default function EditRestaurant() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleRestaurant(id).then(setEditItem);
  }, [id]);

  return (<RestaurantForm restaurant={editItem} />);
}
