#FROM dockerfile/nodejs # this pulls the latest node.js version 1.12
FROM node:0.10-onbuild

MAINTAINER Matthias Luebken, matthias@catalyst-zero.com

# WORKDIR /home/mean
# WORKDIR /home/mean

# Install Mean.JS Prerequisites
RUN npm install -g grunt-cli
RUN npm install -g bower

# Install Mean.JS packages
# ADD package.json /home/mean/package.json
# RUN npm install

# Manually trigger bower. Why doesnt this work via npm install?
# ADD .bowerrc /home/mean/.bowerrc
# ADD bower.json /home/mean/bower.json
# RUN bower install --config.interactive=false --allow-root

# ADD .bowerrc /usr/src/app.bowerrc
# ADD bower.json /usr/src/app/bower.json
RUN bower install --config.interactive=false --allow-root

# Make everything available for start
# ADD . /usr/src/app

# currently only works for development
ENV NODE_ENV development

# Port 3000 for server
# Port 35729 for livereload
# EXPOSE 3000 35729
CMD ["grunt"]