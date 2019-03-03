const get = async (url) => {
	const result = await fetch(url);

	return await result.json();
};

export default {
	fetch: get
}
