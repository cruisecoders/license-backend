module.exports = {
    Host: 'http://192.168.1.77:3000/',
    mongoDB: (process.env.NODE_ENV)?'mongodb://example:example@ds245615.mlab.com:45615/license':'mongodb://localhost/license',
};