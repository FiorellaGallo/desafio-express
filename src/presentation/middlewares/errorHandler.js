
const errorHandler = async (err, req, res, next) =>
{
  
  if (err?.message.includes('Not Found'))
  {
      req.prodLogger.error(err.stack);
      return await res.status(404).json({ message: err.message });
  }
  else if (err?.name.includes('ZodError')) 
  {
      
    req.prodLogger.error(err.stack);
      return await res.status(400).json({ message: err.issues });
  }

  req.prodLogger.error(err.stack);
  await  res.status(500).json({ message: 'Ocurrió un error' });
};

export default errorHandler;

