import {html} from '../lib.js';
import {getMemeById,editMeme} from '../api/data.js';

const editTemplate = (meme,onEdit) => html`
    <section id="edit-meme">
        <form @submit=${onEdit} id="edit-form">
            <h1>Edit Meme</h1>
            <div class="container">
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description">
                           ${meme.description}
                        </textarea>
                <label for="imageUrl">Image Url</label>
                <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
                <input type="submit" class="registerbtn button" value="Edit Meme">
            </div>
        </form>
    </section>
`;

export async function editPage(context) {
    const memeId = context.params.id;
    const meme = await getMemeById(memeId);
    context.render(editTemplate(meme,onEdit));

    async function onEdit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');

        try {
            if(!title || !description || !imageUrl){
                throw new Error('All fields are required!');
            }
            await editMeme(memeId,{
                title,
                description,
                imageUrl
            });
            context.page.redirect('/catalog');
        }catch (e) {
            window.notify(e.message);
        }
    }
}