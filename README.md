В основе проекта лежит - [Create React App](https://github.com/facebook/create-react-app).

## Скрипты

В директории проекта можно выполнить следующие команды:

### `npm start`

Запускает приложение в "dev" режиме.<br>
Открывает на [http://localhost:3000](http://localhost:3000).

### `npm test`

Команда для запуска тестов.<br>
Больше информации о запусках тестов, тут - [running tests](https://facebook.github.io/create-react-app/docs/running-tests).

### `npm run build`

Команда для "prod" сборки.<br>
Положит все в папку `bundle`.
Больше информации, тут - [deployment](https://facebook.github.io/create-react-app/docs/deployment).

## Инструменты

### [Typescript](https://www.typescriptlang.org/docs/home.html)

const Проект: Typescript;

if (!Ты.hasOwnProperty("Typescript")) console.log("Нужно изучить TS");

### React

При разработке использовать функциональные компоненты.

### MobX

Store приложения.

### Rxjs

Используется для создания side effects.

### @material

Библиотека компонентов. Стили также описываются с помощью нее (a.k.a JSS).

### dev dependencies

TSLint, Prettier - линтер и форматирование, интегрированы между собой.

## Архитектура

### Компоненты

Компоненты делятся на `components`, `pages`, `hocs`.
`components` - чистые компоненты пердназначенные только для отображения ui, получают входные данные из `pages`.
`pages` - компоненты-контейнеры, взаимодействуют со store, содержат в себе `components`.
`hocs` - компоненты высшего порядка, предназначенные для обертки других. [Higher-Order Components](https://reactjs.org/docs/higher-order-components.html)

### Services

Описывают side effect приложения. Могут содержать несколько сервисов. Каждый сервис в свою очередь содержит набор запросов и подписок (смотри - [RxJS](https://rxjs.dev/)).

### Stores

Хранилища разделяются исходя из реализуемого функционала (смотри - [MobX](https://mobx.js.org/)). Хранилища, которые расширяют класс "Store", должны принимать на вход объект "Services", для подписок на события и отправки запросов.

## Окружение

Адреса сервисов описываются с помощью переменных окружения. Пример лежит в `.env.example`, в процессе разработки, можно описать в `.env.local`.
