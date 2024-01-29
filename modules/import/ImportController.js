import BaseController from "../../core/BaseController.js";
import readXlsxFile from "read-excel-file/node";
import pool from '../../config/db.js'


class ImportController extends BaseController {

    async load(req, res) {
        try {
            const file = req.file;
            if (!file) {
                res.status(400).send('No file uploaded');
                return;
            }

            const [columns, ...rows] = await readXlsxFile(file.path);
            console.log(1, rows)
            for (const row of rows) {
                const [region, item, units, subscribers] = row
                const insertQuery = `INSERT INTO subscribers (region, item, units, subscribers) VALUES (?, ?, ?, ?)`
                await pool.query(insertQuery, [region, +item, +units, +subscribers]);
            }
            console.log(rows)
            return res.json(rows)
        } catch (e) {
            console.log(e)
            return res.status(500).json(super.error(e))
        }
    }

    async summary(req, res) {
        try {
            const query = `SELECT region, SUM(subscribers) AS total_subscribers
                FROM subscribers
                GROUP BY region
                UNION ALL
                SELECT 'Total', SUM(subscribers) AS total_subscribers
                FROM subscribers;`

            const data = await pool.query(query);

            return res.json(super.success(data[0]))
        } catch (e) {
            console.log(e)
            return res.status(500).json(super.error(e))
        }
    }
}

export default new ImportController()