// Scryfall card lookup
async function scryfallSearch() {
  const nameInput = document.getElementById('scry-name');
  const setInput  = document.getElementById('scry-set');
  const resultDiv = document.getElementById('scry-result');
  const name = nameInput.value.trim();
  const set  = setInput.value.trim();

  if (!name) {
    resultDiv.innerHTML = '<p class="scry-msg">Please enter a card name.</p>';
    return;
  }

  resultDiv.innerHTML = '<p class="scry-msg">Searching...</p>';

  try {
    let query = `!"${name}"`;
    if (set) query += ` set:${set.toLowerCase()}`;
    const url = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}&order=released&unique=prints`;
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok || !data.data || data.data.length === 0) {
      resultDiv.innerHTML = '<p class="scry-msg">Card not found. Check spelling or set code.</p>';
      return;
    }

    const card = data.data[0];
    const imgUrl = card.image_uris
      ? card.image_uris.normal
      : (card.card_faces && card.card_faces[0].image_uris
          ? card.card_faces[0].image_uris.normal
          : null);

    const mana = card.mana_cost || (card.card_faces ? card.card_faces[0].mana_cost : '') || '';
    const oracleText = card.oracle_text || (card.card_faces ? card.card_faces.map(f => f.oracle_text).join('\n---\n') : '') || '';
    const setName = card.set_name || '';
    const rarity = card.rarity ? card.rarity.charAt(0).toUpperCase() + card.rarity.slice(1) : '';
    const type = card.type_line || '';
    const prices = card.prices || {};
    const usd = prices.usd ? `$${prices.usd}` : (prices.usd_foil ? `$${prices.usd_foil} foil` : '');

    resultDiv.innerHTML = `
      <div class="scry-result">
        ${imgUrl ? `<img src="${imgUrl}" alt="${card.name}" class="scry-card-img">` : ''}
        <div class="scry-card-info">
          <div class="scry-card-name">${card.name}</div>
          ${mana ? `<div class="scry-mana">${mana}</div>` : ''}
          <div class="scry-card-set">${type}${type && setName ? ' · ' : ''}${setName}${rarity ? ' · ' + rarity : ''}${usd ? ' · ' + usd : ''}</div>
          <div class="scry-card-text">${oracleText.replace(/\n/g, '<br>')}</div>
        </div>
      </div>`;
  } catch (e) {
    resultDiv.innerHTML = '<p class="scry-msg">Error contacting Scryfall. Check your connection.</p>';
  }
}

// Allow Enter key in inputs
document.addEventListener('DOMContentLoaded', () => {
  ['scry-name','scry-set'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter') scryfallSearch(); });
  });
});
