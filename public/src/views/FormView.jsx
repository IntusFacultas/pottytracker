import { React, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTint, faPoop, faBed, faSun,
} from '@fortawesome/free-solid-svg-icons';
import { PottyForm } from '../components/PottyForm';
import { CheckboxButton } from '../components/CheckboxButton';
import { PrimaryButton } from '../components/PrimaryButton';
import { ToastAlert } from '../components/ToastAlert';
import { API } from '../hooks';

export const FormView = () => {
  const [pee, onPee] = useState(false);
  const [poo, onPoop] = useState(false);
  const [accident, onAccident] = useState(false);
  const [sleep, onNapStarted] = useState(false);
  const [awoke, onNapEnded] = useState(false);
  const [responseStatus, onResponse] = useState(null);
  let alert = null;
  useEffect(() => {
    console.log('fired');
    if (responseStatus === true) {
      alert = (
        <ToastAlert flavor="success">
          Submitted successfully.
        </ToastAlert>
      );
    } else if (responseStatus === false) {
      alert = (
        <ToastAlert flavor="error">
          Error during submission.
        </ToastAlert>
      );
    } else {
      alert = null;
    }
  }, []);
  const submit = (e) => {
    const postData = {
      pee: pee ? 'Y' : 'N',
      poo: poo ? 'Y' : 'N',
      accident: accident ? 'Y' : 'N',
      sleep: sleep ? 'Y' : 'N',
      awoke: awoke ? 'Y' : 'N',
      datetime: new Date().toISOString(),
    };
    e.preventDefault();
    API.submit(postData).then(() => {
      console.log('fired in async');
      onPee(false);
      onPoop(false);
      onAccident(false);
      onNapStarted(false);
      onNapEnded(false);
      onResponse(true);
    }).catch(() => {
      console.log('fired in catch');
      onResponse(false);
    });
  };

  return (
    <PottyForm>
      <CheckboxButton label="Pee" name="Pee" checked={pee} onChange={() => onPee(!pee)}>
        Went Pee
        {' '}
        <FontAwesomeIcon icon={faTint} />
      </CheckboxButton>
      <CheckboxButton label="Poop" name="Poop" checked={poo} onChange={() => onPoop(!poo)}>
        Went Poo
        {' '}
        <FontAwesomeIcon icon={faPoop} />
      </CheckboxButton>
      <CheckboxButton label="Accident" name="Accident" checked={accident} onChange={() => onAccident(!accident)}>
        Was Accident
        {' '}
        <svg viewBox="0 0 32 32" height="16" width="16">
          <path d="M29.8,28.6L25.6,5.1C25.1,2.7,23.1,1,20.7,1h-9.3C8.9,1,6.9,2.7,6.4,5.1L2.2,28.6c-0.1,0.6,0.1,1.2,0.4,1.6  C3,30.7,3.6,31,4.2,31h3.4c1.2,0,2.3-0.5,3.1-1.3c0.4-0.4,1.1-0.7,1.7-0.7h7.2c0.6,0,1.3,0.3,1.7,0.7c0.8,0.8,1.9,1.3,3.1,1.3h3.4  c0.6,0,1.2-0.3,1.5-0.7C29.7,29.8,29.9,29.2,29.8,28.6z M13.5,4h5C19.9,4,21,5.1,21,6.5S19.9,9,18.5,9h-5C12.1,9,11,7.9,11,6.5  S12.1,4,13.5,4z M23.6,23.5c-0.5,1-1.6,1.5-2.7,1.5H11c-1.1,0-2.1-0.6-2.7-1.5c-0.5-0.9-0.5-2.1,0.1-3l5-8C14,11.5,14.9,11,16,11  s2,0.5,2.6,1.4l5,8C24.1,21.4,24.2,22.5,23.6,23.5z" />
          <path d="M16,19c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C17,18.6,16.6,19,16,19z" />
          <path d="M16,22c-0.1,0-0.3,0-0.4-0.1c-0.1-0.1-0.2-0.1-0.3-0.2C15.1,21.5,15,21.3,15,21c0-0.3,0.1-0.5,0.3-0.7    c0.1-0.1,0.2-0.2,0.3-0.2c0.4-0.2,0.8-0.1,1.1,0.2c0.2,0.2,0.3,0.4,0.3,0.7c0,0.1,0,0.1,0,0.2c0,0.1,0,0.1-0.1,0.2    c0,0.1-0.1,0.1-0.1,0.2c0,0-0.1,0.1-0.1,0.1C16.5,21.9,16.3,22,16,22z" />
        </svg>
      </CheckboxButton>
      <CheckboxButton
        label="NapStarted"
        disabled={awoke}
        name="NapStarted"
        checked={sleep}
        onChange={() => onNapStarted(!sleep)}
      >
        Began Nap
        {' '}
        <FontAwesomeIcon icon={faBed} />
      </CheckboxButton>
      <CheckboxButton
        label="NapEnded"
        name="NapEnded"
        disabled={sleep}
        checked={awoke}
        onChange={() => onNapEnded(!awoke)}
      >
        Woke Up
        {' '}
        <FontAwesomeIcon icon={faSun} />
      </CheckboxButton>
      <PrimaryButton role="button" onClick={submit}>Submit</PrimaryButton>
      {alert}
    </PottyForm>
  );
};

export default FormView;
