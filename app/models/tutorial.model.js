module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("tutorial", {
        label: {
            type: Sequelize.STRING
        },

        tid: {

            type: Sequelize.INTEGER
        },

        
    });

    return Tutorial;
};