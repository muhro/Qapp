
(async () => {
    'use strict';
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('./sw.js');
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

        db.createObjectStore('users', {autoIncrement: true});
    };


    /*
   UPLOAD
    -------------------------------------------------------------
    */


    const postForm = document.querySelector('.post-form');

    postForm.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        let values = {};
        for (let i = 0; i < postForm.elements.length; i++) {
            if (postForm.elements[i].tagName === 'INPUT')
                values[postForm.elements[i].name] = postForm.elements[i].value;
        }
        const mutation = {
            query: `mutation {
                 createPost(header: "${values.header}", text: "${values.text}"){
                 id
                 header
                 text              
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

    let postCreationClose = document.getElementById('modalPostFormBtn');
    postCreationClose.addEventListener('click', ()=>{
        $('#modalPostForm').modal('hide');


    })

    /*
    CHECK USER TOKEN
    -------------------------------------------------------------
    */
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
        console.log('auth ',result);
        if (!result.user) {
            location.href = 'index.html';

        } else {
            let username = result.user.username;
            const usernameSite = document.querySelector('#username');

            usernameSite.innerHTML = username;

        }
    };
 await checkUser();

    /*
   POST QUERY
   -------------------------------------------------------------
   */

    const checkPost = async ()=> {
      const query = {
          query: ` {
                post{
                id
                header
                text
                }
                }
                `,
      };
        const result = await fetchGraphql(query);
        console.log('posts ',result);
        console.log( result.post.length)

        let posts = result.post.reverse();


            posts.forEach(function(value) {
                $('#ulposts').append('<li class="postLi">\n' +
                    '<h4 class="postHeader">' + value.header + '</h4>\n' +
                    '<div class="paddingDiv">\n' +
                    '<a class="postFlavor">' + value.text + '</a>\n' +
                    '<div class="table">\n' +
                    '</div>\n' +
                    '</div>\n' +
                    '</li>');
            });

    }
await checkPost();


})();


