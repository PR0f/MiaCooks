import { View, StyleSheet, ScrollView, FlatList, TextInput, Image, TouchableOpacity, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { ReactNode, useState } from 'react'
import { Appbar, Avatar, Button, Card, DefaultTheme, Divider, Text } from 'react-native-paper';
import PagerView from 'react-native-pager-view';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';



const account = () => {

  const [isRefresing, setRefresing] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [isChipActivated, setChipActivated] = useState<boolean>(false);


  type ItemData = {
    id: string;
    title: string;
    picId: number;
    index: number
  };

  const Chip = (activate: boolean) => {

    if (activate) {

      return ["Icon", "Meat", "Breakfast", "Spicy", "Hot",].map((index) => (
        <View key={index} style={{

          padding: 5
        }}
        >
          <View style={{
            backgroundColor: 'rgb(255, 136, 0)',
            borderRadius: 20,
            borderCurve: 'continuous',
            padding: 18,
            justifyContent: 'center',
            alignItems: 'center',

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
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

      }}>

        <MaterialIcons size={28} name="search" color={'rgb(255, 136, 0)'} style={{ padding: 10 }} />

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

        <MaterialIcons size={28} name="tune" color={'rgb(255, 136, 0)'} style={{ padding: 10 }} onPress={() => setChipActivated(!isChipActivated)} />

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
      onPress={
        () => {
          console.log(item.title)
          router.push({ pathname: '/recipes/[id]', params: { id: item.id } })
          //router.navigate('/',  { id: 'bacon' } )
        }
      }
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

        justifyContent: 'space-between',
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 50,

        paddingBottom: 10,
      }}>
        <View>

          <Text style={[styles.cardText,]} variant="titleLarge">{item.title}</Text>

          <View style={{
            padding: 3
          }}>



            <View style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              alignSelf: 'flex-start',
              paddingTop: 3
            }}>

              <View style={{
                flexDirection: 'row',
                flex: 1
              }}>
                <MaterialIcons size={26} name="schedule" color={'rgb(255, 255, 255)'} />
                <Text style={[{ color: 'rgb(255, 255, 255)' }]} variant="bodyMedium">30min</Text>
              </View>

              <View style={{
                flexDirection: 'row',
                flex: 1
              }}>
                <MaterialIcons size={26} name="restaurant" color={'rgb(255, 255, 255)'} />
                <Text style={[{ color: 'rgb(255, 255, 255)' }]} variant="bodyMedium">195 kcal</Text>
              </View>

            </View>

            <View style={{
              flexDirection: 'row',
              paddingTop: 6
              
            }}>
              <MaterialIcons size={26} name="pages" color={'rgb(255, 255, 255)'} />
              <Text style={[{ color: 'rgb(255, 255, 255)' }]} variant="bodyMedium">6</Text>
            </View>
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

    <SafeAreaView style={styles.container}>


      <FlatList data={DATA}
        ListHeaderComponent={Header()}
        stickyHeaderIndices={[0]}
        renderItem={({ item, index }) => <Item title={item.title} id={item.id} picId={item.picId} index={index} />}

        ItemSeparatorComponent={

          (({ highlighted }) => (
            <View style={{ paddingLeft: 20, paddingRight: 20 }}>
              <Divider />
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
        ListFooterComponentStyle={{ paddingBottom: 120 }}
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
  cardText: {
    color: 'rgb(255, 255, 255)',
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


export default account