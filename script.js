// --- RÉCUPÉRATION DU MODE ---
let mode = localStorage.getItem('mode');

if (!mode) {
    mode = 'human'; // mode par défaut
    localStorage.setItem('mode', mode);
}

// --- LISTES D’IMAGES ---
const images = {
    human: [
        'Hom1.jpg','Hom2.jpg','Hom3.jpg',
        'Hom4.jpg','Hom5.jpg','Hom6.jpg',
        'Hom7.jpg','Hom8.jpg','Hom9.jpg'
    ],
    nature: [
        'Nat1.jpg','Nat2.jpg','Nat3.jpg',
        'Nat4.jpg','Nat5.jpg','Nat6.jpg',
        'Nat7.jpg','Nat8.jpg','Nat9.jpg'
    ]
};

// --- GÉNÉRATION DES PHOTOS ---
images[mode].forEach(name => {

    const photo = document.createElement('div');
    photo.className = 'photo';

    const img = document.createElement('img');
    img.src = 'images/' + name;
    photo.appendChild(img);

    document.body.appendChild(photo);

    // Position aléatoire
    photo.style.left = Math.random() * (window.innerWidth - 150) + 'px';
    photo.style.top  = Math.random() * (window.innerHeight - 150) + 'px';

    // --- DRAG & CLICK ---
    let isDragging = false;
    let moved = false;
    let startX, startY;
    let offsetX, offsetY;

    photo.addEventListener('mousedown', e => {
        isDragging = true;
        moved = false;

        startX = e.clientX;
        startY = e.clientY;

        offsetX = e.clientX - photo.offsetLeft;
        offsetY = e.clientY - photo.offsetTop;

        photo.style.cursor = 'grabbing';
        e.preventDefault();
    });

    document.addEventListener('mousemove', e => {
        if (!isDragging) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
            moved = true;
        }

        photo.style.left = e.clientX - offsetX + 'px';
        photo.style.top  = e.clientY - offsetY + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        photo.style.cursor = 'grab';

        if (!moved) {
            localStorage.setItem('selectedImage', name);
            window.location.href = 'view.html';
        }
    });
});
