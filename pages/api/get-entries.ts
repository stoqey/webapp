import { NextApiHandler } from "next";
import { query } from "../../lib/db";

const handler: NextApiHandler = async (_, res) => {
  try {
    const { rows } = await query(`
      SELECT * FROM stq
      WHERE _type="User"
      LIMIT 10
  `);

    console.log("entries are", rows);

    return res.json(rows);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
