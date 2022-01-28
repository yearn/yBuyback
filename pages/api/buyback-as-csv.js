import	axios		from	'axios';
import	{Parser}	from	'json2csv';

export default async function handler(_, res) {
	const	{data} = await axios.get(process.env.BUYBACK_SOURCE);

	const	fields = ['id', 'timestamp', 'yfiAmount', 'usdValue', 'tokenAmount', 'token', 'hash'];
	try {
		const	parser = new Parser({fields});
		const	csv = parser.parse(data.map((e, index) => ({id: index, ...e})));
		res.setHeader('Content-Type', 'application/csv');
		res.setHeader('Content-Disposition', 'attachment; filename=yfi-buyback.csv');
		res.status(200).send(csv);
	} catch (err) {
		return res.status(500);
	}
}
