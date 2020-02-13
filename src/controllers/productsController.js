const db = require('../database/models/');
const Products = db.products;
const Brands = db.brands;
const Categories = db.categories;

module.exports = {
	index: (req, res) => {
		Products
			.findAll()
			.then(products => {
				return res.render('products/index', { 
					title: 'Products List',
					products
				});
			})
			.catch(error => res.send(error));
	},
	
	show: (req, res) => {
		Products
			.findByPk(req.params.id, {
				include: ['brand', 'categories']
			})
			.then(product => {
				return res.render('products/detail', { 
					title: `Detail of ${product.name}`,
					product
				});
			})
			.catch(error => res.send(error));
	},
	
	create: (req, res) => {

		let brands = Brands.findAll();
		let categories = Categories.findAll();

		Promise
			.all([brands, categories])
			.then(results => {
				res.render('products/create', {
					title: 'Product Create',
					brands: results[0],
					categories: results[1]
				});
			})
			.catch(error => res.send(error));

		return;

		/*
		OLD WAY - Sin promises all
		// Consulta de marcas
		Brands
			.findAll()
			.then(brands => {
				// Consulta de categorías
				Categories
					.findAll()
					.then(categories => {
						res.render('products/create', {
							title: 'Product Create',
							brands,
							categories
						});
					})
					.catch(error => res.send(error));
			})
			.catch(error => res.send(error));
		*/
	},

	store: (req, res) => {
		Products
			.create(req.body)
			.then(product => {
				// insertar en la pivot
				product.addCategories(req.body.categories);
				return res.redirect(`/products/${product.id}`);
			})
			.catch(error => res.send(error));	
	},

	destroy: (req, res) => {
		Products
			.findByPk(req.params.id, {
				include: ['categories']
			})
			.then(product => {
				product.removeCategories(product.categories);
				product.destroy();
				return res.redirect('/products');
			})
			.catch(error => res.send(error));
	}
}