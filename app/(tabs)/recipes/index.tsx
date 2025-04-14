import { View, StyleSheet, ScrollView, FlatList, TextInput, Image, TouchableOpacity, Pressable, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { ReactNode, useRef, useState } from 'react'
import { Appbar, Avatar, Button, Card, DefaultTheme, Divider, PaperProvider, Text } from 'react-native-paper';
import PagerView from 'react-native-pager-view';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import MyMenu from '@/components/Menu';
import { MenuOption, MenuOptions, MenuProvider, MenuTrigger, Menu } from 'react-native-popup-menu';



const account = () => {

  const [isRefresing, setRefresing] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [isChipActivated, setChipActivated] = useState<boolean>(false);



  type ItemData = {
    id: string;
    title: string;
    picId: number;
    index: number;
    modal: boolean;
  };

  const Chip = (activate: boolean) => {

    if (activate) {

      return ["Icon", "Meat", "Breakfast", "Spicy", "Hot",].map((index) => (
        <View key={index} style={{

          padding: 5
        }}
        >
          <View style={{
            backgroundColor: 'rgb(255, 152, 0)',
            borderRadius: 25,
            borderCurve: 'continuous',
            padding: 13,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: 'rgb(255, 255, 255)',
            borderStyle: 'solid',
            borderWidth: 3,
          }}>
            <Text style={{ flex: 1, color: "rgb(255, 255, 255)" }} variant="labelMedium">{index}</Text>
          </View>
        </View >
      ))
    }
  }

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

        <MaterialIcons size={28} name="tune" color={'rgb(255, 152, 0)'} style={{ padding: 10 }} onPress={() => setChipActivated(!isChipActivated)} />

      </View>
      <ScrollView horizontal={true} >

        {Chip(isChipActivated)}

      </ScrollView>
    </View >
  )

  const MyImage = (props: { picId: number; }) => (
    <View style={[{




      paddingTop: 8,
      paddingBottom: 8,

    }]}>
      <View style={{
        boxShadow: '0 3 5 2 rgba(0, 0, 0, 0.5)',
        borderRadius: 25,
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


  const Item = (item: ItemData) => {




    return (



      <Menu style={{
        backgroundColor: 'white',
        boxShadow: '0 3 5 1 rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
        borderCurve: 'continuous',
        marginLeft: 20,
        marginRight: 20
      }}>
        <MenuTrigger triggerOnLongPress={true} onAlternativeAction={() => {
          console.log(item.title)
          router.push({ pathname: '/recipes/[id]', params: { id: item.id } })

        }}
          style={{
            flexDirection: 'row', paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 5,
            paddingBottom: 5,
            height: 'auto'
          }}
        >


          <MyImage picId={item.picId}></MyImage>


          <View style={{
            width: '90%',
            flexDirection: 'column',

            justifyContent: 'space-between',
            paddingTop: 10,
            paddingLeft: 20,
            paddingRight: 50,

            paddingBottom: 10,


          }}>

            <View>

              <Text style={[styles.cardText,]} variant="titleLarge">{item.title}</Text>

              <View style={{
                padding: 3,

              }}>



                <View style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  paddingRight: 50,
                  columnGap: 30,
                  rowGap: 5
                }}>

                  <View style={{
                    flexDirection: 'row',
                  }}>
                    <MaterialIcons size={26} name="schedule" color={"rgb(140, 140, 140)"} />
                    <Text style={[{ color: "rgb(140, 140, 140)" }]} variant="bodyMedium">30min</Text>
                  </View>

                  <View style={{
                    flexDirection: 'row',

                  }}>
                    <MaterialIcons size={26} name="pages" color={"rgb(140, 140, 140)"} />
                    <Text style={[{ color: "rgb(140, 140, 140)" }]} variant="bodyMedium">6</Text>
                  </View>

                  <View style={{
                    flexDirection: 'row',

                  }}>
                    <MaterialIcons size={26} name="restaurant" color={"rgb(140, 140, 140)"} />
                    <Text style={[{ color: "rgb(140, 140, 140)" }]} variant="bodyMedium">195 kcal</Text>
                  </View>

                </View>


              </View>
            </View>

            <View style={{
              flexDirection: 'row',
              alignContent: 'space-evenly',


            }}>
              {/*
          <MaterialIcons size={26} name="share" color={'rgb(33, 33, 33)'} style={{ flex: 1 }} />
          <MaterialIcons size={26} name="shopping-cart" color={'rgb(33, 33, 33)'} style={{ flex: 1 }} />
          */}

            </View>

          </View>


        </MenuTrigger>
        <MenuOptions optionsContainerStyle={{
          margin: '25%'
        }}
          customStyles={{
            optionsContainer: {
              borderRadius: 8,
              borderCurve: 'continuous',
              boxShadow: '0 3 5 3 rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',

            },
            optionsWrapper: {
              flexDirection: 'row',
              alignContent: 'space-between',
              padding: 10

            }
          }}
        >
          <MenuOption onSelect={() => alert(`Save`)} style={{
            flex: 1, alignItems: 'center',
          }} >
            <MaterialIcons size={44} name="share" color={'rgb(33, 33, 33)'} style={{ flex: 1 }} />
          </MenuOption>
          <MenuOption onSelect={() => alert(`Delete`)} style={{
            flex: 1, alignItems: 'center',
          }}>
            <MaterialIcons size={44} name="shopping-cart" color={'rgb(33, 33, 33)'} style={{ flex: 1 }} />
          </MenuOption>

        </MenuOptions>
      </Menu>

    )
  }




  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      picId: 292
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      picId: 312
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      picId: 488
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d73',
      title: '4 Item',
      picId: 493
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d74',
      title: '5 Item',
      picId: 835
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d75',
      title: '6 Item',
      picId: 1080
    },
  ];




  return (
    <MenuProvider>
      <SafeAreaView style={styles.container}>
        <View style={{
          position: 'absolute',
          top: 0,
          height: '30%',
          width: '100%',
          backgroundColor: 'rgb(255, 152, 0)',
          borderRadius: 20,
          borderCurve: 'continuous',
        }}></View>
        <FlatList data={DATA}
          ListHeaderComponent={Header()}
          stickyHeaderIndices={[0]}
          renderItem={({ item, index }) => <Item title={item.title} id={item.id} picId={item.picId} index={index} modal={false} />}

          ItemSeparatorComponent={

            (({ highlighted }) => (
              <View style={{ paddingTop: 15 }}>

              </View>
            ))
          }
          keyExtractor={item => item.id}
          onRefresh={() => {
            setRefresing(true)
            setTimeout(() => {
              setRefresing(false)
            }, 1000)
          }
          }
          refreshing={isRefresing}
          horizontal={false}
          ListFooterComponentStyle={{ paddingBottom: 110 }}
          ListFooterComponent={<View></View>}

        />

      </SafeAreaView>
    </MenuProvider>

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
  cardText: {
    color: 'rgb(255, 152, 0)',
    //textAlign: 'center',
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: 'rgb(255, 152, 0)',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 3,
    paddingTop: 10,


  },
  logo: {
    resizeMode: 'contain',
  },

  optionsContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',

    zIndex: 20,
    backgroundColor: 'black'
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },

});


export default account