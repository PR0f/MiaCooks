/* eslint-disable react-native/no-inline-styles */
import React, { FC } from 'react';
import {
    ColorValue,
    Dimensions,
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';





const tab = (
    currentPage: number,
    tab: Tab,
    setPage: Function | undefined,
) => {


    const isTab = currentPage >= tab.pageNo

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


            {
            /* Text under circle
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
                    {tab?.title}
                </Text>
            </View>

                */}
        </TouchableOpacity>
    </View>
    )
}

const line = (width: number) => {

    return (
        <View
            style={[
                styles.line,
                {
                    backgroundColor: inProgressBackgroundColor
                        ? finishedBackgroundColor
                        : inProgressBackgroundColor,
                    width: width 
                },
            ]}
        />
    )
}

const placeholder = (width: number) => {

    return (
        <View
            style={[
                styles.line,
                { width: width }
            ]
            }
        />
    )
}

const finishedBackgroundColor = 'rgb(255, 255, 255)'
const inProgressBackgroundColor = 'rgb(255, 152, 0)'

const ProgressBar: FC<ProgressiveBarProps> = ({
    page = 0,
    setPage,
    tabs,
    style,
}) => {


    let shiftedPage = page;
    if (page <= 0) {
        shiftedPage = page + 1
    }
    else if (page >= tabs.length - 1) {
        shiftedPage = page - 1
    }


    const prevLine = shiftedPage > 0 ? line(50) : null
    const nextLine = shiftedPage < tabs.length - 1 ? line(50) : null

    const prevTab = shiftedPage > 0 ? tab(page, tabs[shiftedPage - 1], setPage) : null
    const nextTab = shiftedPage < tabs.length - 1 ? tab(page, tabs[shiftedPage + 1], setPage) : null

    const startLine = shiftedPage > 1 ? line(30) : placeholder(30)
    const endLine = shiftedPage < tabs.length - 2 ? line(30) : placeholder(30)



    return (
        <View
            style={[
                style,
                styles.container,
            ]}
        >

            {startLine}
            {prevTab}
            {prevLine}
            {tab(page, tabs[shiftedPage], setPage)}
            {nextLine}
            {nextTab}
            {endLine}

            {/*
                [
                    startLine,
                    prevTab,
                    prevLine,
                    tab(page, tabs[shiftedPage], setPage),
                    nextLine,
                    nextTab,
                    endLine
                ]
                    */
            }


        </View>
    )

};

export default ProgressBar;

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: 48 + 30,

        alignSelf: 'center',
        flexDirection: 'row',

        alignItems: 'center',
        justifyContent: 'center',

    },
    circle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 3,
        width: 48,
        height: 48,
        borderColor: 'rgb(255, 255, 255)',
        borderStyle: 'solid',
    },
    stepNoText: { color: 'white', fontWeight: 'bold', fontSize: 22 },
    label: { justifyContent: 'center', alignItems: 'center' },
    line: {
        height: 3,
        width: 40,
        marginHorizontal: 0,

    },
});

interface Tab {
    title?: string;
    pageNo: number;
    onPress?: Function;
}


export interface ProgressiveBarProps {
    page: number;
    setPage?: Function;
    tabs: Tab[];

    titleProps?: object;
    style?: StyleProp<ViewStyle> | undefined;
}