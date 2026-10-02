.PHONY: up down logs backend frontend test build

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f

backend:
	cd backend && ./mvnw spring-boot:run

frontend:
	cd frontend && npm run dev -- --host 0.0.0.0 --port 3000

test:
	cd backend && ./mvnw test
	cd frontend && npm run build

build:
	docker compose build
