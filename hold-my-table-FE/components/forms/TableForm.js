import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, FloatingLabel, FormCheck, Button,
} from 'react-bootstrap';
import { updateTable, createTable } from '../../utils/data/api/tableData';

export default function TableForm({
  table, restaurant, onUpdate, handleClose, setEditMode,
}) {
  const [reservable, setReservable] = useState(true);
  const [formData, setFormData] = useState({
    restaurantId: restaurant.id,
    xCoord: 0,
    yCoord: 0,
    reservable,
  });

  const capacityOptions = [2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    if (table.id) {
      setReservable(table.reservable);
    }
  }, [table.id, table.reservable]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (table?.id) {
      updateTable(formData).then(() => onUpdate());
    } else {
      createTable(formData).then(() => onUpdate());
      handleClose();
      setEditMode(true);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>

        <FloatingLabel controlId="floatingInput1" label="table number" className="mb-3">
          <Form.Control type="text" placeholder="Table Number" name="number" value={formData?.number} onChange={handleChange} required />
        </FloatingLabel>
        <FormCheck
          id="switchEnabled"
          type="switch"
          checked={reservable}
          onChange={() => setReservable(!reservable)}
          label="reservable"
        />
        <FloatingLabel controlId="floatingSelect" label="shape">
          <Form.Select name="shape" aria-label="shape" onChange={handleChange} className="mb-3" value={formData?.shape} required>
            <option value="">Select a Shape</option>
            <option value="circle">circle</option>
            <option value="square">square</option>
            <option value="rectangle">rectangle</option>
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelect" label="capacity">
          <Form.Select name="capacity" aria-label="capacity" onChange={handleChange} className="mb-3" value={formData?.capacity} required>
            <option value="">Select Number of Seats</option>
            {capacityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
        <Button type="submit">{table.id ? 'Update' : 'Add'} Table</Button>
      </Form>
    </>
  );
}

TableForm.propTypes = {
  table: PropTypes.shape({
    id: PropTypes.number,
    reservable: PropTypes.bool,
  }),
  restaurant: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func,
  handleClose: PropTypes.func,
  setEditMode: PropTypes.func,
};

TableForm.defaultProps = {
  table: {},
  onUpdate: () => null,
  handleClose: () => null,
  setEditMode: () => null,
};
