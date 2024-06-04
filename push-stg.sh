#!/bin/bash
eval `ssh-agent`
ssh-add ~/.ssh/id_rsa

# Check the exit status of the last command
if [ $? -ne 0 ]; then
  echo "Type-check failed. Aborting build."
  exit 1
fi

git add .
git commit -m "$1"
git push stg master
ssh -t root@stg.papery.me 'bash -i -c "cd /var/www/stg.papery.me && npm install && npm run build && pm2 start ecosystem.config.js"'