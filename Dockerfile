FROM node:16.9.1

WORKDIR /usr/src/app
COPY yarn.lock /usr/src/app/
COPY package.json /usr/src/app/
RUN yarn install && yarn cache clean

COPY . /usr/src/app

ENV REACT_APP_BACKEND_URL=http://api.ramen-live.com:8088
ENV REACT_APP_FILE_SERVER_URL=http://api.ramen-live.com:5050/file-server
ENV REACT_APP_GOOGLE_LOGIN=125021518011-3omjnghuvlrmv64tb45v380bo0j1iu20.apps.googleusercontent.com

CMD [ "yarn", "start" ]