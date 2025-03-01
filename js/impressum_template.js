/**
 * This function returns the contents of the impressum.
 * @returns 
 */
function impressum() {
    return /*html*/`
        <div id="impressum-overlay" class="impressum-overlay">
        <div class="close-instructions-overlay">
                <img onclick="closeImpressum()" src="./img/9_intro_outro_screens/start/cross.png" alt="">
            </div>
        <h1 class="impressum-headline">Impressum</h1>

        <p><strong>Angaben gemäß § 5 TMG:</strong></p>
        <p><strong>Spielentwickler:</strong> Leon Dorsch</p>
        <p><strong>Adresse:</strong> Ludwig-Hunger Str. 12, 81375 München, Deutschland</p>
        <p><strong>Kontakt:</strong> <a href="mailto:leon.dorsch@gmx.de">leon.dorsch@gmx.de</a></p>
        <p><strong>Telefon:</strong> +49 17647758230</p>
        <p><strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong> Leon Dorsch</p>

        <p><strong>Haftungsausschluss:</strong></p>
        <p class="impressum-text">Die Inhalte dieses Spiels wurden mit größtmöglicher Sorgfalt erstellt. Dennoch übernimmt der Entwickler keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Inhalte. Eine Haftung für Schäden, die aus der Nutzung des Spiels entstehen, ist ausgeschlossen.</p>

        <p class="footer">© 2025 Leon Dorsch | El Pollo Loco</p>
        <span>Icons provided by
            <a href="https://www.flaticon.com">Flaticon</a>
            <a href="https://www.freepik.com">Freepik</a>
        </span>
    </div>
    `;
}