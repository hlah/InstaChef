const { date } = require('../../lib/utils');
const db = require('../../config/db');

module.exports = {

    create(data, callback) {

        const query = `
            INSERT INTO recipes(
                image,
                title,
                author,	
                ingredients,
                preparation,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [
            data.image,
            data.title,
            data.author,
            data.ingredients,
            data.preparation,         
            date(Date.now()).iso,
        ]
        
        db.query(query, values, function(err, results){
            if (err) throw `Database error ${err}`;
            callback();
        });

    },

    find(id, callback) {
        db.query(`
            SELECT recipes.*
            FROM recipes 
            WHERE recipes.id = $1`, [id], function(err, results){
            if (err) throw `Database error ${err}`;
            callback(results.rows[0]);
        });
    },

    update(data, callback){

        const query = `
        UPDATE recipes SET 
            image=($1),
            title=($2),
            author=($3),	
            ingredients=($4),
            preparation=($5)
        WHERE id = ($6)
        `

        const values = [
            data.image,
            data.title,
            data.author,
            data.ingredients,
            data.preparation,
            data.index
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database error ${err}`;
            callback();            
        });
    },

    delete(id, callback){
        db.query(`DELETE FROM recipes WHERE id = $1`, [id], function(err, results){
            if (err) throw `Database error ${err}`;
            callback();
        });
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

        db.query(query, [limit, offset], function(err, results) {
            if (err) throw `Database Error ${err}`;
            callback(results.rows);
        })
    }
}
