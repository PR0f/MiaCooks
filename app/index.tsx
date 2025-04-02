import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Redirect, router, useRootNavigation } from 'expo-router'



const index = () => {

    

    

    return (
        <Redirect href="/(tabs)/home" />
    )
}

export default index