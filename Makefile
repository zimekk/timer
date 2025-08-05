default: fetch up prune

config:
	docker compose config

exec:
	docker compose exec app sh

fetch:
# 	git fetch origin && git reset --hard origin
	git fetch origin
	git reset --hard origin zero

logs:
	docker compose logs -f --tail=25 app

prune:
	docker ps -a && docker system prune

ps:
	docker compose ps

restart:
	docker compose restart

run:
	docker compose run app sh

stop:
	docker compose stop app

up:
	docker compose -f docker-compose.yml up --build -d
