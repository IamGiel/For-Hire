
// Grabbing our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

    // GET all workers
    app.get("/workersList/:service", function (req, res) {
        db.Worker.findAll({where: {Service: req.params.service}})
        .then(function (data) {
            var hbsObject = {workers: data};
            console.log(hbsObject);
            res.render("workersList", hbsObject)
        });
    });

    // GET route - homePage
    app.get("/homePage", function (req, res) {
        console.log("homePage is working");
        db.Worker.findAll({}).then(function (data) {
            var hbsObject = {
                worker: data
            };
            console.log("THIS is workers DATA heyyooo", hbsObject);
            res.render("homePage", hbsObject)
        })
    });

    //GET sign-up form
    app.get("/signupForm", function (req, res) {
            res.render("signupForm");
    });

    app.get("/servicesList", function(req, res) {
        res.render("servicesList");
    });

    //GET root route (thank for this Kane)
    app.get("/*", function (req, res) {
        res.render("homePage");
    });

    // NEW USER info after sign-up, ADD to DATABASE
    app.post("/api/posts", function (req, res) {
        console.log("SEE THIS IN CONSOLE", req.body);
        db.Worker.create({
            name: req.body.name,
            zip_code: req.body.zip_code,
            email: req.body.email,
            phone: req.body.phone,
            service: req.body.service
        })
            .then(function (dbPost) {
                res.json(dbPost);
            });
    });

}
