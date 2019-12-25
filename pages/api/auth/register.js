export default (req, res) => {
	if (req.method !== 'POST') {
		res.status(405).end();
		return;
	}
	console.log('POST method', req.body);
	res.send(req.body);
};
