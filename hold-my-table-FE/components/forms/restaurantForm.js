import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { createRestaurant, updateRestaurant } from '../../utils/data/api/restaurantData';
import getStyles from '../../utils/data/api/styleData';

export default function RestaurantForm({ restaurant }) {
  const [formData, setFormData] = useState({});
  const [styles, setStyles] = useState([]);
  const router = useRouter();

  const getTheStyles = () => {
    getStyles().then(setStyles);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (restaurant.id) {
      updateRestaurant(formData).then(() => router.push(`/restaurants/account/${restaurant.adminUser.id}`));
    } else {
      createRestaurant(formData).then(() => router.push(`/restaurants/account/${restaurant.adminUser.id}`));
    }
  };

  useEffect(() => {
    getTheStyles();
    if (restaurant.id) {
      setFormData(restaurant);
    }
  }, [restaurant]);

  return (
    <>
      <div className="restaurant-form-LS">
        <h1>{restaurant.id ? 'Edit Account' : 'Create Restaurant'}</h1>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingInput1" label="Name of Restaurant" className="mb-3">
            <Form.Control type="text" placeholder="Name of Restaurant" name="name" value={formData.name} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput1" label="Email" className="mb-3">
            <Form.Control type="text" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput1" label="Phone Number" className="mb-3">
            <Form.Control type="text" placeholder="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput1" label="Address" className="mb-3">
            <Form.Control type="text" placeholder="Address" name="address" value={formData.address} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput1" label="Email" className="mb-3">
            <Form.Control type="text" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput1" label="Website URL" className="mb-3">
            <Form.Control type="text" placeholder="Website Url" name="websiteUrl" value={formData.websiteUrl} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput1" label="Instagram URL" className="mb-3">
            <Form.Control type="text" placeholder="Instagram URL" name="instagram" value={formData.instagram} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput1" label="Photo URL" className="mb-3">
            <Form.Control type="text" placeholder="Photo Url" name="bannerPic" value={formData.bannerPic} onChange={handleChange} required />
          </FloatingLabel>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Cancellation Policy</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={handleChange} name="cancellationPolicy" value={formData.cancellationPolicy} />
          </Form.Group>
          <h3>What Genre do you classify yourself as?</h3>
          <FloatingLabel controlId="floatingSelect" label="style">
            <Form.Select aria-label="style" name="style" onChange={handleChange} className="mb-3" value={formData?.style?.id} required>
              <option value="">Select a Style</option>
              {styles?.map((style) => (
                <option key={style.label} value={style.id}>
                  {style.label}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          <Button type="submit" className="submitButton">{restaurant.id ? 'Save' : 'Create'} Account</Button>
        </Form>
      </div>
      <div className="restaurant-form-RS">
        <div className="restaurant-form-buttons">
          {!restaurant.id ? (
            <>
              <h4>Hold My Table offers a custom layout designer in order for customers to be able to reserve any table in your restaurant. On the next page you will recreate your layout and be asked to put in some additional info for each table.</h4>
              <Button className="add-restaurant-btn" type="submit">Go To Layout Designer</Button>
            </>
          ) : (
            <div />
          )}
        </div>
      </div>
    </>
  );
}

RestaurantForm.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.number,
    adminUser: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
};

RestaurantForm.defaultProps = {
  restaurant: {},
};
