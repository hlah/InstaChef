const { date } = require('../../lib/utils');
const db = require('../../config/db');

module.exports = {

    create(data) {

        const query = `
            INSERT INTO recipes(
                title,
                author,	
                ingredients_name,
                ingredients_quantity,
                ingredients_measure,
                preparation,
                preparation_time,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `

        const values = [
            data.title,
            data.author,
            data.ingredients_name,
            data.ingredients_quantity,
            data.ingredients_measure,
            data.preparation,
            data.preparation_time,     
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
            ingredients_name=($3),
            ingredients_quantity=($4),
            ingredients_measure=($5),
            preparation=($6),
            preparation_time=($7) 
        WHERE id = ($8)
        `

        const values = [
            data.title,
            data.author,
            data.ingredients_name,
            data.ingredients_quantity,
            data.ingredients_measure,
            data.preparation,
            data.preparation_time,
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
