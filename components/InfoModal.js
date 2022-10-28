import React, { useContext } from 'react';
import {
	Button,
	Modal,
	FormControl,
	Input,
} from "native-base";
import { LoginContext } from '../providers/LoginContext';

const InfoModal = ({ showModal, setShowModal }) => {

    const {dispatch, state} = useContext(LoginContext);
    
    return (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Información</Modal.Header>
                <Modal.Body>
                    <FormControl>
                        <FormControl.Label>Nombre</FormControl.Label>
                        <Input value={state.user.nombre} isReadOnly/>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Apellido</FormControl.Label>
                        <Input value={state.user.apellido} isReadOnly />
                    </FormControl>
                    <FormControl mt="3">
                        <FormControl.Label>Email</FormControl.Label>
                        <Input value={state.user.email} isReadOnly />
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button
                            variant="ghost"
                            colorScheme="blueGray"
                            onPress={() => {
                                setShowModal(false)
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onPress={() => {
                                setShowModal(false);
                                dispatch({type: "LOG_OUT"})
                
                            }}
                            style={{backgroundColor: '#ff0000'}}
                        >
                            Logout
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}

export default InfoModal
