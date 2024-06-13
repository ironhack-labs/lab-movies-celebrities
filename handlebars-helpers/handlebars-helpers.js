const express = require('express')
const hbs = require('hbs')

hbs.registerHelper('isInArray', function (value, array) {
    return array.includes(value.toString());
})