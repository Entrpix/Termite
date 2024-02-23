# Deployment Guide
This was tested on an Ubuntu 22.04 LTS VPS

```sh
$ sudo apt update
$ sudo apt upgrade -y
$ sudo apt install git nginx screen ufw nodejs npm curl certbot python3-certbot-nginx nano -y
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
$ source ~/.bashrc
$ nvm install 18
$ sudo ufw enable
$ sudo ufw allow 80
$ sudo ufw allow 443
$ sudo ufw allow 'Nginx Full'
$ sudo ufw allow 'OpenSSH'
$ sudo nano /etc/nginx/nginx.conf
```
Remove everything and paste in:
```
user root; # change this to be the user you are hosting your instance on
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
        worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    map_hash_bucket_size 128;

    sendfile on;
    tcp_nopush on;

    tcp_nodelay on;

    reset_timedout_connection on;

    access_log off;
    error_log off;

    server {
        listen 80 default_server;
        listen [::]:80 default_server;
        server_name subdomain.domain.tld; # replace with your actual domain

        location / {
                # Upgrade WebSockets
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'Upgrade';
                # Increase header buffer
                proxy_connect_timeout 10;
                proxy_send_timeout 90;
                proxy_read_timeout 90;
                proxy_buffer_size 128k;
                proxy_buffers 4 256k;
                proxy_busy_buffers_size 256k;
                proxy_temp_file_write_size 256k;
                proxy_pass http://127.0.0.1:8000; 

            # The small block below will block googlebot
            if ($http_user_agent ~ (Googlebot)) {
                return 403;
            }
        }
    }
}
```
Save and exit

```
$ sudo certbot --nginx -d subdomain.domain.tld -d subdomain.domain.tld
$ screen
$ git clone https://github.com/entrpix/termite
$ cd termite
$ npm i
$ npm start
# ctrl + a + d
$ sudo systemctl reload nginx
```

- Congrats Termite should now be hosted!
- If your having an issues make an issue or DM me
