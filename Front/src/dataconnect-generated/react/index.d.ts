import { CreateUserData, GetPublicExercisesData, GetMyWorkoutsData, LogWorkoutData, LogWorkoutVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;

export function useGetPublicExercises(options?: useDataConnectQueryOptions<GetPublicExercisesData>): UseDataConnectQueryResult<GetPublicExercisesData, undefined>;
export function useGetPublicExercises(dc: DataConnect, options?: useDataConnectQueryOptions<GetPublicExercisesData>): UseDataConnectQueryResult<GetPublicExercisesData, undefined>;

export function useGetMyWorkouts(options?: useDataConnectQueryOptions<GetMyWorkoutsData>): UseDataConnectQueryResult<GetMyWorkoutsData, undefined>;
export function useGetMyWorkouts(dc: DataConnect, options?: useDataConnectQueryOptions<GetMyWorkoutsData>): UseDataConnectQueryResult<GetMyWorkoutsData, undefined>;

export function useLogWorkout(options?: useDataConnectMutationOptions<LogWorkoutData, FirebaseError, LogWorkoutVariables>): UseDataConnectMutationResult<LogWorkoutData, LogWorkoutVariables>;
export function useLogWorkout(dc: DataConnect, options?: useDataConnectMutationOptions<LogWorkoutData, FirebaseError, LogWorkoutVariables>): UseDataConnectMutationResult<LogWorkoutData, LogWorkoutVariables>;
