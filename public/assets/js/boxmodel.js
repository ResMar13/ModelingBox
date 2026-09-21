(function () {
    'use strict';

    var maquette = document.querySelector('.maquette');
    var curseurMargin = document.getElementById('curseur-margin');
    var curseurBorder = document.getElementById('curseur-border');
    var curseurPadding = document.getElementById('curseur-padding');
    var valeurMargin = document.getElementById('valeur-margin');
    var valeurBorder = document.getElementById('valeur-border');
    var valeurPadding = document.getElementById('valeur-padding');
    var codeCss = document.getElementById('code-css-contenu');
    var btnCopier = document.getElementById('btn-copier');

    function majMaquette() {
        var m = curseurMargin.value;
        var b = curseurBorder.value;
        var p = curseurPadding.value;

        maquette.style.setProperty('--val-margin', m + 'px');
        maquette.style.setProperty('--val-border', b + 'px');
        maquette.style.setProperty('--val-padding', p + 'px');

        valeurMargin.textContent = m + 'px';
        valeurBorder.textContent = b + 'px';
        valeurPadding.textContent = p + 'px';

        codeCss.textContent = '.mon-element {\n' +
            '  margin: ' + m + 'px;\n' +
            '  border: ' + b + 'px solid;\n' +
            '  padding: ' + p + 'px;\n' +
            '}';
    }

    [curseurMargin, curseurBorder, curseurPadding].forEach(function (curseur) {
        curseur.addEventListener('input', majMaquette);
    });
    majMaquette();

    btnCopier.addEventListener('click', function () {
        navigator.clipboard.writeText(codeCss.textContent).then(function () {
            var texteInitial = btnCopier.textContent;
            btnCopier.textContent = 'Copié ✓';
            setTimeout(function () { btnCopier.textContent = texteInitial; }, 1500);
        }).catch(function () {});
    });

    // --- Modales explicatives ---
    var explications = {
        content: {
            titre: 'Le contenu (content)',
            couleur: 'var(--zone-content-pastille)',
            corps:
                '<p>C\'est le <strong>cœur de la boîte</strong> : la zone où se trouve réellement ton texte, ton image, ou n\'importe quel élément affiché à l\'écran.</p>' +
                '<p>Sa taille est définie par les propriétés <code>width</code> et <code>height</code>. Tout ce qui l\'entoure — padding, border, margin — s\'ajoute <em>autour</em> de cette zone, sans jamais empiéter dessus.</p>' +
                '<div class="modal-exemple"><code>.mon-element {<br>&nbsp;&nbsp;width: 200px;<br>&nbsp;&nbsp;height: 100px;<br>}</code></div>' +
                '<p class="modal-astuce">🎯 À retenir : si ton texte ou ton image semble « collé » aux bords de sa boîte, ce n\'est pas le content qu\'il faut agrandir, c\'est le <strong>padding</strong> qu\'il faut ajouter autour.</p>',
        },
        padding: {
            titre: 'La marge intérieure (padding)',
            couleur: 'var(--zone-padding)',
            corps:
                '<p>Le padding est l\'espace <strong>à l\'intérieur de la boîte</strong>, entre le contenu et la bordure. Il pousse la bordure vers l\'extérieur sans jamais réduire la taille du contenu.</p>' +
                '<p>Particularité importante : le padding <strong>fait partie du fond</strong> de l\'élément. Si tu mets une couleur de fond (<code>background-color</code>), elle s\'étend aussi sous le padding, jusqu\'à la bordure.</p>' +
                '<div class="modal-exemple"><code>.bouton {<br>&nbsp;&nbsp;padding: 12px 20px;<br>}</code></div>' +
                '<p class="modal-astuce">🎯 À retenir : c\'est le padding qui évite que le texte d\'un bouton ne colle à ses bords — c\'est l\'une de ses utilisations les plus courantes.</p>',
        },
        border: {
            titre: 'La bordure (border)',
            couleur: 'var(--zone-border-pastille)',
            corps:
                '<p>La bordure entoure le padding et le contenu. C\'est une <strong>ligne visible</strong> qui délimite clairement les contours de la boîte.</p>' +
                '<p>Une bordure se définit avec trois informations : son <strong>épaisseur</strong> (ex : 2px), son <strong>style</strong> (plein, pointillé, tirets...) et sa <strong>couleur</strong>.</p>' +
                '<div class="modal-exemple"><code>.carte {<br>&nbsp;&nbsp;border: 2px solid black;<br>}</code></div>' +
                '<p class="modal-astuce">🎯 À retenir : sans <code>border-style</code> précisé (comme <code>solid</code>), la bordure reste invisible même si tu lui donnes une épaisseur et une couleur !</p>',
        },
        margin: {
            titre: 'La marge extérieure (margin)',
            couleur: 'var(--zone-margin-pastille)',
            corps:
                '<p>Le margin est l\'espace <strong>en dehors de la bordure</strong>, entre cet élément et les éléments voisins. C\'est ce qui crée de la distance entre deux boîtes.</p>' +
                '<p>Contrairement au padding, le margin est <strong>toujours transparent</strong> : il ne prend jamais la couleur de fond de l\'élément, on ne voit jamais « à travers » lui.</p>' +
                '<div class="modal-exemple"><code>.carte {<br>&nbsp;&nbsp;margin-bottom: 20px;<br>}</code></div>' +
                '<p class="modal-astuce">🎯 À retenir : pour espacer plusieurs blocs entre eux (des cartes, des boutons côte à côte...), c\'est toujours le margin qu\'on utilise, jamais le padding.</p>',
        },
    };

    var modalFond = document.getElementById('modal-fond');
    var modalTitre = document.getElementById('modal-titre');
    var modalCorps = document.getElementById('modal-corps');
    var modalPastille = document.getElementById('modal-pastille');
    var modalFermer = document.getElementById('modal-fermer');
    var dernierElementFocus = null;

    function ouvrirModal(cle) {
        var donnees = explications[cle];
        if (!donnees) return;

        modalTitre.textContent = donnees.titre;
        modalCorps.innerHTML = donnees.corps;
        modalPastille.style.background = donnees.couleur;

        dernierElementFocus = document.activeElement;
        modalFond.hidden = false;
        modalFermer.focus();
        document.addEventListener('keydown', surEchap);
    }

    function fermerModal() {
        modalFond.hidden = true;
        document.removeEventListener('keydown', surEchap);
        if (dernierElementFocus) dernierElementFocus.focus();
    }

    function surEchap(e) {
        if (e.key === 'Escape') fermerModal();
    }

    document.querySelectorAll('[data-zone]').forEach(function (zone) {
        zone.addEventListener('click', function (e) {
            e.stopPropagation();
            ouvrirModal(zone.getAttribute('data-zone'));
        });
        zone.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                ouvrirModal(zone.getAttribute('data-zone'));
            }
        });
    });

    modalFermer.addEventListener('click', fermerModal);
    modalFond.addEventListener('click', function (e) {
        if (e.target === modalFond) fermerModal();
    });
})();
