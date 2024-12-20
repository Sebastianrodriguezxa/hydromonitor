

const verifyAdmin = (user) => {
  const {AccessLevel} = JSON.parse(user);

  if(AccessLevel.Nombre != "Admin"){
    return {
      success: false,
      message: "No puede realizar esta accion, solo administrador"
    }
  }

  return {
    success: true,
    // Por si acaso
    message: "Puede realizar esta accion, tiene permisos de administrador"
  }
}

module.exports = {
  verifyAdmin
}
