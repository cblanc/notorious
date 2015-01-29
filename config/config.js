var env = process.env.NODE_ENV || "live";

var config = {
	test: {
		elasticsearch: {
			host: "localhost:9100",
			log: "error"
		},
		port: 8080
	},
	live: {
		elasticsearch: {
			host: "localhost:9200",
			log: "info"
		},
		port: 8000
	}
}[env];

module.exports = config;