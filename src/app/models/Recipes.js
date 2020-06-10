const { date } = require('../../lib/utils');
const db = require('../../config/db');

module.exports = {

    create(data) {

        const query = `
            INSERT INTO recipes(
                title,
                author,	
                ingredients,
                preparation,
                created_at
            ) VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `

        const values = [
            data.title,
            data.author,
            data.ingredients,
            data.preparation,         
            date(Date.now()).iso,
        ]
        
        return db.query(query, values)

    },

    find(id) {
        return db.query('SELECT * FROM recipes WHERE id = $1', [id])
    },

    update(data){

        const query = `
        UPDATE recipes SET 
            title=($1),
            author=($2),	
            ingredients=($3),
            preparation=($4)
        WHERE id = ($5)
        `

        const values = [
            data.title,
            data.author,
            data.ingredients,
            data.preparation,
            data.index
        ]

        return db.query(query, values)
    },

    delete(id){
        return db.query(`DELETE FROM recipes WHERE id = $1`, [id])
    },

    paginate(params){
        const { filter, limit, offset, callback } = params;

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM recipes
            ) AS total`


        if ( filter ) {
            filterQuery = `
            WHERE recipes.title ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM recipes
                ${filterQuery}
            ) AS total`
        }

        query = `
        SELECT recipes.*, ${totalQuery}
        FROM recipes
        ${filterQuery}
        LIMIT $1 OFFSET $2`;

        return db.query(query, [limit, offset])
    },

    files(id) {
        return db.query('SELECT * FROM files WHERE recipe_id = $1', [id])
    }
}
