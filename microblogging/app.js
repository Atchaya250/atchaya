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
    { emoji: '😮', count: 0 },
    { emoji: '😂', count: 0 }
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

// Load the feed of posts from followed users
function loadFeed() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';

    let followedPosts = posts.filter(post => currentUser.following.includes(post.author) || post.author === currentUser.username);

    followedPosts.forEach((post, index) => {
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

        // Comment section with input field and emoji bar
        const commentSection = document.createElement('div');
        commentSection.classList.add('comment-section');

        // Emoji bar for comment reactions
        const emojiBar = document.createElement('div');
        emojiBar.classList.add('emoji-bar');
        post.emojis.forEach((emoji, emojiIndex) => {
            const emojiBtn = document.createElement('button');
            emojiBtn.innerHTML = `${emoji.emoji} (${emoji.count})`;
            emojiBtn.classList.add('emoji-btn');
            emojiBtn.onclick = function () {
                post.emojis[emojiIndex].count++; // Increment emoji count
                localStorage.setItem('posts', JSON.stringify(posts));
                loadFeed();
            };
            emojiBar.appendChild(emojiBtn);
        });

        commentSection.appendChild(emojiBar);

        // Comment input and submit button
        const commentInput = document.createElement('input');
        commentInput.setAttribute('type', 'text');
        commentInput.setAttribute('placeholder', 'Add a comment...');
        commentInput.classList.add('comment-input');

        const commentSubmit = document.createElement('button');
        commentSubmit.innerHTML = `Post`;
        commentSubmit.classList.add('comment-submit');
        commentSubmit.onclick = function () {
            const commentText = commentInput.value.trim();
            if (commentText) {
                post.comments.push({ author: currentUser.username, comment: commentText, likes: 0 });
                localStorage.setItem('posts', JSON.stringify(posts));
                loadFeed();
            }
        };

        commentSection.appendChild(commentInput);
        commentSection.appendChild(commentSubmit);
        postDiv.appendChild(commentSection);

        // Display comments under the post
        post.comments.forEach((comment, commentIndex) => {
            const commentDiv = document.createElement('div');
            commentDiv.innerHTML = `<strong>${comment.author}</strong>: ${comment.comment} <i class="fa fa-heart" style="color:red;"></i> (${comment.likes})`;
            commentDiv.classList.add('comment');

            const commentLikeBtn = document.createElement('button');
            commentLikeBtn.innerHTML = `<i class="fa fa-heart" style="color:red;"></i> Like (${comment.likes})`;
            commentLikeBtn.classList.add('comment-like-btn');
            commentLikeBtn.onclick = function () {
                post.comments[commentIndex].likes++; // Increment comment likes
                localStorage.setItem('posts', JSON.stringify(posts));
                loadFeed();
            };

            commentDiv.appendChild(commentLikeBtn);
            postDiv.appendChild(commentDiv);
        });

        feed.appendChild(postDiv);
    });
}

// Load users for following/unfollowing
function loadUserList() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';

    users.forEach(user => {
        if (user.username !== currentUser.username) {
            const userDiv = document.createElement('div');
            const isFollowing = currentUser.following.includes(user.username);
            userDiv.innerHTML = `<strong>${user.username}</strong>`;

            const followBtn = document.createElement('button');
            followBtn.innerHTML = isFollowing ? `<i class="fa fa-user-times"></i> Unfollow` : `<i class="fa fa-user-plus"></i> Follow`;
            followBtn.classList.add('follow-btn');
            followBtn.onclick = function () {
                if (isFollowing) {
                    currentUser.following = currentUser.following.filter(f => f !== user.username);
                    user.followers = user.followers.filter(f => f !== currentUser.username);
                } else {
                    currentUser.following.push(user.username);
                    user.followers.push(currentUser.username);
                }
                localStorage.setItem('users', JSON.stringify(users));
                loadUserList();
                loadFeed();
            };

            userDiv.appendChild(followBtn);
            userList.appendChild(userDiv);
        }
    });
}