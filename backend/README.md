# YAPMT, YET ANOTHER PROJECT MANAGEMENT TOOL - Backend

## Getting Started

First, update `ormconfig.json` with your database credentials or use credentials of dockerfile.

```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "docker",
  "password": "yapmt",
  "database": "yapmt",
  "entities": ["./src/modules/**/entities/*.ts"],
  "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}
```

If your `docker-compose` version is 1.28 or lower, uncomment this line

![](https://i.imgur.com/I5KpODP.png)

Run migrations:

```bash
npm run typeorm migration:run
# or
yarn typeorm migration:run
```

And then, run development server
```bash
npm run dev
# or
yarn dev
```

------------
## API DOCS
### Projects:
##### Create:
```bash
curl -X POST \
  'http://localhost:8888/projects' \
  -H 'Accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "Offline"
}'
```
##### List:
```bash
curl -X GET \
  'http://localhost:8888/projects' \
  -H 'Accept: */*' \
```
##### Delete:
```bash
curl -X DELETE \
  'http://localhost:8888/projects/4891edae-30ec-4b71-a138-58ce7c5d0f52' \
  -H 'Accept: */*' \
```

------------
### Tasks:

##### Create:
```bash
curl -X POST \
  'http://localhost:8888/tasks' \
  -H 'Accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
    "project_id": "a058e31a-bf9a-4d00-80ba-91ef69eced42",
    "description": "Cache offline",
    "owner": "@leonardo",
    "done": false,
    "due_date": "09/16/2021"
}'
```
##### List by Project Id
```bash
curl -X GET \
  'http://localhost:8888/tasks/project/a058e31a-bf9a-4d00-80ba-91ef69eced42' \
  -H 'Accept: */*' \
```

##### Update:
```bash
curl -X PUT \
  'http://localhost:8888/tasks/b058e31a-bf9a-4d00-80ba-91ef69eced42' \
  -H 'Accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Cache online",
    "owner": "@leonardo",
    "due_date": "09/16/2021"
}'
```
##### Patch (update status):
```bash
curl -X PATCH \
  'http://localhost:8888/tasks/f84684cd-c3f1-44e1-8b04-6a996fe92d02' \
  -H 'Accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
    "done": false
}'
```
##### Delete:
```bash
curl -X DELETE \
  'http://localhost:8888/tasks/b058e31a-bf9a-4d00-80ba-91ef69eced42' \
  -H 'Accept: */*' \
```
