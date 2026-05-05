// ── MTG Charts ──
document.addEventListener('DOMContentLoaded', () => {
  Chart.defaults.color = '#5a5854';
  Chart.defaults.font.family = "'Jost', sans-serif";

  new Chart(document.getElementById('rarityChart'), {
    type: 'doughnut',
    data: {
      labels: ['Common','Uncommon','Rare','Mythic'],
      datasets: [{ data: [3750,1492,539,81], backgroundColor: ['#3a3a48','#607d8b','#c9a84c','#e8813c'], borderWidth: 0, hoverOffset: 6 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '68%',
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ' ' + ctx.label + ': ' + ctx.parsed.toLocaleString() } } }
    }
  });

  new Chart(document.getElementById('setsChart'), {
    type: 'bar',
    data: {
      labels: ['Tarkir: Dragonstorm','Lost Caverns of Ixalan','Lorwyn Eclipsed','Phyrexia: All Will Be One','Foundations','Avatar: The Last Airbender',"Marvel's Spider-Man","The Brothers' War",'Bloomburrow','Core Set 2020'],
      datasets: [{ data: [1049,741,547,510,329,234,208,151,129,125], backgroundColor: 'rgba(201,168,76,0.75)', borderRadius: 4, borderSkipped: false }]
    },
    options: {
      indexAxis: 'y', responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ' ' + ctx.parsed.x.toLocaleString() + ' cards' } } },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#5a5854', font: { size: 11 } } },
        y: { grid: { display: false }, ticks: { color: '#9a9690', font: { size: 11 }, autoSkip: false } }
      }
    }
  });

  new Chart(document.getElementById('foilChart'), {
    type: 'bar',
    data: {
      labels: ['Non-foil','Foil'],
      datasets: [{ data: [5381,481], backgroundColor: ['#3a3a48','#c9a84c'], borderRadius: 4, borderSkipped: false }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ' ' + ctx.parsed.y.toLocaleString() } } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#9a9690', font: { size: 11 } } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#5a5854', font: { size: 10 }, callback: v => v.toLocaleString() } }
      }
    }
  });

  new Chart(document.getElementById('langChart'), {
    type: 'bar',
    data: {
      labels: ['English','French','Japanese'],
      datasets: [{ data: [5748,106,8], backgroundColor: ['#6baed6','#e07070','#e8813c'], borderRadius: 4, borderSkipped: false }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ' ' + ctx.parsed.y.toLocaleString() + ' cards' } } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#9a9690', font: { size: 11 } } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#5a5854', font: { size: 10 }, callback: v => v.toLocaleString() } }
      }
    }
  });
});
