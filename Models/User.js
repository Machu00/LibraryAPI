var con=require('../db');
var sequelize=con.seq;
var Sequelize=require('Sequelize');

module.exports.dbmodel= function(model_name){
    if(model_name=='user'){

        var users = sequelize().define('users', {
            User_Id:
            {
              type:Sequelize.INTEGER,
              primaryKey:true,
              autoIncrement:true
            },
            Username: {
              type: Sequelize.STRING,
              AllowNull:true
            },
            Password: {
              type: Sequelize.STRING,
              AllowNull:true
            },
            First_Name: {
               type:Sequelize.STRING,
               AllowNull:true
            },
            Last_Name:{
               type:Sequelize.STRING,
               AllowNull:true
            },
            Role:{
               type:Sequelize.STRING,
               AllowNull:true
            }
        },
        {
           timestamps:false,
           tableName:'users'
        });
         return users;
    }
    else if(model_name=='books'){
        var books =sequelize().define('books', {
            Book_Identifier: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            Book_Name: {
                type: Sequelize.STRING,
                AllowNull: true
            },
            Description: {
                type: Sequelize.STRING,
                AllowNull: true
            },
            Author:{
                type: Sequelize.STRING,
                 AllowNull: true
            },
            Category_Identifier: {
                type: Sequelize.INTEGER,
                AllowNull: true
            },
            Book_Image: {
                type: Sequelize.TEXT,
                AllowNull: true
            },
            Book_Url: {
                type: Sequelize.TEXT,
                AllowNull: true
            },
            Uploaded_By: {
                type: Sequelize.STRING,
                AllowNull: true
            },
            Uploaded_Datetime: {
                type: Sequelize.DATE,
                AllowNull: true
            }
            },
            {
                relations:[
                    {belongsTo: "category", options: { foreignKey: 'Category_Identifier'}}
                ],
                timestamps:false,
                tableName:'books'
            });
            return books
    }
	else if(model_name=='category'){
        var category =sequelize().define('category', {
            Category_Identifier: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            Category_Name: {
                type: Sequelize.STRING,
                AllowNull: true
            },
            Description: {
                type: Sequelize.TEXT,
                AllowNull: true
            }
        },
			{
                timestamps:false,
                tableName:'category'
            });
            return category
        }
    }