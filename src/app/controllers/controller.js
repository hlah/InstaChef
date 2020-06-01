const recipes_db = require('../queries/recipes_db');

module.exports = {

    home(req, res) {
        return res.redirect('/recipes');
    },

    index(req, res){

        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 9
        let offset = limit * (page - 1);

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(recipes){
                if (recipes.length >= 1){
                    var total = Math.ceil(recipes[0].total / limit);
                } else {
                    total = 0;
                }
                const pagination = {
                    total: total,  
                    page
                }
                return res.render("index", {recipes, pagination, filter});
            }
        }

        recipes_db.paginate(params);
    },

    show(req, res){
        recipes_db.find(req.params.index, function(recipe){
            if (!recipe) {
                return res.send("recipe not found");
            }
            return res.render("recipe_details", {recipe});
        })
    },

    edit(req, res){
        recipes_db.find(req.params.index, function(recipe){
            if (!recipe) {
                return res.send("Recipe not found");
            }

            return res.render('edit', {recipe});
        })
    },

    create(req, res){
        return res.render('create.njk');
    },

    post(req, res){
        const keys = Object.keys(req.body)

        for (key of keys){
            if ((req.body[key] == "") && (key != "add_info")){
                return res.send("Please, fill all fields");
            }
        }
    
        recipes_db.create(req.body, function(){
            return res.redirect('/recipes')
        })
    },

    delete(req, res){
        recipes_db.delete(req.body.index, function(){
            return res.redirect('/recipes')
        });
    },

    put(req, res){
        const keys = Object.keys(req.body);

        for (key of keys){
            if (req.body[key] == "" && key != "add_info"){
                return res.send("Please, fill all fields");
            }
        }

        recipes_db.update(req.body, function(){
            return res.redirect('/recipes')
        });
    },

    about(req, res){
        return res.render("about.njk"); 
    }
}

