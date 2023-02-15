import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';

export default function BookTable({ restaurant }) {
  return (
    <>
      <div className="book-table-component">
        <Card>
          <Card.Body>
            <h3>Book A Table</h3>
            <Card.Text>
              Hold My Table offers a one of a kind reservation booking experience. HMT allows you to choose any table in the restaurant. This way, you’re ensured a dining experience to remember!
            </Card.Text>
            <Card.Text>
              Check out our reservation portal <Link className="portal-link" href={`/reservations/${restaurant.id}`} passHref>Here</Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

BookTable.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};
