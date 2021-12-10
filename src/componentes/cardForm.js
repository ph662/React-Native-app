import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

const CardForm = (props) => {
    const { value, accessibilityLabel, onPress, index } = props.item;

    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 8,
            marginVertical: 0.5,
            flexDirection: 'row',
        }
    });

    return (
        <View style={styles.container}>
            <TextInput
                style={{ fontSize: 17, textAlign: 'left', flex: 1 }}
                onChangeText={(value) => onPress(value, index)}
                accessibilityLabel={accessibilityLabel}
                keyboardType="numeric"
            />
        </View>
    );
}

export default CardForm;