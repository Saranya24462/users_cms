var UserService = require("./service.js");
var rp = require('request-promise');
var Promise = require('bluebird');

var ApiActions = function (app) {
    this.app = app;
    this.conf = app.conf;
    // this.app = app;
    // this.mongoDb=app.mongoDb;
    this.userServiceInstance = new UserService(app);
};
module.exports = ApiActions;


ApiActions.prototype.init = function () {


}

ApiActions.prototype.login = function (inputData, result) {

    var self = this;
    console.log("Enter into login fun", inputData.query)
    var input = inputData.query;

    var response = {
        status: "FAILURE",
        err: {},
        data: {}
    };
    return new Promise(function (resolve, reject) {
        if (input && input.email && input.password) {
            return self.userServiceInstance.find(input)
                .then(function (result) {
                    if (result != null) {
                        console.log("res", result)
                        response['status'] = "SUCCESS";
                        response['data']['message'] = "User Already Exists";
                        resolve(response)
                    } else {
                        response['err']['message'] = "User Not Exists Need to SignUp"
                        resolve(response)
                    }

                })
        }
    })
}

ApiActions.prototype.registration = function (req, res) {

    var self = this;
    var input = req.body;
    var response = {
        status: "FAILURE",
        err: {},
        data: {}
    };
    return new Promise(function (resolve, reject) {
        if (input && input.email && input.password) {
            return self.userServiceInstance.insert(input)
                .then(function (result) {
                    console.log("result", result)
                    if (result != null) {
                        response['status'] = "SUCCESS";
                        response['data']['message'] = "User Registration Successfully";
                        resolve(response)
                    } else {
                        response['err']['message'] = "User Registration Unsuccessfully";
                        resolve(response)
                    }

                })
                .catch(function (e) {
                    console.log(e);
                    response['err']['message'] = e.message;
                    reject(response);
                })
        } else {
            response['err']['message'] = "User Registration Unsuccessfully";
            resolve(response)
        }
    })
}

ApiActions.prototype.userCreation = function (req, res) {
    var self = this;
    var input = req.body;
    var response = {
        status: "FAILURE",
        err: {},
        data: {}
    };
    return new Promise(function (resolve, reject) {
        if (input && input.createdBy) {
            return self.userServiceInstance.findAdmin(input)
                .then(function (responseData) {
                    var userdata = JSON.parse(JSON.stringify(responseData))
                    if (userdata.role === 'SuperAdmin') {
                        console.log("User is Super Admin so create Staffs")
                        if (input && input.email) {
                            return self.userServiceInstance.insertStaff(input)
                                .then(function (result) {
                                    var data = {
                                        email: input.email
                                    }

                                    var action = self.conf.userCreationUrl;
                                    var options = {
                                        method: 'POST',
                                        body: data,
                                        uri: action,
                                        json: true // Automatically stringifies the body to JSON
                                    };

                                    console.log("post data", options);

                                    return rp(options)
                                        .then(function (resp) {
                                            return Promise.delay(5000).then(function () {
                                                response['status'] = "SUCCESS";
                                                response['data']['message'] = "Staff Created and Invitation Mail also sent";
                                                resolve(response)

                                            });
                                        })
                                        .catch(function (err) {
                                            console.log(e);
                                            response['err']['message'] = e.message;
                                            reject(response);

                                        });


                                })
                        } else {
                            response['err']['message'] = "Missing Inputs email";
                            resolve(response);
                        }
                    } else {
                        response['err']['message'] = "The User is Not a Super Admin so not ability to create Staffs";
                        resolve(response);
                    }

                })
                .catch(function (e) {
                    console.log(e);
                    response['err']['message'] = e.message;
                    reject(response);
                })
        }
    })
}

ApiActions.prototype.listUsers = function (inputData, result) {

    var self = this;
    console.log("Input", inputData.query)
    var input = inputData.query;

    var response = {
        status: "FAILURE",
        err: {},
        data: {}
    };
    return new Promise(function (resolve, reject) {
        if (input && input.username) {
            return self.userServiceInstance.getUsers(input)
                .then(function (result) {
                    if (result != null) {
                        console.log("res", result)
                        response['status'] = "SUCCESS";
                        response['data']['users'] = result;
                        resolve(response)
                    } else {
                        response['error']['message'] = "The Super Admin created No Staffs"
                        resolve(response)
                    }

                })
        }
    })
}

ApiActions.prototype.userActivation = function (inputData, result) {

    var self = this;
    console.log("userActivation input data", inputData.query)
    var input = inputData.query;

    var response = {
        status: "FAILURE",
        err: null,
        data: {}
    };
    return new Promise(function (resolve, reject) {
        if (input && input.email) {
            return self.userServiceInstance.updateUserStatus(input)
                .then(function (result) {
                    if (result != null) {
                        console.log("res", result)
                        response['status'] = "SUCCESS";
                        response['data']['message'] = "Hey, you are Joined";
                        resolve(response)
                    } else {
                        response['error']['message'] = "User Link Expires"
                        resolve(response)
                    }

                })
        }
    })
}
