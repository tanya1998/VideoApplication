#### Stage 1: Build the angular application
FROM node:16.15.1 as builder

# Configure the main working directory inside the docker image.
# This is the base directory used in any further RUN, COPY, and ENTRYPOINT
# commands.
WORKDIR /app

# Copy the package.json as well as the package-lock.json and install
# the dependencies. This is a separate step so the dependencies
# will be cached unless changes to one of those two files
# are made.

# Copy the main application
COPY . .
RUN npm i && npm run ng build

#### Stage 2, use the compiled app, ready for production with Nginx
FROM nginx:alpine

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
# Copy the angular build from Stage 1
# Copy our custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/angular .




# Expose port 80 to the Docker host, so we can access it
# from the outside.
#EXPOSE 4200

ENTRYPOINT ["nginx","-g","daemon off;"]
