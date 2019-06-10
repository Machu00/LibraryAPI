/**
 * Created by IDSCORP_DEVTEAM on 5/10/2019.
 */
var User= require('../Models/User');
//var _= require('lodash');

module.exports={

    postCategory:function(req,res,next){
        var category = User.dbmodel('category');
        var data= req.body;
        var category_data ={
            Category_Name: data.Category_Name,
            Description: data.Description
        };
        category.create(category_data)
            .then(function(result){
                res.send({message:'Category has been created'})
            }).catch(function(err) {
            console.log('err',err);
            res.send({message:'Failed to create category'})
        })
    },

    updateCategory:function(req,res,next){
        var category = User.dbmodel('category');
        var data= req.body;

        var update_data ={
            Category_Name: data.Category_Name,
            Description: data.Description
        };
        category.update(update_data,
            {
                where: {Category_Identifier: data.Category_Identifier}//,logging:console.log
            }).then(function(result){
            res.send({message:'Category data updated'});
        }).catch(function(err) {
            console.log('err',err);
            res.send({message:'Failed to update category data'});
        })
    },

    getCategory:function(req,res,next){
        var category = User.dbmodel('category');
        var params = req.query;
        var condition = {};

        if(params.category_id){
            condition['Category_Identifier']= params.category_id;
        }
        if(params.category_name){
            condition['Category_Name']= {$like : '%'+params.category_name +'%'};
        }

        category.findAll({
            attributes: [ 'Category_Identifier', 'Category_Name','Description'],
            where: condition
        }).then(function (result) {
            if (result == null || (result && Object.keys(result).length === 0)) {
                res.send({message:'No category matching your criteria'});
            }
            else{
                res.send(result);
            }
        }).catch(function (err) {
            console.log('err',err)
        })
    }

}
