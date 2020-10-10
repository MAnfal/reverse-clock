FROM node:14

RUN mkdir ~/app

RUN npm install -g @vue/cli

ENTRYPOINT ["tail", "-f", "/dev/null"]