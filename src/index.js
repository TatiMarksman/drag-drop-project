import './styles.css';

const dropZone = document.getElementById('drop-zone');
const fileList = document.getElementById('file-list');

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.style.borderColor = 'green';
});

dropZone.addEventListener('dragleave', () => {
  dropZone.style.borderColor = '#ccc';
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.style.borderColor = '#ccc';

  const files = e.dataTransfer.files;
  for (const file of files) {
    const li = document.createElement('li');
    li.textContent = file.name;
    fileList.appendChild(li);
  }
}); 