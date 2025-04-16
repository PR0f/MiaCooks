import { View, StyleSheet, ScrollView, FlatList, TextInput, Image, TouchableOpacity, Pressable, SectionList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { ReactNode, useState } from 'react'
import { Appbar, Avatar, Button, Card, DefaultTheme, Divider, Text } from 'react-native-paper';
import PagerView, { PagerViewOnPageSelectedEvent, usePagerView } from 'react-native-pager-view';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import ProgressBar from '@/components/ProgressBar';
import ParallaxScrollView from '@/components/ParallaxScrollView';



const shopping = () => {

    const pagerView = usePagerView();

    const { id } = useLocalSearchParams();

    const [text, setText] = useState<string>('');
    const [expandedSections, setExpandedSections] = useState(new Set(['Sides', 'Drinks', 'Desserts']));

    const [data, setData] = useState<{ title: string; data: Array<{ id: number; title: string }>; }[]>(
        [
            {
                title: 'Del',
                data: [
                ],
            },
            {
                title: 'Main dishes',
                data: [
                    { id: 0, title: 'Pizza' },
                    { id: 1, title: 'Burger' },
                    { id: 2, title: 'Risotto' }
                ],
            },
            {
                title: 'Sides',
                data: [
                    { id: 3, title: 'French Fries' },
                    { id: 4, title: 'Onion Rings' },
                    { id: 5, title: 'Fried Shrimps' }
                ],
            },
            {
                title: 'Drinks',
                data: [
                    { id: 6, title: 'Water' },
                    { id: 7, title: 'Coke' },
                    { id: 8, title: 'Beer' }
                ],
            },
            {
                title: 'Desserts',
                data: [
                    { id: 9, title: 'Cheese Cake' },
                    { id: 10, title: 'Ice Cream' }
                ],
            },
        ]
    )

    const handleToggle = (title: string) => {
        setExpandedSections((expandedSections) => {

            const next = new Set(expandedSections);
            if (next.has(title)) {
                next.delete(title);
            } else {
                next.add(title);
            }
            return next;
        });
    };

    type ItemData = {
        id: number;
        title: string;

    };

    const Header = () => (
        <View style={styles.header}>
            <View style={{

                borderRadius: 25,
                borderCurve: 'continuous',
                backgroundColor: 'white',
                paddingTop: 8,
                paddingBottom: 8,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 3 5 2 rgba(0, 0, 0, 0.5)'

            }}>

                <MaterialIcons size={28} name="search" color={'rgb(255, 152, 0)'} style={{ padding: 10 }} />

                <TextInput
                    style={{
                        height: 40,
                        flex: 1,
                        paddingTop: 10,
                        paddingRight: 10,
                        paddingBottom: 10,
                        paddingLeft: 0,
                    }}
                    placeholder="Search"
                    onChangeText={(newText) => setText(newText)}
                    defaultValue={text}
                />

                <MaterialIcons size={28} name="tune" color={'rgb(255, 152, 0)'} style={{ padding: 10 }} onPress={() => { }} />

            </View>
            <ScrollView horizontal={true} >



            </ScrollView>
        </View >
    )

    const Item = (itemData: ItemData) => {




        return (

            <View style={{
                marginLeft: 20,
                marginRight: 20,
            }}>

                <View style={{
                    backgroundColor: 'rgb(255, 255, 255)',
                    borderRadius: 10,
                    boxShadow: '0 3 5 1 rgba(0, 0, 0, 0.5)',
                    borderCurve: 'continuous',
                    padding: 1,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    alignSelf: 'center',
                    flexDirection: 'row',

                    width: '100%'
                }}>
                    <Image
                        style={[{

                            height: 70,
                            width: 70,
                            left: 5
                        }]}
                        source={require('../../assets/images/mockup/ilustracja-tagliatelle-maksta-cartoon-vector-kreskówka-z-włoski-sos-surowe-gotowane-gniazdo-makaron-food-250913549.webp')}>

                    </Image>
                    <Text style={{ paddingLeft: 5 }}>{itemData.title}</Text>
                    <Text style={{ marginLeft: 'auto', right: 10 }}>{itemData.id} g</Text>
                    <Pressable onPress={() => {
                        const result = data.map((element) => {
                            return { ...element, data: element.data.filter(x => x.id !== itemData.id) }
                        });
                        //
                        result[0].data.push(itemData)
                        setData(result);

                    }} style={{}}>
                        <MaterialIcons size={26} style={{ right: 10 }} name="cancel" color={'rgb(255, 0, 0)'} />
                    </Pressable>
                </View>
            </View>

        )
    }


    const DATA = [
        {
            title: 'Main dishes',
            data: ['Pizza', 'Burger', 'Risotto'],
        },
        {
            title: 'Sides',
            data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
        },
        {
            title: 'Drinks',
            data: ['Water', 'Coke', 'Beer'],
        },
        {
            title: 'Desserts',
            data: ['Cheese Cake', 'Ice Cream'],
        },
    ];


    return (

        <SafeAreaView style={styles.container}>
            <View style={{
                position: 'absolute',
                top: 0,
                height: 250,
                width: '100%',
                backgroundColor: 'rgb(255, 152, 0)',
                borderRadius: 20,
                borderCurve: 'continuous',
            }}></View>
            <SectionList
                sections={data}
                extraData={expandedSections}
                ListHeaderComponent={<View>
                    <Text style={{ marginLeft: 20, color: 'rgb(0, 0, 0)', fontSize: 22 }} >Składniki</Text>
                </View>}


                renderItem={({ section: { title }, item }) => {
                    const isExpanded = expandedSections.has(title);

                    //return null if it is
                    if (!isExpanded) return null;

                    return <Item title={item.title} id={item.id} />;
                }
                }

                ItemSeparatorComponent={

                    (({ highlighted }) => (
                        <View style={{ paddingTop: 5 }}>

                        </View>
                    ))
                }
                keyExtractor={(item, index) => item.id.toString()}
                onRefresh={() => {

                }
                }
                renderSectionHeader={({ section }) => {
                    const isExpanded = expandedSections.has(section.title);

                    return section.data.length > 0 ? (
                        <Pressable onPress={() => handleToggle(section.title)} style={{
                            alignItems: 'center',
                            paddingTop: 20,
                            flexDirection: 'row',
                        }}>
                            <Text style={{ marginLeft: 20, color: 'rgb(0, 0, 0)', fontSize: 22 }}>{section.title}</Text>
                            <MaterialIcons size={26} name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                                color={'rgb(0, 0, 0)'} style={{ marginLeft: 'auto', right: 20 }}
                            />

                        </Pressable>
                    ) : null
                }}
                refreshing={false}
                horizontal={false}
                ListFooterComponentStyle={{ paddingBottom: 110 }}
                ListFooterComponent={<View></View>}

            />


        </SafeAreaView>

    )
}



const styles = StyleSheet.create({
    container: {


    },
    text: {
        fontSize: 25,
        fontWeight: '500',
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    view: {
        paddingTop: 10,

        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        color: 'white',
        overflow: 'hidden',

    },
    cover: {

    },
    card: {
        //boxShadow: '3 5 5 0 rgba(0, 0, 0, 0.5)',






        /*shadowColor: 'black',
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
        elevation: 5,*/
    },
    cardText: {
        color: 'rgb(117, 117, 117)',
        //textAlign: 'center',
        fontWeight: 'bold',

    },
    header: {
        backgroundColor: 'rgb(255, 152, 0)',
        paddingLeft: 20,
        paddingRight: 20,
    },
    logo: {

        resizeMode: 'contain',

    },

});


export default shopping