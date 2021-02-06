const { DB_URI } = process.env;

export const dbConnection = {
    url: DB_URI,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
};
