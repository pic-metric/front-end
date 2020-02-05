import axios from 'axios';

export const axiosWithAuth = () => {
	return axios.create({
		baseURL: 'https://bw-pic-metric.herokuapp.com/api',
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('USER_TOKEN')
		}
	});
};
