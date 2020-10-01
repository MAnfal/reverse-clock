FROM node:14

RUN mkdir ~/app

ENTRYPOINT ["tail", "-f", "/dev/null"]