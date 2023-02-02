# pico w server
Pico W Server

# https://micropython.org/download/rp2-pico-w/

# docker run build
> docker compose -f docker-compose.yml up --build -d

# open console
> winpty docker exec -it pico-web-pico-w-1 bash
> docker exec -it pico-web-pico-w-1 /bin/bash

# on error during docker compose; delete the containers and try again