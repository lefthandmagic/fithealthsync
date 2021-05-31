import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import { Button, SafeAreaView } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const useProxy = Platform.select({ web: false, default: true });
// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
  tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
  revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke',
};

export default function App() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: '239Z9K',
      scopes: ['activity', 'sleep'],
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri({
        useProxy,
        scheme: 'fitbit://test'
        }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      console.log("access_token is: ", access_token)
      }
  }, [response]);

  return (
    <SafeAreaView>
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync({ useProxy });
        }}
    />
    </SafeAreaView>
  );
}