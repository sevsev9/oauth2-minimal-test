const URL_PARAMS = new URLSearchParams(window.location.search);
const TOKEN = URL_PARAMS.get('token');

// Show an element
const show = (selector) => {
    document.querySelector(selector).style.display = 'block';
};

// Hide an element
const hide = (selector) => {
    document.querySelector(selector).style.display = 'none';
};

if (TOKEN) {
    hide('.content.unauthorized');
    show('.content.authorized');
    axios.get('http://localhost:8080/userdata?token='+TOKEN).then(res => {
        document.getElementById('userdata').innerText = res.body;
    }).catch(err => {
        document.getElementById('userdata').innerText = err;
    });
}