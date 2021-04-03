import {html} from '../lib.js';
import {getMemeByUser} from '../api/data.js';

const profileTemplate = (memes,userInfo) => html`
    <section id="user-profile-page" class="user-profile">
        <article class="user-info">
            <img id="user-avatar-url" alt="user-profile" src="/images/${userInfo.gender}.png">
            <div class="user-content">
                <p>Username: ${userInfo.username}</p>
                <p>Email: ${userInfo.email}</p>
                <p>My memes count: ${memes.length}</p>
            </div>
        </article>
        <h1 id="user-listings-title">User Memes</h1>
        <div class="user-meme-listings">
            <!-- Display : All created memes by this user (If any) -->
            
            ${memes.length > 0 ? memes.map(memeTemplate) : html`<p class="no-memes">No memes in database.</p>`}

            <!-- Display : If user doesn't have own memes  -->
            
        </div>
    </section>
`;

const memeTemplate = (meme) => html`
    <div class="user-meme">
        <p class="user-meme-title">${meme.title}</p>
        <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
        <a class="button" href="/details/${meme._id}">Details</a>
    </div>
`;

export async function profilePage(context) {
    const userID = sessionStorage.getItem('userId');
    const userInfo = {
        username:sessionStorage.getItem('username'),
        email:sessionStorage.getItem('email'),
        gender:sessionStorage.getItem('userGender')
    }
    const memes = await getMemeByUser(userID);

    context.render(profileTemplate(memes,userInfo));
}