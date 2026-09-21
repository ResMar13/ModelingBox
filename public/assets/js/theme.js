(function () {
    'use strict';

    var THEMES = [
        { id: 'clair', nom: 'Clair', bg: '#f4f6f8', primary: '#2563eb' },
        { id: 'sombre', nom: 'Sombre', bg: '#0f1419', primary: '#3b82f6' },
        { id: 'ocean', nom: 'Océan', bg: '#0a1929', primary: '#29b6f6' },
        { id: 'foret', nom: 'Forêt', bg: '#0d1f12', primary: '#4ade80' },
        { id: 'coucher-de-soleil', nom: 'Coucher de soleil', bg: '#fff5f0', primary: '#f97316' },
        { id: 'lavande', nom: 'Lavande', bg: '#f7f5ff', primary: '#8b5cf6' },
        { id: 'ardoise', nom: 'Ardoise', bg: '#1a1d24', primary: '#60a5fa' },
        { id: 'sepia', nom: 'Sépia', bg: '#f4ecd8', primary: '#a1662f' },
        { id: 'contraste-eleve', nom: 'Contraste élevé', bg: '#000000', primary: '#ffdd00' },
        { id: 'minuit', nom: 'Minuit', bg: '#000000', primary: '#7c9eff' }
    ];

    var STORAGE_KEY = window.THEME_STORAGE_KEY || 'theme';

    function themeActuel() {
        return document.documentElement.getAttribute('data-theme') || 'clair';
    }

    function appliquerTheme(id) {
        document.documentElement.setAttribute('data-theme', id);
        try { localStorage.setItem(STORAGE_KEY, id); } catch (e) { /* stockage indisponible */ }
        majSelection(id);
    }

    function majSelection(id) {
        var items = document.querySelectorAll('.theme-menu [data-theme-id]');
        for (var i = 0; i < items.length; i++) {
            items[i].classList.toggle('active', items[i].getAttribute('data-theme-id') === id);
        }
    }

    function construireMenu() {
        var conteneur = document.getElementById('theme-switcher');
        if (!conteneur) return;

        var bouton = document.createElement('button');
        bouton.type = 'button';
        bouton.className = 'theme-toggle';
        bouton.setAttribute('aria-label', 'Changer de thème');
        bouton.textContent = '🎨';

        var menu = document.createElement('div');
        menu.className = 'theme-menu';
        menu.hidden = true;

        THEMES.forEach(function (t) {
            var item = document.createElement('button');
            item.type = 'button';
            item.className = 'theme-item';
            item.setAttribute('data-theme-id', t.id);

            var swatch = document.createElement('span');
            swatch.className = 'theme-swatch';
            swatch.style.background = t.bg;
            var pastille = document.createElement('span');
            pastille.style.background = t.primary;
            swatch.appendChild(pastille);

            var label = document.createElement('span');
            label.textContent = t.nom;

            item.appendChild(swatch);
            item.appendChild(label);

            item.addEventListener('click', function () {
                appliquerTheme(t.id);
                menu.hidden = true;
            });

            menu.appendChild(item);
        });

        bouton.addEventListener('click', function (e) {
            e.stopPropagation();
            menu.hidden = !menu.hidden;
        });
        document.addEventListener('click', function () {
            menu.hidden = true;
        });
        menu.addEventListener('click', function (e) { e.stopPropagation(); });

        conteneur.appendChild(bouton);
        conteneur.appendChild(menu);
        majSelection(themeActuel());
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', construireMenu);
    } else {
        construireMenu();
    }
})();
