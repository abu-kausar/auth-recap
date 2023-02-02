import './App.css';
import { initializeApp } from "firebase/app";
import firebaseConfig from './firebase.config';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  FacebookAuthProvider,
  GithubAuthProvider
} from "firebase/auth";
import { useState } from 'react';

initializeApp(firebaseConfig);

function App() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();
  const gitProvider = new GithubAuthProvider();

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
  });

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const { displayName, email, photoURL } = user;
        console.log(token);

        const userInfo = {
          isSignedIn: true,
          email: email,
          name: displayName,
          photo: photoURL
        }

        setUser(userInfo);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.log(errorCode, errorMessage, credential, email);
        // ...
      });
  }

  const handleGoogleSignOut = () => {
    signOut(auth).then(() => {
      const userInfo = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
      }
      setUser(userInfo);
    }).catch((error) => {
      // An error happened.
    });
  }

  const handleFbSignIn = () => {
    signInWithPopup(auth, fbProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        const {displayName, email, photoURL} = user;
        console.log(user, accessToken);

        const userInfo = {
          isSignedIn: true,
          email: email,
          name: displayName,
          photo: photoURL,
        }
        setUser(userInfo);

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        console.log(errorCode, errorMessage, credential, email);

        // ...
      });
  }

  const handleFbSignOut = () => {
    console.log('fb sign out clicked');
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, gitProvider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        console.log(token);

        // The signed-in user info.
        const user = result.user;
        const {displayName, email, photoURL} = user;

        const userInfo = {
          isSignedIn: true,
          email: email,
          name: displayName,
          photo: photoURL,
        }
        setUser(userInfo);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        console.log(errorMessage, errorCode, email, credential);
        // ...
      });
  }

  const handleGithubSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      const userInfo = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
      }
      setUser(userInfo);
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div className="App">
      <h1>Google Authentication System</h1>
      {
        user.isSignedIn &&
        <div>
          <img src={user.photo} alt="" />
          <h3>{user.name}</h3>
          <h3>{user.email}</h3>
        </div>
      }

      {
        user.isSignedIn ? <button onClick={handleGoogleSignOut}>Sign Out</button> :
          <button onClick={handleGoogleSignIn}>Sign In</button>
      }
      <br />
      <hr />

      <h1>Facebook Authentication System</h1>
      {
        user.isSignedIn && 
        <div>
          <img src={user.photo} alt="" />
          <h3>{user.name}</h3>
        </div>
      }
      {
        user.isSignedIn ? <button onClick={handleFbSignOut}>Sign Out</button> :
          <button onClick={handleFbSignIn}>Sign In</button>
      }
      <br />
      <hr />

      <h1>Github Authentication System</h1>
      {
        user.isSignedIn && 
        <div>
          <img src={user.photo} alt="" />
          <h3>{user.email}</h3>
        </div>
      }
      {
        user.isSignedIn ? <button onClick={handleGithubSignOut}>Sign Out</button> :
          <button onClick={handleGithubSignIn}>Sign In</button>
      }
    </div>
  );
}

export default App;
