import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';
import { View, StyleSheet, Modal, Pressable, Text } from 'react-native';


import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

type Props = {
    visible: boolean,
    onShow: Function,
    onDismiss: Function
}

const MyMenu = ({ visible, onShow, onDismiss }: Props) => {



    return (
        <View>
            <Text>Hello world!</Text>
            <Menu>
                <MenuTrigger text='Select action' />
                <MenuOptions>
                    <MenuOption onSelect={() => alert(`Save`)} text='Save' />
                    <MenuOption onSelect={() => alert(`Delete`)} >
                        <Text style={{ color: 'red' }}>Delete</Text>
                    </MenuOption>
                    <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
                </MenuOptions>
            </Menu>
        </View>
    )


};

const styles = StyleSheet.create({


    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

});

export default MyMenu;