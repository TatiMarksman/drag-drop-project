
import './styles.css';

const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const browseBtn = document.getElementById('browse-btn');
const gallery = document.getElementById('gallery');

browseBtn.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
  handleFiles(e.target.files);
  // allow picking the same file twice in a row
  fileInput.value = '';
});

['dragenter','dragover'].forEach(evt =>
  dropZone.addEventListener(evt, (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.add('dz-hover');
  })
);
['dragleave','drop'].forEach(evt =>
  dropZone.addEventListener(evt, (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (evt === 'drop') {
      handleFiles(e.dataTransfer.files);
    }
    dropZone.classList.remove('dz-hover');
  })
);

function handleFiles(files) {
  [...files].forEach(file => {
    if (!file.type.startsWith('image/')) {
      addItem({ name: file.name, isImage: false });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => addItem({ name: file.name, isImage: true, src: reader.result });
    reader.readAsDataURL(file);
  });
}

function addItem({ name, isImage, src }) {
  const item = document.createElement('div');
  item.className = 'thumb';

  const remove = document.createElement('button');
  remove.className = 'remove';
  remove.innerHTML = '&times;';
  remove.title = 'Удалить';
  remove.addEventListener('click', () => item.remove());

  if (isImage) {
    const img = document.createElement('img');
    img.alt = name;
    img.src = src;
    item.appendChild(img);
  } else {
    const span = document.createElement('span');
    span.textContent = name;
    item.appendChild(span);
  }

  item.appendChild(remove);
  gallery.appendChild(item);
}
