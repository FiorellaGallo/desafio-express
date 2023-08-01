import __dirname from'../src/dirname.js'

const dirname = __dirname.replace('/src','')
const swaggerOptions = {
    definition:{
        openapi:'3.0.1',
        info:{
            title:'Documentación sobre una API',
            description:'API pensada para un e-commerce'
        }
    },
    apis:[`${dirname}/docs/**/*.yaml`]
}

export default swaggerOptions;
