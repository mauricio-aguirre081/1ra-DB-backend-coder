const { options } = require("./knexConfig" );
const knex = require('knex')




knex.schema.createTable("productos", (table) => {
    table.increments("id");
    table.timestamp("fecha");
    table.string("nombre", 20).notNullable();
    table.string("descripcion", 40).notNullable();
    table.string("codigo", 10).notNullable();
    table.string("foto").notNullable();
    table.float("precio", 5).notNullable();
    table.integer("stock");
}).then(() => {
    console.log("tabla creada")
}).catch((error) => {
    console.log(error)
}).finally(()=> {
    knex.destroy();
})

//Para usar con sockets y sqlite3
const knex2 = require("knex")({
    client: "sqlite3",
    connection: { filename: "./db/myDB.sqlite"}
})

knex2.schema.createTable("mensajes", (table) => {
    table.increments("id");
    table.timestamp("fecha");
    table.string("author", 20).notNullable();
    table.string("text", 40).notNullable();
}).then(() => {
    console.log("tabla creada")
}).catch((error) => {
    console.log(error)
}).finally(()=> {
    knex.destroy();
})

//-----------sockets---------------
const express = require("express");
const PORT = 8080;
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("./public"));
app.get("/", (req, res) => {
	res.sendFile("index.html");
});

const messages = [
	{
		author: "Juan",
		text: "Hola que tal",
	},
	{
		author: "Maria",
		text: "Bien y vos?",
	},
	{
		author: "Juan",
		text: "Me alegra",
	},
];

io.on("connection", (socket) => {
	console.log("se conecto un usuario");

	socket.emit("messages", messages);

	socket.on("new-message", (data) => {
		messages.push(data);
		io.sockets.emit("messages", messages);
        async function create() {
			await knex('mensajes')
			.insert(data)
			.then(() => {
				console.log("mensaje agregado")
			})
			.catch ( (error) => {console.log(error); throw error })
			.finally( () => {
				knex.destroy();
			})
			}
			create();
	});
});

httpServer.listen(8080, () => console.log("servidor Levantado"));

