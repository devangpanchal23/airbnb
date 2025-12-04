// module.exports = (fn) =>  {
//     return function(req,res,next){
//         fn.try(req,res,next).catch(err);
//     }
// }
module.exports = (fn) => {
    return function(req, res, next) {
        // execute the function and catch any errors, passing them to next()
        fn(req, res, next).catch(next);
    }
}