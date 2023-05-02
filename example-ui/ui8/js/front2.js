const url = 'http://localhost:3000'; // change url when uploading to server

// select existing html elements
const postContainer = document.querySelector('#posts');

// create post cards
const createPostCards = (posts) => {
  // clear post container
  postContainer.innerHTML = '';
  posts.forEach((post) => {
    // create post element with DOM methods
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const imageElement = document.createElement('img');
    imageElement.src = url + '/uploads/' + post.image;
    imageElement.alt = post.description;

    const descriptionElement = document.createElement('p');
    descriptionElement.innerHTML = post.description;

    const likesElement = document.createElement('div');
    likesElement.classList.add('likes');

    const likeButton = document.createElement('button');
    likeButton.innerHTML = 'Like';
    likeButton.addEventListener('click', async () => {
      const fetchOptions = {
        method: 'POST',
      };
      try {
        const response = await fetch(url + '/like/' + post.id, fetchOptions);
        const json = await response.json();
        console.log('like response', json);
        getPosts();
      } catch (e) {
        console.log(e.message);
      }
    });
    likesElement.appendChild(likeButton);

    const likesCount = document.createElement('span');
    likesCount.innerHTML = post.likes;
    likesElement.appendChild(likesCount);

    postElement.appendChild(imageElement);
    postElement.appendChild(descriptionElement);
    postElement.appendChild(likesElement);

    postContainer.appendChild(postElement);
  });
};

// AJAX call
const getPosts = async () => {
  try {
    const response = await fetch(url + '/posts');
    const posts = await response.json();
    createPostCards(posts);
  } catch (e) {
    console.log(e.message);
  }
};

getPosts();