# https://github.com/cypress-io/cypress/issues/18415
# - recording is currently broken on FF93+

FROM cypress/browsers:node14.17.0-chrome91-ff89

RUN wget https://github.com/gohugoio/hugo/releases/download/v0.96.0/hugo_extended_0.96.0_Linux-64bit.deb
RUN DEBIAN_FRONTEND=noninteractive dpkg --install ./hugo_extended_0.96.0_Linux-64bit.deb
