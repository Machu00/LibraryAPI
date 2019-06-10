var Sequelize = require('sequelize');
var sequelize = new Sequelize('mylibrary', 'root', '', {
    host: '127.0.0.1',
    port:3306,
    dialect: 'mysql',   //choose anyone between them

    // To create a pool of connections
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

/*sequelize
 .authenticate().then(function(result){
 console.log('it works');
 }).catch(function(error){
 console.error('Unable to connect to the database:', err);
 });*/
module.exports.seq=function(){
    return sequelize;
}
/*var User = sequelize.define('user', {
    User_Name: {
        type: Sequelize.STRING
    },
    User_Password: {
        type: Sequelize.STRING
    }
});

// force: true will drop the table if it already exists


User.findById(1).then(function(result){
    console.log(result.User_Password);
});
 */





















