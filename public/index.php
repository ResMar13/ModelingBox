<?php
define('APP_BASE_URL', '/boxmodeling');
?>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BoxModeling</title>
<script>
(function () {
    try {
        var t = localStorage.getItem('theme_boxmodeling') || 'clair';
        document.documentElement.setAttribute('data-theme', t);
    } catch (e) {}
})();
</script>
<link rel="stylesheet" href="<?= APP_BASE_URL ?>/assets/css/style.css">
</head>
<body>
<header class="topbar">
    <div class="topbar-inner">
        <span class="brand">📦 BoxModeling</span>
        <div id="theme-switcher" class="theme-switcher"></div>
    </div>
</header>
<script>window.THEME_STORAGE_KEY = 'theme_boxmodeling';</script>
<script src="<?= APP_BASE_URL ?>/assets/js/theme.js" defer></script>

<main class="container">

    <section class="panel intro">
        <h1>Le modèle de boîte CSS</h1>
        <p>En CSS, chaque élément de ta page est en réalité une <strong>boîte rectangulaire</strong>, composée de plusieurs couches empilées les unes autour des autres. Ce modèle s'appelle le <strong>« box model »</strong>. Bouge les curseurs ci-dessous pour voir chaque couche changer en direct, et clique sur une zone du schéma pour en savoir plus sur son rôle.</p>
    </section>

    <section class="panel">
        <div class="atelier">
            <div class="atelier-maquette">
                <div class="maquette zone-margin" data-zone="margin" tabindex="0" role="button" aria-label="Zone margin, cliquer pour en savoir plus">
                    <span class="zone-etiquette">Marge extérieure <span class="zone-etiquette-en">/ margin</span></span>
                    <div class="zone-border" data-zone="border" tabindex="0" role="button" aria-label="Zone border, cliquer pour en savoir plus">
                        <span class="zone-etiquette">Bordure <span class="zone-etiquette-en">/ border</span></span>
                        <div class="zone-padding" data-zone="padding" tabindex="0" role="button" aria-label="Zone padding, cliquer pour en savoir plus">
                            <span class="zone-etiquette">Marge intérieure <span class="zone-etiquette-en">/ padding</span></span>
                            <div class="zone-content" data-zone="content" tabindex="0" role="button" aria-label="Zone content, cliquer pour en savoir plus">
                                Contenu
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="atelier-controles">
                <div class="controle">
                    <label for="curseur-margin">
                        <span class="controle-couleur" style="background:var(--zone-margin)"></span>
                        Marge extérieure (margin)
                        <span class="controle-valeur" id="valeur-margin">40px</span>
                    </label>
                    <input type="range" id="curseur-margin" min="0" max="100" value="40" step="1">
                </div>
                <div class="controle">
                    <label for="curseur-border">
                        <span class="controle-couleur controle-couleur-hachuree"></span>
                        Bordure (border)
                        <span class="controle-valeur" id="valeur-border">10px</span>
                    </label>
                    <input type="range" id="curseur-border" min="0" max="20" value="10" step="1">
                </div>
                <div class="controle">
                    <label for="curseur-padding">
                        <span class="controle-couleur" style="background:var(--zone-padding)"></span>
                        Marge intérieure (padding)
                        <span class="controle-valeur" id="valeur-padding">30px</span>
                    </label>
                    <input type="range" id="curseur-padding" min="0" max="100" value="30" step="1">
                </div>

                <div class="code-css">
                    <div class="code-css-head">
                        <span>Code CSS correspondant</span>
                        <button type="button" id="btn-copier" class="btn btn-small">Copier</button>
                    </div>
                    <pre id="code-css-contenu">.mon-element {
  margin: 40px;
  border: 10px solid;
  padding: 30px;
}</pre>
                </div>
            </div>
        </div>
        <p class="muted astuce">💡 Astuce : clique directement sur une zone colorée du schéma (ou utilise Tab + Entrée) pour afficher son explication.</p>
    </section>

</main>

<div class="modal-fond" id="modal-fond" hidden>
    <div class="modal-boite" role="dialog" aria-modal="true" aria-labelledby="modal-titre">
        <button type="button" class="modal-fermer" id="modal-fermer" aria-label="Fermer">&times;</button>
        <div class="modal-entete" id="modal-entete">
            <span class="modal-pastille" id="modal-pastille"></span>
            <h2 id="modal-titre"></h2>
        </div>
        <div class="modal-corps" id="modal-corps"></div>
    </div>
</div>

<script src="<?= APP_BASE_URL ?>/assets/js/boxmodel.js" defer></script>
</body>
</html>
