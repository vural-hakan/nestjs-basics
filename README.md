# nestjs-basics


* Gateway Test Report: [![Gateway API Test Coverage Report](https://github.com/vural-hakan/nestjs-basics/actions/workflows/gateway-api-test-coverage.yml/badge.svg?branch=master&event=push)](https://github.com/vural-hakan/nestjs-basics/actions/workflows/gateway-api-test-coverage.yml)

* Service Test Report: [![Service Test Coverage Report](https://github.com/vural-hakan/nestjs-basics/actions/workflows/service-test-coverage.yml/badge.svg?branch=master&event=push)](https://github.com/vural-hakan/nestjs-basics/actions/workflows/service-test-coverage.yml)


## API

* This project use ***PG*** for storing fixtures data and ***REDIS*** for caching.
* BEFORE start please ***CREATE DATABASE*** and update ***.env*** files.
* For integration with CI/CD pipelines, including Kubernetes secrets and GitHub secrets, the project opts not to use the Nest Config Service. Instead, the ***dotenv*** library is preferred for handling configuration settings.

### BEFORE USE
```bash
yarn install
```

### Usage

#### Start service
* Open new terminal
* Set working directory nestjs-basics

```bash
yarn start:service
```

#### Start gateway
* Open new terminal
* Set working directory nestjs-basics

```bash
yarn start:gateway
```

## Testing

### Swagger Documentation
* To accessing Swagger UI

```bash
http://localhost:8080/docs
```

* To update Swagger path(actual /docs) go to gateway-api > main.ts file and update 

```typescript
    SwaggerModule.setup('/docs', app, swaggerDocument, {
      swaggerOptions: {
        defaultModelsExpandDepth: -1,
        displayRequestDuration: true,
        displayOperationId: true,
        requestSnippetsEnabled: true,
        syntaxHighlight: {
          activate: true,
          theme: 'tomorrow-night',
        },
      },
    } as SwaggerCustomOptions);
```

### Gateway Tests
* Gateway has
    * E2E test with **supertest**
    * Unit tests with **jest**

Running unit tests
```bash
yarn test:gateway
```

Running E2E tests
```bash
yarn test:e2e
```

For generating coverage report

```bash
yarn test:cov:gateway
```

**NOTES:** 
* To find coverage report in gateway-api > coverage directory
* Open **index.html** file with browser or **coverage-summary.json** file with JSON editor


### Service Tests
* Service has
    * Unit tests with **jest**

Running all tests
```bash
yarn test:service
```

For generating coverage report

```bash
yarn test:cov:service
```

**NOTES:** 
* To find coverage report in service > coverage directory
* Open **index.html** file with browser or **coverage-summary.json** file with JSON editor

#### Alternative Usage
* To start tests simultaneously both workspaces

```bash
yarn test:all
```

* To generate coverage reports simultaneously both workspaces
 
```bash
yarn test:cov:all
```

### Extra Scripts

* For linting both workspace

```bash
yarn lint:all
```

* Removing node_modules, build folders, test coverage reports, lock  files

```bash
yarn clear:all
```

### Docker Support
* You can find Dockerfile file both workspace.
* It will be trigger over Github Actions or any CI Tools
* It will running tests before build. With Jest teardown feature, it will share with ***SLACK*** or any other third party platforms

