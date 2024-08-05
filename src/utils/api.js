const apiBaseUrl = 'https://openlibrary.org/';

const getBooksList = async () => {
	const apiAction = 'search.json';
	let apiParams = ['q=storm+front', 'limit=10', 'fields=key,title,author_name'];
	const apiCallUrl = `${apiBaseUrl}${apiAction}?${apiParams.join('&')}`;
	const booksApi = await fetch(apiCallUrl).then((res) => res.json());
	return booksApi.docs.map((book) => {
		return {
			...book,
			key: book.key.replace('/works/', ''),
		};
	});
};

const getBookByKey = async (key) => {
	const apiAction = 'works';
	const apiCallUrl = `${apiBaseUrl}${apiAction}/${key}.json`;
	try {
		const bookData = await fetch(apiCallUrl).then((res) => res.json());
		return bookData;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const apiCoversUrl = 'https://covers.openlibrary.org/b/';
// key : ISBN, OCLC, LCCN, OLID and ID
// size: S, M, L
const getBookCoverByCoverId = async (coverId, key = 'id', size = 'M') => {
	const coverUrl = `${key.toLowerCase()}/${coverId}-${size}.jpg`;
	const apiCallUrl = `${apiCoversUrl}${coverUrl}`;
	console.log({ apiCallUrl });
	try {
		const cover = await fetch(apiCallUrl).then((res) => {
			return res.url;
		});
		return cover;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export { getBooksList, getBookByKey, getBookCoverByCoverId };
