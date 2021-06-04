import {updateWeight} from "../components/apphealth";
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';

const BACKGROUND_TASK_NAME = 'background-sync-task';



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
      TaskManager.isTaskRegisteredAsync(BACKGROUND_TASK_NAME)
      .then(res => {
        console.log(res)
        if (!res) {
          const options =  {
            minimumInterval: 30,
            stopOnTerminate: false,
            startOnBoot: true
          }
          BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME,
            options)
            console.log("registeredTask")
          }
      });
  }

  TaskManager.defineTask(BACKGROUND_TASK_NAME, () => {
    try {
      const receivedNewData = fetch('https://api.fitbit.com/1.2/user/-/body/log/weight/date/2021-05-30.json', {
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
        console.log("registered task running")
      return receivedNewData ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData;
    } catch (error) {
      return BackgroundFetch.Result.Failed;
    }
  });
  
  