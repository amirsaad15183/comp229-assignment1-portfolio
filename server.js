import config from './config/config.js' 
import app from './server/express.js'
import mongoose from 'mongoose' 

mongoose.Promise = global.Promise

const hasMongoConnectionString =
  config.mongoUri && config.mongoUri !== 'YOUR_MONGODB_CONNECTION_STRING'

if (hasMongoConnectionString) {
  mongoose.connect(config.mongoUri, {})
    .then(() => {
      console.log('Connected to the database!')
    })

  mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error.message)
    throw new Error(`unable to connect to database: ${config.mongoUri}`)
  })
} else {
  console.warn('MongoDB connection string not set yet. Update config/config.js before testing the database APIs.')
}

app.get("/", (req, res) => {
res.json({ message: "Welcome to Amir Saad's Portfolio backend application." });
});
app.listen(config.port, (err) => { 
if (err) {
console.log(err) 
}
console.info('Server started on port %s.', config.port) 
})
