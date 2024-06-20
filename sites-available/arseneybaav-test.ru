server {
    listen 80;
    listen 443 ssl http2;
    server_name arseneybaav-test.ru www.arseneybaav-test.ru;

    ssl_certificate /etc/letsencrypt/live/arseneybaav-test.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/arseneybaav-test.ru/privkey.pem;  
    ssl_trusted_certificate /etc/letsencrypt/live/arseneybaav-test.ru/chain.pem;

    location /uploads {
        alias /var/www/arseneybaav-test.ru/.output/public/uploads;
    }

    location / {
        proxy_set_header Host $host;
        proxy_pass http://localhost:3400; # Порт вашего Nuxt приложения
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
        proxy_redirect off;
    }    

    location /api {
        proxy_pass http://localhost:3401;  # Проксируем запросы на ваше Express API (если оно доступно по отдельному маршруту /api)
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /websocket {
        proxy_pass http://localhost:3402;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location ^~ /.well-known/acme-challenge/ {
        default_type "text/plain";
        root /var/www/arseneybaav-test.ru;
    }
    
}
