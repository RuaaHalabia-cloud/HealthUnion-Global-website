# HealthUnion Global, mise en ligne

Site vitrine bilingue EN/AR. Le formulaire de contact envoie chaque demande
par email, avec le PDF en pièce jointe. Rien n'est conservé au repos.

---

## 1. Variables d'environnement, service backend

| Variable | Valeur | Note |
|---|---|---|
| `MONGO_URL` | fournie par le plugin MongoDB Railway | référencer la variable Railway |
| `DB_NAME` | `healthunion` | |
| `APP_NAME` | `healthunion` | |
| `CORS_ORIGINS` | `https://healthunionglobal.com,https://www.healthunionglobal.com` | sans espace, sans slash final |
| `EMAIL_PROVIDER` | `resend` | envoi HTTPS, compatible avec Railway |
| `EMAIL_FROM` | `HealthUnion Global <website@notifications.healthunionglobal.com>` | sous-domaine vérifié dans Resend |
| `EMAIL_TO` | `info@healthunionglobal.com` | destinataire des demandes |
| `EMAIL_BCC` | vide | aucune copie technique des données clients |
| `RESEND_API_KEY` | secret Railway | clé limitée à l'envoi depuis le domaine vérifié |

Le destinataire `info@healthunionglobal.com` reste géré par Google Workspace et
transfère les notifications à Noor et Zak. Le serveur ne se connecte plus à
Google par SMTP : il appelle l'API HTTPS de Resend. Le champ `Reply-To` est
automatiquement renseigné avec l'adresse du client.

## 2. Variable d'environnement, service frontend

| Variable | Valeur |
|---|---|
| `REACT_APP_BACKEND_URL` | URL publique du service backend, sans slash final |
| `REACT_APP_GTM_ID` | ID du conteneur Google Tag Manager (ex. `GTM-XXXXXXX`), facultatif |

À définir avant le build : Create React App fige les variables au moment de la
compilation. Après changement, relancer un déploiement. Le conteneur GTM ne se
charge que si son ID est défini **et** si le visiteur accepte la mesure
facultative dans la bannière de cookies.

## 2 ter. Mesure Google — configuration avant activation

Créer un seul conteneur Web Google Tag Manager, puis renseigner son ID dans
`REACT_APP_GTM_ID` avant le build du frontend. Ne pas placer directement un ID
Google Analytics ou une étiquette Google Ads dans le code : ces éléments sont
gérés dans GTM et restent donc auditables au même endroit.

Dans GTM, configurer et tester en mode Preview :

1. l'étiquette Google Analytics 4 sur toutes les pages après consentement ;
2. une conversion `generate_lead` à partir de l'événement data layer du même
   nom ;
3. l'étiquette Google Ads correspondante uniquement lorsque le compte Google
   Ads et son action de conversion sont prêts ;
4. un Conversion Linker, avec les paramètres de consentement adaptés avant de
   publier le conteneur.

Événements disponibles, sans donnée personnelle :

| Événement | Moment | Rôle recommandé |
|---|---|---|
| `generate_lead` | envoi réussi du formulaire | conversion principale GA4 et Google Ads |
| `whatsapp_click` | clic WhatsApp | signal secondaire, à qualifier avant de le compter comme conversion Ads |
| `email_click` | clic email | signal secondaire |
| `ksa_*_cta_click` | clic CTA d'une page KSA | mesure d'intérêt, pas une conversion Ads principale |

Ne pas définir un clic WhatsApp ou email comme conversion Google Ads principale
au départ : il ne confirme pas qu'une demande a été reçue. Aucun événement
`phone_click` n'est créé tant que le site n'offre pas de liens `tel:`. Aucun
événement `booked_meeting` n'est créé tant qu'un outil de réservation n'affiche
pas une confirmation réelle ; un simple clic vers une page de réservation ne
doit être mesuré que comme `book_meeting_click`.

Pour Google Search Console, vérifier de préférence le domaine par DNS dans le
compte propriétaire, puis soumettre le sitemap une fois le domaine public
accessible. Vérifier enfin dans GA4 DebugView et GTM Preview qu'aucune donnée
personnelle, document ou message de formulaire ne part vers Google.

## 2 bis. Déploiement Railway

Deux services distincts issus du même dépôt, plus une base. L'ordre compte :
le frontend a besoin de l'URL du backend, et le backend a besoin de l'URL du
frontend pour CORS.

**1. Base de données.** Dans le projet Railway, ajouter un service MongoDB.
Railway expose une variable de connexion à référencer ensuite.

**2. Service backend.**

| Réglage | Valeur |
|---|---|
| Root Directory | `backend` |
| Start Command | `uvicorn server:app --host 0.0.0.0 --port $PORT` |

Renseigner les variables de la section 1, en référençant l'URL Mongo du
service de base de données. Mettre provisoirement `CORS_ORIGINS=*`.
Déployer, puis générer un domaine public et noter l'URL obtenue.

**3. Service frontend.**

| Réglage | Valeur |
|---|---|
| Root Directory | `frontend` |
| Build Command | `yarn build` |
| Start Command | `node server.js` |

Définir `REACT_APP_BACKEND_URL` avec l'URL du backend, sans slash final.
Cette valeur est figée au moment du build : tout changement impose un
redéploiement. Générer un domaine public et noter l'URL.

**4. Refermer CORS.** Revenir au service backend et remplacer `CORS_ORIGINS=*`
par l'URL du frontend, puis par le domaine définitif une fois le DNS en place.

Le fichier `frontend/server.js` sert le dossier `build` sans aucune
dépendance externe, avec repli sur `index.html` pour que les routes `/en` et
`/ar` fonctionnent au rechargement.

## 3. DNS

| Type | Nom | Valeur |
|---|---|---|
| A ou CNAME | `@` et `www` | cible fournie par Railway |
| TXT | `@` | `v=spf1 include:_spf.google.com ~all` |
| TXT | `google._domainkey` | clé DKIM générée dans la console Google Workspace |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:info@healthunionglobal.com` |

Les enregistrements se posent dans la zone DNS GoDaddy, avec des valeurs
fournies par Google. La clé DKIM se génère dans la console d'administration,
Applications, Google Workspace, Gmail, Authentifier les e-mails.

Le sous-domaine d'envoi `notifications.healthunionglobal.com` possède en plus
les enregistrements SPF, DKIM et MX fournis par Resend. Ils doivent rester
séparés des enregistrements Google et Railway du domaine principal.

SPF et DKIM ne sont pas optionnels. Sans eux le formulaire semble fonctionner
et les notifications sont filtrées en silence. Compter jusqu'à 48 heures de
propagation. Passer DMARC en `p=quarantine` après quelques semaines
d'observation.

## 4. Vérification après mise en ligne

1. Le site répond en HTTPS sur le domaine, en anglais et en arabe.
2. Envoyer une demande de test avec un PDF réel, depuis un autre réseau.
3. L'email arrive en boîte de réception, pas en indésirable, PDF joint lisible.
4. Vérifier dans l'en-tête reçu que SPF et DKIM affichent `pass`.
5. Renvoyer une demande sans PDF, contrôler que le formulaire aboutit.

## 4 bis. Clé API Resend

Créer une clé avec le droit **Sending access** limité au domaine
`notifications.healthunionglobal.com`, puis l'enregistrer uniquement comme
secret Railway `RESEND_API_KEY`. Ne jamais la placer dans Git.

## 5. Fonctionnement du PDF

Le fichier transite par la base le temps de la soumission, part en pièce
jointe, puis est supprimé. Les fichiers déposés sans envoi du formulaire sont
purgés au démarrage suivant, au delà de 24 heures. Aucun document n'est
conservé, ce qui allège fortement les obligations RGPD, PDPL et PIPEDA.

## 6. Non inclus à ce stade

Back-office éditorial, connexion CRM, conservation des demandes hors email,
SEO avancé. Le contenu se modifie dans le code puis par redéploiement.
