module.exports = {
    calculate_age: function(timestamp) {

        const today = new Date();
        const birth_date = new Date(timestamp);
    
        let age = today.getFullYear() - birth_date.getFullYear();
        
        const month = today.getMonth() - birth_date.getMonth();
        
        if ((month < 0) || (month == 0 && today.getDate() < birth_date.getDate())){
            age -= 1;
        }
        return `${age} years old`;
    },

    date: function(timestamp) {
        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birth_day: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
    }
}