# Dockerfile manager ubuntu
FROM base:gogy

USER root

RUN locale-gen hr_HR.UTF-8 
RUN localedef -i hr_HR -f UTF-8 hr_HR.UTF-8

RUN mkdir /opt/activity_manager
COPY activity_manager /opt/activity_manager

RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get --assume-yes install \
libpq-dev \
python-dev \
python-pip

RUN pip install \
psycopg2==2.6.2 \
pony==0.7 \
Flask==0.11 \
Flask-RESTful==0.3.5 \
python-dateutil==2.2 \


