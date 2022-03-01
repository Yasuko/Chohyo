FROM    node:12.13

ARG USER="www-data"
ARG UID="1000"
ARG GROUP="www-data"
ARG GID="1000"
ARG WORKSPACE="/var/www/html"

# timezone (Asia/Tokyo)
ENV TZ=JST-9
ENV DOCUMENT_ROOT="/var/www/html/public"


# timezone (Asia/Tokyo)
ENV TZ JST-9
ENV TERM xterm

RUN usermod -u ${UID} ${USER}        \
    &&  groupmod -g ${GID} ${GROUP}
RUN apt update -y
RUN apt -y install git iproute2 procps iproute2 lsb-release vim less jq curl
RUN apt install -y libfreetype6-dev libjpeg62-turbo-dev libpng-dev libzip-dev expect libonig-dev
RUN apt-get clean

# Copy NodeJS binaries
COPY --from=node /usr/local/bin/node /usr/local/bin/
COPY --from=node /usr/local/lib/node_modules/ /usr/local/lib/node_modules/
RUN ln -s /usr/local/bin/node /usr/local/bin/nodejs \
    && ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm \
    && ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npx

#
# :: Setup Httpd
# 
# httpd.conf
COPY apache2.conf /etc/apache2/apache2.conf

# virtual setting
COPY 000-default.conf /etc/apache2/sites-available/000-default.conf
# ssl setting
COPY default-ssl.conf /etc/apache2/sites-available/default-ssl.conf
RUN ln -s /etc/apache2/sites-available/default-ssl.conf /etc/apache2/sites-enabled/default-ssl.conf \
    && ln -s /etc/apache2/mods-available/ssl.conf /etc/apache2/mods-enabled/ssl.conf \
    && ln -s /etc/apache2/mods-available/ssl.load /etc/apache2/mods-enabled/ssl.load \
    && ln -s /etc/apache2/mods-available/socache_shmcb.load /etc/apache2/mods-enabled/socache_shmcb.load \
    && ln -s /etc/apache2/mods-available/rewrite.load /etc/apache2/mods-enabled/rewrite.load

# add foreground boot shell
#COPY httpd-foreground /usr/local/bin/httpd-foreground
#RUN chmod +x /usr/local/bin/httpd-foreground \
RUN mkdir -p ${DOCUMENT_ROOT} && chmod 705 ${DOCUMENT_ROOT}

# user setting
WORKDIR $WORKSPACE
RUN usermod -u $UID $USER && groupmod -g $GID $GROUP \
    && chown -R $UID:$GID $WORKSPACE

# add setup shell
COPY domain.sh /usr/local/bin/domain.sh
RUN chmod +x /usr/local/bin/domain.sh

CMD [ "sh", "/usr/local/bin/domain.sh" ]