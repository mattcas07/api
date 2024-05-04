const router = require('express').Router()
const bodyParser = require('body-parser')
const fs = require('fs')

const path = __dirname

const routerVersion = {
  ytmp3: '/v1/ytmp3',
  ytmp3_2: '/v2/ytmp3',
  ytmp4: '/v1/ytmp4', 
  ytmp4_2: '/v2/ytmp4',
  igdl: '/v1',
  getmail: '/tempmail',
  getmessages: '/tempmail'
}

// se ignoran estas rutas porque se estan usando directamente en el index y las de func no son rutas 

const pathIgnore = ['func', 'human', 'human-apis']

const removeExtention = (filename) => {
  return filename.split('.').shift()
}

// Eliminar la verificación de API key y las restricciones asociadas
// router.use(function (req, res, next) {
//   if (req.url.includes('manageusers')) return next()
//   const apiKey = req.query.apikey
//   if (!apiKey) {
//     return res.status(401).json({ status: false, message: 'No se proporcionó una clave de API' })
//   }
//   // Eliminar el resto de la lógica de verificación de API key
//   next();
// });

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

fs.readdirSync(path).filter(filename => {

  const name = removeExtention(filename)

  const version = routerVersion[name] ?? ''

  if(name !== 'index' && !pathIgnore.includes(name)) {
    router.use(`${version}/${name.startsWith('ytmp') ? '' : name}`, require(`./${filename}`))
  }
})

module.exports = router