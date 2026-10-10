# Crossfire Launcher – Website-Konzept

Stand: 10. Oktober 2026. Konzept zur gemeinsamen Abstimmung, keine Freigabe zur Implementierung oder Veröffentlichung.

## Ziel

Neue Spieler vom Originalspiel Freelancer bis zum ersten Crossfire-Spielstart führen und bestehenden Nutzern schnelle Hilfe zum Launcher bieten. Hilfe hat besonderes Gewicht. Alle Inhalte und Bedienelemente werden vollständig auf Deutsch und Englisch angeboten.

## Gewählte Gestaltung

Grundlage ist der zuerst angezeigte Entwurf: große atmosphärische Crossfire-Kopfgrafik, Einführung links, Launcher-Ansicht rechts, darunter Hilfesuche und Schnellzugriffe. Dunkle anthrazitfarbene Flächen, Petrol für primäre Aktionen, Rot für die Crossfire-Marke. Gut lesbare Texte und zurückhaltende Animationen. Vorhandenes Logo und Bildmaterial werden genutzt; Launcher-Ansichten stammen aus echten Screenshots. Generierte Ansichten sind Layoutreferenzen und keine verlässliche Dokumentation der Anwendung.

## Informationsarchitektur

Die Website besteht aus einer Startseite und drei vertiefenden Bereichen: Erste Schritte, Handbuch, Hilfe & Support. Die Navigation enthält außerdem den offiziellen Crossfire-Download und den Sprachwechsel. Der bisherige Pfad /guide/ bleibt als englischer Handbuch-Einstieg erreichbar. Sprachfassungen erhalten eigene URLs; direkte Links zu Artikeln und Abschnitten bleiben teilbar.

### Startseite

- Einführung: „Dein Einstieg in Crossfire.“ mit „Erste Schritte“ und „Hilfe finden“.
- Launcher-Abbildung mit klarer Kennzeichnung als Produktansicht.
- Suche über Anleitungen und Hilfethemen.
- Schnellzugriffe: Updates, Accounts, Einstellungen, Startprobleme.
- Kompakte Installationsübersicht mit Verweis auf den geführten Einstieg.
- Anklickbare Funktionsübersicht für Start/Updates, Accounts, Einstellungen, Offline-Modus und Diagnose.
- Abschluss mit Handbuch-, Support- und Community-Links.

### Erste Schritte

Geführte, frei anwählbare Schritte mit abhakbaren Aufgaben und lokal gespeichertem Fortschritt:

1. Originales Freelancer ohne Mods oder zusätzliche Patches installieren; bestehende Spielstände sichern.
2. Crossfire 2.0.1 von der offiziellen Download-Seite herunterladen, Archiv entpacken und Crossfire2setup.exe ausführen. Der aktuelle Installer benötigt keinen Freelancer Mod Manager und verändert laut offizieller Dokumentation die ursprüngliche Freelancer-Installation nicht.
3. Den vorhandenen Launcher nach der Installation starten. Laut Projektinhaber lädt dieser den neuen Launcher herunter.
4. Den neuen Launcher kennenlernen, grundlegende Einstellungen prüfen und angebotene Spielupdates durchführen.
5. Spielstart über den Launcher; Einzelspieler- und Mehrspieler-Bedienung anhand des tatsächlichen Launchers dokumentieren.

Die Checkliste prüft keine lokale Installation und lädt selbst keinen Launcher herunter. Fortschritt ist eine vom Nutzer gesetzte Orientierung. Er lässt sich zurücksetzen.

### Handbuch

Die Inhalte des vorhandenen Guides werden erhalten, strukturiert und übersetzt: Spielstart und Updates, Account-Verwaltung einschließlich Import/Export und Backup, Einstellungen, Offline-Modus, Logs, Dateipfade, optionale Crash-Dumps und Support-Pakete. Inhaltsverzeichnis, Abschnittslinks und anklickbare Bildvergrößerung helfen beim Nachschlagen. UI-Bezeichnungen orientieren sich an der tatsächlichen Anwendung.

### Hilfe & Support

Ein kurzer Problemassistent beginnt mit Symptomen: Launcher startet nicht, Update schlägt fehl, Spiel startet nicht, Accounts oder Einstellungen, Verbindung/Offline-Modus. Er führt zu belegten Prüfschritten und passenden Handbuchartikeln. Ungeklärte Fälle enden bei einer Support-Checkliste statt bei einer erfundenen Lösung.

Die Checkliste erklärt das Reproduzieren eines Fehlers, optionales ausführliches Logging, das Erstellen eines ZIP-Support-Pakets und Angaben für einen Fehlerbericht. Eine Berichtsvorlage lässt sich kopieren. Die Website liest keine lokalen Logs, erstellt selbst kein Support-Paket und übermittelt keine Dateien; das erfolgt im Launcher beziehungsweise im offiziellen Supportforum. Die genaue Support-Zieladresse wird vor Implementierung anhand des SWAT-Portals verifiziert.

## Zweisprachigkeit

DE/EN ist jederzeit sichtbar. Beim Wechsel bleiben Thema und Abschnitt erhalten. Beide Sprachen umfassen Navigation, Artikel, Suche, Assistent, leere Suchergebnisse, Fehlermeldungen und Bildbeschreibungen. Die Sprachwahl wird lokal gespeichert. Ohne gespeicherte Wahl wird eine unterstützte Browsersprache verwendet, andernfalls Englisch. Suchergebnisse gehören zur aktiven Sprache; gebräuchliche englische Launcher-Bezeichnungen bleiben auffindbar.

## Interaktionen und Zustände

- Suche zeigt passende Artikel und direkte Links; bei keinem Treffer werden verwandte Einstiege und Support angeboten.
- Installation: Schrittwechsel, Abhaken, Fortschrittsanzeige, Zurücksetzen.
- Funktionsübersicht: aktiv ausgewähltes Thema, passende Erklärung und Produktbild.
- Hilfeassistent: Auswahl, Zurück, Neustart und nachvollziehbares Ergebnis.
- Bilder: Vergrößerung mit Schließen und Tastaturbedienung.
- Kopieren der Berichtsvorlage: Erfolgsrückmeldung; bei fehlender Clipboard-Unterstützung auswählbarer Text.
- Mobile Navigation: öffnendes/schließendes Menü mit verständlichen Beschriftungen.

## Technik und Betrieb

Empfehlung: statische Website mit HTML, CSS und modularer JavaScript-Logik, passend zum bestehenden GitHub-Pages-Projekt. Kein Backend erforderlich. Texte und Suchdaten werden zentral nach Sprache gepflegt. Assets werden projektintern gespeichert. Links und Ressourcen funktionieren auch unter dem GitHub-Pages-Unterpfad /crossfire-launcher/.

Wichtige Anleitungen und Links bleiben ohne JavaScript lesbar. Sprache und Checklistenfortschritt sind die einzigen vorgesehenen lokalen Speicherungen; bei nicht verfügbarem Speicher funktioniert die Sitzung trotzdem. Für die erste Version sind kein Tracking, Login, Live-Serverstatus oder automatische Versionsabfrage vorgesehen. Ein eigenständiger Changelog erscheint erst, wenn eine verlässliche Quelle vorliegt.

## Qualität und Abnahme

- Vollständige und inhaltlich gleichwertige DE/EN-Fassungen.
- Funktionierende Suche, Navigation, Sprachwechsel, Checkliste und Hilfeassistent.
- Browserprüfung auf Desktop und schmalen Mobilansichten ohne horizontales Überlaufen.
- Tastaturbedienung, sichtbarer Fokus, semantische Überschriften, ausreichende Kontraste und Berücksichtigung reduzierter Bewegung; Ziel WCAG 2.2 AA, ohne pauschale Zertifizierungsbehauptung.
- Prüfung der direkten Artikel-URLs und der GitHub-Pages-Unterpfade.
- Visueller Vergleich mit dem gewählten Entwurf; Korrektur sichtbarer Abweichungen.
- Keine erfundenen Screenshots, Versionsstände, Installationsdialoge oder Problemlösungen.

## Quellen und fachliche Grenzen

- Download: https://swat-portal.com/forum/filebase/file/1098-crossfire-2-0-client-edition/
- Installation: https://swat-portal.com/forum/wcf/faq/
- Launcher-Funktionen: vorhandener Repository-Guide.
- Aktualisierung zum neuen Launcher: Angabe des Projektinhabers in dieser Unterhaltung.

Konkrete neue Launcher-Dialoge, Neustartverhalten und Menübeschriftungen werden anhand echter Produktansichten geprüft. Falls sie nicht verfügbar sind, beschreibt die Anleitung nur bestätigtes Verhalten. Historische FLMM-Anleitungen werden nicht als aktuelle Installationsschritte übernommen.

## Nächste Abstimmung

Nach Freigabe dieses Konzepts wird ein konkreter Implementierungsplan mit Arbeitsschritten und Prüfungen erstellt. Erst nach Abstimmung dieses Plans beginnt die Umsetzung im lokalen Repository D:\Dev\Projects\LauncherHelpSite. Veröffentlichung wird separat vereinbart.
