import	axios		from	'axios';

export default async function handler(_, res) {
	const	{data} = await axios.get(process.env.BUYBACK_SOURCE);
	return res.status(200).json(data);
}

async function getBuybacks() {
	const	{data} = await axios.get(process.env.BUYBACK_SOURCE);
	return data;
}
export {getBuybacks};