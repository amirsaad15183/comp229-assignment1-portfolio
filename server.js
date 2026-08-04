import config from './config/config.js' 
import app from './server/express.js'
import mongoose from 'mongoose' 
import User from './server/models/user.model.js'

mongoose.Promise = global.Promise

const ensureAdminUser = async () => {
  const existingAdmin = await User.findOne({ email: config.adminEmail })
  if (existingAdmin) {
    if (existingAdmin.role !== 'admin') {
      existingAdmin.role = 'admin'
      await existingAdmin.save()
      console.log(`Admin role updated for ${config.adminEmail}`)
    }
    return
  }

  const adminUser = new User({
    name: config.adminName,
    email: config.adminEmail,
    password: config.adminPassword,
    role: 'admin',
  })
  await adminUser.save()
  console.log(`Admin user created for ${config.adminEmail}`)
}

const hasMongoConnectionString =
  config.mongoUri && config.mongoUri !== 'YOUR_MONGODB_CONNECTION_STRING'

if (hasMongoConnectionString) {
  mongoose.connect(config.mongoUri, {})
    .then(() => {
      console.log('Connected to the database!')
      return ensureAdminUser()
    })
    .catch((error) => {
      console.error('MongoDB startup error:', error.message)
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
