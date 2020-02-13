module.exports = (sequelize, DataTypes) => {
	let alias = 'products';

	let columns = {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		name: DataTypes.STRING,
		price: DataTypes.INTEGER,
		image: DataTypes.STRING,
		userId: DataTypes.INTEGER,
		brandId: DataTypes.INTEGER
	};

	/* let config = {
		tableName: 'productos',
		timestamps: false, // createdAt - updatedAt
	}; */

	const product = sequelize.define(alias, columns);

	product.associate = (models) => {
		// belongsTo 
		product.belongsTo(models.brands, {
			as: 'brand',
			foreignKey: 'brandId'
		});
		
		// belongsToMany
		product.belongsToMany(models.categories, {
			as: 'categories',
			through: 'category_product',
			foreignKey: 'productId',
			otherKey: 'categoryId',
		});
	}

	product.prototype.getRoundPrice = function () {
		return Number(this.price).toFixed();
	}
 
	return product;
}