var express = require('express');
const pool = require('../data/config');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	pool.query('SELECT name, lng, lat,distance FROM ( SELECT z.name, z.lng, z.lat, p.radius, p.distance_unit * DEGREES( ACOS( COS( RADIANS( p.latpoint ) ) * COS( RADIANS( z.lat ) ) * COS( RADIANS( p.longpoint - z.lng ) ) + SIN( RADIANS( p.latpoint ) ) * SIN( RADIANS( z.lat ) ) ) ) AS distance FROM `data`.`evac_routes` AS z JOIN ( SELECT 53.340909 AS latpoint, 0.125512 AS longpoint, 50.0 AS radius, 69 AS distance_unit ) AS p ON 1 =1 WHERE z.lat BETWEEN p.latpoint - ( p.radius / p.distance_unit )  AND p.latpoint + ( p.radius / p.distance_unit )  AND z.lng BETWEEN p.longpoint - ( p.radius / ( p.distance_unit * COS( RADIANS( p.latpoint ) ) ) )  AND p.longpoint + ( p.radius / ( p.distance_unit * COS( RADIANS( p.latpoint ) ) ) ) ) AS d WHERE distance <= radius ORDER BY distance LIMIT 1', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});
module.exports = router;
