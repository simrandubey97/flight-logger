const config={
    production :{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default : {
        SECRET: 'mysecretkey',
        // DATABASE: 'mongodb://localhost:27017/flight-logger'
        DATABASE: 'mongodb+srv://simran:test@123@cluster0.60ern.mongodb.net/?retryWrites=true&w=majority'
    }
}


exports.get = function get(env){
    return config[env] || config.default
}