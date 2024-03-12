const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('marketplace','postgres','kidus1234',{
    dialect:'postgres',
    host:'localhost',
    port:5432,
});

async function connectDB(){
    try {
        await sequelize.authenticate();
        console.log('Connected to PostgreSQL database');
    } catch(error){
        console.error('Faild to connect to postgreSQL database');
        process.exit(1);
    }
}

module.exports = {sequelize, connectDB};

