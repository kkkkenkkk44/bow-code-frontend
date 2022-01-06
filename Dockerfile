FROM node:16.9.1

WORKDIR /usr/src/app
COPY yarn.lock /usr/src/app/
COPY package.json /usr/src/app/
RUN yarn install && yarn cache clean

COPY . /usr/src/app

ENV REACT_APP_BACKEND_URL=https://codai.tw/api-server
ENV REACT_APP_FILE_SERVER_URL=https://codai.tw/file-server
ENV REACT_APP_GOOGLE_LOGIN=217630205559-j55cvvnh4op6okgrv2jc4nko86envo2h.apps.googleusercontent.com
ENV REACT_APP_IMGUR_CLIENT_ID=0c61d1804dc7f9a
ENV REACT_APP_BOWCODE_PREFIX=https://codai.tw

CMD [ "yarn", "start" ]