import {html} from '../lib.js';
import {getMemes} from '../api/data.js';

const catalogTemplate = (meme) => html`
    <section id="meme-feed">
        <h1>All Memes</h1>
        <div id="memes">
            <!-- Display : All memes in database ( If any ) -->
           ${meme.length > 0 ? meme.map(memeTemplate) : html`<p class="no-memes">No memes in database.</p>`}            
            <!-- Display : If there are no memes in database -->
            
        </div>
    </section>
`;

const memeTemplate = (meme) => html`
    <div class="meme">
        <div class="card">
            <div class="info">
                <p class="meme-title">${meme.title}</p>
                <img class="meme-image" alt="meme-img" src=${meme.imageUrl}>
            </div>
            <div id="data-buttons">
                <a class="button" href="/details/${meme._id}">Details</a>
            </div>
        </div>
    </div>
`;
export async function catalogPage(context) {
    const memes = await getMemes();

    context.render(catalogTemplate(memes));
}