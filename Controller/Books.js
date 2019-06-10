/**
 * Created by IDSCORP_DEVTEAM on 5/10/2019.
 */
var User= require('../Models/User');
//var _= require('lodash');

module.exports={

    uploadBooks:function(req,res,next){
        var books = User.dbmodel('books');
        var data= req.body;
        var book_data ={
            Book_Name: data.Book_Name,
            Description: data.Description,
            Category_Identifier: data.Category_Identifier,
            Book_Image: data.Book_Image,
            Book_Url: data.Book_Url,
            Uploaded_By: data.Uploaded_By,
            Uploaded_Datetime: data.Uploaded_Datetime
        };
        books.create(book_data)
            .then(function(result){
                res.send({message:'Book successfully uploaded'})
            }).catch(function(err) {
            console.log('err',err);
            res.send({message:'Failed to upload Book'})
        })
    },

    updateBooks:function(req,res,next){
        var books = User.dbmodel('books');
        var data= req.body;

        var update_data ={
            Book_Name: data.Book_Name,
            Description: data.Description,
            Author:data.Author,
            Category_Identifier: data.Category_Identifier,
            Book_Image: data.Book_Image,
            Book_Url: data.Book_Url,
            Uploaded_By: data.Uploaded_By
        };
        books.update(update_data,
            {
               where: {Book_Identifier: data.Book_Identifier}//,logging:console.log
            }).then(function(result){
            res.send({message:'Book data updated'});
           }).catch(function(err) {
            console.log('err',err);
            res.send({message:'Failed to update book data'});
        })
    },

    getBooks:function(req,res,next){
        var params = req.query;
        var query_parameter = [];

        var mysql = require('mysql');

        var connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "mylibrary"
        });

        connection.connect(function(err) {
            if (err) throw err;
            var query = "Select * from books b INNER JOIN category c on b.Category_Identifier = c.Category_Identifier where b.Book_Identifier > 0";

            if (params.book_id) {
                query += " AND b.Book_Identifier = ?";
                query_parameter.push(params.book_id);
            }

            if (params.category_id) {
                query += " AND b.Category_Identifier = ? ";
                query_parameter.push(params.category_id);
            }

            if (params.book_name) {
                query += " AND b.Book_Name like ? ";
                query_parameter.push("%" + params.book_name + "%");
            }

            if (params.author) {
                query += " AND b.Author like ? ";
                query_parameter.push("%" + params.author + "%");
            }
            connection.query(query,query_parameter,function (err, result, fields) {
                console.log('query',query);
                console.log('query_parameter',query_parameter);
                console.log('err',err);
                if (err) throw err;
                console.log(result);
                res.send(result);

            });
        });

    },

    deleteBooks:function(req,res,next){
        var books = User.dbmodel('books');
        var data= req.body;

        books.destroy({
            where: {Book_Identifier:data.Book_Identifier}
        }).then( function(result){
            res.send({message:'Book deleted'});
            })
            .catch( function(err){
                console.log('err',err)
            })
    }

}