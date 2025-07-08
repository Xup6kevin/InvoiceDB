import postgres from 'postgres';

const useSSL = process.env.POSTGRES_URL?.includes('localhost') ? false : 'require';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: useSSL });

async function listInvoices() {
	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data;
}

export async function GET() {

  try {
  	return Response.json(await listInvoices());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
