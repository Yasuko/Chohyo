#!/bin/sh

NAME=$SERVER_NAME

# get ssl key
if [ ! -d /etc/pki ]; then
  mkdir /etc/pki
fi
if [ -d /etc/pki/share_key ]; then
  rm -rf /etc/pki/share_key
fi
cd /etc/pki

expect -c "
spawn git clone https://github.com/infotec-repository/share_key.git
expect \"Username for 'https://github.com':\"
send \"infotec-repository\n\"
expect \"$\"
expect \"Password for 'https://infotec-repository@github.com':\"
send \"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\n\"
expect \"$\"
exit 0
"
wait $!

cd ~/
# add dns recorde
while sleep 6; do

  if [ -z $IPADDR ]; then
      IP=127.0.0.1
    else
      IP=$IPADDR
  fi

  JSON=`cat << EOS
  {
    "rrsets": [
    {
      "name": "${NAME}.hoden.biz.",
      "type": "A",
      "ttl": 86400,
      "changetype": "REPLACE",
      "comments": [],
      "records": [
        {
          "content": "${IP}",
          "disabled": false
        }
      ]
    }]
  }
EOS
`

  # Parse JSON
  JSON_CODE=`echo $JSON | jq -c .`

  # Call API
  echo 'Add DNS Recorde'
  curl -s -X PATCH -H 'Content-Type:application/json' -H 'x-api-key:'$API_KEY -d $JSON_CODE http://dns.hoden.biz:8081/api/v1/servers/localhost/zones/hoden.biz.
  wait $!
  break

done

# start apache service
apache2-foreground
