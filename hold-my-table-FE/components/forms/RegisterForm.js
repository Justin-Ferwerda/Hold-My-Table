/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import Select from 'react-select';
import { registerUser } from '../../utils/data/api/auth';
import getStyles from '../../utils/data/api/styleData';
import updateUserProfile from '../../utils/data/api/userData';

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    uid: user.uid,
  });
  const [styles, setStyles] = useState([]);
  const [selected, setSelected] = useState([]);
  const router = useRouter();

  const styleOptions = styles.map((style) => (
    {
      value: style.id,
      label: style.label,
    }
  ));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const styleHandleChange = (selectedOptions) => {
    setSelected(selectedOptions);
    console.warn(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user?.id) {
      updateUserProfile({ ...formData, styles: selected, id: user.id }).then(() => updateUser(user.uid)).then(() => router.push(`/user/${user.id}`));
    } else {
      registerUser({ ...formData, styles: selected, profileImageUrl: user.fbUser.photoURL }).then(() => updateUser(user.uid)).then(() => router.push('/'));
    }
  };

  const getTheStyles = () => {
    getStyles().then(setStyles);
  };

  const userStyles = user?.styles?.map((style) => (
    {
      value: style.style.id,
      label: style.style.label,
    }
  ));

  useEffect(() => {
    getTheStyles();
    if (user?.id) {
      setSelected(userStyles);
      setFormData(user);
    }
  }, [user]);

  return (
    <>
      <h1>{user?.id ? 'Edit Profile' : 'Tell Us About Yourself'}</h1>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInput1" label="First Name" className="mb-3">
          <Form.Control type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput1" label="Last Name" className="mb-3">
          <Form.Control type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput1" label="Email" className="mb-3">
          <Form.Control type="text" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput1" label="Phone Number" className="mb-3">
          <Form.Control type="text" placeholder="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required />
        </FloatingLabel>

        <Form.Label>Styles</Form.Label>
        <Select
          isMulti
          name="styles"
          options={styleOptions}
          defaultValue={selected}
          value={selected}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={styleHandleChange}
          required
        />
        <Button type="submit" className="submitButton">{user?.id ? 'Update' : 'Create'} Profile</Button>
      </Form>
    </>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    fbUser: PropTypes.shape({
      photoURL: PropTypes.string,
    }),
    styles: PropTypes.arrayOf(PropTypes.shape([])),
    id: PropTypes.number,
    profileImageUrl: PropTypes.string,
  }),
  updateUser: PropTypes.func.isRequired,
};

RegisterForm.defaultProps = {
  user: {},
};

export default RegisterForm;
