import React, { useState } from 'react';
import ConfirmModal, { ModalActions } from '@/components/Confirm.modal';

interface State {
    hideModal: boolean;
}

interface Props {
    onChangeMethod: () => void;
}

export const PaymentMethodEditor = () => {
    const [] = useState();
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