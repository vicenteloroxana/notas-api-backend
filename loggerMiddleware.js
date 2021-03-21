const logger = (request, response, next) => {
  console.log(request.method)
  console.log(request.path)
  console.log(request.bdoy)
  next()
}
module.exports = logger
