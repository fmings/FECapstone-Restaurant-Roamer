import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '900px',
        margin: '0 auto',
      }}
    >
      <img src="https://i.imgur.com/3iZ3W0T.png" alt="Restaurant Roamer Logo" width="900" />
      <h1>Are You Hungry?</h1>
      <Button type="button" className="copy-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
