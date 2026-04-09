const editor = document.getElementById('editor');
const fileInput = document.getElementById('fileInput');

const newBtn = document.getElementById('newBtn');
const saveBtn = document.getElementById('saveBtn');
const undoBtn = document.getElementById('undoBtn');
const redoBtn = document.getElementById('redoBtn');
const themeBtn = document.getElementById('themeBtn');

const charCount = document.getElementById('charCount');
const wordCount = document.getElementById('wordCount');
const lineCount = document.getElementById('lineCount');
const saveState = document.getElementById('saveState');

const STORAGE_KEY = 'simple_editor_content_v1';
const THEME_KEY = 'simple_editor_theme_v1';

function updateStats() {
  const text = editor.value;
  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text.split('\n').length;

  charCount.textContent = `字符：${chars}`;
  wordCount.textContent = `单词：${words}`;
  lineCount.textContent = `行数：${lines}`;
}

function setSaved(saved) {
  saveState.textContent = saved ? '已保存' : '未保存';
}

function autosave() {
  localStorage.setItem(STORAGE_KEY, editor.value);
  setSaved(true);
}

function loadSavedContent() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved !== null) {
    editor.value = saved;
    setSaved(true);
  }
  updateStats();
}

function applyTheme(theme) {
  document.body.classList.toggle('dark', theme === 'dark');
  localStorage.setItem(THEME_KEY, theme);
}

function loadTheme() {
  const theme = localStorage.getItem(THEME_KEY) || 'light';
  applyTheme(theme);
}

newBtn.addEventListener('click', () => {
  const ok = confirm('是否清空当前内容并新建文档？');
  if (!ok) return;

  editor.value = '';
  updateStats();
  autosave();
});

fileInput.addEventListener('change', async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const text = await file.text();
  editor.value = text;
  updateStats();
  autosave();
  fileInput.value = '';
});

saveBtn.addEventListener('click', () => {
  const blob = new Blob([editor.value], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'document.txt';
  a.click();

  URL.revokeObjectURL(url);
  autosave();
});

undoBtn.addEventListener('click', () => {
  editor.focus();
  document.execCommand('undo');
  updateStats();
  setSaved(false);
});

redoBtn.addEventListener('click', () => {
  editor.focus();
  document.execCommand('redo');
  updateStats();
  setSaved(false);
});

themeBtn.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark');
  applyTheme(isDark ? 'light' : 'dark');
});

editor.addEventListener('input', () => {
  updateStats();
  setSaved(false);
});

let saveTimer;
editor.addEventListener('input', () => {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(autosave, 400);
});

loadTheme();
loadSavedContent();
