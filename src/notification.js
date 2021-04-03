const notification = document.querySelector('#notifications > #errorBox');

export function notify(message) {
    notification.querySelector('span').textContent = message;
    notification.style.display = 'block';


    setTimeout(() =>{
        notification.style.display = 'none';
    },3000);
}
window.notify = notify;
