function objectFromProperty(arr, property) {
	return arr.reduce((obj, item) => {
		obj[item[property]] = item;
		return obj;
	}, {});
}
module.exports = objectFromProperty;
