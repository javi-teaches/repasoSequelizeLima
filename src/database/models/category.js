module.exports = (sequelize, DataTypes) => {
	let alias = 'categories';

	let columns = {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		name: DataTypes.STRING,
	};

	const category = sequelize.define(alias, columns);

	category.associate = (models) => {
		// hasMany
	}

	return category;
}