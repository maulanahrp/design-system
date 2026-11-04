// Pengalih tema untuk halaman preview: light / dark / auto (ikut sistem).
(function () {
  var KEY = 'mh-theme';
  var root = document.documentElement;
  function read() { try { return localStorage.getItem(KEY) || 'auto'; } catch (e) { return 'auto'; } }
  function apply(mode) {
    if (mode === 'light' || mode === 'dark') root.setAttribute('data-theme', mode);
    else root.removeAttribute('data-theme');
    document.querySelectorAll('[data-set-theme]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set-theme') === mode));
    });
  }
  apply(read());
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-set-theme]');
    if (!btn) return;
    var mode = btn.getAttribute('data-set-theme');
    try { localStorage.setItem(KEY, mode); } catch (e) { /* abaikan */ }
    apply(mode);
  });
})();
