# HOW TO INSTALL PROJECT

# **\*\*** 1. INSTALL LARAVEL WITH COMPOSER **\***

composer i

# **\*\*** 2. INSTALL REACT WITH NPM **\***

npm i

# **\*\*** 3. LAUNCH PROJECT **\***

- npm run dev //launch node server
- php artisan serve //launch laravel server
- php artisan queue:work // launch laravel jobs

#Pour activer le planificateur du serveur (schedule:run):

# /**\***/ in production

Connectez-vous à votre serveur en SSH, tapez crontab -e et ajoutez cette ligne :

-   -   -   -   - cd /chemin-de-votre-projet-laravel && php artisan schedule:run >> /dev/null 2>&1
