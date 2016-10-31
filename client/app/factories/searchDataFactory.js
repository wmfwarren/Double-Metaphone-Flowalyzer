"use strict";

app.factory("searchDataFactory", function() {

	let returnedData = null;

	const setSearchData = (data) => {
		returnedData = data;
		console.log("returnedData", returnedData);
	};

	const getSearchData = () => {
		return returnedData;
	};

	return {setSearchData, getSearchData}
});
