# Architektur
## Überblick
Die erste Grafik soll einen Überblick über den gesamten Aufbau der Architektur der 
Softwarequalitätsprojekte geben.
<img src="../assets/architecture_2.png"
     alt="Architecture"/>
Anfragen aus dem Internet die auf eine der folgenden Domains treffen:
* swq.paul-finkbeiner.de
* splittr.paul-finkbeiner.de
* tnp.paul-finkbeiner.de
werden über einen Nginx Reverse Proxy Server auf eine IP-Adresse und einen Port umgeleitet.
Je nach Domain erfolgt die Anfrage von einem dedizierten Webserver, der ebenfalls von der Firma Nginx stammt. 
Für das aktuelle Projekt ist besonders der mittlere Kommunikationspfad relevant.
Bei einer Anfrage auf die Domain **https://splittr.paul-finkbeiner.de** wird durch den Webserver 
eine React Seite an den Client übermittelt über diesen kann mit dem Backend interagiert werden.
Das Backend stütz sich auf Google Firebase. Hierbei wird besonders die NoSQL-Datenbank Firestore wichtig. Diese zielt darauf ab, die eingegebenen Kontaktdaten zu persistieren und 
ebenfalls weitere Titel hinzuzufügen. 
