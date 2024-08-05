const apiBaseUrl = 'https://openlibrary.org/';

const getBooksList = async () => {
	const apiAction = 'search.json';
	let apiParams = ['q=storm+front', 'limit=10', 'fields=key,title,author_name'];
	const apiCallUrl = `${apiBaseUrl}${apiAction}?${apiParams.join('&')}`;
	let output = null;
	try {
		const booksApi = await fetch(apiCallUrl).then((res) => res.json());
		output = booksApi.docs.map((book) => {
			return {
				...book,
				key: book.key.replace('/works/', ''),
			};
		});
	} catch (error) {
		console.log(error);
	}
	return output;
};

const getBookByKey = async (key) => {
	const apiAction = 'works';
	const apiCallUrl = `${apiBaseUrl}${apiAction}/${key}.json`;
	let output = null;

	try {
		output = await fetch(apiCallUrl).then((res) => res.json());
	} catch (error) {
		console.log(error);
	}
	return output;
};

const apiCoversUrl = 'https://covers.openlibrary.org/b/';
// key : ISBN, OCLC, LCCN, OLID and ID
// size: S, M, L
const getBookCoverByCoverId = async (coverId, key = 'id', size = 'M') => {
	const coverUrl = `${key.toLowerCase()}/${coverId}-${size}.jpg`;
	const apiCallUrl = `${apiCoversUrl}${coverUrl}`;
	let output = null;
	try {
		output = await fetch(apiCallUrl).then((res) => {
			return res.url;
		});
	} catch (error) {
		console.log(error);
	}
	return output;
};

export { getBooksList, getBookByKey, getBookCoverByCoverId };
