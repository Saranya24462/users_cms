var ApiActions = require("./action.js");
var ApiRoutes = function (app) {
    this.app = app;
    this.userActionInstance = new ApiActions(app);
};
module.exports = ApiRoutes;


ApiRoutes.prototype.init = function (app) {

    var self = this;
    var app = self.app;


    app.get('/', function (req, res) {
        res.send({'test': 'Ok'})
    });
    app.get('/login', function (req, res) {
        self.userActionInstance.login(req, res)
            .then(function (finalResult) {

                console.log("Final response for /v1/login ", finalResult);

                res.send(finalResult);
            })

            .catch(function (e) {
                console.log("Catch handler for /v1/login " + e);
                res.send(e.message);
            });


    });
    app.post('/registration', function (req, res) {
        self.userActionInstance.registration(req, res)
            .then(function (finalResult) {

                console.log("Final response for /v1/registration ", finalResult);

                res.send(finalResult);
            })

            .catch(function (e) {
                console.log("Catch handler /v1/registration" + e);
                res.send(e.message);
            });

    });

    app.post('/v1/create/user', function (req, res) {
        self.userActionInstance.userCreation(req, res)
            .then(function (finalResult) {

                console.log("Final response for /v1/create/user", finalResult);

                res.send(finalResult);
            })

            .catch(function (e) {
                console.log("Catch handler /v1/create/user" + e);
                res.send(e.message);
            });

    });
    app.get('/v1/list/user', function (req, res) {
        self.userActionInstance.listUsers(req, res)
            .then(function (finalResult) {

                console.log("Final response for /v1/list/user ", finalResult);

                res.send(finalResult);
            })

            .catch(function (e) {
                console.log("Catch handler for /v1/list/user" + e);
                res.send(e.message);
            });

    });
    app.get('/v1/user/activation', function (req, res) {
        self.userActionInstance.userActivation(req, res)
            .then(function (finalResult) {

                console.log("Final response for /v1/user/activation", finalResult);

                res.send(finalResult);
            })

            .catch(function (e) {
                console.log("Catch handler " + e);
                res.send(e.message);
            });

    });
}