// ── Tab switching ──
function switchTab(id, el) {
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('panel-' + id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openTab(id) {
  if (id === 'salem') document.getElementById('tab-salem').style.display = '';
  if (id === 'mr')    document.getElementById('tab-mr').style.display = '';
  const tab = document.getElementById('tab-' + id);
  if (tab) switchTab(id, tab);
}

// ── Semester accordion ──
function toggleSem(el) {
  el.nextElementSibling.classList.toggle('open');
}

// ── Theme toggle ──
function toggleTheme() {
  const body = document.body;
  const btn  = document.getElementById('theme-btn');
  body.classList.toggle('light');
  const isLight = body.classList.contains('light');
  btn.textContent = isLight ? '☽ Dark' : '☀ Light';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Apply saved theme on load
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light');
    const btn = document.getElementById('theme-btn');
    if (btn) btn.textContent = '☽ Dark';
  }
});
