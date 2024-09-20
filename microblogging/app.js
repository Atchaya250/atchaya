// Load feed from localStorage when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadFeed();
});

// Create a new post
function createPost() {
    const content = document.getElementById('post-content').value;

    if (content.trim() === '') {
        alert("Post content is required!");
        return;
    }

    const post = {
        content: content,
        timestamp: new Date().toLocaleString(),
        likes: 0 // Initialize post with 0 likes
    };

    // Save the post in localStorage
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));

    // Clear input fields
    document.getElementById('post-content').value = '';

    // Reload the feed
    loadFeed();
}

// Load the feed (all posts)
function loadFeed() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';

    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.textContent = `${post.content} (Posted on ${post.timestamp})`;

        // Create like button
        const likeBtn = document.createElement('button');
        likeBtn.textContent = `Like (${post.likes})`; // Display the number of likes
        likeBtn.classList.add('like-btn');
        
        // Add functionality to increment likes when clicked
        likeBtn.onclick = function () {
            posts[index].likes++; // Increment the number of likes
            localStorage.setItem('posts', JSON.stringify(posts)); // Update localStorage
            loadFeed(); // Reload feed to show updated like count
        };

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        
        // Add functionality to delete post when clicked
        deleteBtn.onclick = function () {
            posts.splice(index, 1); // Remove post from array
            localStorage.setItem('posts', JSON.stringify(posts)); // Update localStorage
            loadFeed(); // Reload feed to reflect the deletion
        };

        // Append like and delete buttons to each post
        postDiv.appendChild(likeBtn);
        postDiv.appendChild(deleteBtn);
        feed.appendChild(postDiv);
    });
}