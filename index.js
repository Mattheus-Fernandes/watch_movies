const express = require('express')
const path = require('path')
const readFile = require('fs')
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

const publicFolder = path.join(__dirname, 'public')
const expressPublic = express.static(publicFolder)
app.use(expressPublic)

//ROTAS
app.get('/', (req, res) => {
    res.render('index', {
        tittle: 'Inicio',
        content: [
            {
                sub_tittle: 'Filmes Lancamentos',
                info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat minima, neque ea eum quod at cum repellendus ipsam, officia excepturi dignissimos illo non numquam iusto. Odio eaque atque sequi illum?'
            },

            {
                batman: 'The Batman',
                resume_batman: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, quidem libero reprehenderit qui expedita molestias voluptatibus repellat odio? Vero quasi modi fugiat officia asperiores quibusdam dolorum quam necessitatibus, tempore deleniti!'
            },

            {
                spiderman: 'Homem Aranha - No Way Home',
                resume_spiderman: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, quidem libero reprehenderit qui expedita molestias voluptatibus repellat odio? Vero quasi modi fugiat officia asperiores quibusdam dolorum quam necessitatibus, tempore deleniti!'
            },

            {
                morbius: 'Morbius',
                resume_morbius: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, quidem libero reprehenderit qui expedita molestias voluptatibus repellat odio? Vero quasi modi fugiat officia asperiores quibusdam dolorum quam necessitatibus, tempore deleniti!'
            }
        ]
    })
    console.log('ok')
})

app.get('/catalago', (req, res)=> {
    res.render('about', {
        tittle: 'Catalago'
    })
})

app.get('/register', (req, res)=> {
    const {c} = req.query
    res.render('register', {
        tittle: 'Cadastro',
        cadastrado: c
    })
})

app.post('/save-records', (req, res) => {
    const {nome, email, comentario} = req.body

    const dados = readFile.readFileSync('./store/bancoDados.json')
    const cadastros = JSON.parse(dados)

    cadastros.push({
        nome,
        email,
        comentario
    })

    const cadastrosStrings = JSON.stringify(cadastros)
    readFile.writeFileSync('./store/bancoDados.json', cadastrosStrings)

    res.redirect('/register?c=1')
})


const port = process.env.PORT || 8080
app.listen(8080, console.log(`Estamos usando o servidor na porta ${port}`))