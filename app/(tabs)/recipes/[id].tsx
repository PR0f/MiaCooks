import { View, StyleSheet, ScrollView, FlatList, TextInput, Image, TouchableOpacity, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { ReactNode, useState } from 'react'
import { Appbar, Avatar, Button, Card, DefaultTheme, Divider, Text } from 'react-native-paper';
import PagerView, { PagerViewOnPageSelectedEvent, usePagerView } from 'react-native-pager-view';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import ProgressBar from '@/components/ProgressBar';
import ParallaxScrollView from '@/components/ParallaxScrollView';



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
                    color: 'rgb(255, 152, 0)',
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
                    <MaterialIcons size={26} name="share" color={'rgb(255, 152, 0)'} style={{ flex: 1 }} />
                    <MaterialIcons size={26} name="shopping-cart" color={'rgb(255, 152, 0)'} style={{ flex: 1 }} />
                    <MaterialIcons size={26} name="favorite" color={'rgb(255, 152, 0)'} style={{ flex: 1 }} />
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
            <View>
                <ProgressBar page={viewPage} style={{ zIndex: 10, }}
                    setPage={(_page: number) => { setViewPage(_page), pagerView.ref.current?.setPage(_page) }} tabs={[
                        {

                            pageNo: 0,

                        },
                        {

                            pageNo: 1,

                        },
                        {

                            pageNo: 2,

                        },
                        {

                            pageNo: 3,

                        },
                        {

                            pageNo: 4,

                        },
                        {

                            pageNo: 5,

                        },

                    ]} />
            </View>
            <pagerView.AnimatedPagerView initialPage={viewPage} style={{ height: '100%' }} ref={pagerView.ref}
                onPageSelected={(e: PagerViewOnPageSelectedEvent) => { setViewPage(e.nativeEvent.position) }}
            >
                <View key="1">
                    <ParallaxScrollView

                        headerImage={
                            <Image
                                style={[styles.logo, {

                                    height: 200,
                                    width: 700
                                }]}
                                source={require('../../../assets/images/mockup/67740871-v-720x720.jpg')}
                            />
                        }>
                        <Text style={[{ color: 'rgb(255, 255, 255)', fontSize: 22 }]}>Makaron z twarogiem</Text>
                        <Text style={[{ color: 'rgb(255, 255, 255)', fontSize: 20 }]}>Składniki</Text>
                        <View style={{
                            backgroundColor: 'rgb(255, 255, 255)',
                            borderRadius: 20,
                            borderCurve: 'continuous',
                            padding: 3,
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            alignSelf: 'center',
                            flexDirection: 'row',

                            width: '100%'
                        }}>
                            <Image
                                style={[{

                                    height: 70,
                                    width: 70
                                }]}
                                source={require('../../../assets/images/mockup/ilustracja-tagliatelle-maksta-cartoon-vector-kreskówka-z-włoski-sos-surowe-gotowane-gniazdo-makaron-food-250913549.webp')}>

                            </Image>
                            <Text>makaron suchy np. świderki</Text>
                            <Text>300 g</Text>
                        </View>

                        <View style={{
                            backgroundColor: 'rgb(255, 255, 255)',
                            borderRadius: 20,
                            borderCurve: 'continuous',
                            padding: 3,
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            alignSelf: 'center',
                            flexDirection: 'row',

                            width: '100%'
                        }}>
                            <Image
                                style={[{

                                    height: 70,
                                    width: 70
                                }]}
                                source={require('../../../assets/images/mockup/ilustracja-tagliatelle-maksta-cartoon-vector-kreskówka-z-włoski-sos-surowe-gotowane-gniazdo-makaron-food-250913549.webp')}>

                            </Image>
                            <Text>twaróg np. chudy</Text>
                            <Text>250 g</Text>
                        </View>

                    </ParallaxScrollView>
                </View>
                <View key="2">
                    <ParallaxScrollView

                        headerImage={
                            <Image
                                style={[styles.logo, {

                                    height: 700,
                                    width: 700
                                }]}
                                source={require('../../../assets/images/mockup/67740871-v-720x720.jpg')}
                            />
                        }>
                        <Text style={[{ color: 'rgb(255, 255, 255)', fontSize: 22 }]}>Makaron z twarogiem</Text>
                        <Text style={[{ color: 'rgb(255, 255, 255)', fontSize: 16 }]}>Makaron z twarogiem na słono jest daniem, które można modyfikować na wiele sposobów. Możesz tu użyć dowolnego makaronu, np. spaghetti, czy też penne lub tagliatelle. Jeśli zaś chodzi o dodatki, to olej z powodzeniem zastąpisz boczkiem lub słoniną pokrojoną w małą kosteczkę. Cebulę można pominąć lub dodać do niej jeszcze ulubioną kiełbasę. Po szczegóły zapraszam jednak do przepisu poniżej.</Text>
                    </ParallaxScrollView>
                </View>
                <View key="3">
                    <ParallaxScrollView

                        headerImage={
                            <Image
                                style={[styles.logo, {

                                    height: 700,
                                    width: 700
                                }]}
                                source={require('../../../assets/images/mockup/67740893-v-1080x1080.jpg')}
                            />
                        }>
                        <Text style={[{ color: 'rgb(255, 255, 255)', fontSize: 22 }]}>Makaron z twarogiem</Text>
                        <Text style={[{ color: 'rgb(255, 255, 255)', fontSize: 16 }]}>Makaron z twarogiem i cebulką to pyszne, błyskawiczne i proste do zrobienia danie, które przez wielu moich Czytelników może być kojarzone z dzieciństwem. To bardzo elastyczny przepis, o czym przekonacie się czytając jego treść.</Text>
                    </ParallaxScrollView>
                </View>
                <View key="4">
                    <ParallaxScrollView

                        headerImage={
                            <Image
                                style={[styles.logo, {

                                    height: 700,
                                    width: 700
                                }]}
                                source={require('../../../assets/images/mockup/67740880-v-1080x1080.jpg')}
                            />
                        }>
                        <Text style={[{ color: 'rgb(255, 255, 255)', fontSize: 22 }]}>Krok 1: Podsmaż cebulkę</Text>
                        <Text style={[{ color: 'rgb(255, 255, 255)', fontSize: 16 }]}>Nagrzej większą patelnię z grubym dnem. Wylej na nią około 70 ml oleju roślinnego do smażenia i wyłóż obrane i drobno posiekane cebule (300 g  - najlepiej cukrowe). Cebulę smaż na takiej mocy palnika, by najpierw się zeszkliła, potem zaś lekko zarumieniła. U mnie trwało to około 15 minut. Pod koniec dodaj garść świeżo siekanego szczypiorku (można go pominąć) oraz sól (jeśli planujesz dodawać słony boczek, to uważaj z jej ilością).

                            Porady: Cześć lub całość oleju można zastąpić pokrojoną w drobną kostkę słoniną lub ładnym podgardlem (powstaną Ci pyszne skwarki) albo też boczkiem (polecam surowy wędzony). Pod koniec można tez dołożyć kawałek pokrojonej w półplasterki kiełbasy. </Text>
                    </ParallaxScrollView>
                </View>
                <View key="5">
                    <ParallaxScrollView

                        headerImage={
                            <Image
                                style={[styles.logo, {

                                    height: 700,
                                    width: 700
                                }]}
                                source={require('../../../assets/images/mockup/67740932-v-1080x1506.jpg')}
                            />
                        }>
                        <Text style={[{ color: 'rgb(255, 255, 255)', fontSize: 22 }]}>Krok 2: Ugotuj makaron</Text>
                        <Text style={[{ color: 'rgb(255, 255, 255)', fontSize: 16 }]}>W trakcie smażenia cebuli ugotuj makaron. Wybrałam makaron pszenny świderki, ale możesz też sięgnąć po makaron spaghetti, tagliatelle, czy też w kształcie kokardek, muszelek, rurek czy piórek. Do garnka wlej wodę i zagotuj. Na ugotowanie 300 gramów suchego makaronu potrzebujesz 3 l wody. Wodę posól dopiero, gdy zacznie się gotować. Do wrzątku wsyp płaską łyżeczkę soli. W garnku umieść makaron i gotuj al dente według zaleceń z opakowania. W trakcie gotowania zamieszaj makaron. Ugotowany makaron przełóż na durszlak w zlewie a potem do miski. Tym razem wyszło mi około 720 gramów ugotowanego makaronu.

                            Porada: Makaron pszenny można śmiało wymienić na makaron pełnoziarnisty pszenny lub pszenny orkiszowy albo gryczany. </Text>

                        <Text style={[{ color: 'rgb(236, 181, 0)', fontSize: 30 }]}>
                            XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                            XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                            XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                            XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                            XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                            XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                            XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                        </Text>
                    </ParallaxScrollView>
                </View>
                <View key="6">
                    <ParallaxScrollView

                        headerImage={
                            <Image
                                style={[styles.logo, {

                                    height: 700,
                                    width: 700
                                }]}
                                source={require('../../../assets/images/mockup/67740871-v-720x720.jpg')}
                            />
                        }>
                        <Text style={[{ color: 'rgb(255, 255, 255)', fontSize: 22 }]}>Krok 3: Całość podawaj z twarogiem</Text>
                        <Text style={[{ color: 'rgb(255, 255, 255)', fontSize: 16 }]}>Na ugotowany makaron wyłóż całą zawartość patelni, a następnie pokruszony w dłoniach twaróg (u mnie chudy, ale może być też tłustszy lub twaróg typu krajanka). Dopiero gotowe danie oprósz świeżo mielonym pieprzem i podawaj. </Text>
                    </ParallaxScrollView>
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
        color: 'rgb(117, 117, 117)',
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