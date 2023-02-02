FROM php:8.1-apache

ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update; \
	apt-get install -y --no-install-recommends vim &&\
	apt-get install -y --no-install-recommends nano &&\
	apt-get install -y --no-install-recommends openjdk-11-jdk ca-certificates-java &&\
	apt-get install -y --no-install-recommends ant &&\
	apt-get install -y --no-install-recommends git-all &&\
	apt-get install -y --no-install-recommends python3 &&\
	apt-get install -y --no-install-recommends python3-pip &&\
	apt-get install -y --no-install-recommends python3-venv

RUN apt remove npm &&\
	apt remove nodejs &&\
	rm -rf /usr/local/bin/node* &&\
	rm -rf /usr/local/bin/npm* &&\
	rm -rf /etc/apt/sources.list.d/nodesource.list &&\
	curl -sL https://deb.nodesource.com/setup_19.x | bash - &&\
	apt-get update && \
	apt-get install -y --no-install-recommends nodejs &&\
	apt-get install -y --no-install-recommends npm

RUN	cd /tmp && \
	git clone https://github.com/xdebug/xdebug.git && \
	cd xdebug && \
	git checkout xdebug_3_1 && \
	phpize && \
	./configure --enable-xdebug && \
	make && \
	make install && \
	rm -rf /tmp/xdebug

RUN ln -sfn /usr/bin/python3 /usr/bin/python && \
    ln -sfn /usr/bin/pip3 /usr/bin/pip

RUN	python3 -m venv venv
#RUN source venv/bin/activate
RUN pip install rshell

RUN	rm -rf /var/lib/apt/lists/* && \
	apt clean

RUN mkdir -p /home/projects

RUN ln -sf /usr/share/zoneinfo/Asia/Singapore /etc/localtime

WORKDIR /home/projects

# Expose Port for the Application 
EXPOSE 80

CMD ["/usr/sbin/apachectl", "-D", "FOREGROUND"]