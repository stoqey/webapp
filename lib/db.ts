import { startCouchbase, query } from '@stoqey/serverless-couchbase';
import get from 'lodash/get';

const connectionString = get(
  process.env,
  "COUCHBASE_URL",
  "couchbase://localhost"
);
const bucketName = get(process.env, "COUCHBASE_BUCKET", "stq");
const username = get(process.env, "COUCHBASE_USERNAME", "admin");
const password = get(process.env, "COUCHBASE_PASSWORD", "123456");


/**
 * Start Couchbase from here
 */
startCouchbase({
    connectionString,
    bucketName,
    username,
    password,
});

export { query }; 

