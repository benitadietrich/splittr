# splittr

Dieses Projekt wurde als Teil der Vorlesung Software Qualität der DHBW Horb entwickelt. Es wird verwendet um vom Benutzer eingegebene Briefanreden in seine Informationsbestandteile aufzuteilen und zu speichern.

## Autoren
* Paul Finkbeiner
* Benita Dietrich

## Installation
The Software is available under [Splittr](https://splittr.paul-finkbeiner.de)

## Release Dokumentation
Die Releases richten sich nach dem Konzept der "semantic versioning":
* Beispiel: MAJOR.MINOR.PATCH
* MAJOR version when you make incompatible API changes,
* MINOR version when you add functionality in a backwards compatible manner, and
* PATCH version when you make backwards compatible bug fixes.

## Einschränkungen
Der Kontaktparser akzeptiert jede möglichen Eingaben eines Namens. Hierbei sind sowohl Anrede und Titel, als auch Vorname optional.
Es werden verschiedene Sprachen untersützt. Zudem stehen für die Kontake die drei Geschlechter männlich, weiblich und divers zur Auswahl.
Titel können sowohl manuell hinzugefügt, als auch automatisch erkannt werden. Der Titelerkenner, der in Splittr integriert ist kann Abkürzungen der entsprechenden TItel
(mit einem Punkt endend) automatisch zur Datenbank hinzufügen.
