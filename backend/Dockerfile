
FROM php:8.4-fpm

# Installer les dépendances système nécessaires (optimisé)
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    libpq-dev \
    zip unzip git curl libpng-dev libonig-dev libxml2-dev \
    && rm -rf /var/lib/apt/lists/*

# Installer les extensions PHP (séparé pour limiter la RAM)
RUN docker-php-ext-install pdo pdo_pgsql pgsql mbstring exif pcntl bcmath gd

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copier le code
COPY . .

# Installer les dépendances PHP (Composer)
RUN COMPOSER_ALLOW_SUPERUSER=1 composer install --no-interaction --prefer-dist --optimize-autoloader

CMD ["php-fpm"]