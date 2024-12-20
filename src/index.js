const app = require('./app');

const port = 4000;

const main = () => {
  // Puerto donde se ejecuta el servidor
  app.listen(port);
  console.log(`Servidor encendido en puerto ${port}.`);
}

main()