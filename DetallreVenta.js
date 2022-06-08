const express = require('express')

const DetallesVentaServices = require('../services/DetalleVenta.service')
const validateHandler = require('../middlewares/validate.handler')
const { createDetalleVentaSchema, updateDetalleVentaSchema, getDetallVentaSchema } = require('../schemas/DetalleVenta.schema')
const router = express.Router()

const service = new DetallesVentaServices()

router.get('/', async (req, res) => {
    try {
        const detallesVenta = await service.find()
        res.status(200).json(detallesVenta)
    }
    catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

})


router.get('/:id',
    validateHandler(getDetalleSchema, 'params'),
    async (req, res, next) => {
        try {
            const id = req.params.id
            const detallesVenta = await service.findOne(id)
            res.json(detallesVenta)
        }
        catch (error) {
            next(error)
        }
    })

    
router.post('/',
validateHandler(createDetalleVentaSchema, 'body'),
async (req, res) => {
    try {
        const body = req.body
        const newDetalleVenta = await service.create(body)
        res.status(201).json({
            message: "Created",
            data: newDetalleVenta
        })
    }
    catch (error) {
        next(error)
    }
})

router.patch('/:id',
    validateHandler(getDetallVentaSchema, 'params'),
    validateHandler(updateDetalleVentaSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const body = req.body
            const changeDetalleVenta = await service.update(id, body)
            res.status(202).json({
                message: 'Update',
                data: changeDetalleVenta
            })
        }
        catch (error) {
            next(error)
        }
    })


    router.delete('/:id',
    validateHandler(getDetallVentaSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const deleteDetalleVenta = await service.delete(id)
            res.status(202).json(deleteDetalleVenta)
        }
        catch (error) {
            next(error)
        }
    })

module.exports = router