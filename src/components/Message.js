import React, { useEffect, useState } from 'react';
import {
    View,
    Text
} from 'react-native'

import auth from '@react-native-firebase/auth';

const Message = (props) => {

    // console.log(props.data.authorId);
    // console.log(props.data);
    // console.log(props.loggedUser);
    

    return (
        props.data.authorId === props.loggedUserId ?
            <View style={{ alignSelf: 'flex-end', paddingRight: 10, paddingBottom: 10 }}>
                <Text style={{ fontWeight: 'bold' }}> {props.data.author}: </Text>
                <View style={{ alignSelf: 'flex-end', width: '70%' }}>
                    <Text> {props.data.message} </Text>
                </View>
            </View> :
            <View style={{ paddingRight: 10, paddingBottom: 10 }}>
                <Text style={{ fontWeight: 'bold' }}> {props.data.author}: </Text>
                <View style={{ width: '70%' }}>
                    <Text> {props.data.message} </Text>
                </View>
            </View>
    )
}

export default Message;