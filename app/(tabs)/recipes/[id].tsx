import { View, StyleSheet, ScrollView, FlatList, TextInput, Image, TouchableOpacity, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { ReactNode, useState } from 'react'
import { Appbar, Avatar, Button, Card, DefaultTheme, Divider, Text } from 'react-native-paper';
import PagerView, { PagerViewOnPageSelectedEvent, usePagerView } from 'react-native-pager-view';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import ProgressBar from '@/components/ProgressBar';



const dynamicRecipes = () => {

    const pagerView = usePagerView();

    const { id } = useLocalSearchParams();

    const [isRefresing, setRefresing] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const [isChipActivated, setChipActivated] = useState<boolean>(false);

    const [viewPage, setViewPage] = useState<number>(0);



    type ItemData = {
        id: string;
        title: string;
        picId: number;
        index: number
    };





    const MyImage = (props: { picId: number; }) => (
        <View style={[{




            paddingTop: 8,
            paddingBottom: 8,

        }]}>
            <View style={{
                boxShadow: '3 5 5 0 rgba(0, 0, 0, 0.5)',
                borderRadius: 8,
                borderCurve: 'continuous',

                height: 150,
                width: 150,
                overflow: 'hidden',
            }}>
                <Image
                    style={[styles.logo, {

                        height: 150,
                        width: 150
                    }]}
                    source={{ uri: `https://picsum.photos/id/${props.picId}/700/700` }}
                />
            </View>
        </View>
    )


    const Item = (item: ItemData) => (



        <Pressable style={{
            flexDirection: 'row', paddingLeft: 30,
            paddingRight: 30,
            height: 'auto'

        }}
            onPress={() => console.log(item.title)}
            android_ripple={
                {
                    color: 'rgb(255, 136, 0)',
                    borderless: false,
                    foreground: false
                }
            }
        >


            <MyImage picId={item.picId}></MyImage>

            <View style={{
                width: '90%',
                flexDirection: 'column',
                flexGrow: 1,
                justifyContent: 'space-between',
                paddingTop: 10,
                paddingLeft: 20,
                paddingRight: 50,

                paddingBottom: 10,
            }}>
                <View>

                    <Text style={[styles.cardText,]} variant="titleLarge">{item.title}</Text>

                    <View style={{
                        flexDirection: 'row',
                        alignContent: 'space-evenly',


                    }}>
                        <Text style={[{ color: 'rgb(255, 255, 255)', flex: 1 }]} variant="bodyMedium">1 hr 10 min</Text>
                        <Text style={[{ color: 'rgb(255, 255, 255)', flex: 1 }]} variant="bodyMedium">195 kcal</Text>
                    </View>

                </View>

                <View style={{
                    flexDirection: 'row',
                    alignContent: 'space-evenly',


                }}>
                    <MaterialIcons size={26} name="share" color={'rgb(255, 136, 0)'} style={{ flex: 1 }} />
                    <MaterialIcons size={26} name="shopping-cart" color={'rgb(255, 136, 0)'} style={{ flex: 1 }} />
                    <MaterialIcons size={26} name="favorite" color={'rgb(255, 136, 0)'} style={{ flex: 1 }} />
                </View>

            </View>



        </Pressable  >




    )


    /*
          <Card style={styles.card} onPress={() => console.log(item.title)}>
     
     
            <Card.Cover style={styles.cover} source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Content >
              <Text style={styles.cardText} variant="titleLarge">{item.title}</Text>
              <Text style={[styles.cardText, { color: 'rgb(255, 255, 255)' }]} variant="bodyMedium">asdsad</Text>
            </Card.Content>
     
          </Card>
          */
    /*
     
    <PagerView style={styles.container} initialPage={0}>
          </PagerView>
     
     
          <ScrollView horizontal={true}>
    */


    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
            picId: 10
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
            picId: 23
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
            picId: 22
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d73',
            title: '4 Item',
            picId: 28
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d74',
            title: '5 Item',
            picId: 35
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d75',
            title: '6 Item',
            picId: 111
        },
    ];

    const [result, setResult] = React.useState<number | undefined>();





    return (

        <SafeAreaView style={styles.container}>
            <ProgressBar page={viewPage} progressive={true}
                setPage={(_page: number) => { setViewPage(_page), pagerView.ref.current?.setPage(_page) }} tabs={[
                    {
                        title: 'Hi',
                        pageNo: 0,

                    },
                    {
                        title: 'Du',
                        pageNo: 1,

                    },
                    {
                        title: 'Di',
                        pageNo: 2,

                    },
                    {
                        title: 'Di',
                        pageNo: 3,

                    },
                    {
                        title: 'Di',
                        pageNo: 4,

                    },

                ]} />
            <pagerView.AnimatedPagerView initialPage={viewPage} style={{ height: '100%' }} ref={pagerView.ref}
                onPageSelected={(e: PagerViewOnPageSelectedEvent) => { setViewPage(e.nativeEvent.position) }}
            >
                <View key="1">
                    <Item title={'cos tam'} id={id as string} picId={0} index={0} />
                </View>
                <View key="2">
                    <Item title={'eee tam'} id={'12'} picId={2} index={0} />
                </View>
                <View key="3">
                    <Item title={'aaa tam'} id={'14'} picId={5} index={0} />
                </View>
                <View key="4">
                    <Item title={'aaa tam'} id={'15'} picId={6} index={0} />
                </View>
                <View key="5">
                    <Item title={'aaa tam'} id={'16'} picId={7} index={0} />
                </View>
            </pagerView.AnimatedPagerView>


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
        color: 'rgb(0, 0, 0)',
        //textAlign: 'center',
        fontWeight: 'bold',

    },
    header: {
        backgroundColor: 'rgb(119, 119, 119)',
        paddingLeft: 20,
        paddingRight: 20,
    },
    logo: {

        resizeMode: 'contain',

    },

});


export default dynamicRecipes