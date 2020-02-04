import React from 'react';

const ErrroMessage = ({ error }) => {
	if (error) {
		switch (error.type) {
			case 'required':
				return <p>This is required</p>;
			case 'maxLength':
				return <p>Name cannot exceed 100 charcaters</p>;
			case 'pattern':
				return <p>Enter a valid email address</p>;
			default:
				return null;
		}
	}

	return null;
};
export default ErrroMessage;
