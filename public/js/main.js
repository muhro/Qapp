
(async () => {
  'use strict';
  if ('serviceWorker' in navigator) {
    try {
      const worker = await navigator.serviceWorker.register('./sw.js');
      console.log('Service Worker Registered');
    } catch (e) {
      console.log(e.message);
    }
  }

    let registerClose = document.getElementById('modalLoginFormBtn')
    registerClose.addEventListener('click', ()=>{ $('#modalLoginForm').modal('hide');})



// general fetch from graphql API
  const apiURL = '/graphql';
  const fetchGraphql = async (query) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(query),
    };
    try {
      const response = await fetch(apiURL, options);
      const json = await response.json();
      return json.data;
    }
    catch (e) {
      console.log(e);
      return false;
    }
  };

// indexedDB stuff
//-------------------------------------------------------------
  const indexedDB = window.indexedDB || window.mozIndexedDB ||
      window.webkitIndexedDB || window.msIndexedDB;
  const request = indexedDB.open('stationDB', 1);
  let db;
  request.onsuccess = (event) => {
    db = request.result;
  };

  request.onupgradeneeded = () => {
    let db = request.result;
    db.createObjectStore('stationList', {autoIncrement: true});
  };
  /*
  LOGIN
  -------------------------------------------------------------
  */

  const loginForm = document.querySelector('.login-form');

  const login = async (evt) => {
    evt.preventDefault();
    let values = {};
    for (let i = 0; i < loginForm.elements.length; i++) {
      if (loginForm.elements[i].tagName === 'INPUT')
        values[loginForm.elements[i].name] = loginForm.elements[i].value;
    }
    const query = {
      query: `{
  login(username: "${values.username}", password: "${values.password}") {
    id
    username
    token
  }
}
`,
    };
    try {
      const result = await fetchGraphql(query);
      localStorage.setItem('token', result.login.token);
      location.href = 'home.html';
    }
    catch (e) {
      console.log('error', e.message);
    }

  };

  loginForm.addEventListener('submit', login);

  /*
  REGISTER
  -------------------------------------------------------------
  */

  const registerForm = document.querySelector('.register-form');

  registerForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    let values = {};
    for (let i = 0; i < registerForm.elements.length; i++) {
      if (registerForm.elements[i].tagName === 'INPUT')
        values[registerForm.elements[i].name] = registerForm.elements[i].value;

    }
    const mutation = {
      query: `mutation {
                 registerUser(username: "${values.username}", password: "${values.password}"){
                 id
                 username
                 token
                 posts{
                    id
                    length
                    chunckSize
                    UploadDate
                    filename
                    md4
                    contentType
                 }
                 }
                }
            `,

        };

        try {
            console.log(mutation)
            const result = await fetchGraphql(mutation);

        }
        catch (e) {
            console.log('error', e.message);
        }


    });

    


// check user token
  const checkUser = async () => {
    const query = {
      query: ` {
  user 
  {
    id
    username
    token
  }
}
`,
    };
    const result = await fetchGraphql(query);
    console.log(result);
    if (result.user) {
    }
  }
})();


