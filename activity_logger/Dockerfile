# Dockerfile manager ubuntu
FROM base:gogy

USER root

RUN locale-gen hr_HR.UTF-8 
RUN localedef -i hr_HR -f UTF-8 hr_HR.UTF-8

RUN mkdir /opt/activity_logger
COPY . /opt/activity_logger

RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get --assume-yes install \
npm \
nodejs \
nodejs-dbg

WORKDIR /usr/bin
RUN ln -s nodejs node

RUN npm install -g superstatic

RUN updatedb

WORKDIR /opt/activity_logger




