const img = document.getElementById('bigImage');
const name = localStorage.getItem('selectedImage');

img.src = 'images/' + name;

let mode = localStorage.getItem('mode');
localStorage.setItem('mode', mode === 'human' ? 'nature' : 'human');