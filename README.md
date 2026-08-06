frehsm-erp

# Backend
cd ~/freshm.online/pvtapp
./gradlew clean build
sudo systemctl restart freshm
sudo systemctl status freshm

# Frontend
cd ~/freshm.online/freshm-frontend
npm run build

rm -rf /var/www/freshm/*
cp -r dist/* /var/www/freshm/

chown -R www-data:www-data /var/www/freshm
chmod -R 755 /var/www/freshm

sudo systemctl reload nginx
