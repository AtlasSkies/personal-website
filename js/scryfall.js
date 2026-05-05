// Collection lookup + Scryfall image fetch
let COLLECTION = null;

async function loadCollection() {
  if (COLLECTION) return COLLECTION;
  const res = await fetch('js/collection.json');
  COLLECTION = await res.json();
  return COLLECTION;
}

async function searchCollection() {
  const nameInput = document.getElementById('scry-name');
  const resultDiv = document.getElementById('scry-result');
  const name = nameInput.value.trim();
  if (!name) { resultDiv.innerHTML = '<p class="scry-msg">Enter a card name to search your collection.</p>'; return; }

  resultDiv.innerHTML = '<p class="scry-msg">Searching collection...</p>';

  try {
    const col = await loadCollection();
    const key = name.toLowerCase();

    // Exact match first, then partial
    let matches = col[key] ? col[key] : null;
    if (!matches) {
      const partialKey = Object.keys(col).find(k => k.includes(key));
      if (partialKey) matches = col[partialKey];
    }

    if (!matches) {
      // Not in collection — still show Scryfall card info
      resultDiv.innerHTML = '<p class="scry-msg">Fetching card info...</p>';
      const sfRes = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(name)}`);
      const sfCard = await sfRes.json();
      if (!sfRes.ok) {
        resultDiv.innerHTML = '<p class="scry-msg" style="color:var(--red);">Not in collection — and card not found on Scryfall.</p>';
        return;
      }
      const imgUrl = sfCard.image_uris?.normal || sfCard.card_faces?.[0]?.image_uris?.normal || null;
      resultDiv.innerHTML = `
        <div class="scry-not-owned">
          <div class="scry-not-badge">Not in collection</div>
          <div class="scry-result">
            ${imgUrl ? `<img src="${imgUrl}" alt="${sfCard.name}" class="scry-card-img">` : ''}
            <div class="scry-card-info">
              <div class="scry-card-name">${sfCard.name}</div>
              <div class="scry-card-set">${sfCard.type_line || ''} · ${sfCard.set_name || ''} · ${sfCard.rarity || ''}</div>
              ${sfCard.mana_cost ? `<div class="scry-mana">${sfCard.mana_cost}</div>` : ''}
              <div class="scry-card-text">${(sfCard.oracle_text || '').replace(/\n/g,'<br>')}</div>
            </div>
          </div>
        </div>`;
      return;
    }

    // In collection — group by printing
    const totalQty = matches.reduce((s, c) => s + c.q, 0);
    let printingsHtml = '';
    for (const card of matches) {
      const foilLabel = card.f === 'foil' ? ' · <span style="color:var(--gold);">Foil</span>' : '';
      const langLabel = card.l !== 'en' ? ` · ${card.l.toUpperCase()}` : '';
      const rarityColor = {mythic:'#e8813c', rare:'#c9a84c', uncommon:'#607d8b', common:'var(--text3)'}[card.r] || 'var(--text3)';
      const imgUrl = `https://cards.scryfall.io/normal/front/${card.s[0]}/${card.s[1]}/${card.s}.jpg`;
      printingsHtml += `
        <div class="scry-printing">
          <img src="${imgUrl}" alt="${name}" class="scry-print-img" onerror="this.style.display='none'">
          <div class="scry-print-info">
            <div style="font-size:13px;font-weight:500;color:var(--text);">${card.sn}</div>
            <div style="font-size:11px;color:var(--text3);margin:.15rem 0;">#${card.cn} · <span style="color:${rarityColor};">${card.r}</span>${foilLabel}${langLabel}</div>
            <div style="font-size:12px;color:var(--green);">×${card.q} owned</div>
          </div>
        </div>`;
    }

    resultDiv.innerHTML = `
      <div class="scry-owned-header">
        <span class="scry-owned-badge">In your collection</span>
        <span style="font-size:13px;color:var(--text2);margin-left:.75rem;">${totalQty} cop${totalQty===1?'y':'ies'} · ${matches.length} printing${matches.length===1?'':'s'}</span>
      </div>
      <div class="scry-printings">${printingsHtml}</div>`;

  } catch(e) {
    resultDiv.innerHTML = `<p class="scry-msg" style="color:var(--red);">Error: ${e.message}</p>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const inp = document.getElementById('scry-name');
  if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') searchCollection(); });
  // Preload collection silently
  loadCollection().catch(() => {});
});
