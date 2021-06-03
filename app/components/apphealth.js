import AppleHealthKit from 'react-native-health';
  
  /* Permission options */
  const permissions = {
    permissions: {
      read: [AppleHealthKit.Constants.Permissions.Weight,
    AppleHealthKit.Constants.Permissions.HeartRate],
      write: [AppleHealthKit.Constants.Permissions.Weight],
    },
  };

    AppleHealthKit.initHealthKit(permissions, (error) => {
        /* Called after we receive a response from the system */
        if (error) {
          console.log('[ERROR] Cannot grant permissions!')
        }
      
        /* Can now read or write to HealthKit */

        let optionsWeight = {
            unit: 'pound',
          }
      
        AppleHealthKit.getLatestWeight(
        optionsWeight,
          (callbackError, results) => {
            //
          },
        )
      })


export function updateWeight(value) {
    let options = {
        value: value,
      }
    AppleHealthKit.saveWeight(
        options,
          (callbackError, results) => {
            if (callbackError) {
                console.log('error saving weight to Healthkit: ', err)
                return
              }
          },
        )
}


