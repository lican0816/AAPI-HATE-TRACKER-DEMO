/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const report = async (
  name,
  date,
  city,
  state,
  description,
  location
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/incidents',
      data: {
        name,
        date,
        city,
        state,
        description,
        location
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Created report successfully!');
      window.setTimeout(() => {
        window.location.assign('/');
      }, 1500);
    }
  } catch (err) {
    if (err.response.data.message.includes('Duplicate')) {
      showAlert('error', 'Duplicate title.');
    } else {
      showAlert('error', err.response.data.message);
    }
  }
};
