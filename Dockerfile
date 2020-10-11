FROM node:14

RUN mkdir ~/app

RUN npm install -g @vue/cli

RUN npm install -g firebase-tools

ENTRYPOINT ["tail", "-f", "/dev/null"]