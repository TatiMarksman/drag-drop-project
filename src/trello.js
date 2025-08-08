
import './styles.css';

const STORAGE_KEY = 'ahj-trello-state-v1';

const defaultState = [
  ['Написать ТЗ', 'Собрать UI каркас'],
  ['Подключить DnD'],
  ['Проверить LocalStorage'],
];

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    // sanity: ensure 3 columns
    if (!Array.isArray(parsed) || parsed.length !== 3) return defaultState;
    return parsed.map(col => Array.isArray(col) ? col : []);
  } catch {
    return defaultState;
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function createCard(text) {
  const el = document.createElement('div');
  el.className = 'card';
  el.textContent = text;
  const btn = document.createElement('button');
  btn.className = 'remove';
  btn.innerHTML = '&times;';
  btn.title = 'Удалить';
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const colEl = el.closest('.column');
    const colIdx = Number(colEl.dataset.col);
    const idx = Array.from(colEl.querySelectorAll('.card')).indexOf(el);
    state[colIdx].splice(idx, 1);
    el.remove();
    saveState(state);
  });
  el.appendChild(btn);
  return el;
}

const state = loadState();
const columns = [...document.querySelectorAll('.column')];
columns.forEach((colEl, i) => {
  const list = colEl.querySelector('.cards');
  state[i].forEach(text => list.appendChild(createCard(text)));
});

// Add card flow
document.querySelectorAll('.add-card').forEach(btn => {
  btn.addEventListener('click', () => {
    const colIdx = Number(btn.dataset.col);
    const text = prompt('Введите текст карточки:');
    if (!text) return;
    const list = document.querySelector(`.column[data-col="${colIdx}"] .cards`);
    list.appendChild(createCard(text));
    state[colIdx].push(text);
    saveState(state);
  });
});

/** Drag and drop (mouse/touch) **/
let dragging = null;
let ghost = null;
let placeholder = null;
let shiftX = 0;
let shiftY = 0;
let origin = { col: -1, index: -1 };

function onPointerDown(e) {
  const card = e.target.closest('.card');
  if (!card || e.target.closest('.remove')) return;

  e.preventDefault();
  const rect = card.getBoundingClientRect();
  shiftX = e.clientX - rect.left;
  shiftY = e.clientY - rect.top;

  const colEl = card.closest('.column');
  origin.col = Number(colEl.dataset.col);
  origin.index = Array.from(colEl.querySelectorAll('.card')).indexOf(card);

  dragging = card;
  // placeholder
  placeholder = document.createElement('div');
  placeholder.className = 'placeholder';
  placeholder.style.height = rect.height + 'px';
  card.parentElement.insertBefore(placeholder, card.nextSibling);

  // ghost
  ghost = card.cloneNode(true);
  ghost.classList.add('drag-ghost');
  ghost.style.width = rect.width + 'px';
  document.body.appendChild(ghost);

  card.style.display = 'none';
  moveGhost(e.clientX, e.clientY);

  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('pointerup', onPointerUp);
}

function moveGhost(clientX, clientY) {
  ghost.style.transform = `translate(${clientX - shiftX}px, ${clientY - shiftY}px)`;
}

function getDroppable(clientX, clientY) {
  // Temporarily hide ghost to use elementFromPoint correctly
  ghost.style.display = 'none';
  const elem = document.elementFromPoint(clientX, clientY);
  ghost.style.display = '';
  if (!elem) return null;
  return elem.closest('.cards') || elem.closest('.card') || elem.closest('.column');
}

function onPointerMove(e) {
  if (!dragging) return;
  moveGhost(e.clientX, e.clientY);

  const target = getDroppable(e.clientX, e.clientY);
  if (!target) return;

  if (target.classList.contains('card')) {
    const list = target.parentElement;
    const targetRect = target.getBoundingClientRect();
    const before = e.clientY < targetRect.top + targetRect.height / 2;
    list.insertBefore(placeholder, before ? target : target.nextSibling);
  } else if (target.classList.contains('cards')) {
    if (placeholder.parentElement !== target) {
      target.appendChild(placeholder);
    }
  } else if (target.classList.contains('column')) {
    const list = target.querySelector('.cards');
    if (placeholder.parentElement !== list) {
      list.appendChild(placeholder);
    }
  }
}

function onPointerUp(e) {
  if (!dragging) return;
  document.removeEventListener('pointermove', onPointerMove);
  document.removeEventListener('pointerup', onPointerUp);

  // Place the original card into placeholder spot
  dragging.style.display = '';
  placeholder.parentElement.insertBefore(dragging, placeholder);
  const newColEl = dragging.closest('.column');
  const newCol = Number(newColEl.dataset.col);
  const newIndex = Array.from(newColEl.querySelectorAll('.card')).indexOf(dragging);

  // Update state
  const [movedText] = state[origin.col].splice(origin.index, 1);
  state[newCol].splice(newIndex, 0, movedText);
  saveState(state);

  // cleanup
  ghost.remove();
  placeholder.remove();
  dragging = null;
  ghost = null;
  placeholder = null;
}

document.addEventListener('pointerdown', onPointerDown);
