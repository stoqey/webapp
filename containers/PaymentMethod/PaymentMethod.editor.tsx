import React from 'react';
import ConfirmModal, { ModalActions } from '@/components/Confirm.modal';


export const PaymentMethodEditor = () => {
    return (<>
        <ConfirmModal
            hide={hideModal}
            title={dialogTitle}
            description={dialogMessage}
            show={dialogShow}
            actions={dialogActions}
            status={dialogType}
        />
    </>)
}