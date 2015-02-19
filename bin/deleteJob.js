var sqldb = require('../server/sqldb');
var User = sqldb.User;

// User.find(function(users){
//	users.forEach(user){
//		user.google = null;
//		user.save();
//	}
// }

function deleteJob() {
	User.findAll().then(function(users){
		console.log(users);
	});
}

deleteJob();
