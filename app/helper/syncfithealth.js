
export function SyncFitHealth(access_token) {
    fetch('https://api.fitbit.com/1.2/user/-/body/log/weight/date/2021-05-30.json', {
    method: 'GET',
    headers: {
     Authorization: `Bearer ${access_token}`,
    },
    })
    .then(res => res.json())
    .then(res => {
    console.log(`res: ${JSON.stringify(res)}`);
    })
    .catch(err => {
      console.error('Error: ', err);
    });
  };

  export function ScheduleSyncFitHealth(accessToken) {
      console.log("schedule sync here")
  }