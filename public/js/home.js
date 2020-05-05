
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



// general fetch from graphql API
    const apiURL = './graphql';
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
    const request = indexedDB.open('qapp', 1);
    let db;
    request.onsuccess = (event) => {
        db = request.result;
    };

    request.onupgradeneeded = () => {
        let db = request.result;
        db.createObjectStore('stationList', {autoIncrement: true});
    };







// check user token
    const checkUser = async () => {
        const query = {
            query: ` {
  user{
    id
    username
    token
  }
}
`,
        };
        const result = await fetchGraphql(query);
        console.log( 'chechAuth', result);
        if (result.user) {
            location.href = 'home.html';
        }
    };
     checkUser()
})();


