DC=docker compose -f compose.yaml

all: up

build:
	${DC} build

up:
	${DC} up -d --build

down:
	${DC} down --rmi all

ps:
	${DC} ps