import React, { useState, useEffect } from 'react';
import { toaster } from 'baseui/toast';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import Loader from '../../components/UiElements/Loader/Loader';
import Toaster from '../../components/UiElements/Toaster/Toaster';
import AddEditModal from './AddEdit';
import UpdateBalanceModal from './UpdateBalance';
import { useApolloClient } from '@apollo/client';
import { GET_ALL_USERS, UserType } from '@stoqey/client-graphql';
import { isEmpty } from 'lodash';
import UserTable from '@/components/admin/UserTable';

const TITLE = 'Stoqey Admin';
const SUB_TITLE = 'Stoqey';
const AdminUserCRUD = () => {

  let toastKey;
  const [users, setUsers] = useState<UserType[]>([]);
  const [balanceVisible, setBalanceVisible] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [editState, setEditState] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [user, setUser] = useState<UserType>({
    id: null,
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    balance: 0,
    currency: "USD"
  });

  const client = useApolloClient();


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const { data }: { data: { users: UserType[] } } = await client.query({
        query: GET_ALL_USERS,
        variables: {}
      });


      if (!isEmpty(data && data.users)) {
        setUsers(data.users);
      }

      setLoading(false);
    } catch (error) {
      toastKey = toaster.negative(<>{'Data Fetching Failed!'}</>, {
        autoHideDuration: 1000,
      });
      setLoading(false);
    }
  };

  const handleAddArticle = () => {
    setVisible(true);
    setEditState(false);
    setUser({
      id: null,
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      balance: 0,
      currency: "USD"
    });
  };

  const handleModdalClose = () => {
    setVisible(false);
    setUser({
      id: null,
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      balance: 0,
      currency: "USD"
    });
  };

  const handleBalanceModdalClose = () => {
    setBalanceVisible(false);
    setUser({
      id: null,
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      balance: 0,
      currency: "USD"
    });
  };

  // const handleDeleteUser = async (id: string) => {
  //   if (id) {
  //     try {
  //       const deleted = await deleteDocument('articles', id);
  //       toastKey = toaster.info(<>{'Deleted Successfully!'}</>, {
  //         autoHideDuration: 2000,
  //       });
  //       if (deleted) {
  //         fetchData();
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       toastKey = toaster.info(<>{'Deletion Failed!'}</>, {
  //         autoHideDuration: 2000,
  //       });
  //     }
  //   }
  // };

  const handleUpdateUser = async (item: any) => {
    setVisible(true);
    setEditState(true);
    setUser({
      ...user,
      ...item,
    });
  };

  const handleUpdateUserBalance = async (item: any) => {
    setBalanceVisible(true);
    setEditState(true);
    setUser({
      ...user,
      ...item,
    });
  };

  const handleOnChange = (name: string) => (e: any) => {
    let value: any;
    if (name === 'status') {
      value = e.value;
    } else {
      value = e.target.value;
    }

    setUser({
      ...user,
      [name]: value,
    });
  };

  const checkError = () => {
    let errorStatus = false;
    const { firstname, lastname, email, phone } = user;
    if (!firstname || !email || !phone || !lastname) {
      errorStatus = true;
    } else {
      errorStatus = false;
    }
    setError(errorStatus);
    return errorStatus;
  };

  const handleOnSubmit = async () => {
    const errorStatus = checkError();
    const data = user;
    let id = null;

    if (user.id && !errorStatus) {
      try {
        // TODO update user
        // id = await updateDocument('articles', data);
        toastKey = toaster.info(<>{'Update Successful!'}</>, {
          autoHideDuration: 2000,
        });
      } catch (error) {
        toastKey = toaster.negative(<>{'Update Failed!'}</>, {
          autoHideDuration: 2000,
        });
        console.log(error);
      }
      setVisible(false);

    } else if (!user.id && !errorStatus) {
      try {
        // TODO create user
        // id = await addDocument('articles', data);
        toastKey = toaster.info(<>{'Successful!'}</>, {
          autoHideDuration: 2000,
        });
      } catch (error) {
        toastKey = toaster.negative(<>{'Failed!'}</>, {
          autoHideDuration: 2000,
        });
        console.log(error);
      }
      setVisible(false);
    }
    if (id) {
      // refresh data from here
      fetchData();
    }
  };

  const handleUpdateBalance = (success:  boolean) => {
    if(success){
      handleBalanceModdalClose();
      fetchData();
    }
  }

  return (
    <>
      <Toaster toastKey={toastKey} />
      <Block
        paddingTop={['10px', '10px', 0]}
        overrides={{
          Block: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '40px',
            },
          },
        }}
      >
        <Block>
          <Block
            as="h3"
            overrides={{
              Block: {
                style: ({ $theme }) => {
                  return {
                    ...$theme.typography.font450,
                    color: $theme.colors.primaryA,
                    marginBottom: '10px',
                  };
                },
              },
            }}
          >
            {TITLE}
          </Block>
          <Block
            as="p"
            overrides={{
              Block: {
                style: ({ $theme }) => {
                  return {
                    ...$theme.typography.font200,
                    color: $theme.colors.contentSecondary,
                  };
                },
              },
            }}
          >
            {SUB_TITLE}
          </Block>
        </Block>
        <Block overrides={{ Block: { style: { flexShrink: 0 } } }}>
          <Button
            onClick={handleAddArticle}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => {
                  return {
                    ...$theme.typography.font250,
                  };
                },
              },
            }}
          >
            Add User
          </Button>
        </Block>
      </Block>

      <Block
        overrides={{
          Block: {
            style: {
              minHeight: '150px',
            },
          },
        }}
      >
        {loading ? (
          <Loader />
        ) : (
            <UserTable
              data={users}
              onUpdateUserBalance={handleUpdateUserBalance}
              onUpdate={() => { }}
              onDelete={() => { }}
            />
          )}
      </Block>

      <AddEditModal
        error={error}
        user={user}
        visible={visible}
        editState={editState}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        handleModdalClose={handleModdalClose}
      />

      <UpdateBalanceModal
        error={error}
        user={user}
        visible={balanceVisible}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleUpdateBalance}
        handleModdalClose={handleBalanceModdalClose}
      />


    </>
  );
};

export default AdminUserCRUD;
