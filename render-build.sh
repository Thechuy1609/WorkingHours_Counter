#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install
bundle exec rails assets:precompile
bundle exec rails assets:clean
apt-get update
apt-get install -y chromium
npm install puppeteer --global
bundle install

# If you're using a Free instance type, you need to
# perform database migrations in the build command.
# Uncomment the following line:

 bundle exec rails db:migrate