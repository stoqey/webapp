import { startCouchbase, query } from '@stoqey/serverless-couchbase'

/**
 * Start Couchbase from here
 */
startCouchbase({
    connectionString: 'couchbase://localhost',
    bucketName: 'stq',
    username: 'admin',
    password: '123456',
});

export { query }; 

