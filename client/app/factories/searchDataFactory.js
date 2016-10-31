"use strict";

app.factory("searchDataFactory", function() {

	let returnedData = null;

	const setSearchData = (data) => {
		returnedData = data;
	};

	const getSearchData = () => {
		return returnedData;
	};
});
