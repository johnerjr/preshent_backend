const DBconnection = require("../config/db.js");

exports.selectProducts = async (paginateCategory) => {
    const sql = `SELECT p.id as id, p.name as name, p.price as price, p.createdDate as createdDate,
                p.updatedDate as updatedDate, p.createdBy as createdBy, p.isActivated as isActivated,  p.description as description, 
                pc.id as pc_id,c.name as c_name, c.id as c_id, sc.name as sc_name,sc.id as sc_id,
                sc.categoriesID as sc_categoriesID, m.name as m_name,m.id as m_id,m.subCategoriesID as m_subCategoriesID,
                pc.minorCategory FROM products as p
                LEFT JOIN productCategory as pc ON (pc.product_id = p.id)
                LEFT JOIN categories as c ON (c.id = pc.category)
                LEFT JOIN subCategories as sc ON (sc.id = pc.subCategory)
                LEFT JOIN minorCategories as m ON (m.id = pc.minorCategory)`;
    const products = await DBconnection.query(sql);
    const finalProducts = {
        "products": products,
    }
    return finalProducts;

}

exports.getproductsById = async (productID) => {
    const products = await DBconnection.query(`SELECT * FROM products WHERE id = ${productID}`);
    if (products) {
        const offers = await DBconnection.query(`SELECT * FROM offer WHERE product_id = ${productID}`);
        if (offers) {
            const categories = await DBconnection.query(`SELECT * FROM productCategory WHERE product_id = ${productID}`);
            const prouctDetail = {
                product: products,
                offer: offers,
                category: categories
            }
            return prouctDetail;
        }
    }
}

exports.productsById = async (productID) => {
    const products = await DBconnection.query(`SELECT * FROM products WHERE id = ${productID}`);
    if (products) {
        const offers = await DBconnection.query(`SELECT * FROM offer WHERE product_id = ${productID}`);
        const prouctDetail = {
            product: products,
            offer: offers
        }
        return prouctDetail;
    }

    // return products;
}


exports.selectProductsCount = async () => {
    var sql1 = "SELECT COUNT(*) as totalCount FROM ??";
    var table = ["products"];
    newQuery = await DBconnection.query(sql1, table);
    const finalProducts = {
        'totalCount': newQuery[0].totalCount
    }
    return finalProducts;
}

exports.insertProducts = async (detail) => {
    const product = detail.product;
    const category = detail.category;
    const offer = detail.offer;

    if (product.id) {

        let sqlDel1 = DBconnection.query(`DELETE FROM productCategory WHERE product_id = ${product.id}`);
        if (sqlDel1) {
            const sqlp = "UPDATE products SET ? WHERE id = ?";
            const updateQuery = DBconnection.query(sqlp, [product, product.id]);
            if (updateQuery) {
                // INSERT/UPDATE DATA FROM OFFER TABLE //
                let sqlDelOf = DBconnection.query(`DELETE FROM offer WHERE product_id = ${product.id}`);
                if (sqlDelOf) {
                    let offerArray = JSON.parse(offer);
                    offerArray.map((element, ind) => {
                        element['product_id'] = product.id;
                    });
                    offerArray.map((elem, index) => {
                        DBconnection.query('INSERT INTO offer SET ?', elem);
                    });
                }

                // INSERT/UPDATE DATA FROM PRODUCT-CATEGORY TABLE //
                let categoryArray = JSON.parse(category);
                categoryArray.map((elem, indx) => {
                    elem['product_id'] = product.id;
                });

                categoryArray.map((cats, index) => {
                    DBconnection.query('INSERT INTO productCategory SET ?', cats);
                });

                const newUpdateQuery = {
                    method: 'update',
                    selectSubCategories: updateQuery
                }
                return newUpdateQuery;
            }
        }


    } else {

        const insertQuery = await DBconnection.query('INSERT INTO products SET ?', product);
        if (insertQuery.insertId) {
            // INSERT DATA FROM OFFER TABLE //
            if (offer.length >= 0) {
                let offerArray = JSON.parse(offer);
                offerArray.map((element, ind) => {
                    element['product_id'] = insertQuery.insertId;
                });
                offerArray.map((elem, index) => {
                    DBconnection.query('INSERT INTO offer SET ?', elem);
                });
            };

            // INSERT DATA FROM PRODUCT-CATEGORY TABLE //
            if (category.length >= 0) {
                let categoryArray = JSON.parse(category);
                categoryArray.map((elem, indx) => {
                    elem['product_id'] = insertQuery.insertId;
                });
                categoryArray.map((cats, index) => {
                    DBconnection.query('INSERT INTO productCategory SET ?', cats);
                });
            };
            const newInsertQueryOfferProuct = {
                method: 'insert',
                selectSubCategories: insertQuery
            }
            return newInsertQueryOfferProuct;
        }

    }

}



exports.updateProductStatus = async (detail) => {
    const sqlp = "UPDATE products SET ? WHERE id = ?";
    const updateQuery = DBconnection.query(sqlp, [detail, detail.id]);
    return updateQuery;
}

exports.insertOffer = async (detail) => {
    if (detail.id) {
        var sql = "UPDATE offer SET ? WHERE id = ?";
        const updateQuery = await DBconnection.query(sql, [detail, detail.id]);
        const newUpdateQuery = {
            method: 'update',
            selectSubCategories: updateQuery
        }
        return newUpdateQuery;
    } else {
        const insertQuery = await DBconnection.query('INSERT INTO offer SET ?', detail);
        const newInsertQuery = {
            method: 'insert',
            selectSubCategories: insertQuery
        }
        return newInsertQuery;
    }
}

exports.getOffer = async () => {
    const offers = await DBconnection.query("SELECT * FROM offer");
    return offers;
}

