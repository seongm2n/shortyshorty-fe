.PHONY: all build up down ps re

DC=docker compose -f compose.yaml

all: up

build:
	${DC} build

up:
	${DC} up -d --build

down:
	${DC} down

ps:
	${DC} ps

re: down up