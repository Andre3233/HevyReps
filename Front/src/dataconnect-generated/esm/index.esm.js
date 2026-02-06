import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'hevyreps',
  location: 'us-east4'
};

export const createUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser');
}
createUserRef.operationName = 'CreateUser';

export function createUser(dc) {
  return executeMutation(createUserRef(dc));
}

export const getPublicExercisesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPublicExercises');
}
getPublicExercisesRef.operationName = 'GetPublicExercises';

export function getPublicExercises(dc) {
  return executeQuery(getPublicExercisesRef(dc));
}

export const getMyWorkoutsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyWorkouts');
}
getMyWorkoutsRef.operationName = 'GetMyWorkouts';

export function getMyWorkouts(dc) {
  return executeQuery(getMyWorkoutsRef(dc));
}

export const logWorkoutRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'LogWorkout', inputVars);
}
logWorkoutRef.operationName = 'LogWorkout';

export function logWorkout(dcOrVars, vars) {
  return executeMutation(logWorkoutRef(dcOrVars, vars));
}

