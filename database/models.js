const express = require('express');
const mysql = require('mysql');
var connection = mysql.createConnection({
    host: '172.17.0.2',
    port: '3306',
    user : 'root', //CHANGE THIS TO YOUR USERNAME
    password:'xochi',//CHANGE THIS TO YOUR PASSWORD
    database : 'reviewsComponent'
})
connection.connect();


//returns all reviews and users (with users attatched to relevant review)
const getListings = (callback) => {
    var queryString = "SELECT * FROM listings, reviews, users WHERE listings.id = reviews.listings_id AND reviews.user_id = users.id;"
    connection.query(queryString, function(err, result){
        if(err) {
            callback(err, null);
        } else {
            callback(null, result);
        }

    })

}

//returns all of the reviews and users that correspond with a random listing
const getOneListing = (callback) => {
    getListings(function( err, result) {
        if(err) {
            console.log('error in getOneListing');
        } else {
           const randomId = Math.floor(Math.random() * Math.floor(100));
           var queryString = "SELECT * FROM reviews, users WHERE reviews.listings_id = ? AND reviews.user_id = users.id;"
           connection.query(queryString, randomId, function(err, result){
               if(err) {
                   callback(err, null);
               } else {
                callback(err, result);
               }
       
           })

        }
    })
}



module.exports = {
    getListings,
    getOneListing
}