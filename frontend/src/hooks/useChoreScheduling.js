import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useAPIErrorChecking } from "./useAPIErrorChecking";

export const useChoreScheduling = (group_ID) => {
  const errCheck = useAPIErrorChecking();
  const queryClient = useQueryClient();

  // Required Parameters
  //      user_ID:                        String - ID of the group admin editing the schedule
  //      group_ID:                       String - ID of the group
  //      chore_ID:                       String - ID of the chore
  // Optional Parameters
  //      schedule_due_date:              Date - new date chore needs to be finished by
  //      schedule_recurrence_type:       recurrenceSchema - new recurrence for chore

  const postNewSchedule = (newSchedule) => {
    return axios
      .post("/api/schedules/edit", newSchedule)
      .then((res) => res.data)
      .catch((err) => errCheck(err));
  };

  const mutation = useMutation(postNewSchedule, {
    onMutate: (newSchedule) => {
      // console.log(newSchedule);
      queryClient.setQueryData([group_ID, "chores"], (current) => {
        current.chores = current.chores.map((chore) => {
          if (chore._id === newSchedule.chore_ID) {
            if (!chore.chore_schedule) {
              chore.chore_schedule = {};
            }

            if (newSchedule.schedule_due_date) {
              // console.log("updated schedule");
              chore.chore_schedule.schedule_due_date =
                newSchedule.schedule_due_date;
              console.log(chore.chore_schedule.schedule_due_date);
            }
          }
          return chore;
        });
        // console.log(current);
        return current;
      });
    },
    onSuccess: (newChore) => {
      console.log(newChore);
      queryClient.setQueryData([group_ID, "chores"], (current) => {
        current.chores = current.chores.map((chore) => {
          if (chore._id === newChore.chore._id) {
            chore.chore_schedule = newChore.chore.chore_schedule;
          }
          return chore;
        });
        // console.log(current);
        return current;
      });
    },
  });

  // Required Parameters
  //      user_ID:                        String - ID of the group admin editing the schedule
  //      group_ID:                       String - ID of the group
  //      chore_ID:                       String - ID of the chore
  // Optional Parameters
  //      schedule_due_date:              Date - new date chore needs to be finished by
  //      schedule_recurrence_type:       recurrenceSchema - new recurrence for chore

  return (newSchedule) => {
    mutation.mutate(newSchedule);
  };
};
