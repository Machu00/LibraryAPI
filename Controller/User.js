var User= require('../Models/User');
var _= require('lodash');

module.exports={

    createUser:function(req,res,next){
        var user = User.dbmodel('user');
        var data= req.body;
        var user_data ={
                         Username:data.Username,
                         Password:data.Password,
                         First_Name:data.First_Name,
                         Last_Name:data.Last_Name,
                         Role:data.Role
                      };
          user.create(user_data)
            .then(function(result){
            res.send({message:'User successfully created'})
         }).catch(function(err) {
            //console.log('err',err)
            res.send({message:'User failed to create'})
        })
    },

    updateUser:function(req,res,next){
        var user = User.dbmodel('user');
        var data= req.body;

        var update_data ={
            Username:data.Username,
            Password:data.Password
        };
        user.update(update_data,
            {
                where: {User_Id: data.User_Id}//,logging:console.log
            }).then(function(result){
                res.send({message:'Username and password updated'});
            }).catch(function(err) {
                console.log('err',err);
                res.send({message:'User credentials failed to update'});
            })
    },

    loginUser:function(req,res,next){
    var user = User.dbmodel('user');
    var data= req.body;

      user.findAll({
            attributes: [ 'Username', 'Password', 'First_Name', 'Last_Name', 'Role'],
            where: {
                     Username:data.Username,
                     Password:data.Password
                   }
           }).then(function (result) {
            if (result == null || (result && Object.keys(result).length === 0)) {
                console.log("No such username or password");
                res.send({message:'Invalid username or password'});
            }
            else{
                res.send({message:'Login successful'});
            }
            }).catch(function (err) {
                console.log('err',err)
           })
     }

   /* getUserLoginDetail:function(req,res,next){
        var condition={};
        if (!req.query.user_id){
            return next('Required parmeter user_id is required');
        }
        var user_login=User.dbmodel('user');
        user_login.findAll(
            {attribute:['username','password'],
                where:{
                    user_id:req.query.user_id
                }

            }).then(function(result){

            //var toreturn={User_id:result.id,User_Name:result.User_Name,User_Password:result.User_Password};
            //    var list={three_names:[],four_names:[]};
            /!*    _.forEach(result,function(items){
             if (items.User_Id<=3){
             list.three_names.push(items);

             }else{
             list.four_names.push(items);
             }

             }); *!/

//    console.log("Result1",result);
            //          console.log("Result2",result[0]);
            //        var response = result[0].username;
            res.send(result);


        });
    },
    deleteLoginDetails:function(req,res,next){
        var user_login= User.dbmodel('person');
        var foruser= User.dbmodel('user');
        var data=req.body;

        user_login.destroy(
            {
                where: {
                    person_id: data.person_id
                }
				})
				.then(function(result){
                foruser.destroy(
                    {
                    where: {
                            person_id:data.person_id
                        }
                    }).then(function(result2){
                    res.send({message:"Username and password deleted"})
                });

            });
    }*/

}
