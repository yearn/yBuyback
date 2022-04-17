import	axios								from	'axios';
import	{NextApiRequest, NextApiResponse}	from	'next';

export default async function handler(_: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse | any> {
	const	{data} = await axios.get(process.env.BUYBACK_SOURCE as string);
	return res.status(200).json(data);
}

async function getBuybacks(): Promise<void> {
	const	{data} = await axios.get(process.env.BUYBACK_SOURCE as string);
	return data;
}
export {getBuybacks};