import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import {
  View, 
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import * as SyncFit from '../helper/syncfithealth';

WebBrowser.maybeCompleteAuthSession();

const useProxy = Platform.select({ web: false, default: true });
// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
  tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
  revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke',
};

export default function FitbitConnect() {

  [accessToken, setAccessToken] = React.useState(null);

  const redirectUri =  makeRedirectUri({
    useProxy,
    scheme: ''
    });
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: '239Z9K',
      scopes: ['activity', 'sleep', 'weight'],
      // For usage in managed apps using the proxy
      redirectUri
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { access_token} = response.params;
      setAccessToken(access_token)
      }
  }, [response]);

  if (accessToken !== null) 
    return ( <FitBitSync />) ;
  return <FitBitConnect />

  function FitBitConnect() {
    return <TouchableOpacity style={styles.actionContainer}
      disabled={!request}
      onPress={() => {
        promptAsync({ useProxy });
      } }>
      <AntDesign name="pluscircleo" size={50} color="white" />
      <Text style={styles.text}>Connect Fitbit</Text>
    </TouchableOpacity>;
  }

  function FitBitSync() {
    return <View style={styles.actionContainer}> 
    <TouchableOpacity style={styles.touchable}
      disabled={!request}
      onPress={() => {
        SyncFit.SyncFitHealth(accessToken)
      } }>
      <MaterialIcons name="sync" size={50} color="white" />
      <Text style={styles.text}>Sync Now</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.touchable}
    disabled={!request}
    onPress={() => {
      SyncFit.ScheduleSyncFitHealth(accessToken)
    } }>
    <MaterialIcons name="schedule" size={50} color="white" />
    <Text style={styles.text}>Schedule Sync</Text>
  </TouchableOpacity>
  </View>
  }
}


const styles = StyleSheet.create({
  actionContainer: {
      position: "absolute",
      top: 100,
      alignItems:"center",
      flexDirection: "row"
  },
  text: {
      paddingTop: 15,
      color: "white",
      fontSize: 20,
      fontWeight: '500',
  },
  touchable: {
    alignItems: "center",
    margin: 20,
  }
})