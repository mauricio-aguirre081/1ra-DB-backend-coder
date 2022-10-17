const { options } = require("../knexConfig" );
const knex = require('knex')

export default class Producto {
	
	static productos = [];
	constructor() {
		this.id = 0 ;
	}

	listar(id) {
		let producto = Producto.productos.find((prod) => prod.id == id);
		return producto || { error: "producto no encontrado" };
		async function getById(id) {
		await knex.from('productos')
		.select('*')
		.where('id' = id)
		.then((rows) => {
			for (row of rows) {
				console.log(` ${row['id']} ${row['fechs']} ${row['nombre']} ${row['descripcion']}${row['codigo']} ${row['foto']} ${row['precio']} ${row['stock']}`)
			}
		}).catch ( (error) => {console.log(error); throw error })
		.finally( () => {
			knex.destroy();
		})
		}
		getById();
		
	}

	listarAll() {
		return Producto.productos.length
			? Producto.productos
			: { error: "no hay productos cargados" };
			async function getById(id) {
				await knex.from('productos')
				.select('*')
				.then((rows) => {
					for (row of rows) {
						console.log(` ${row['id']} ${row['fechs']} ${row['nombre']} ${row['descripcion']}${row['codigo']} ${row['foto']} ${row['precio']} ${row['stock']}`)
					}
				}).catch ( (error) => {console.log(error); throw error })
				.finally( () => {
					knex.destroy();
				})
				}
				getById();
	}

	guardar(prod) {
		prod.id = ++this.id;
		prod.timeStamp = Date.now();
		Producto.productos.push(prod);
		return prod;
		async function create() {
			await knex('productos')
			.insert(NewProducto)
			.then(() => {
				console.log("nuevo producto guardado")
			})
			.catch ( (error) => {console.log(error); throw error })
			.finally( () => {
				knex.destroy();
			})
			}
			create();
	}

	actualizar(prod, id) {
		prod.id = Number(id);
		let index = Producto.productos.findIndex((prod) => prod.id == id);
		Producto.productos.splice(index, 1, prod);
		async function update() {
			await knex('productos')
			.where({ id: id})
			.update(` ${row['id']} ${row['fechs']} ${row['nombre']} ${row['descripcion']}${row['codigo']} ${row['foto']} ${row['precio']} ${row['stock']}`)
			.then(() => {
				console.log("producto borrado")
			})
			.catch ( (error) => {console.log(error); throw error })
			.finally( () => {
				knex.destroy();
			})
			}
			update();

	}

	borrar(id) {
		let index = Producto.productos.findIndex((prod) => prod.id == id);
		return Producto.productos.splice(index, 1);
		async function deletee() {
			await knex('productos')
			.where({ id: id})
			.delete()
			.then(() => {
				console.log("producto borrado")
			})
			.catch ( (error) => {console.log(error); throw error })
			.finally( () => {
				knex.destroy();
			})
			}
			deletee();
	}
}
