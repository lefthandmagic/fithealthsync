import {updateWeight} from "../components/apphealth";


export function SyncFitHealth(access_token) {
    const weight = null;
    fetch('https://api.fitbit.com/1.2/user/-/body/log/weight/date/2021-05-30.json', {
    method: 'GET',
    headers: {
     Authorization: `Bearer ${access_token}`,
    },
    })
    .then(res => res.json())
    .then(res => {
      weightArray = res.weight;
      updateWeight(weightArray[0].weight);
    })
    .catch(err => {
      console.error('Error: ', err);
    });
  };

  export function ScheduleSyncFitHealth(accessToken) {
      console.log("schedule sync here")
  }