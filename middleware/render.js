//EJS segítségével rendereli az adott oldalt
module.exports = function(objectRepository, viewName){
    return function (req, res){
        //console.log(res.locals);
        res.render(viewName, {data: res.locals});
    }
}