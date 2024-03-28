import express from 'express'
import sql from 'mssql'
import { sqlConfig } from './config.js'

const pool = new sql.ConnectionPool(sqlConfig)
await pool.connect();
export const router = express.Router()

router.get('/', async (request, response)=>{
    try{
        const { data } = await pool.query`select * from Tarefas`
        return response.status(201).json(data)
    }
    catch(error){
        return response.status(501).json('Erro')
    }
})

router.get('/chamado/:id', async (request,response)=>{
    try{
            const { id } = request.params
            const { data } = await pool.query`select * from Tarefas where IdChamado = ${id}`
            return response.status(201).json(data)
    }
    catch(error){
        return response.status(501).json('Erro')
    }
})

router.post('/chamado/novo', async (request, response)=>{
    try{
        const { id, dataChamado, nomeCliente, descricao } = request.body
        await pool.query`insert into Tarefas values(${id}, ${dataChamado}, ${nomeCliente}, ${descricao})`
        return response.status(201).json('Cadastrado')
    }
    catch(error){
        return response.status(501).json('Erro ao cadastrar')
    }
})

export default router