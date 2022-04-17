import	axios								from	'axios';
import	{NextApiRequest, NextApiResponse}	from	'next';
import	{Parser}							from	'json2csv';

export default async function handler(_: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse | any> {
	const	{data} = await axios.get(process.env.BUYBACK_SOURCE as string);

	const	fields = ['id', 'timestamp', 'yfiAmount', 'usdValue', 'tokenAmount', 'token', 'hash'];
	try {
		const	parser = new Parser({fields});
		const	csv = parser.parse(data);
		res.setHeader('Content-Type', 'application/csv');
		res.setHeader('Content-Disposition', 'attachment; filename=yfi-buyback.csv');
		return res.status(200).send(csv);
	} catch (err) {
		return res.status(500);
	}
}
