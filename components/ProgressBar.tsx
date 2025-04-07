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
    progressStyle: any,
    setPage: Function | undefined,
    titleProps: any
) => {


    return (<View key={tab.pageNo.toString()}
        style={[

            {
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            },
        ]}>



        {/* step circle */}
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
                        progressStyle.circle,
                        {
                            backgroundColor: tab.pageNo == currentPage
                                ? finishedBackgroundColor
                                : inProgressBackgroundColor,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 50,
                        },
                    ]}
                >
                    <Text style={[progressStyle.stepNumber,
                    {
                        color: tab.pageNo == currentPage
                            ? inProgressBackgroundColor
                            : finishedBackgroundColor,
                    }
                    ]}>{tab.pageNo + 1}</Text>
                </View>
            </View>

            {/* title */}
            <View style={styles.label}>
                <Text
                    {...titleProps}
                    style={[
                        progressStyle.stepTitleStyle,
                        {
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

const line = (progressStyle: any) => {

    return (
        <View
            style={[
                progressStyle.lineStyle,
                {
                    //backgroundColor: inProgressBackgroundColor
                    backgroundColor: finishedBackgroundColor
                        ? finishedBackgroundColor
                        : inProgressBackgroundColor,
                },
            ]}
        />
    )
}

const placeholder = (progressStyle: any) => {

    return (
        <View
            style={[
                progressStyle.lineStyle,

            ]}
        />
    )
}

const finishedBackgroundColor = 'rgb(255, 136, 0)'
const inProgressBackgroundColor = 'rgb(255, 255, 255)'

const ProgressBar: FC<ProgressiveBarProps> = ({
    page = 1,
    setPage,
    tabs,
    progressive = true,

    circleStyle,
    stepNumberStyle,
    stepTitleStyle,
    lineStyle,
    titleProps,
    containerStyle,
}) => {



    const progressStyle = StyleSheet.flatten([
        {
            containerStyle: {
                width: containerStyle?.width
                    ? containerStyle.width
                    : styles.container.width,
                height: containerStyle?.height
                    ? containerStyle.height
                    : styles.container.height,
                marginTop: containerStyle?.marginTop
                    ? containerStyle.marginTop
                    : styles.container.marginTop,
            },
            circle: {
                width: circleStyle?.width ? circleStyle.width : styles.circle.width,
                height: circleStyle?.height ? circleStyle.height : styles.circle.height,
            },
            stepNumber: {
                fontSize: stepNumberStyle?.fontSize
                    ? stepNumberStyle.fontSize
                    : styles.stepNoText.fontSize,
                fontWeight: stepNumberStyle?.fontWeight
                    ? stepNumberStyle.fontWeight
                    : styles.stepNoText.fontWeight,
                color: stepNumberStyle?.color
                    ? stepNumberStyle.color
                    : styles.stepNoText.color,
            },
            stepTitleStyle: {
                fontSize: stepTitleStyle?.fontSize && stepTitleStyle.fontSize,
                fontWeight: stepTitleStyle?.fontWeight
                    ? stepTitleStyle.fontWeight
                    : 'bold',
            },
            lineStyle: {
                width: lineStyle?.width ? lineStyle.width : styles.line.width,
                height: lineStyle?.height ? lineStyle.height : styles.line.height,
                marginHorizontal: lineStyle?.marginHorizontal
                    ? lineStyle.marginHorizontal
                    : 10,
            },
        },
    ]);

    let shiftedPage = page;
    if (page <= 0) {
        shiftedPage = page + 1
    }
    else if (page >= tabs.length - 1) {
        shiftedPage = page - 1
    }


    const prevLine = shiftedPage > 0 ? line(progressStyle) : null
    const nextLine = shiftedPage < tabs.length - 1 ? line(progressStyle) : null

    const prevTab = shiftedPage > 0 ? tab(page, tabs[shiftedPage - 1], progressStyle, setPage, titleProps) : null
    const nextTab = shiftedPage < tabs.length - 1 ? tab(page, tabs[shiftedPage + 1], progressStyle, setPage, titleProps) : null

    const startLine = shiftedPage > 1 ? line(progressStyle) : placeholder(progressStyle)
    const endLine = shiftedPage < tabs.length - 2 ? line(progressStyle ) : placeholder(progressStyle)



    return (
        <View
            style={[
                progressStyle.containerStyle,
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
                    tab(page, tabs[shiftedPage], progressStyle, setPage, titleProps),
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