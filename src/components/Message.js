import React, { useEffect, useState } from 'react';
import {
    View,
    Text
} from 'react-native'

const Message = (props) => {
    return (
        <View style={{ alignItems: 'flex-end', paddingRight: 10, paddingBottom: 10 }}>
            <Text style={{ fontWeight: 'bold' }}> {props.data.author}: </Text>
            <View style={{ alignItems: 'flex-end', width: '70%' }}>
                <Text> {props.data.message} </Text>
            </View>
        </View>
    )
}

export default Message;