/* globals module require */

const express = require("express");
let Router = express.Router;

let isAdmin = require("../middlewares/is-user-admin");
let isAuthenticated = require("../middlewares/is-user-authenticated");
let analytics = require("../middlewares/visited-pages");

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .get("/users", controllers.getAllUsernames)
        .get("/countries", isAuthenticated, isAdmin, controllers.getAllCountriesNames)
        .post("/register", analytics, controllers.register)
        .post("/createQuestion", isAuthenticated, isAdmin, controllers.createQuestion)
        .post("/evaluate", isAuthenticated, controllers.evaluateQuestion)
        .post("/users/:username/comments", isAuthenticated, controllers.addComment)
        .post("/chat", isAuthenticated, controllers.createNewChatAnswer)
        .put("/profile", isAuthenticated, controllers.updateProfile)
        .put("/users/:username", isAuthenticated, isAdmin, controllers.updateUserRole);

    app.use("/api", router);

    return router;
};