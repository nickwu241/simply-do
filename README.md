# Simply Do

A ToDo List Progressive Web Application (PWA) for anyone using the MERN stack hosted on Heroku.

Visit https://simply-do.herokuapp.com to see it in action.

Access it like a native mobile application by clicking `Add to Home screen` from your mobile browser.

<img src="https://raw.githubusercontent.com/nickwu241/simply-do/master/demo/nexus6p-portrait.png" />

### Developing

To set up MongoDB credentials:
```shell
# Ask for the MongoDB crendentials
printf 'DB_USER=<USER>\nDB_PASSWORD=<PASSWORD>\n' > .env
```

To install dependencies:

```shell
npm install && npm run client-install
```

To run local backend and frontend server:

```shell
npm run dev
```
