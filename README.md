# Kommently #

This is a global comment store for all URLs. You can share your comments and review points by visiting any site.
[Visit homepage](https://kommently.com)

### Key Points ###

* Each URL (domain+path) is key point.
* Each user can comment and review once for a URL.
* Each page visit will be stored and total count will be visible to everyone.
* Sentiment analysis will be active for major languages.
* User validation will be done and fake mails will be removed.

### Planned Components ###

* MVP will use MongoDB but will be replaced with Clickhouse for analytical requirements
* Backend code will be implemented with NodeJS, Typescript, Express, Jest
* Chrome-Extension (main client)
* Web Page (simple url analysis)
* Mobile App (may be)

### Dependencies ###

* Sentiment (npm)
* MailChecker (npm)
* Bad-Words (npm)
