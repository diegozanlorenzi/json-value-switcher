FROM node:lts-jessie-slim

MAINTAINER Diego da Costa <diego_carreirozc@hotmail.com>

WORKDIR /json-value-switcher

RUN yarn install
