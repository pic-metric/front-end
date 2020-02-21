import React from 'react';


const ErrroMessage = ({ error }) => {
	if (error) {
		switch (error.type) {
			case 'required':
				return <p className='errorMessages'>*required</p>;
			case 'maxLength':
				return <p className='errorMessages'>Name cannot exceed 100 charcaters</p>;
			case 'pattern':
				return <p className='errorMessages'>Enter a valid email address</p>;
			default:
				return null;
		}
	}

	return null;
};
export default ErrroMessage;
