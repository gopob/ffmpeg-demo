FROM node:12

EXPOSE 3001 8082
COPY ["./package.json", "./package-lock.json", ".eslintrc.js", ".eslintignore", "/app/"]
WORKDIR /app
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y ffmpeg
RUN npm i --quiet
COPY ./src /app/src

CMD npm start
