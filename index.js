// Global post object
let posts = [];
let comments = [];
let currentPost = {};
let currentComment = {};

// Elements
let postTextArea = document.getElementById("postTextArea");
let posterUsernameInputbox = document.getElementById("posterUsername");
let submitPostButton = document.getElementById("submitPost");

let postsContainer = document.getElementById("postsContainer");

//Event Listeners
postTextArea.addEventListener('change', handleTextAreaChange, false);
posterUsernameInputbox.addEventListener('change', handlePosterUsernameInputboxChange, false);
submitPostButton.addEventListener('click', handleSubmitPostButton, false);
// Callbacks
function handleTextAreaChange(event) {
    currentPost.postText = event.target.value;
}

function handlePosterUsernameInputboxChange(event) {
    currentPost.posterUserName = event.target.value;
}

function handleSubmitPostButton() {
    const postId = posts.length + 1;
    currentPost.id = postId;
    posts.push(currentPost);
    currentPost = {};
    updateUI();
}


function handleCommentTextAreaChange(event) {
    currentComment.commentsText = event.target.value;
}

function handleCommenterUsernameInputboxChange(event) {
    currentComment.commentorUserName = event.target.value;
}

function handleSubmitCommenttButton() {
    const postId = this.getAttribute('data-id');
    const commentID = comments.length + 1;
    currentComment.id = commentID;
    currentComment.postId = postId;
    comments.push(currentComment);
    console.log(JSON.stringify(comments));
    currentComment = {};
    updateUI();
}

function reply(id) {
    const target = document.getElementById(id);
    const appendDiv = document.createElement('div');
    appendDiv.classList.add('commentsForm');
    appendDiv.innerHTML = `
        <textarea id="commentTextArea" name="commentTextArea" rows="2" cols="33" placeholdr="Comment ..."></textarea>
        <div>
            <input id="commenterUsername" name="commenterUsername" rows="2" cols="33" placeholder="Username"/>
            <button id="submitComment" data-id="${id}">Comment</button>
        </div>`;
    target.appendChild(appendDiv)
    let commentTextArea = document.getElementById("commentTextArea");
    let commenterUsername = document.getElementById("commenterUsername");
    let submitComment = document.getElementById("submitComment");
    commentTextArea.addEventListener('change', handleCommentTextAreaChange, false);
    commenterUsername.addEventListener('change', handleCommenterUsernameInputboxChange, false);
    submitComment.addEventListener('click', handleSubmitCommenttButton, false);
}
function renderComments(parentId) {
    let commentsForThisParent = comments.filter(item => item.postId == parentId);

    let html  = commentsForThisParent.map(item => {
        return `<div class="post comment" id=c${item.id}>
        <div class="userImage">
            <img src="user.jpg"/>
        </div>
        <div class="postBody">
            <div class="username">${item.commentorUserName}</div>
            <div class="postText">${item.commentsText}</div>
            <div class="actions">
                <a href="#" onclick="reply('c${item.id}')">Reply</a>
            </div>
            ${renderComments('c'+ item.id)}
        </div>
   </div>`;
    });
    return html.join('');
}
function updateUI() {
    let html  = posts.map(item => {
        return `<div class="post" id=${item.id}>
        <div class="userImage">
            <img src="user.jpg"/>
        </div>
        <div class="postBody">
            <div class="username">${item.posterUserName}</div>
            <div class="postText">${item.postText}</div>
            <div class="actions">
                <a href="#" onclick="reply(${item.id})">Reply</a>
            </div>
            ${renderComments(item.id)}
        </div>
   </div>`;
    });
    postsContainer.innerHTML = html.join('');
}