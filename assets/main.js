(() => {
  'use strict';

  // Cropped frames and LPIPS scores correspond to Figure 3 and Table 1.
  const DATASETS = {
    ssv2: {
      label: 'Something-Something-v2',
      offset: 0,
      current: [0.280, 0.437, 0.350, 0.323, 0.416],
      next: [0.193, 0.240, 0.224, 0.201, 0.153]
    },
    ego4d: {
      label: 'Ego4D',
      offset: 5,
      current: [0.470, 0.378, 0.540, 0.427, 0.397],
      next: [0.370, 0.247, 0.385, 0.232, 0.284]
    }
  };

  const FRAME_COLUMNS = [
    { file: 'observation', description: 'Current observed frame' },
    { file: 'reconstruction', description: 'Current frame reconstruction' },
    { file: 'next-observation', description: 'Next observed frame' },
    { file: 'next-reconstruction', description: 'Next frame reconstruction' },
    { file: 'prediction', description: 'World model prediction' }
  ];

  function initAbstract() {
    const more = document.getElementById('abstract-more');
    const toggle = document.getElementById('abstract-toggle');
    const label = toggle.querySelector('span');

    // The full abstract stays visible when JavaScript is unavailable.
    more.hidden = true;
    toggle.hidden = false;
    toggle.setAttribute('aria-expanded', 'false');
    label.textContent = 'Show more';

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(expanded));
      more.hidden = !expanded;
      label.textContent = expanded ? 'Show less' : 'Show more';
    });
  }

  function initExampleExplorer() {
    let dataset = 'ssv2';
    let example = 1;
    const frames = document.querySelectorAll('#prediction-grid img');
    const datasetButtons = document.querySelectorAll('[data-dataset]');
    const exampleButtons = document.querySelectorAll('[data-example]');
    const count = document.getElementById('example-count');
    const nextScore = document.getElementById('lpips-next');
    const currentScore = document.getElementById('lpips-current');

    function renderExample() {
      const selected = DATASETS[dataset];

      frames.forEach((image, index) => {
        const column = FRAME_COLUMNS[index];
        image.src = `assets/examples/${dataset}/${example}-${column.file}.webp`;
        image.alt = `${column.description}, ${selected.label} example ${example}`;
      });

      datasetButtons.forEach(button => {
        button.setAttribute('aria-pressed', String(button.dataset.dataset === dataset));
      });

      exampleButtons.forEach(button => {
        const paperNumber = Number(button.dataset.example) + selected.offset;
        button.textContent = String(paperNumber).padStart(2, '0');
        button.setAttribute('aria-label', `Example ${paperNumber}`);
        button.setAttribute('aria-pressed', String(Number(button.dataset.example) === example));
      });

      count.textContent = dataset === 'ssv2' ? '01 — 05' : '06 — 10';
      nextScore.textContent = selected.next[example - 1].toFixed(3);
      currentScore.textContent = selected.current[example - 1].toFixed(3);
    }

    datasetButtons.forEach(button => {
      button.addEventListener('click', () => {
        dataset = button.dataset.dataset;
        renderExample();
      });
    });

    exampleButtons.forEach(button => {
      button.addEventListener('click', () => {
        example = Number(button.dataset.example);
        renderExample();
      });
    });
  }

  function initFigureDialog() {
    const dialog = document.getElementById('figure-dialog');
    const image = document.getElementById('dialog-image');
    const caption = document.getElementById('dialog-caption');
    const original = document.getElementById('dialog-original');
    let trigger;

    document.querySelectorAll('[data-lightbox]').forEach(link => {
      link.addEventListener('click', event => {
        if (typeof dialog.showModal !== 'function' || event.metaKey || event.ctrlKey || event.shiftKey) {
          return;
        }

        event.preventDefault();
        trigger = link;
        image.src = link.href;
        image.alt = link.querySelector('img')?.alt || link.dataset.caption || 'Research figure';
        caption.textContent = link.dataset.caption || image.alt;
        original.href = link.href;
        dialog.showModal();
        document.body.classList.add('dialog-open');
      });
    });

    document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());

    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      const outside = event.clientX < bounds.left || event.clientX > bounds.right
        || event.clientY < bounds.top || event.clientY > bounds.bottom;
      if (outside) dialog.close();
    });

    dialog.addEventListener('close', () => {
      document.body.classList.remove('dialog-open');
      trigger?.focus({ preventScroll: true });
    });
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    // Supports direct file previews and browsers without the Clipboard API.
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.cssText = 'position:fixed;opacity:0';
    document.body.append(textarea);
    try {
      textarea.select();
      if (!document.execCommand('copy')) throw new Error('Clipboard unavailable');
    } finally {
      textarea.remove();
    }
  }

  function initCitation() {
    const button = document.getElementById('copy-citation');
    const label = button.querySelector('span');
    const citation = document.getElementById('bibtex');
    const status = document.getElementById('copy-status');

    button.addEventListener('click', async () => {
      try {
        await copyText(citation.textContent);
        label.textContent = 'Copied!';
        status.textContent = 'Citation copied to clipboard.';
        setTimeout(() => { label.textContent = 'Copy citation'; }, 2400);
      } catch {
        const range = document.createRange();
        range.selectNodeContents(citation);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        status.textContent = 'Citation selected. Press Control+C or Command+C to copy.';
        label.textContent = 'Selected — press Ctrl/⌘ C';
      }
    });
  }

  function initNavigation() {
    if (!('IntersectionObserver' in window)) return;

    const links = [...document.querySelectorAll('.nav-links a')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => {
          if (link.hash === `#${entry.target.id}`) {
            link.setAttribute('aria-current', 'location');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });

    links.forEach(link => {
      const section = document.querySelector(link.hash);
      if (section) observer.observe(section);
    });
  }

  initAbstract();
  initExampleExplorer();
  initFigureDialog();
  initCitation();
  initNavigation();
})();
