require('dotenv').config()
const { app } = require("./src/app")
const port = process.env.PORT || 3000 // caso o PORT seja informado o mesmo será utilizado, senão consideramos o valor padrão 3000

app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`)
})
