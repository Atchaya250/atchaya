let currentUser = null;
let users = JSON.parse(localStorage.getItem('users')) || [];
let posts = JSON.parse(localStorage.getItem('posts')) || [];

// Emoji options with counts for comments
const emojiOptions = [
    { emoji: '❤️', count: 0 },
    { emoji: '🙌', count: 0 },
    { emoji: '🔥', count: 0 },
    { emoji: '👏', count: 0 },
    { emoji: '😢', count: 0 },
    { emoji: '😍', count: 0 },
];

// Register or login a user
function registerOrLogin() {
    const username = document.getElementById('username').value.trim();
    if (!username) {
        alert("Please enter a username.");
        return;
    }

    let user = users.find(user => user.username === username);
    if (!user) {
        user = { username, following: [], followers: [] };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    currentUser = user;
    document.getElementById('current-user').textContent = currentUser.username;
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('user-section').style.display = 'block';

    loadUserList();
    loadFeed();
}

// Log out the current user
function logout() {
    currentUser = null;
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('user-section').style.display = 'none';
}

// Create a new post
function createPost() {
    const content = document.getElementById('post-content').value.trim();
    if (!content) {
        alert("Post content cannot be empty.");
        return;
    }

    const post = {
        content,
        author: currentUser.username,
        likes: 0,
        dislikes: 0,
        comments: [],
        postedAt: new Date().toLocaleString(),
        emojis: JSON.parse(JSON.stringify(emojiOptions)) // Initialize emoji options
    };
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
    document.getElementById('post-content').value = ''; // Clear input after posting
    loadFeed();
}

// Load all posts regardless of following status
function loadFeed() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';

    // Get all posts
    posts.forEach((post) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <strong>${post.author}</strong><br>
            ${post.content}<br>
            <small>Posted on: ${post.postedAt}</small><br>
        `;

        // Like button for posts
        const likeBtn = document.createElement('button');
        likeBtn.innerHTML = `<i class="fa fa-thumbs-up"></i> Like (${post.likes})`;
        likeBtn.classList.add('like-btn');
        likeBtn.onclick = function () {
            post.likes++;
            localStorage.setItem('posts', JSON.stringify(posts));
            loadFeed();
        };

        // Dislike button for posts
        const dislikeBtn = document.createElement('button');
        dislikeBtn.innerHTML = `<i class="fa fa-thumbs-down"></i> Dislike (${post.dislikes})`;
        dislikeBtn.classList.add('dislike-btn');
        dislikeBtn.onclick = function () {
            post.dislikes++;
            localStorage.setItem('posts', JSON.stringify(posts));
            loadFeed();
        };

        // Delete button for posts
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = `<i class="fa fa-trash"></i> Delete`;
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = function () {
            posts.splice(posts.indexOf(post), 1);
            localStorage.setItem('posts', JSON.stringify(posts));
            loadFeed();
        };

        postDiv.appendChild(likeBtn);
        postDiv.appendChild(dislikeBtn);
        postDiv.appendChild(deleteBtn);

        // Display emojis and allow reacting to the post in horizontal layout
        const emojiDiv = document.createElement('div');
        emojiDiv.classList.add('emoji-container');
        post.emojis.forEach((emojiObj, index) => {
            const emojiBtn = document.createElement('span');
            emojiBtn.classList.add('emoji-btn');
            emojiBtn.innerHTML = `${emojiObj.emoji} (${emojiObj.count})`;
            emojiBtn.onclick = function () {
                post.emojis[index].count++;
                localStorage.setItem('posts', JSON.stringify(posts));
                loadFeed();
            };
            emojiDiv.appendChild(emojiBtn);
        });

        postDiv.appendChild(emojiDiv);

        // Comment section
        const commentDiv = document.createElement('div');
        const commentInput = document.createElement('input');
        commentInput.setAttribute('placeholder', 'Add a comment...');
        const commentPostBtn = document.createElement('button');
        commentPostBtn.textContent = 'Post';
        commentPostBtn.onclick = function () {
            if (commentInput.value.trim()) {
                post.comments.push({ username: currentUser.username, text: commentInput.value, likes: 0 });
                localStorage.setItem('posts', JSON.stringify(posts));
                loadFeed();
            }
        };
        commentDiv.appendChild(commentInput);
        commentDiv.appendChild(commentPostBtn);

        // Show comment count below the comment text field
        const commentCount = document.createElement('small');
        commentCount.textContent = `Comments: ${post.comments.length}`;
        commentDiv.appendChild(commentCount);

        post.comments.forEach((comment, commentIndex) => {
            const commentText = document.createElement('div');
            commentText.classList.add('comment-section');
            commentText.innerHTML = `<strong>${comment.username}</strong>: ${comment.text}`;

            // Like button for comment
            const commentLikeBtn = document.createElement('button');
            commentLikeBtn.classList.add('comment-like-btn');
            commentLikeBtn.innerHTML = `❤️ (${comment.likes})`;
            commentLikeBtn.onclick = function () {
                post.comments[commentIndex].likes++;
                localStorage.setItem('posts', JSON.stringify(posts));
                loadFeed();
            };

            commentText.appendChild(commentLikeBtn);
            commentDiv.appendChild(commentText);
        });

        postDiv.appendChild(commentDiv);

        feed.appendChild(postDiv);
    });
}

// Load the list of users and allow following/unfollowing
function loadUserList() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';

    users.forEach(user => {
        if (user.username !== currentUser.username) {
            const userDiv = document.createElement('div');
            const followBtn = document.createElement('button');
            followBtn.innerHTML = currentUser.following.includes(user.username)
                ? `<i class="fa fa-user-minus"></i> Unfollow`
                : `<i class="fa fa-user-plus"></i> Follow`;

            followBtn.onclick = function () {
                if (currentUser.following.includes(user.username)) {
                    currentUser.following = currentUser.following.filter(following => following !== user.username);
                } else {
                    currentUser.following.push(user.username);
                }
                localStorage.setItem('users', JSON.stringify(users));
                loadUserList();
                loadFeed();
            };

            userDiv.innerHTML = `<strong>${user.username}</strong>`;
            userDiv.appendChild(followBtn);
            userList.appendChild(userDiv);
        }
    });
}