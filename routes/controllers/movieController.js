const express = require("express");
const router = express.Router();
const Celebrity = require("../../models/Celebrity.model");
const Movie = require("../../models/Movie.model");


exports.list = (req, res, next) => {
    Movie.find().populate("cast")
        .then((movies) => {
            res.render("movies/movie-list", { movies });
        })
        .catch((err) => {
            next(err);
        });
}

exports.detail = (req, res, next) => {
    const { id } = req.params;
    Movie
        .findById(id
        ).populate("cast")
        .then((movie) => {
            res.render("movies/movie-details", movie);
        }
        )
        .catch((err) => {
            next(err);
        }
        );
}

exports.getCreateForm = (req, res, next) => {
    Celebrity.find()
        .then((celebrities) => {
            res.render("movies/new-movie", { celebrities });
        })
        .catch((err) => {
            next(err);
        });
}

exports.postCreateForm = (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({ title, genre, plot, cast })
        .then(() => {
            res.redirect("/movies");
        })
        .catch((err) => {
            next(err);
        });
}


exports.getEditForm = (req, res, next) => {
    const { id } = req.params;
    let castArr
    Celebrity.find()
        .then((celebrities) => {
            castArr = celebrities;
            return Movie.findById(id).populate("cast");
        })
        .then((movie) => {
            res.render("movies/movie-edit", { movie, castArr });
        })
        .catch((err) => {
            next(err);
        });
}






exports.postEditForm = (req, res, next) => {
    const { id } = req.params;
    const { title, genre, plot, cast } = req
        .body;
    Movie.findByIdAndUpdate
        (id, { title, genre, plot, cast })
        .then(() => {
            res.redirect("/movies");
        }
        )
        .catch((err) => {
            next(err);
        }
        );
}

exports.delete = (req, res, next) => {
    const { id } = req.params;
    Movie.findByIdAndDelete(id)
        .then(() => {
            res.redirect("/movies");
        })
        .catch((err) => {
            next(err);
        });
}

