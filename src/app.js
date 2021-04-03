import {render, page} from './lib.js';

import {homePage} from "./sample/home.js";
import {loginPage} from "./sample/login.js";
import {registerPage} from "./sample/register.js";
import {logout} from "./api/data.js";
import {catalogPage} from "./sample/catalog.js";
import {detailPage} from "./sample/details.js";
import {editPage} from "./sample/edit.js";
import {profilePage} from "./sample/profile.js";
import {createPage} from "./sample/create.js";
import {notify} from './notification.js';


const main = document.querySelector('main');
document.querySelector('#logout').addEventListener('click',logOutBtn);


userNav();

page('/', decorateContext, guestOnlyView, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/catalog', decorateContext, catalogPage);
page('/details/:id', decorateContext, detailPage);
page('/edit/:id', decorateContext, editPage);
page('/profile', decorateContext, profilePage);
page('/create', decorateContext , createPage)

page.start();


async function decorateContext(context, next) {
    context.render = (content) => render(content, main);
    context.setUserNav = userNav;
    next();
}


function guestOnlyView(context , next) {
    const token = sessionStorage.getItem('authToken');
    if(token){
        context.page.redirect('/catalog');
    }
    next();
}


function userNav() {
    const email = sessionStorage.getItem('email');
    if (email) {
        const user = document.querySelector('.user');
        user.querySelector('.profile > span').textContent = `Welcome, ${email}`;
        user.style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}

async function logOutBtn() {
    await logout();
    userNav();
    page.redirect('/');
}


