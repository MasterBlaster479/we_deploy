# Dockerfile base ubuntu - we_deploy aplication
FROM ubuntu:14.04

RUN locale-gen hr_HR.UTF-8  
ENV LANG hr_HR.UTF-8  
ENV LANGUAGE hr_HR:en  
ENV LC_ALL hr_HR.UTF-8


RUN apt-get update && apt-get -y install --force-yes --assume-yes \
net-tools \
openssl \
nano \
iputils-ping \
vim \
wget \
htop \
apt-utils \
netcat \
curl \
ufw \
locate \
rsync \
man \
sysstat \
dstat \
openssh-client \
software-properties-common \
psmisc \
pg-activity \
bash-completion \
whois \
postfix \
tcpdump

RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list && wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add - && apt-get update && apt-get install --force-yes --assume-yes \
postgresql-9.5 \
postgresql-contrib

RUN echo "Europe/Zagreb" > /etc/timezone && dpkg-reconfigure -f noninteractive tzdata

