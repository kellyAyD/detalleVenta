const faker = require('faker')

const boom = require('@hapi/boom')

class DetallesVentaServices {
    constructor() {
        this.detallesVenta = []
        this.generate()
    }

    generate() {
        const limit = 50
        for (let index = 0; index < limit; index++) {
            this.detallesVenta.push({
                idVenta: faker.datatype.uuid(),
                idCliente: faker.datatype.uuid(),
                idVendedor: faker.datatype.uuid(),
                direccion: faker.address.direction(),
                telefono: faker.phone.phoneNumber(),
                productos: faker.random.arrayElements(),
                correoInstitucional: faker.internet.email(),               
                nit: parseInt(faker.random.number(10000000)),
            })
        }
    }
    
    async create(data) {
        const newDetalleVenta = {
            idVenta: faker.datatype.uuid(),
            ...data
        }
        this.detallesVenta.push(newDetalleVenta)
        return newDetalleVenta
    }
    async find() {
        return this.detallesVenta

    }
    async findOne(id) {
        const detallesVenta = this.detallesVenta.find(item => item.idVenta === id)
        if (!detallesVenta) {
            throw boom.notFound('Detalle no encontrado')
        }
        return this.detallesVenta.find(item => item.idVenta === id)
    }

    async update(id, changes) {
        const index = this.detallesVenta.findIndex(item => item.idVenta === id)
        const detallesVenta = this.detallesVenta[index]
        if (index === -1) {
            throw boom.notFound('Detalle no modificado')
        }
        this.detallesVenta[index] = {
            ...detallesVenta,
            ...changes
        }
        return this.detallesVenta[index]
    }
    async delete(id) {
        const index = this.detallesVenta.findIndex(item => item.idVenta === id)
        if (index === -1) {
            throw boom.notFound('Detalle no eliminado')
        }
        this.detallesVenta.splice(index, 1)
        return {
            message: 'Eliminado',
            id
        }
    }
}
module.exports = DetallesVentaServices