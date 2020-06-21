const Recipes = require('../models/Recipes');
const File = require('../models/File');

module.exports = {

    home(req, res) {
        return res.redirect('/recipes');
    },

    async index(req, res){

        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 6
        let offset = limit * (page - 1);

        const params = {
            filter,
            page,
            limit,
            offset
        } 
        recipes = await Recipes.paginate(params);

        if (recipes.rows.length >= 1){
            var total = Math.ceil(recipes.rows[0].total / limit);
        } else {
            total = 0;
        }
        const pagination = {
            total: total,  
            page
        }

        for (let i=0; i<recipes.rows.length; i++){
            let recipeId = recipes.rows[i].id
            const filesFromRecipe = await File.allFilesFromRecipe(recipeId)
            if (filesFromRecipe.rows != ""){    
                let file = filesFromRecipe.rows[0]
                recipes.rows[i].image = `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            }
            else {
                recipes.rows[i].image = 'http://placehold.it/172x80?text=SEM%20FOTO'
            }            
        }

        return res.render("index", {recipes: recipes.rows, pagination, filter});
    },

    async show(req, res){

        let results = await Recipes.find(req.params.index)
        const recipe = results.rows[0]

        if(!recipe) return res.send('Recipe not found!')

        results = await Recipes.files(recipe.id)
        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
        }))

        let num_ing = recipe.ingredients_name.length
        let num_steps = recipe.preparation.length
        return res.render('recipe_details', {recipe, files, num_ing, num_steps})

    },

    async edit(req, res){
        let results = await Recipes.find(req.params.index)
        const recipe = results.rows[0]

        if (!recipe) return res.send('Product not found')

        results = await Recipes.files(recipe.id)
        let files = results.rows
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
        }))

        let num_ing = recipe.ingredients_name.length
        let num_steps = recipe.preparation.length
        return res.render('edit', {recipe, files, num_ing, num_steps});
    },

    execute(req, res) {
        return res.redirect('/recipes/' + req.params.index + "/checklist");
    },

    async checklist(req, res) {
        let results = await Recipes.find(req.params.index)
        const recipe = results.rows[0]

        if (!recipe) return res.send('Product not found')

        let ingredients = [];
        for (let [index, name] of recipe.ingredients_name.entries()) {
            ingredients.push({ 
                name, 
                quantity: recipe.ingredients_quantity[index],
                measure: recipe.ingredients_measure[index]
            });
        }

        return res.render('checklist', {recipe, ingredients});
    },

    async steps(req, res) {
        let results = await Recipes.find(req.params.index)
        const recipe = results.rows[0]
        if (!recipe) return res.send('Product not found')

        let step_num = req.params.step;
        if (!step_num) step_num = 0;
        else step_num = parseInt(step_num);
        if (step_num >= recipe.preparation.length) return res.render('finished', {recipe, step_num});

        let step = {
          description: recipe.preparation[step_num],
          time: recipe.preparation_time[step_num]
        }

        return res.render('step', {recipe, step, step_num});
    },

    create(req, res){
        return res.render('create.njk');
    },

    async post(req, res){
        const keys = Object.keys(req.body)

        for (key of keys){
            if ((req.body[key] == "")){
                return res.send("Please, fill all fields");
            }
        }

        let results = await Recipes.create(req.body)
        const recipeId = results.rows[0].id 
        
        const filesPromises = req.files.map(file => File.create({ ...file, recipe_id: recipeId}))
        await Promise.all(filesPromises)

        return res.redirect(`/recipes/${recipeId}`)
    },

    async delete(req, res){
        const recipeId = req.body.index

        const filesFromRecipe = await File.allFilesFromRecipe(recipeId)
        for (i=0; i<filesFromRecipe.rows.length; i++){
            await File.delete(filesFromRecipe.rows[i].id)
        }

        await Recipes.delete(recipeId)
        return res.redirect('/recipes')
    },

    async put(req, res){
        const keys = Object.keys(req.body);

        for (key of keys){
            if (req.body[key] == "" && key != 'removed_files'){
                return res.send("Please, fill all fields");
            }
        }

        if (req.files.length != 0) {
            const newFilesPromise = req.files.map(file => File.create({...file, recipe_id: req.body.index}))
            await Promise.all(newFilesPromise)
        }

        if (req.body.removed_files) {
            const removedFiles = req.body.removed_files.split(',')
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1)

            const removedFilesPromise = removedFiles.map(id => File.delete(id))
            await Promise.all(removedFilesPromise)
        }

        await Recipes.update(req.body)

        return res.redirect(`/recipes/${req.body.index}`)        

    },

    about(req, res){
        return res.render("about.njk"); 
    }
}

