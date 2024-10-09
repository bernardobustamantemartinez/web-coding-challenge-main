# Web Coding Challenge

The basic steps to install and run both the server and client parts of the web coding challenge.

## Getting Started

Follow these steps to set up and run the project.

### 1. Setup

First, navigate to the server directory and install dependencies:

```bash
cd server
npm install
cd client
npm install
npm run build
```

#### 2. Run the app

Run the following within the root of the repo.

```bash
npm start
```

Can see the client running in
http://localhost:3000/

Endpoints can be hit like GET http://localhost:3000/api/hello

---

#### 2. Run unit tests

Run the following within the server directory.

```bash
cd server
npm test
```

### Features to be implemented

1. ✅ Ability to view my TODOs and my completed TODOs
2. ✅ Ability to add TODOs by clicking an “add todo” button.
3. ✅ Ability to mark a TODO as “complete”.
4. ✅ Ability to add sub TODO’s to a TODO
5. ✅ If all sub TODOs are completed, the parent TODO is automatically completed
6. ✅ Ability to mark a TODO as “Priority” this moves it to the top/front of the list and there is a visual indicator it is “priority”.
7. ✅ Delete sub todos.
8. ✅ Unit Tests.
