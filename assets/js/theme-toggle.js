/* Togetoge theme preference: independent of jQuery and sidebar controls. */
(function () {
    'use strict';
    var root = document.documentElement;
    var key = 'togetoge-theme';
    var button = document.querySelector('.z-theme-toggle');
    if (!button) return;

    function apply(theme) {
        theme = theme === 'light' ? 'light' : 'dark';
        root.setAttribute('data-theme', theme);
        root.style.colorScheme = theme;
        button.setAttribute('aria-pressed', String(theme === 'light'));
        button.title = theme === 'light' ? '切換至夜間模式' : '切換至白天模式';
    }
    // Stable accessible name: pressed means light mode is enabled.
    apply(root.getAttribute('data-theme'));
    button.hidden = false;
    button.addEventListener('click', function () {
        var theme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        apply(theme);
        try { window.localStorage.setItem(key, theme); } catch (e) { /* Still switch in memory. */ }
    });
    window.addEventListener('storage', function (event) {
        if (event.key === key || event.key === null) {
            try {
                if (event.storageArea === window.localStorage) apply(event.newValue);
            } catch (e) { /* Keep the current mode if storage access is denied. */ }
        }
    });
    window.addEventListener('pageshow', function () {
        // Resync restored pages with choices made on another page or tab.
        try { apply(window.localStorage.getItem(key)); } catch (e) { /* Keep in-memory choice. */ }
    });
})();
