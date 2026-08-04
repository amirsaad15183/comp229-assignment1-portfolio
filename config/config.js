const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    adminName: process.env.ADMIN_NAME || 'Amir Saad Admin',
    adminEmail: process.env.ADMIN_EMAIL || 'asaad10@my.centennialcollege.ca',
    adminPassword: process.env.ADMIN_PASSWORD || 'AdminPortfolio123',
    mongoUri: process.env.MONGODB_URI ||
        'mongodb+srv://asaad10_db_user:mYzDFCXAcsutEZux@cluster0.gd491we.mongodb.net/Portfolio?retryWrites=true&w=majority&appName=Cluster0' ||
        process.env.MONGO_HOST ||
        'mongodb://' + (process.env.IP || 'localhost') + ':' +
        (process.env.MONGO_PORT || '27017') +
        '/Portfolio'
}
export default config
