module.exports = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Credentials", true);
    next()
  }
  