/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const makeComment = async (incidentID, comment) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/incidents/${incidentID}/reviews`,
      data: {
        comment
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Comment successfully!');
      document.getElementById('comments').value = '';
      window.setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  } catch (err) {
    if (err.response.data.message.includes('Duplicate')) {
      showAlert('error', 'You already made a comment.');
    } else {
      showAlert('error', err.response.data.message);
    }
  }
};
