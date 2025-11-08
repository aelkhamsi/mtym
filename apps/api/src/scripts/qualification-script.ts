import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path'

dotenv.config({ path: join(__dirname, '../../.env') });

async function main() {
  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  })
  await dataSource.initialize();

  try {
    const result = await dataSource.query(`
      UPDATE users 
      SET qualified = true 
      WHERE id IN (
        2, 17,369,440,1231,733,734,1035,919,1240,1337,160,301,744,957,35,452,469,475,650,85,1239,
        670,671,672,967,583,664,930,1098,44,206,254,328,341,1281,1426,1510,329,337,370,842,48,
        126,176,250,727,119,233,599,682,108,130,327,368,438,707,903,1146,948,1247,1251,1258,
        86,365,663,633,642,912,1138,1022,1264,1389,182,193,772,917,1076,33,37,190,362,406,513,
        868,954,955,13,351,843,966,38,178,441,989,1164,1280,1291,394,823,1013,1020,19,162,638,
        729,793,135,960,1358,14,89,103,271,790,294,322,325,455,16,40,1027,1073,26,94,146,639,
        698,58,433,537,543,931,152,198,1055,1062,1412,21,231,264,404,598,27,263,1094,308,521,
        679,786,1089,78,105,281,405,921,179,350,447,742,1068,67,737,1056,750,1144,1145,1200,
        111,480,1083,1100,1307,70,158,496,550,125,289,461,481,731,23,122,888,928,995,575,1085,
        1159,1305
      );
    `);
    console.log('✅ Query executed successfully:', result);
  } catch (err) {
    console.error('❌ Query failed:', err);
  } finally {
    await dataSource.destroy();
  }
}

main();