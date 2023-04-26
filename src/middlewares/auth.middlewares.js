export function auth(req, res, next) {
    if (req.session.logged) {
        next()
    } else {
        res.redirect('/')
    }
}

export function isLogged(req, res, next) {
    if (req.session.logged) {
        next()
    } else {
        // res.redirect('/views/products')
        res.json({message:'Sesion no iniciada'})
    }
}

export function isAdmin(req,res,next){
    if (req.session.isAdmin) {
        next()
    } else {
        res.redirect('/')
    }
}

export function isUser(req,res,next) {

}



