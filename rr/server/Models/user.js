async function start() {
    try {
        const settingConnect = url;
        await mongoose.connect(settingConnect, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
 
        app.listen(PORT, () => {
            console.log('Server has been started port: ' + PORT)
        })
    } catch(e) {
        console.log(e)
    }
}
 
start()