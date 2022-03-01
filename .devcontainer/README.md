
# SSL化コンテナ

Apache + php7.3 + Mysql8 + PHPMyAdmin　コンテナ
PHPはCGIモードで動作



# ドメイン自動登録

ドメインは「hoden.biz」固定
サブドメイン部分と、参照先IPアドレスを下記で指定

    docker-compose.yml

SERVER_NAME: 'unko1'    // サブドメイン
IPADDR: '192.168.2.225' // 参照先IP
API_KEY: 'mae32makase'  // PowerDNS、APIキー

# 初回起動時

ターミナルより下記を実行し、必要なパッケージをインストールする

# composer install
# npm install


# dump serverの利用

Laravelのdumpserverを使用する場合
最新版では外部プロジェクトに移行しているため追加で入れる

# cd api/
# composer require --dev beyondcode/laravel-dump-server