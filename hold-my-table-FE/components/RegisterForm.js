import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import Select from 'react-select';
import { registerUser } from '../utils/auth';
import getStyles from '../utils/data/styleData';
import updateUserProfile from '../utils/data/userData';

function RegisterForm({ user, updateUser, userObj }) {
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
    setSelected(selectedOptions.map((option) => option.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userObj?.id) {
      updateUserProfile({ ...formData, styleIds: selected, profileImageUrl: userObj.profileImageUrl }).then(() => router.push('/'));
    } else {
      registerUser({ ...formData, styleIds: selected, profileImageUrl: user.fbUser.photoURL }).then(() => updateUser(user.uid)).then(() => router.push('/'));
    }
  };

  const getTheStyles = () => {
    getStyles().then(setStyles);
  };

  useEffect(() => {
    getTheStyles();
    if (userObj?.id) {
      setSelected(() => {
        // eslint-disable-next-line react/prop-types
        userObj?.styles?.map((style) => (
          {
            value: style.id,
            label: style.label,
          }
        ));
      });
      setFormData(userObj);
    }
  }, [userObj]);

  return (
    <>
      <h1>{userObj?.id ? 'Edit Profile' : 'Tell Us About Yourself'}</h1>
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
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={styleHandleChange}
          required
        />
        <Button type="submit" className="submitButton">{userObj?.id ? 'Update' : 'Create'} Profile</Button>
      </Form>
    </>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    fbUser: PropTypes.shape({
      photoURL: PropTypes.string,
    }),
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
  userObj: PropTypes.shape({
    id: PropTypes.number,
    profileImageUrl: PropTypes.string,
  }),
};

RegisterForm.defaultProps = {
  userObj: {},
};

export default RegisterForm;
