import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateUserData {
  user_insert: User_Key;
}

export interface Exercise_Key {
  id: UUIDString;
  __typename?: 'Exercise_Key';
}

export interface GetMyWorkoutsData {
  workoutRoutines: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    isPublic?: boolean | null;
  } & WorkoutRoutine_Key)[];
}

export interface GetPublicExercisesData {
  exercises: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    muscleGroup?: string | null;
    equipmentRequired?: string | null;
    instructions?: string | null;
  } & Exercise_Key)[];
}

export interface LogWorkoutData {
  loggedWorkout_insert: LoggedWorkout_Key;
}

export interface LogWorkoutVariables {
  workoutRoutineId: UUIDString;
  date: DateString;
  durationMinutes?: number | null;
  notes?: string | null;
}

export interface LoggedExercise_Key {
  id: UUIDString;
  __typename?: 'LoggedExercise_Key';
}

export interface LoggedWorkout_Key {
  id: UUIDString;
  __typename?: 'LoggedWorkout_Key';
}

export interface RoutineExercise_Key {
  workoutRoutineId: UUIDString;
  exerciseId: UUIDString;
  __typename?: 'RoutineExercise_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface WorkoutRoutine_Key {
  id: UUIDString;
  __typename?: 'WorkoutRoutine_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(): MutationPromise<CreateUserData, undefined>;
export function createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface GetPublicExercisesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetPublicExercisesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetPublicExercisesData, undefined>;
  operationName: string;
}
export const getPublicExercisesRef: GetPublicExercisesRef;

export function getPublicExercises(): QueryPromise<GetPublicExercisesData, undefined>;
export function getPublicExercises(dc: DataConnect): QueryPromise<GetPublicExercisesData, undefined>;

interface GetMyWorkoutsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyWorkoutsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyWorkoutsData, undefined>;
  operationName: string;
}
export const getMyWorkoutsRef: GetMyWorkoutsRef;

export function getMyWorkouts(): QueryPromise<GetMyWorkoutsData, undefined>;
export function getMyWorkouts(dc: DataConnect): QueryPromise<GetMyWorkoutsData, undefined>;

interface LogWorkoutRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: LogWorkoutVariables): MutationRef<LogWorkoutData, LogWorkoutVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: LogWorkoutVariables): MutationRef<LogWorkoutData, LogWorkoutVariables>;
  operationName: string;
}
export const logWorkoutRef: LogWorkoutRef;

export function logWorkout(vars: LogWorkoutVariables): MutationPromise<LogWorkoutData, LogWorkoutVariables>;
export function logWorkout(dc: DataConnect, vars: LogWorkoutVariables): MutationPromise<LogWorkoutData, LogWorkoutVariables>;

