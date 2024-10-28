module.exports = (sequelize, DataTypes) => {

    const players = sequelize.define("players", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        wins: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        wins2: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        winner: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    })
    return players
}