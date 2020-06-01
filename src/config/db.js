const { Pool } = require('pg');

module.exports = new Pool({
    user: 'brunotoresan',
    password: '',
    host: 'localhost',
    port: 5432,
    database: 'InstaChef'
})
