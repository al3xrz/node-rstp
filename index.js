const express = require("express")
const express_handlebars = require('express-handlebars')
const PORT = process.env.PORT || 3000
const app = express()
const todoRoutes = require('./routes/todos')



const Stream = require('node-rtsp-stream-jsmpeg')
const options = {
  name: 'streamName',
  url: 'rtsp://91.205.130.102:554/live?id=239',
  wsPort: 9999,
}
stream = new Stream(options)

const hbs = new express_handlebars.create({
    defaultLayout : 'main',
    extname: 'hbs'

})


app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static('public'));
app.use(todoRoutes)



const jsonParser = express.json()
app.post("/list", jsonParser, function (request, response) {
    id = request.body['object_id']
    console.log(id);
    //stream.stop()
    //stream.mpeg1Muxer.stream.kill();
    options.url= 'rtsp://91.205.130.102:554/live?id='+ id
    console.log(options);

    stream = new Stream(options)
    stream.start()

    if(!request.body) return response.sendStatus(400);

    response.json(request.body); // отправляем пришедший ответ обратно
});




async function start() {

    stream.start()

}


app.listen(PORT, () => {
    console.log('Server started');
    start()
})
