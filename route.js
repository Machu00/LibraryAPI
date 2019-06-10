module.exports = function(app) {
    var User = require('./Controller/User');
    var Books = require('./Controller/Books');
    var Category = require('./Controller/Category');
    //Routes

    //User
    app.route('/user').post(User.createUser);
    app.route('/user').put(User.updateUser);

    //Login
    app.route('/login').post(User.loginUser);

    //Books
    app.route('/books').post(Books.uploadBooks);
    app.route('/books').put(Books.updateBooks);
    app.route('/books').get(Books.getBooks);
    app.route('/books').delete(Books.deleteBooks);

    //Category
    app.route('/category').post(Category.postCategory);
    app.route('/category').put(Category.updateCategory);
    app.route('/category').get(Category.getCategory);

};
