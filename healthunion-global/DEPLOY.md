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
| `EMAIL_PROVIDER` | `smtp` | |
| `EMAIL_FROM` | `info@healthunionglobal.com` | doit correspondre à `SMTP_USER` |
| `EMAIL_TO` | `info@healthunionglobal.com` | destinataire des demandes |
| `EMAIL_BCC` | `lucas@industrialdecision.com` | copie technique, plusieurs adresses séparées par des virgules |
| `SMTP_HOST` | selon l'hébergeur de la boîte | voir tableau ci-dessous |
| `SMTP_PORT` | `587` | ou `465` si TLS implicite |
| `SMTP_USER` | `info@healthunionglobal.com` | |
| `SMTP_PASSWORD` | mot de passe d'application | jamais le mot de passe principal |

**Boîte hébergée sur Google Workspace.** Le domaine est chez GoDaddy, la
messagerie chez Google : les réglages SMTP viennent donc de Google.

| Paramètre | Valeur |
|---|---|
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` (STARTTLS) ou `465` (SSL) |
| `SMTP_USER` | l'adresse complète, `info@healthunionglobal.com` |
| `SMTP_PASSWORD` | mot de passe d'application de 16 caractères |

Le mot de passe habituel de la boîte ne fonctionne pas. Google a coupé l'accès
par mot de passe simple le 1er mai 2025. Une erreur `535 5.7.8 Username and
Password not accepted` signifie systématiquement que le mot de passe utilisé
n'est pas un mot de passe d'application.

Quota d'envoi : 2 000 messages par jour sur Workspace, sans commune mesure avec
le volume d'un formulaire de contact.

## 2. Variable d'environnement, service frontend

| Variable | Valeur |
|---|---|
| `REACT_APP_BACKEND_URL` | URL publique du service backend, sans slash final |

À définir avant le build : Create React App fige les variables au moment de la
compilation. Après changement, relancer un déploiement.

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

## 4 bis. Mot de passe d'application Google Workspace

Deux conditions, dans cet ordre. La première relève de l'administrateur du
domaine, la seconde de l'utilisateur de la boîte.

**1. Autoriser les mots de passe d'application (administrateur)**

Console d'administration Google Workspace, puis Sécurité, Authentification,
Validation en deux étapes. Vérifier que l'option autorisant les utilisateurs à
générer des mots de passe d'application est activée. Si elle est désactivée,
l'utilisateur ne verra tout simplement pas l'option apparaître.

**2. Générer le mot de passe (utilisateur de la boîte)**

1. La validation en deux étapes doit être active sur le compte. Sans elle, les
   mots de passe d'application n'existent pas.
2. Aller sur myaccount.google.com, section Sécurité, puis rechercher
   App passwords.
3. Créer une entrée nommée par exemple Website contact form.
4. Copier la chaîne de 16 caractères en retirant les espaces affichés.

La clé n'est montrée qu'une fois. Elle n'autorise que l'envoi, ne donne aucun
accès à la boîte de réception ni au compte, et se révoque sans changer le mot
de passe principal.

## 5. Fonctionnement du PDF

Le fichier transite par la base le temps de la soumission, part en pièce
jointe, puis est supprimé. Les fichiers déposés sans envoi du formulaire sont
purgés au démarrage suivant, au delà de 24 heures. Aucun document n'est
conservé, ce qui allège fortement les obligations RGPD, PDPL et PIPEDA.

## 6. Non inclus à ce stade

Back-office éditorial, connexion CRM, conservation des demandes hors email,
SEO avancé. Le contenu se modifie dans le code puis par redéploiement.
