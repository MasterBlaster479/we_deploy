# Dockerfile postgres ubuntu
FROM base:gogy

USER root

RUN locale-gen hr_HR.UTF-8 
RUN localedef -i hr_HR -f UTF-8 hr_HR.UTF-8

RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get --assume-yes install \
pgbouncer

RUN pg_dropcluster 9.5 main --stop
RUN pg_createcluster 9.5 main --start

RUN mkdir /home/postgres
RUN mkdir /home/postgres/backup
RUN mkdir /home/postgres/backup/log


RUN chown postgres:postgres /home/postgres
RUN chown postgres:postgres /home/postgres/backup
RUN chown postgres:postgres /home/postgres/backup/log

USER postgres
COPY backup/we_deploy.backup /home/postgres/backup/
RUN service postgresql start && sleep 40s && createdb -O postgres we_deploy && pg_restore -d we_deploy  /home/postgres/backup/we_deploy.backup \
&& psql -U postgres -d we_deploy -c "ALTER USER postgres WITH password 'postgres' "

USER root
RUN cat /etc/postgresql/9.5/main/postgresql.conf | sed -e "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" > /etc/postgresql/9.5/main/tmp_postgresql.conf
RUN mv /etc/postgresql/9.5/main/tmp_postgresql.conf /etc/postgresql/9.5/main/postgresql.conf

COPY pg_hba.conf /etc/postgresql/9.5/main/
RUN chown postgres /etc/postgresql/9.5/main/pg_hba.conf

COPY postgresql.conf /etc/postgresql/9.5/main/
RUN chown postgres:postgres /etc/postgresql/9.5/main/postgresql.conf
RUN chmod 644 /etc/postgresql/9.5/main/postgresql.conf
