const SUB_TABS = ['salem', 'mr', 'mtg', 'z101'];

function switchTab(id, el) {
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('panel-' + id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openTab(id) {
  // Show the right sub-tab, hide others
  SUB_TABS.forEach(tid => {
    const t = document.getElementById('tab-' + tid);
    if (t) t.style.display = (tid === id) ? '' : 'none';
  });
  const tab = document.getElementById('tab-' + id);
  if (tab) switchTab(id, tab);
}

function toggleSem(el) {
  el.nextElementSibling.classList.toggle('open');
}

function toggleTheme() {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  document.getElementById('theme-btn').textContent = isLight ? '☽ Dark' : '☀ Light';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light');
    const btn = document.getElementById('theme-btn');
    if (btn) btn.textContent = '☽ Dark';
  }
});
