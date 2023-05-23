import {StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
const Categories = ({categories, onPress, ...props }) => {

    return (
        <View style={styles.container} {...props}>
            {categories.map(item => (
                <TouchableOpacity key={item.id} style={styles.item}
                                  onPress={() => {onPress(item.text)}}>
                    <Image source={item.image} style={styles.image}/>
                    <Text style={styles.text}>{item.text}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    item: {
        width: "21%",
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor: "yellow",
    },
    image: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
    },
    text: {
        color: "white",
        fontSize: 15,
    }
})

export default Categories