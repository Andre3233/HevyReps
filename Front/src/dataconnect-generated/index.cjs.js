const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'hevyreps',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser');
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dc) {
  return executeMutation(createUserRef(dc));
};

const getPublicExercisesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPublicExercises');
}
getPublicExercisesRef.operationName = 'GetPublicExercises';
exports.getPublicExercisesRef = getPublicExercisesRef;

exports.getPublicExercises = function getPublicExercises(dc) {
  return executeQuery(getPublicExercisesRef(dc));
};

const getMyWorkoutsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyWorkouts');
}
getMyWorkoutsRef.operationName = 'GetMyWorkouts';
exports.getMyWorkoutsRef = getMyWorkoutsRef;

exports.getMyWorkouts = function getMyWorkouts(dc) {
  return executeQuery(getMyWorkoutsRef(dc));
};

const logWorkoutRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'LogWorkout', inputVars);
}
logWorkoutRef.operationName = 'LogWorkout';
exports.logWorkoutRef = logWorkoutRef;

exports.logWorkout = function logWorkout(dcOrVars, vars) {
  return executeMutation(logWorkoutRef(dcOrVars, vars));
};
