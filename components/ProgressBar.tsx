/* eslint-disable react-native/no-inline-styles */
import React, { FC } from 'react';
import {
    ColorValue,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import type { ProgressiveBarProps } from '../constants/typings';


type MyTab = {
    title: any;
    pageNo: number;
    onPress?: Function;
}

const tab = (
    currentPage: number,
    tab: MyTab,
    setPage: Function | undefined,
) => {


    const isTab =  currentPage >= tab.pageNo

    return (<View key={tab.pageNo.toString()}
        style={[

            {
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            },
        ]}>


        <TouchableOpacity

            onPress={() =>
                tab?.onPress
                    ? tab.onPress(tab.pageNo)
                    : setPage
                        ? setPage(tab.pageNo)
                        : null
            }

            style={[styles.label]}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                    style={[
                        styles.circle,
                        {
                            backgroundColor: isTab
                                ? finishedBackgroundColor
                                : inProgressBackgroundColor,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 50,
                        },
                    ]}
                >
                    <Text style={[styles.stepNoText,
                    {
                        color: isTab
                            ? inProgressBackgroundColor
                            : finishedBackgroundColor,
                    }
                    ]}>{tab.pageNo + 1}</Text>
                </View>
            </View>


            <View style={styles.label}>
                <Text
                    style={[
                        {
                            fontWeight: 'bold',
                            color: finishedBackgroundColor
                                ? finishedBackgroundColor
                                : inProgressBackgroundColor,
                            textAlign: 'center',
                        },
                    ]}
                >
                    {tab.title}
                </Text>
            </View>
        </TouchableOpacity>
    </View>
    )
}

const line = () => {

    return (
        <View
            style={[
                styles.line,
                {
                    backgroundColor: finishedBackgroundColor
                        ? finishedBackgroundColor
                        : inProgressBackgroundColor,
                },
            ]}
        />
    )
}

const placeholder = () => {

    return (
        <View
            style={styles.line}
        />
    )
}

const finishedBackgroundColor = 'rgb(255, 136, 0)'
const inProgressBackgroundColor = 'rgb(255, 255, 255)'

const ProgressBar: FC<ProgressiveBarProps> = ({
    page = 0,
    setPage,
    tabs,
}) => {
    

    let shiftedPage = page;
    if (page <= 0) {
        shiftedPage = page + 1
    }
    else if (page >= tabs.length - 1) {
        shiftedPage = page - 1
    }


    const prevLine = shiftedPage > 0 ? line() : null
    const nextLine = shiftedPage < tabs.length - 1 ? line() : null

    const prevTab = shiftedPage > 0 ? tab(page, tabs[shiftedPage - 1], setPage) : null
    const nextTab = shiftedPage < tabs.length - 1 ? tab(page, tabs[shiftedPage + 1], setPage) : null

    const startLine = shiftedPage > 1 ? line() : placeholder()
    const endLine = shiftedPage < tabs.length - 2 ? line( ) : placeholder()



    return (
        <View
            style={[
                styles.container,
                {
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
            ]}
        >

            {
                [
                    startLine,
                    prevTab,
                    prevLine,
                    tab(page, tabs[shiftedPage], setPage),
                    nextLine,
                    nextTab,
                    endLine
                ]
            }


        </View>
    )

};

export default ProgressBar;

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height / 10,

        alignSelf: 'center',
        flexDirection: 'row',

        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    circle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: 56,
        height: 56,
    },
    stepNoText: { color: 'white', fontWeight: 'bold', fontSize: 22 },
    label: { justifyContent: 'center', alignItems: 'center' },
    line: {
        height: 3,
        width: 40,
        marginHorizontal: 10,
    },
});