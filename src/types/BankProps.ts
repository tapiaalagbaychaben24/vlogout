export type BankProps = {
	account: string;
	accountName: string;
	accountNumber: string;
	providerCode: string;
	providerName: string;
	createdAt: Date;
};

export type InstapayProviderProps = {
	id: string;
	category: string;
	type: string;
	attributes: {
		name: string;
		provider: string;
		provider_code: string;
	};
};
