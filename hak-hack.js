        const { useState } = React;

        // Komponente für schöne T-Konten
        const TKonto = ({ titel, sollItems, habenItems, sollTotal, habenTotal }) => (
            <div className="t-konto">
                <div className="t-konto-titel">{titel}</div>
                <table>
                    <thead>
                        <tr>
                            <th className="soll-seite">SOLL</th>
                            <th>HABEN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Math.max(sollItems.length, habenItems.length) > 0 ? (
                            Array.from({ length: Math.max(sollItems.length, habenItems.length) }).map((_, i) => (
                                <tr key={i}>
                                    <td className="soll-seite">{sollItems[i] || ''}</td>
                                    <td>{habenItems[i] || ''}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="soll-seite">-</td>
                                <td>-</td>
                            </tr>
                        )}
                        {(sollTotal || habenTotal) && (
                            <tr>
                                <td className="soll-seite">{sollTotal || ''}</td>
                                <td>{habenTotal || ''}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );

        // Komponente für formatierte Text-Ausgabe mit Boxen
        const FormattedText = ({ text }) => {
            const lines = text.split('\n');
            let result = [];
            let currentBox = null;
            let currentBoxContent = [];
            
            lines.forEach((line, idx) => {
                // Erkenne Box-Starts
                if (line.includes('🤔') || line.includes('💡') || line.includes('📊')) {
                    if (currentBox) {
                        result.push(
                            <div key={`box-${idx}`} className={currentBox}>
                                {currentBoxContent}
                            </div>
                        );
                    }
                    currentBox = 'explanation-box';
                    currentBoxContent = [<p key={idx} className="font-bold text-lg mb-2">{line}</p>];
                } else if (line.includes('🏠') || line.includes('🎮') || line.includes('📱')) {
                    if (currentBox) {
                        result.push(
                            <div key={`box-${idx}`} className={currentBox}>
                                {currentBoxContent}
                            </div>
                        );
                    }
                    currentBox = 'example-box';
                    currentBoxContent = [<p key={idx} className="font-bold text-lg mb-2">{line}</p>];
                } else if (line.includes('🎯') || line.includes('❓') || line.includes('🎓')) {
                    if (currentBox) {
                        result.push(
                            <div key={`box-${idx}`} className={currentBox}>
                                {currentBoxContent}
                            </div>
                        );
                    }
                    currentBox = 'rule-box';
                    currentBoxContent = [<p key={idx} className="font-bold text-lg mb-2">{line}</p>];
                } else if (line.includes('━━━')) {
                    if (currentBox && currentBoxContent.length > 0) {
                        result.push(
                            <div key={`box-${idx}`} className={currentBox}>
                                {currentBoxContent}
                            </div>
                        );
                        currentBox = null;
                        currentBoxContent = [];
                    }
                    result.push(<div key={idx} className="divider"></div>);
                } else if (line.trim()) {
                    if (currentBox) {
                        currentBoxContent.push(<p key={idx} className="mb-1">{line}</p>);
                    } else {
                        result.push(<p key={idx} className="mb-2">{line}</p>);
                    }
                }
            });
            
            if (currentBox && currentBoxContent.length > 0) {
                result.push(
                    <div key="final-box" className={currentBox}>
                        {currentBoxContent}
                    </div>
                );
            }
            
            return <div className="space-y-3">{result}</div>;
        };

        function HAKHack() {
            const [mode, setMode] = useState('home');
            const [image, setImage] = useState(null);
            const [searchTerm, setSearchTerm] = useState('');
            const [freeTerm, setFreeTerm] = useState('');
            const [result, setResult] = useState(null);
            const [loading, setLoading] = useState(false);
            const [apiKey, setApiKey] = useState('AIzaSyDR9aSI7Nsir6yhI9QBQJJugKOr6yytSuI');
            const [showApiInput, setShowApiInput] = useState(false);

            // Ausführliche Begriffserklärungen
            const BEGRIFFE = {
                "aktivkonto": `🤔 STELL DIR VOR...

Du hast zu Hause verschiedene Schubladen:
• Eine für dein Geld (Geldbörse)
• Eine für deine Wertsachen (Handy, Laptop)
• Eine für deine Sachen (Fahrrad, Moped)

In der Buchhaltung nennt man solche "Schubladen" AKTIVKONTEN!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 WAS IST EIN AKTIVKONTO?

Ein Aktivkonto ist eine "Schublade" in der Buchhaltung, wo du aufschreibst, wie viel von deinem BESITZ du hast.

Das heißt auf Deutsch: Was gehört DIR?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏠 BEISPIELE AUS DEINEM LEBEN:

📱 Handy & Laptop
→ Das ist ein "Aktivkonto" namens "Technische Anlagen"
→ Wert: Wie viel ist dein Handy wert? Z.B. 800 €

💶 Deine Geldbörse
→ Das ist ein "Aktivkonto" namens "Kassa"
→ Du hast z.B. 50 € drin

🏦 Dein Bankkonto
→ Das ist ein "Aktivkonto" namens "Bank"
→ Darauf hast du z.B. 1.200 € gespart

🛵 Dein Moped
→ Das ist ein "Aktivkonto" namens "Fahrzeuge"
→ Wert: Z.B. 2.500 €

🎮 Deine PlayStation & Games
→ Das ist auch ein "Aktivkonto"!
→ Wert: Z.B. 600 €

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 DIE WICHTIGSTEN AKTIVKONTEN:

📦 VERMÖGEN (Was du besitzt):
• Kassa (Bargeld)
• Bank (Geld am Konto)
• Waren (Sachen zum Verkaufen)
• Fahrzeuge (Auto, Moped)
• Maschinen (z.B. 3D-Drucker)
• Gebäude (z.B. Haus)

📄 FORDERUNGEN (Jemand schuldet DIR Geld)
• Forderungen (Wenn dir wer Geld schuldet)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❓ HÄUFIGE FRAGEN:

Q: Warum heißt es "Konto"?
A: Weil du drauf aufschreibst, wie viel du hast!
   Wie ein Konto bei der Bank - nur in der Buchhaltung.

Q: Warum nicht einfach "Besitz" statt "Aktivkonto"?
A: In der Buchhaltung will man's genau - daher 
   gibt's für verschiedene Arten von Besitz 
   verschiedene Konten!

Q: Muss ich das auswendig lernen?
A: Nicht alles! Aber versteh das Prinzip:
   AKTIV = Was du HAST!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎓 ZUSAMMENFASSUNG:

Ein Aktivkonto ist eine "Schublade" in der 
Buchhaltung, wo du aufschreibst, wie viel 
von deinem BESITZ du hast.

Beispiele aus deinem Leben:
• Kassa = Geldbörse
• Bank = Bankkonto  
• Fahrzeuge = Fahrrad/Moped
• Technische Anlagen = Handy/Laptop

Regel: SOLL = Mehr, HABEN = Weniger

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💪 NÄCHSTER SCHRITT:

Probier mal selbst:
Mach eine Liste von deinem Besitz und 
ordne sie Aktivkonten zu!

Oder frag mich:
"Was ist ein Passivkonto?" (Das Gegenteil!)`,

                "passivkonto": `🤔 STELL DIR VOR...

Du borgst dir von deinen Eltern 100 € für ein neues Spiel.
Jetzt hast du 100 € mehr, ABER du schuldest sie deinen Eltern!

Das ist ein PASSIVKONTO - eine Liste deiner Schulden!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 WAS IST EIN PASSIVKONTO?

Ein Passivkonto ist eine "Liste" in der Buchhaltung,
wo du aufschreibst, was du anderen SCHULDEST.

Das heißt: Woher kommt dein Geld?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏠 BEISPIELE AUS DEINEM LEBEN:

💳 Schulden bei Eltern
→ Du borgst dir 100 € für ein Gaming-Headset
→ Das ist ein "Passivkonto" namens "Verbindlichkeiten"

🏦 Kredit für dein Moped
→ Die Bank leiht dir 2.000 € für ein Moped
→ Das ist ein "Passivkonto" namens "Bankkredit"

💰 Dein eigenes Startkapital
→ Du startest mit 500 € eigenem Geld
→ Das ist ein "Passivkonto" namens "Eigenkapital"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 DIE WICHTIGSTEN PASSIVKONTEN:

💼 EIGENKAPITAL (Dein eigenes Geld):
• Eigenkapital (Was DIR wirklich gehört)

📋 FREMDKAPITAL (Geliehenes Geld):
• Verbindlichkeiten (Schulden bei anderen)
• Bankkredit (Kredit von der Bank)
• Lieferverbindlichkeiten (Noch nicht bezahlte Rechnungen)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❓ HÄUFIGE FRAGEN:

Q: Warum ist Eigenkapital ein PASSIVKONTO?
A: Weil es zeigt, WOHER dein Geld kommt!
   (Von dir selbst!)

Q: Was ist der Unterschied zu Aktivkonto?
A: AKTIV = Was du BESITZT
   PASSIV = Woher das Geld KOMMT

Q: Sind Schulden schlecht?
A: Nicht immer! Firmen nehmen oft Kredite,
   um zu wachsen. Wichtig ist, dass man sie
   zurückzahlen kann!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎓 ZUSAMMENFASSUNG:

Passivkonten zeigen, WOHER dein Geld kommt:
• Von dir selbst (Eigenkapital)
• Von anderen (Schulden/Verbindlichkeiten)

Regel (umgekehrt!):
• HABEN = Schulden werden mehr
• SOLL = Schulden werden weniger

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💪 FÜR PROFIS:

Die goldene Regel der Bilanz:
AKTIVA = PASSIVA

Das heißt:
Alles was du besitzt (Aktiv) = 
Woher es kommt (Passiv)

Beispiel:
Du hast ein Moped (2.000 € Aktiv)
→ 500 € eigenes Geld (Eigenkapital)
→ 1.500 € Kredit (Verbindlichkeiten)
→ 500 + 1.500 = 2.000 ✓`,

                "soll": `🤔 WAS IST "SOLL"?

SOLL ist die LINKE SEITE eines Kontos!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 WARUM HEIßT'S "SOLL"?

Früher hat man gesagt:
"Der Kunde SOLL mir noch 100 € zahlen!"

Heute bedeutet SOLL einfach: LINKS!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 WIE FUNKTIONIERT SOLL?

📦 Bei AKTIVKONTEN (Besitz):
SOLL = MEHR! ⬆️

📋 Bei PASSIVKONTEN (Schulden):
SOLL = WENIGER! ⬇️

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏠 BEISPIELE AUS DEM ALLTAG:

📱 Du kaufst ein Handy für 800 € bar:

KASSA:
- Im HABEN: 800 € (weniger)

WAREN:
- Im SOLL: 800 € (mehr)

🎮 Du verkaufst dein altes Spiel für 30 €:

KASSA:
- Im SOLL: 30 € (mehr)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 MERKSATZ:

"SOLL steht für Sonne - sie geht im Osten auf!"
→ SOLL = LINKS (wie Osten auf der Landkarte)

Oder noch einfacher:
🔸 SOLL = LINKS ⬅️
🔸 HABEN = RECHTS ➡️

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❓ HÄUFIGE FRAGEN:

Q: Warum nicht einfach "Links" statt "Soll"?
A: Tradition! In der Buchhaltung sagt man
   seit hunderten Jahren "Soll" und "Haben".

Q: Was ist wichtiger - Soll oder Haben?
A: BEIDES ist wichtig! Jede Buchung hat
   IMMER beide Seiten!

Q: Kann ich mir das leichter merken?
A: Ja! Mit Emojis:
   ⬅️ SOLL (Links)
   ➡️ HABEN (Rechts)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎓 ZUSAMMENFASSUNG:

SOLL = Linke Seite des T-Kontos

Bei Aktivkonten (Besitz):
→ SOLL = MEHR ⬆️

Bei Passivkonten (Schulden):
→ SOLL = WENIGER ⬇️

Einfach links denken! ⬅️`,

                "haben": `🤔 WAS IST "HABEN"?

HABEN ist die RECHTE SEITE eines Kontos!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 WARUM HEIßT'S "HABEN"?

Früher hat man gesagt:
"Ich HABE jetzt 100 € bekommen!"

Heute bedeutet HABEN einfach: RECHTS!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 WIE FUNKTIONIERT HABEN?

📦 Bei AKTIVKONTEN (Besitz):
HABEN = WENIGER! ⬇️

📋 Bei PASSIVKONTEN (Schulden):
HABEN = MEHR! ⬆️

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏠 BEISPIELE AUS DEM ALLTAG:

🍕 Du kaufst Pizza für 12 € bar:

KASSA:
- Im HABEN: 12 € (weniger!)

💰 Du bekommst 50 € Taschengeld:

KASSA:
- Im SOLL: 50 € (mehr!)

🛵 Du nimmst Kredit für Moped auf:

BANKKREDIT:
- Im HABEN: 2.000 € (Schulden mehr!)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 MERKSATZ:

"HABEN ist wie die Sonne im Westen!"
→ HABEN = RECHTS (wie Westen auf der Landkarte)

Oder einfach mit Händen:
👈 Linke Hand = SOLL
👉 Rechte Hand = HABEN

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❓ HÄUFIGE FRAGEN:

Q: Ist HABEN besser als SOLL?
A: Nein! Beide Seiten sind gleichwertig.
   Jede Buchung braucht BEIDE Seiten!

Q: Warum ist HABEN bei Aktiv = weniger?
A: Weil wenn du Geld AUSGIBST,
   dann HAST du weniger! Logisch, oder?

Q: Kann ich das vereinfachen?
A: Ja! Denk dir:
   ⬅️ SOLL (Links) = Eingang bei Aktiv
   ➡️ HABEN (Rechts) = Ausgang bei Aktiv

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎓 ZUSAMMENFASSUNG:

HABEN = Rechte Seite des T-Kontos

Bei Aktivkonten (Besitz):
→ HABEN = WENIGER ⬇️

Bei Passivkonten (Schulden):
→ HABEN = MEHR ⬆️

Einfach rechts denken! ➡️

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💪 PROFI-TIPP:

Lern dir das mit der "Waage":
⚖️ SOLL und HABEN müssen 
   IMMER gleich sein!

Wenn links (Soll) 100 € steht,
dann muss rechts (Haben) auch 100 € stehen!`,

                "buchungssatz": `🤔 WAS IST EIN BUCHUNGSSATZ?

Ein Buchungssatz ist wie eine Anweisung:
"Nimm Geld von Konto A und gib's auf Konto B!"

Wie beim Überweisung - nur in der Buchhaltung!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 DIE GRUNDREGEL:

Ein Buchungssatz hat IMMER 2 Teile:

SOLL an HABEN
(Von)    (Nach)

Oder anders gesagt:
"Von wo kommt's?" → "Wo geht's hin?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏠 SUPER-EINFACHES BEISPIEL:

Du verkaufst dein altes Handy für 100 € bar.

Buchungssatz:
Kassa (100 €) an Erlöse (100 €)

Was heißt das?
→ In die KASSA (Geldbörse) kommen 100 € rein
→ Du hast 100 € ERLÖSE (Einnahmen) gemacht

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 WIE SCHREIBT MAN EINEN BUCHUNGSSATZ?

Format:
[SOLL-Konto] an [HABEN-Konto]  [Betrag]

Beispiele:

1️⃣ Du kaufst eine Pizza für 12 €:
Aufwand 12 € an Kassa 12 €

2️⃣ Du verkaufst ein Spiel für 30 €:
Kassa 30 € an Erlöse 30 €

3️⃣ Du nimmst 500 € Kredit auf:
Bank 500 € an Bankkredit 500 €

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎮 REAL-LIFE BEISPIELE FÜR DICH:

Du kaufst ein Gaming-Headset (80 €) bar:
Waren 80 € an Kassa 80 €
→ Deine Waren (Headset) werden mehr
→ Deine Kassa wird weniger

Du verkaufst deine alte PlayStation (200 €):
Kassa 200 € an Waren 200 €
→ Deine Kassa wird mehr
→ Deine Waren werden weniger

Du bekommst 50 € Taschengeld überwiesen:
Bank 50 € an Erlöse 50 €
→ Dein Bankkonto wird mehr
→ Du hast Einnahmen gemacht

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 DIE GOLDENE REGEL:

Ein Buchungssatz ist wie eine Waage:
⚖️ Links (SOLL) = Rechts (HABEN)

Immer der GLEICHE Betrag!

Wenn links 100 € steht,
muss rechts auch 100 € stehen!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 SO MERKST DU'S DIR:

Stell dir vor, Geld ist Wasser:
🚰 Es fließt von einem Behälter 
   in einen anderen!

Buchungssatz = Anweisung für's Umfüllen!

SOLL (Links) = Wo fließt's HIN?
HABEN (Rechts) = Wo kommt's HER?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📚 ARTEN VON BUCHUNGSSÄTZEN:

1️⃣ EINFACHER BUCHUNGSSATZ:
1 Konto an 1 Konto
Beispiel: Kassa an Erlöse

2️⃣ ZUSAMMENGESETZTER BUCHUNGSSATZ:
Mehrere Konten beteiligt
Beispiel: Kassa + Bank an Waren
(Später mehr dazu!)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❓ HÄUFIGE FRAGEN:

Q: Warum nicht einfach "von...nach"?
A: Weil "Soll an Haben" die offizielle
   Sprache der Buchhaltung ist!
   Wie beim Fußball die Regeln!

Q: Was kommt zuerst - Soll oder Haben?
A: IMMER zuerst SOLL, dann HABEN!
   Nie umgekehrt!

Q: Kann ich das auswendig lernen?
A: Besser: VERSTEHE das Prinzip!
   Dann kannst du jeden Buchungssatz
   selbst bilden!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎓 ZUSAMMENFASSUNG:

Ein Buchungssatz zeigt:
→ Welches Konto wird mehr (SOLL)
→ Welches Konto wird weniger (HABEN)
→ Um wie viel Geld geht's

Format:
SOLL-Konto an HABEN-Konto  Betrag

Goldene Regel:
Links = Rechts (gleicher Betrag!)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💪 ÜBUNG FÜR DICH:

Versuch mal selbst:
Du kaufst ein Fahrrad für 300 € und
zahlst bar.

Wie lautet der Buchungssatz?

Lösung:
Fahrzeuge 300 € an Kassa 300 €

Verstanden? Dann bist du bereit
für die nächsten Themen! 🚀`,

                "ertragskonto": `🤔 WAS IST EIN ERTRAGSKONTO?

Ein Ertragskonto ist wie ein Punktestand:
"Wie viel habe ich verdient?"

Jedes Mal wenn Geld REINKOMMT,
schreibst du's auf's Ertragskonto!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 EINFACH ERKLÄRT:

Stell dir vor, du hast einen Nebenjob:
🛍️ Du verkaufst alte Sachen auf Willhaben
🎮 Du streamst auf Twitch
📱 Du reparierst Handys für Freunde

Alles was du dabei VERDIENST,
kommt auf's Ertragskonto!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏠 BEISPIELE AUS DEINEM LEBEN:

💰 Du verkaufst dein altes Spiel für 30 €
→ Ertragskonto "Erlöse" +30 €

🎨 Du malst ein Bild und verkaufst es für 50 €
→ Ertragskonto "Erlöse" +50 €

💻 Du reparierst einen PC und bekommst 80 €
→ Ertragskonto "Dienstleistungserlöse" +80 €

🎁 Du bekommst 100 € geschenkt
→ Ertragskonto "Sonstige Erträge" +100 €

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 DIE WICHTIGSTEN ERTRAGSKONTEN:

💰 ERLÖSE:
• Umsatzerlöse (Hauptgeschäft)
• Dienstleistungserlöse
• Provisionserlöse

🎁 SONSTIGE ERTRÄGE:
• Zinsertäge (Zinsen vom Sparbuch)
• Mieterlöse (Wenn du was vermietest)
• Geschenke/Schenkungen

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎮 DEIN EIGENER YOUTUBE-KANAL:

Stell dir vor, du startest einen Gaming-Kanal:

Monat 1:
• Werbeeinnahmen: 50 €
• Sponsoring: 100 €
• Merch verkauft: 200 €
━━━━━━━━━━━━━━━━━
GESAMT: 350 € Ertrag! 🎉

Das sind alles Ertragskonten!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❓ HÄUFIGE FRAGEN:

Q: Ist ein Ertragskonto = Gewinn?
A: Fast! Ertrag ist alles was reinkommt.
   Gewinn = Ertrag MINUS Ausgaben!

Q: Warum steht Ertrag im HABEN?
A: Tradition! Aber denk dir:
   Du HAST etwas verdient! → HABEN!

Q: Muss ich für jeden Verkauf ein neues Konto?
A: Nein! Alle ähnlichen Sachen kommen
   auf EIN Konto (z.B. "Erlöse")

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎓 ZUSAMMENFASSUNG:

Ertragskonto = Hier schreibst du auf,
was du VERDIENST!

• Steht fast immer im HABEN (rechts)
• Verschiedene Arten (Erlöse, Zinsen, etc.)
• Am Ende vom Jahr: Alle zusammenzählen!

Formel:
💰 ERTRÄGE - AUFWAND = GEWINN 🎉

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💪 PROFI-TIPP:

Mach eine Liste von allem,
womit DU Geld verdienen könntest:

• Alte Sachen verkaufen?
• Nachhilfe geben?
• YouTube/Twitch?
• Fotos verkaufen?

Jedes davon wäre ein Ertragskonto!

Oder frag mich:
"Was ist ein Aufwandskonto?" (Das Gegenteil!)`,

                "aufwandskonto": `🤔 WAS IST EIN AUFWANDSKONTO?

Ein Aufwandskonto ist wie deine Ausgaben-Liste:
"Wofür gebe ich mein Geld aus?"

Jedes Mal wenn du Geld AUSGIBST,
schreibst du's auf's Aufwandskonto!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 EINFACH ERKLÄRT:

Stell dir vor, du führst ein eigenes Mini-Business:
🍕 Pizza kaufen = Aufwand
📱 Internet-Rechnung = Aufwand
⚡ Strom für PC = Aufwand
🎮 Spiele für Content = Aufwand

Alles was dich Geld KOSTET,
kommt auf's Aufwandskonto!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏠 BEISPIELE AUS DEINEM LEBEN:

🍕 Du kaufst Essen für 15 €
→ Aufwandskonto "Lebensmittel" +15 €

📱 Du zahlst Handyrechnung 25 €
→ Aufwandskonto "Telekom" +25 €

⚡ Stromrechnung 80 €
→ Aufwandskonto "Energie" +80 €

🎮 Neues Spiel kaufen 60 €
→ Aufwandskonto "Waren" +60 €

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 DIE WICHTIGSTEN AUFWANDSKONTEN:

💰 BETRIEBSKOSTEN:
• Wareneinsatz (Was du einkaufen musst)
• Miete (Für Raum/Laden)
• Strom, Wasser, Heizung

📱 KOMMUNIKATION:
• Telefon & Internet
• Werbekosten (Instagram Ads)
• Website-Hosting

👔 PERSONAL (später):
• Löhne & Gehälter
• Sozialversicherung

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎮 DEIN EIGENER YOUTUBE-KANAL:

Stell dir vor, du startest einen Gaming-Kanal:

Monat 1 - Ausgaben:
• Neue Kamera: 500 €
• Mikrofon: 150 €
• Beleuchtung: 100 €
• Spiele für Reviews: 180 €
━━━━━━━━━━━━━━━━━
GESAMT: 930 € Aufwand! 💸

Das sind alles Aufwandskonten!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚖️ ERTRAG VS. AUFWAND:

Stell dir vor:

📥 ERTRÄGE (Einnahmen):
• YouTube: 350 €
• Sponsoring: 200 €
• Merch: 100 €
= 650 € ✅

📤 AUFWAND (Ausgaben):
• Equipment: 400 €
• Spiele: 180 €
• Internet: 50 €
= 630 € ❌

━━━━━━━━━━━━
GEWINN: 20 € 🎉

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❓ HÄUFIGE FRAGEN:

Q: Warum ist Aufwand im SOLL?
A: Tradition! Aber denk dir:
   "Das SOLLTE ich mir sparen!" 😄

Q: Sind Ausgaben schlecht?
A: Nein! Manche Ausgaben sind Investitionen!
   Gute Kamera → Bessere Videos → Mehr Geld!

Q: Wie viele Aufwandskonten brauche ich?
A: Kommt drauf an! Für's HAK-Lernen:
   5-10 verschiedene reichen!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎓 ZUSAMMENFASSUNG:

Aufwandskonto = Hier schreibst du auf,
was du AUSGIBST!

• Steht fast immer im SOLL (links)
• Verschiedene Arten (Material, Miete, Strom)
• Am Ende: Alle zusammenzählen!

Formel:
💰 ERTRÄGE - AUFWAND = GEWINN

Oder anders:
Was reinkommt - Was rausgeht = Was bleibt

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💪 ÜBUNG FÜR DICH:

Schreib eine Woche lang auf:
• Wofür gibst du Geld aus?
• Wie viel war's?
• In welches Aufwandskonto würde das passen?

Beispiel:
• Döner 6 € → Lebensmittel
• Netflix 10 € → Abo-Kosten
• Busticket 2,50 € → Fahrtkosten

Das ist praktische Buchhaltung! 📝`
            };

            const handleImageUpload = async (e) => {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onloadend = () => {
                    setImage(reader.result);
                    setMode('result');
                    analyzeImage(reader.result);
                };
                reader.readAsDataURL(file);
            };

            const analyzeImage = async (imageData) => {
                if (!apiKey) {
                    setResult({
                        emoji: '⚠️',
                        titel: 'API Key fehlt!',
                        content: 'Bitte gib oben deinen Google Gemini API Key ein!',
                        isText: true
                    });
                    setLoading(false);
                    return;
                }

                setLoading(true);
                
                try {
                    const base64Image = imageData.split(',')[1];
                    
                    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            contents: [{
                                parts: [
                                    {
                                        text: `Du bist HAK-Hack, ein super-geduldiger Buchhaltungs-Lehrer für 14-jährige HAK-Schüler in Österreich!

Analysiere dieses Bild und erkläre, was du siehst:

1. Ist das ein BUCHUNGSSATZ? Wenn ja:
   - Welche Konten sind beteiligt?
   - Wie lautet der Buchungssatz?
   - Was bedeutet das in einfachen Worten?

2. Ist das eine AUFGABE aus einem Schulbuch? Wenn ja:
   - Was ist die Aufgabe?
   - Erkläre Schritt für Schritt, wie man sie löst!

3. Ist das ein T-KONTO oder eine BILANZ? Wenn ja:
   - Erkläre, was du siehst!
   - Was sind die Zahlen?

Wichtig: 
- Verwende VIELE Emojis! 🎓💡🎯
- Erkläre es so, dass es ein 14-Jähriger versteht!
- Nutze Beispiele aus dem Alltag (Handy, Gaming, Taschengeld)
- Strukturiere deine Antwort mit Überschriften!
- Sei motivierend und ermutigend!`
                                    },
                                    {
                                        inline_data: {
                                            mime_type: "image/jpeg",
                                            data: base64Image
                                        }
                                    }
                                ]
                            }]
                        })
                    });

                    const data = await response.json();
                    
                    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
                        setResult({
                            emoji: '📸',
                            titel: 'Bildanalyse',
                            content: data.candidates[0].content.parts[0].text,
                            isText: true
                        });
                    } else {
                        throw new Error('Keine Antwort von der API');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    setResult({
                        emoji: '❌',
                        titel: 'Fehler!',
                        content: `Es gab einen Fehler bei der Analyse:\n\n${error.message}\n\nBitte prüfe deinen API Key!`,
                        isText: true
                    });
                }
                
                setLoading(false);
            };

            const handleSearch = () => {
                const term = searchTerm.toLowerCase().trim();
                const found = BEGRIFFE[term];
                
                if (found) {
                    setResult({
                        emoji: getEmojiForTerm(term),
                        titel: getTitleForTerm(term),
                        content: found,
                        isText: false,
                        hasTKonto: true,
                        tkontoData: getTKontoDataForTerm(term)
                    });
                    setMode('result');
                } else {
                    const verfuegbar = Object.keys(BEGRIFFE).join(', ');
                    setResult({
                        emoji: '🤔',
                        titel: 'Begriff nicht gefunden!',
                        content: `Hmmm, "${searchTerm}" kenne ich noch nicht!\n\n🎯 Verfügbare Begriffe:\n${verfuegbar}\n\n💡 Tipp: Schreib den Begriff klein und ohne Leerzeichen!\nZum Beispiel: "aktivkonto" statt "Aktiv Konto"`,
                        isText: true
                    });
                    setMode('result');
                }
            };

            const handleFreeTermSearch = async () => {
                if (!freeTerm.trim()) return;
                if (!apiKey) {
                    setResult({
                        emoji: '⚠️',
                        titel: 'API Key fehlt!',
                        content: 'Bitte gib oben deinen Google Gemini API Key ein, um beliebige Begriffe erklären zu lassen!',
                        isText: true
                    });
                    setMode('result');
                    return;
                }

                setLoading(true);
                setMode('result');

                try {
                    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            contents: [{
                                parts: [{
                                    text: `Du bist HAK-Hack, ein super-geduldiger Buchhaltungs-Lehrer für 14-jährige HAK-Schüler in Österreich!

Erkläre den Begriff "${freeTerm}" SO AUSFÜHRLICH UND DETAILLIERT wie möglich!

WICHTIG - Folge GENAU dieser Struktur:

🤔 STELL DIR VOR...
(Beginne mit einem konkreten Alltags-Beispiel aus dem Leben eines 14-Jährigen)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 WAS IST [BEGRIFF]?
(Definition in 2-3 einfachen Sätzen)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏠 BEISPIELE AUS DEINEM LEBEN:
(Mindestens 3-4 konkrete Beispiele mit Handy, Gaming, Taschengeld, etc.)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 WIE FUNKTIONIERT'S TECHNISCH?
(Wenn T-Konten relevant sind, beschreibe sie hier)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 DIE WICHTIGSTEN PUNKTE:
(Aufzählung der Kern-Infos)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❓ HÄUFIGE FRAGEN:
Q: (Typische Frage 1)
A: (Antwort)

Q: (Typische Frage 2)
A: (Antwort)

Q: (Typische Frage 3)
A: (Antwort)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎓 ZUSAMMENFASSUNG:
(Kurze Wiederholung in 3-4 Sätzen)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💪 NÄCHSTER SCHRITT:
(Was soll der Schüler als nächstes tun/üben?)

WICHTIG:
- Sei SEHR ausführlich (mindestens 500 Wörter!)
- Verwende VIELE Emojis! 🎓💡🎯
- Nutze die Trennlinien ━━━━━━━
- Erkläre es so, dass es ein 14-Jähriger versteht!
- Nutze Beispiele aus dem Alltag!
- Sei motivierend und ermutigend!`
                                }]
                            }]
                        })
                    });

                    const data = await response.json();
                    
                    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
                        setResult({
                            emoji: '🔍',
                            titel: freeTerm,
                            content: data.candidates[0].content.parts[0].text,
                            isText: false
                        });
                    } else {
                        throw new Error('Keine Antwort von der API');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    setResult({
                        emoji: '❌',
                        titel: 'Fehler!',
                        content: `Es gab einen Fehler:\n\n${error.message}\n\nBitte prüfe deinen API Key!`,
                        isText: true
                    });
                }
                
                setLoading(false);
            };

            const getEmojiForTerm = (term) => {
                const emojis = {
                    aktivkonto: '💰',
                    passivkonto: '📋',
                    soll: '⬅️',
                    haben: '➡️',
                    buchungssatz: '✍️',
                    ertragskonto: '💸',
                    aufwandskonto: '💸'
                };
                return emojis[term] || '📚';
            };

            const getTitleForTerm = (term) => {
                const titles = {
                    aktivkonto: 'Aktivkonto',
                    passivkonto: 'Passivkonto',
                    soll: 'SOLL (die linke Seite)',
                    haben: 'HABEN (die rechte Seite)',
                    buchungssatz: 'Buchungssatz',
                    ertragskonto: 'Ertragskonto',
                    aufwandskonto: 'Aufwandskonto'
                };
                return titles[term] || term;
            };

            const getTKontoDataForTerm = (term) => {
                if (term === 'aktivkonto') {
                    return {
                        titel: 'AKTIVKONTO "Kassa"',
                        sollItems: ['+ 100 €', '(MEHR! ⬆️)'],
                        habenItems: ['- 20 €', '(WENIGER! ⬇️)']
                    };
                } else if (term === 'passivkonto') {
                    return {
                        titel: 'PASSIVKONTO "Verbindlichkeiten"',
                        sollItems: ['- 50 €', '(WENIGER! ⬇️)'],
                        habenItems: ['+ 100 €', '(MEHR! ⬆️)']
                    };
                } else if (term === 'soll' || term === 'haben') {
                    return {
                        titel: 'KONTO',
                        sollItems: ['⬅️ SOLL', '(LINKS)'],
                        habenItems: ['➡️ HABEN', '(RECHTS)']
                    };
                } else if (term === 'ertragskonto') {
                    return {
                        titel: 'ERTRAGSKONTO "Erlöse"',
                        sollItems: ['(Abschluss)'],
                        habenItems: ['+ 100 €', '+ 50 €', '+ 200 €'],
                        sollTotal: '',
                        habenTotal: '350 € ✓'
                    };
                } else if (term === 'aufwandskonto') {
                    return {
                        titel: 'AUFWANDSKONTO "Wareneinsatz"',
                        sollItems: ['+ 50 €', '+ 100 €', '+ 200 €'],
                        habenItems: ['(Abschluss)'],
                        sollTotal: '350 € ✓',
                        habenTotal: ''
                    };
                }
                return null;
            };

            return (
                <div className="min-h-screen p-3 sm:p-4 md:p-8">
                    <div className="max-w-4xl mx-auto">
                        
                        {/* Header */}
                        <div className="glass p-4 sm:p-6 mb-4 sm:mb-6 fade-in">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                                <div className="flex-1">
                                    <h1 className="text-3xl sm:text-4xl font-bold fredoka text-purple-600 mb-2">
                                        🔓 HAK-Hack
                                    </h1>
                                    <p className="text-sm sm:text-base text-gray-600">
                                        Buchhaltung verstehen - leicht gemacht!
                                    </p>
                                </div>
                                {mode !== 'home' && (
                                    <button
                                        onClick={() => {
                                            setMode('home');
                                            setImage(null);
                                            setResult(null);
                                        }}
                                        className="btn px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 w-full sm:w-auto"
                                    >
                                        ← Zurück
                                    </button>
                                )}
                            </div>
                            
                            {showApiInput && (
                                <div className="mt-4 p-3 sm:p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                    <div className="flex items-start gap-2 sm:gap-3">
                                        <span className="text-xl sm:text-2xl">🔑</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                                                Google Gemini API Key:
                                            </p>
                                            <input
                                                type="password"
                                                value={apiKey}
                                                onChange={(e) => setApiKey(e.target.value)}
                                                placeholder="AIza..."
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 text-sm sm:text-base"
                                            />
                                            <p className="text-xs sm:text-sm text-gray-600">
                                                Benötigt für Foto-Analyse & beliebige Begriffe. 
                                                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1">
                                                    Hier kostenlos holen!
                                                </a>
                                            </p>
                                            {apiKey && (
                                                <button
                                                    onClick={() => setShowApiInput(false)}
                                                    className="mt-2 text-xs sm:text-sm text-gray-500 underline"
                                                >
                                                    Ausblenden
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {!showApiInput && apiKey && (
                                <button
                                    onClick={() => setShowApiInput(true)}
                                    className="mt-2 text-xs sm:text-sm text-gray-500 underline"
                                >
                                    🔑 API Key ändern
                                </button>
                            )}
                        </div>

                        {/* Home Screen */}
                        {mode === 'home' && (
                            <div className="space-y-4 fade-in">
                                {/* Foto-Modus */}
                                <label htmlFor="photo-upload" className="upload-area block cursor-pointer">
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                                        <span className="text-4xl sm:text-6xl wobble">📸</span>
                                        <div className="text-center sm:text-left">
                                            <h3 className="text-xl sm:text-2xl font-bold fredoka text-purple-600 mb-1">
                                                Foto analysieren
                                            </h3>
                                            <p className="text-sm sm:text-base text-gray-600">
                                                Mach ein Foto von deinem Buchungssatz!
                                            </p>
                                        </div>
                                    </div>
                                </label>
                                <input
                                    id="photo-upload"
                                    type="file"
                                    accept="image/*"
                                    capture="environment"
                                    onChange={handleImageUpload}
                                />

                                {/* Wörterbuch-Modus */}
                                <div className="glass p-4 sm:p-6">
                                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-4">
                                        <span className="text-4xl sm:text-6xl">📚</span>
                                        <div className="text-center sm:text-left">
                                            <h3 className="text-xl sm:text-2xl font-bold fredoka text-purple-600 mb-1">
                                                Wörterbuch
                                            </h3>
                                            <p className="text-sm sm:text-base text-gray-600">
                                                Fertige Erklärungen für die wichtigsten Begriffe
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                            placeholder="z.B. aktivkonto, soll, haben..."
                                            className="flex-1 px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 outline-none text-sm sm:text-base"
                                        />
                                        <button
                                            onClick={handleSearch}
                                            className="btn px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold text-sm sm:text-base"
                                        >
                                            Suchen
                                        </button>
                                    </div>
                                    
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <p className="w-full text-xs sm:text-sm text-gray-600 mb-2">💡 Verfügbare Begriffe:</p>
                                        {Object.keys(BEGRIFFE).map(key => (
                                            <button
                                                key={key}
                                                onClick={() => {
                                                    setSearchTerm(key);
                                                    setResult({
                                                        emoji: getEmojiForTerm(key),
                                                        titel: getTitleForTerm(key),
                                                        content: BEGRIFFE[key],
                                                        isText: false,
                                                        hasTKonto: true,
                                                        tkontoData: getTKontoDataForTerm(key)
                                                    });
                                                    setMode('result');
                                                }}
                                                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm hover:bg-purple-200 transition-colors"
                                            >
                                                {getEmojiForTerm(key)} {getTitleForTerm(key)}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* NEUER BLOCK: Beliebige Begriffe */}
                                <div className="glass p-4 sm:p-6 border-2 border-green-300">
                                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-4">
                                        <span className="text-4xl sm:text-6xl">🔍</span>
                                        <div className="text-center sm:text-left">
                                            <h3 className="text-xl sm:text-2xl font-bold fredoka text-green-600 mb-1">
                                                Beliebige Begriffe erklären
                                            </h3>
                                            <p className="text-sm sm:text-base text-gray-600">
                                                Gib einen BELIEBIGEN Buchhaltungs-Begriff ein!
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <input
                                            type="text"
                                            value={freeTerm}
                                            onChange={(e) => setFreeTerm(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleFreeTermSearch()}
                                            placeholder="z.B. Bilanz, GuV, Abschreibung, Inventur..."
                                            className="flex-1 px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 outline-none text-sm sm:text-base"
                                        />
                                        <button
                                            onClick={handleFreeTermSearch}
                                            className="btn px-6 py-3 bg-green-600 text-white rounded-lg font-semibold text-sm sm:text-base"
                                        >
                                            Erklären
                                        </button>
                                    </div>
                                    
                                    <div className="mt-3 p-3 bg-green-50 rounded-lg">
                                        <p className="text-xs sm:text-sm text-green-800">
                                            💡 Die KI erklärt dir JEDEN Begriff ausführlich und kindergerecht - probier's aus!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Result Screen */}
                        {mode === 'result' && (
                            <div className="glass p-4 sm:p-6 fade-in">
                                {loading ? (
                                    <div className="text-center py-12">
                                        <div className="loading mx-auto mb-4"></div>
                                        <p className="text-gray-600 text-sm sm:text-base">
                                            {image ? 'Analysiere dein Bild...' : 'Erstelle ausführliche Erklärung...'}
                                        </p>
                                    </div>
                                ) : result && (
                                    <>
                                        {image && (
                                            <div className="mb-6">
                                                <img src={image} alt="Uploaded" className="max-w-full h-auto rounded-lg shadow-lg" />
                                            </div>
                                        )}
                                        
                                        <div className="text-center mb-6">
                                            <span className="emoji-big">{result.emoji}</span>
                                            <h2 className="text-2xl sm:text-3xl font-bold fredoka text-purple-600 mt-2">
                                                {result.titel}
                                            </h2>
                                        </div>
                                        
                                        {result.isText ? (
                                            <div className="prose max-w-none">
                                                <pre className="whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed">
                                                    {result.content}
                                                </pre>
                                            </div>
                                        ) : (
                                            <div className="text-sm sm:text-base space-y-4">
                                                <FormattedText text={result.content} />
                                                {result.hasTKonto && result.tkontoData && (
                                                    <div className="my-6">
                                                        <h3 className="text-xl font-bold mb-3 text-center">📊 SO SIEHT DAS T-KONTO AUS:</h3>
                                                        <TKonto {...result.tkontoData} />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                        
                        {/* Footer */}
                        <div className="text-center mt-6 sm:mt-8 text-gray-600">
                            <p className="text-xs sm:text-sm">
                                💜 Gemacht mit Liebe für HAK-Schüler in Österreich
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        ReactDOM.render(<HAKHack />, document.getElementById('root'));
