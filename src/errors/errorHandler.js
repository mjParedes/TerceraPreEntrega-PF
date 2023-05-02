function errorHandler(err, req, res, next) {
    // Aquí puedes personalizar el mensaje de error
    res.status(500).json({ error: 'Ha ocurrido un error en la aplicación' });
  }
  
  app.use(errorHandler);
  