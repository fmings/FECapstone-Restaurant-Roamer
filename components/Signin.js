import React from 'react';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div className="signin-page min-h-screen">
      <img className="logo-img" src="https://i.imgur.com/4dd7irv.png" alt="Restaurant Roamer Logo" width="500" />
      <h1 className="prose prose-2xl font-bold text-white signIn">Are You Hungry?</h1>
      <button className="btn btn-accent" type="button" onClick={signIn}>
        Sign In
      </button>
    </div>
  );
}

export default Signin;
