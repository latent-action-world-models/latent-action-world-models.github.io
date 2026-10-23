(() => {
  'use strict';
  const abstractMore = document.getElementById('abstract-more');
  const abstractToggle = document.getElementById('abstract-toggle');
  abstractMore.hidden = true;
  abstractToggle.hidden = false;
  abstractToggle.setAttribute('aria-expanded', 'false');
  abstractToggle.querySelector('span').textContent = 'Show more';
  abstractToggle.addEventListener('click', () => {
    const expanded = abstractToggle.getAttribute('aria-expanded') !== 'true';
    abstractToggle.setAttribute('aria-expanded', String(expanded));
    abstractMore.hidden = !expanded;
    abstractToggle.querySelector('span').textContent = expanded ? 'Show less' : 'Show more';
  });

  // Scores and image crops correspond exactly to Figure 3 and Table 1.
  const scores = {
    ssv2: { current: [0.280, 0.437, 0.350, 0.323, 0.416], next: [0.193, 0.240, 0.224, 0.201, 0.153] },
    ego4d: { current: [0.470, 0.378, 0.540, 0.427, 0.397], next: [0.370, 0.247, 0.385, 0.232, 0.284] }
  };
  let dataset = 'ssv2';
  let example = 1;
  const descriptions = ['Current observed frame', 'Current frame reconstruction', 'Next observed frame', 'Next frame reconstruction', 'World model prediction'];
  function renderExample() {
    document.querySelectorAll('#prediction-grid img').forEach((img, index) => {
      img.src = `assets/${dataset}-${example}-${index}.webp`;
      img.alt = `${descriptions[index]}, ${dataset === 'ssv2' ? 'Something-Something-v2' : 'Ego4D'} example ${example}`;
    });
    document.querySelectorAll('[data-dataset]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.dataset === dataset)));
    document.querySelectorAll('[data-example]').forEach(button => {
      const paperNumber = Number(button.dataset.example) + (dataset === 'ego4d' ? 5 : 0);
      button.textContent = String(paperNumber).padStart(2, '0');
      button.setAttribute('aria-label', `Example ${paperNumber}`);
      button.setAttribute('aria-pressed', String(Number(button.dataset.example) === example));
    });
    document.getElementById('example-count').textContent = dataset === 'ssv2' ? '01 — 05' : '06 — 10';
    document.getElementById('lpips-next').textContent = scores[dataset].next[example - 1].toFixed(3);
    document.getElementById('lpips-current').textContent = scores[dataset].current[example - 1].toFixed(3);
  }
  document.querySelectorAll('[data-dataset]').forEach(button => button.addEventListener('click', () => { dataset = button.dataset.dataset; renderExample(); }));
  document.querySelectorAll('[data-example]').forEach(button => button.addEventListener('click', () => { example = Number(button.dataset.example); renderExample(); }));

  const dialog = document.getElementById('figure-dialog');
  let dialogTrigger;
  document.querySelectorAll('[data-lightbox]').forEach(link => link.addEventListener('click', event => {
    if (typeof dialog.showModal !== 'function' || event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    dialogTrigger = link;
    const img = document.getElementById('dialog-image');
    img.src = link.href;
    img.alt = link.querySelector('img')?.alt || link.dataset.caption || 'Research figure';
    document.getElementById('dialog-caption').textContent = link.dataset.caption || img.alt;
    document.getElementById('dialog-original').href = link.href;
    dialog.showModal();
    document.body.classList.add('dialog-open');
  }));
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); dialogTrigger?.focus({ preventScroll: true }); });

  const copyButton = document.getElementById('copy-citation');
  copyButton.addEventListener('click', async () => {
    const citation = document.getElementById('bibtex').textContent;
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(citation);
      else {
        const textarea = document.createElement('textarea');
        textarea.value = citation;
        textarea.style.cssText = 'position:fixed;opacity:0';
        document.body.append(textarea); textarea.select();
        const copied = document.execCommand('copy'); textarea.remove();
        if (!copied) throw new Error('Clipboard unavailable');
      }
      copyButton.querySelector('span').textContent = 'Copied!';
      document.getElementById('copy-status').textContent = 'Citation copied to clipboard.';
      setTimeout(() => { copyButton.querySelector('span').textContent = 'Copy citation'; }, 2400);
    } catch {
      const range = document.createRange(); range.selectNodeContents(document.getElementById('bibtex'));
      const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
      document.getElementById('copy-status').textContent = 'Citation selected. Press Control+C or Command+C to copy.';
      copyButton.querySelector('span').textContent = 'Selected — press Ctrl/⌘ C';
    }
  });

  if ('IntersectionObserver' in window) {
    const navLinks = [...document.querySelectorAll('.nav-links a')];
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) navLinks.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }), { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    navLinks.forEach(link => { const section = document.querySelector(link.hash); if (section) observer.observe(section); });
  }
})();
