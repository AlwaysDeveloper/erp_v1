exports.serverCrashHandler = (error) => {
    console.log('Server is going down unexpectedly 😑..');
    console.log(error.name, error.message);
    process.exit(1);
}

exports.rejectionHandler = (error, server) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down..');
    console.log(error.name, error.message);
    server.close(() => {
        process.exit(1);
    });
}

exports.mongoURLMaker = () => {
    const URL = process.env.MONGO_CONNECT_URL.replace(
        '<password>',
        process.env.MONGO_CONNECT_PASSWORD
    );

    URL.replace('<dbname>', process.env.MONGO_CONNECT_DB)

    return URL;
}

exports.getPort = () => {
    const defaultPort = 1207;
    return process.env.PORT || defaultPort;
}
