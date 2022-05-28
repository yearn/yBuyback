import	{ContractInterface, ethers} from	'ethers';
import	BUYBACK_ABI					from	'utils/abi/buyback.abi';

export async function	sell(
	provider: ethers.providers.Web3Provider,
	amount: ethers.BigNumber
): Promise<boolean> {
	const	signer = provider.getSigner();

	try {
		const	contract = new ethers.Contract(
			process.env.BUYBACK_ADDR as string,
			BUYBACK_ABI as ContractInterface,
			signer
		);
		const	transaction = await contract.buy_dai(amount);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 0) {
			console.error('Fail to perform transaction');
			return false;
		}

		return true;
	} catch(error) {
		console.error(error);
		return false;
	}
}