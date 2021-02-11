import React from 'react';
import _ from 'lodash';
import  { useRouter } from 'next/router';
import { GET_ME } from "@stoqey/client-graphql";
import { useApolloClient } from "@apollo/client";

import includes from 'lodash/includes';
import AsyncStorageDB from '@/lib/AsyncStorageDB';

/**
 * Currency subscription
 * @param props 
 */
export const AuthChecker = () => {
    const router = useRouter();
    const client = useApolloClient();

    console.log(router.pathname)
    React.useEffect(() => {

        const logout = async () => {
            await AsyncStorageDB.deleteAuthItem();
            router.push('/login');
        }
        const getMe = async () => {
            try {
                const { errors } = await client.query({
                    query: GET_ME,
                    fetchPolicy: 'network-only'
                });

                for (const e of errors) {
                    const message = e.message;
                    if (includes(message, 'not authenticated')) {
                        await logout();
                        break;
                    }
                }
            }
            catch (error) {
                const message = error && error.message;
                if (includes(message, 'not authenticated')) {
                    await logout();
                }
            }

        }

        if(!['/login', '/404'].includes(router.pathname)){
            getMe();
        }
    }, []);

    return <div id="auth-checker"></div>
}

export default AuthChecker;