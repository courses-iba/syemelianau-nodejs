const { DB_URI } = process.env;

export const dbConnection = {
    url: DB_URI,
    options: {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
};
