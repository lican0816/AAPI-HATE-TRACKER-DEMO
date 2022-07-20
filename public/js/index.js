/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { signup } from './signup';
import { report } from './report';
import { makeComment } from './comment';
import { updateSettings } from './updateSettings';
import { showAlert } from './alerts';

// DOM ELEMENTS form--signup
const mapBox = document.getElementById('map');
const commentForm = document.getElementById('comment-form');
const loginForm = document.querySelector('.form--login');
const reportForm = document.querySelector('.form--report');
const signupForm = document.querySelector('.form--signup');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');

// DELEGATION
if (mapBox) {
  let locations;

  if (!mapBox.dataset.lng || !mapBox.dataset.lat) {
    locations = [0, 0];
  } else {
    locations = [
      parseFloat(mapBox.dataset.lng),
      parseFloat(mapBox.dataset.lat)
    ];
  }

  displayMap(locations);
}

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (commentForm) {
  commentForm.addEventListener('submit', e => {
    e.preventDefault();
    const comments = document.getElementById('comments').value;
    const incidentID = commentForm.dataset.incidentid;

    makeComment(incidentID, comments);
  });
}

if (reportForm)
  reportForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const city = document
      .getElementById('city')
      .value.replace(/\w\S*/g, w => w.replace(/^\w/, c => c.toUpperCase()));
    const state = document.getElementById('state').value;
    const latitude = document.getElementById('lat').value || 0;
    const longitude = document.getElementById('lng').value || 0;
    const description = document.getElementById('description').value;

    let dateToCompare = date.split('-');

    dateToCompare = new Date(
      dateToCompare[0],
      dateToCompare[1] - 1,
      dateToCompare[2]
    );

    if (dateToCompare.getTime() > Date.now()) {
      return showAlert('error', 'Date can not be beyond today.');
    }

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    };

    report(name, date, city, state, description, location);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateSettings({ name, email }, 'data');
  });

if (signupForm)
  signupForm.addEventListener('submit', e => {
    console.log('signupForm');
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    signup(name, email, password, passwordConfirm);
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    document.querySelector('.btn--save-password').disabled = true;

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.querySelector('.btn--save-password').disabled = false;
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
