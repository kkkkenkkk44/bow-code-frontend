FROM node:16.9.1

WORKDIR /usr/src/app
COPY yarn.lock /usr/src/app/
COPY package.json /usr/src/app/
RUN yarn install && yarn cache clean

COPY . /usr/src/app

ENV REACT_APP_BACKEND_URL=https://bow-code.ntu.im/api-server
ENV REACT_APP_FILE_SERVER_URL=https://bow-code.ntu.im/file-server
ENV REACT_APP_GOOGLE_LOGIN=125021518011-3omjnghuvlrmv64tb45v380bo0j1iu20.apps.googleusercontent.com
ENV REACT_APP_IMGUR_CLIENT_ID=0c61d1804dc7f9a
ENV REACT_APP_BOWCODE_PREFIX=https://bow-code.ntu.im/

CMD [ "yarn", "start" ]