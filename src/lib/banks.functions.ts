import { env } from "cloudflare:workers";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import * as z from "zod";
import { createDb } from "#/db";
import { banks } from "#/db/schema/banks";
import { requireUserId } from "./auth.server";

export const getBank = createServerFn({ method: "GET" }).handler(async () => {
	const userId = await requireUserId();
	const db = createDb(env.HYPERDRIVE.connectionString);

	const [bank] = await db
		.select()
		.from(banks)
		.where(eq(banks.account, userId))
		.limit(1);

	return bank ?? null;
});

export const getInstapayProviders = createServerFn({ method: "GET" }).handler(
	async () => {
		const instapayBanks = [
			{
				id: "bdo",
				category: "bank",
				type: "receiving_institution",
				attributes: {
					name: "BDO Unibank, Inc.",
					provider: "instapay",
					provider_code: "BNORPHMMXXX",
				},
			},
			{
				id: "bpi",
				category: "bank",
				type: "receiving_institution",
				attributes: {
					name: "Bank of the Philippine Islands",
					provider: "instapay",
					provider_code: "BOPIPHMMXXX",
				},
			},
			{
				id: "metrobank",
				category: "bank",
				type: "receiving_institution",
				attributes: {
					name: "Metropolitan Bank and Trust Company",
					provider: "instapay",
					provider_code: "MBTCPHMMXXX",
				},
			},
			{
				id: "unionbank",
				category: "bank",
				type: "receiving_institution",
				attributes: {
					name: "Union Bank of the Philippines",
					provider: "instapay",
					provider_code: "UBPHPHMMXXX",
				},
			},
			{
				id: "landbank",
				category: "bank",
				type: "receiving_institution",
				attributes: {
					name: "Land Bank of The Philippines",
					provider: "instapay",
					provider_code: "TLBPPHMMXXX",
				},
			},
			{
				id: "pnb",
				category: "bank",
				type: "receiving_institution",
				attributes: {
					name: "Philippine National Bank",
					provider: "instapay",
					provider_code: "PNBMPHMMTOD",
				},
			},
			{
				id: "rcbc",
				category: "bank",
				type: "receiving_institution",
				attributes: {
					name: "Rizal Commercial Banking Corporation",
					provider: "instapay",
					provider_code: "RCBCPHMMXXX",
				},
			},
			{
				id: "security-bank",
				category: "bank",
				type: "receiving_institution",
				attributes: {
					name: "Security Bank Corporation",
					provider: "instapay",
					provider_code: "SETCPHMMXXX",
				},
			},
			{
				id: "psbank",
				category: "bank",
				type: "receiving_institution",
				attributes: {
					name: "Philippine Savings Bank",
					provider: "instapay",
					provider_code: "PHSBPHMMXXX",
				},
			},
			{
				id: "cimb",
				category: "bank",
				type: "receiving_institution",
				attributes: {
					name: "CIMB Philippines, Inc.",
					provider: "instapay",
					provider_code: "CIPHPHMMXXX",
				},
			},
			{
				id: "gotyme",
				category: "bank",
				type: "receiving_institution",
				attributes: {
					name: "GoTyme Bank Corporation",
					provider: "instapay",
					provider_code: "GOTYPHM2XXX",
				},
			},
			{
				id: "maribank",
				category: "bank",
				type: "receiving_institution",
				attributes: {
					name: "MariBank Philippines, Inc.",
					provider: "instapay",
					provider_code: "LAUIPHM2XXX",
				},
			},
			{
				id: "gcash",
				category: "e-wallet",
				type: "receiving_institution",
				attributes: {
					name: "G-Xchange, Inc. (GCash)",
					provider: "instapay",
					provider_code: "GXCHPHM2XXX",
				},
			},
			{
				id: "maya",
				category: "e-wallet",
				type: "receiving_institution",
				attributes: {
					name: "Maya Philippines, Inc.",
					provider: "instapay",
					provider_code: "PAPHPHM1XXX",
				},
			},
			{
				id: "grabpay",
				category: "e-wallet",
				type: "receiving_institution",
				attributes: {
					name: "GrabPay",
					provider: "instapay",
					provider_code: "GPNEPHM2XXX",
				},
			},
			{
				id: "coins-ph",
				category: "e-wallet",
				type: "receiving_institution",
				attributes: {
					name: "DCPay (Coins.ph)",
					provider: "instapay",
					provider_code: "DCPHPHM1XXX",
				},
			},
		];

		return instapayBanks;
	},
);

export const bankFormSchema = z.object({
	accountName: z.string().min(1, "Account name is required"),
	accountNumber: z.string().min(1, "Account number is required"),
	providerCode: z.string(),
	providerName: z.string(),
});

export const addBankInformation = createServerFn({ method: "POST" })
	.validator(bankFormSchema)
	.handler(async ({ data }) => {
		const userId = await requireUserId();
		const db = createDb(env.HYPERDRIVE.connectionString);
		const existingBank = await getBank();

		if (existingBank) {
			throw new Error("Bank information already exists");
		}

		const [bank] = await db
			.insert(banks)
			.values({
				account: userId,
				accountName: data.accountName,
				accountNumber: data.accountNumber,
				providerCode: data.providerCode,
				providerName: data.providerName,
			})
			.returning();

		return bank;
	});

export const deleteBankInformation = createServerFn({
	method: "POST",
})
	.validator(
		z.object({
			account: z.string(),
		}),
	)
	.handler(async () => {
		const userId = await requireUserId();
		const db = createDb(env.HYPERDRIVE.connectionString);

		await db.delete(banks).where(eq(banks.account, userId));

		return true;
	});
