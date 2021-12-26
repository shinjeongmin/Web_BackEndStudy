FROM ubuntu:20.04
RUN	apt-get -y update --fix-missing
RUN	apt-get -y upgrade
# RUN	apt-get -y install nodejs
# RUN apt -y install npm

WORKDIR /var/home
ADD . /var/home

# RUN npm install

# postgresql 
# RUN apt-get -y install postgresql
# RUN service postgresql restart

VOLUME ["/var/home/hostfile"]

# node 서버 실행
# CMD [ "node", "./test/testServer.js" ]