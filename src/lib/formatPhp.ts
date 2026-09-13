export const MINIMUM_WITHDRAWAL_AMOUNT = 10_000 as const;
export const TRANSFER_FEE = 2_500 as const;
export const EARLY_BIRD_SHOUTOUT_PRICE = 100 as const;

export function pesosToCentavos(pesos: number) {
	return Math.round(pesos * 100);
}

export function centavosToPesos(centavos: number) {
	return centavos / 100;
}

export function formatPhp(centavos: number) {
	return (centavos / 100).toLocaleString("en-PH");
}
