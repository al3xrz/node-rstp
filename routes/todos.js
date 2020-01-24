const {Router} = require('express')
const router = Router()

router.get('/', (req, resp) => {
    resp.render('index', {
        title : 'Главная',
        isIndex : true
    })
})

// router.get('/list', (req, resp) => {
//     console.log(req['context']),
//     resp.render('list', {
//         title : 'Список',
//         isList : true
//     })
// })





module.exports = router
