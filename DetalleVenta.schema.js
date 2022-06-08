const Joi = require('joi')

const idVenta = Joi.string().uuid()
const idCliente = Joi.string().uuid()
const idVendedor = Joi.string().uuid()
const direccion = Joi.string().uuid()
const telefono = Joi.number().integer().min(60000000).max(79999999)
const productos = Joi.array()
const correoInstitucional = Joi.string().uuid()
const nit = Joi.number()

const createDetalleVentaSchema = Joi.object({
    idVenta: idVenta.required(),
    idCliente: idCliente.required(),
    idVendedor: idVendedor.required(),
    direccion: direccion.required(),
    telefono: telefono.required(),
    productos: productos.required(),
    correoInstitucional: correoInstitucional.required(),
    nit: nit.required()
})

const updateDetalleVentaSchema = Joi.object({
    idVenta: idVenta,
    idCliente: idCliente,
    idVendedor: idVendedor,
    direccion: direccion,
    telefono: telefono,
    productos: productos,
    correoInstitucional: correoInstitucional,
    nit: nit
})

const getDetallVentaSchema = Joi.object({
    id: idVenta.required()
})

module.exports = {
    createDetalleVentaSchema,
    updateDetalleVentaSchema,
    getDetallVentaSchema
}

