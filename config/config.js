export const PORT = 8080;
export const environment = {
  development: {
    serverURL: `http://localhost:${PORT}/`,
    dbString: 'mongodb+srv://plantei_db_user:xricT7utZMwrfTdI@plantei.1t6fq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  },
  production: {
    serverURL: `http://localhost:${PORT}/`,
    dbString: 'mongodb://localhost:27017/graphqlTutorial-prod',
  },
};
