# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetPublicExercises*](#getpublicexercises)
  - [*GetMyWorkouts*](#getmyworkouts)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*LogWorkout*](#logworkout)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetPublicExercises
You can execute the `GetPublicExercises` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getPublicExercises(): QueryPromise<GetPublicExercisesData, undefined>;

interface GetPublicExercisesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetPublicExercisesData, undefined>;
}
export const getPublicExercisesRef: GetPublicExercisesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPublicExercises(dc: DataConnect): QueryPromise<GetPublicExercisesData, undefined>;

interface GetPublicExercisesRef {
  ...
  (dc: DataConnect): QueryRef<GetPublicExercisesData, undefined>;
}
export const getPublicExercisesRef: GetPublicExercisesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPublicExercisesRef:
```typescript
const name = getPublicExercisesRef.operationName;
console.log(name);
```

### Variables
The `GetPublicExercises` query has no variables.
### Return Type
Recall that executing the `GetPublicExercises` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPublicExercisesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetPublicExercises`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPublicExercises } from '@dataconnect/generated';


// Call the `getPublicExercises()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPublicExercises();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPublicExercises(dataConnect);

console.log(data.exercises);

// Or, you can use the `Promise` API.
getPublicExercises().then((response) => {
  const data = response.data;
  console.log(data.exercises);
});
```

### Using `GetPublicExercises`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPublicExercisesRef } from '@dataconnect/generated';


// Call the `getPublicExercisesRef()` function to get a reference to the query.
const ref = getPublicExercisesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPublicExercisesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.exercises);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.exercises);
});
```

## GetMyWorkouts
You can execute the `GetMyWorkouts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyWorkouts(): QueryPromise<GetMyWorkoutsData, undefined>;

interface GetMyWorkoutsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyWorkoutsData, undefined>;
}
export const getMyWorkoutsRef: GetMyWorkoutsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyWorkouts(dc: DataConnect): QueryPromise<GetMyWorkoutsData, undefined>;

interface GetMyWorkoutsRef {
  ...
  (dc: DataConnect): QueryRef<GetMyWorkoutsData, undefined>;
}
export const getMyWorkoutsRef: GetMyWorkoutsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyWorkoutsRef:
```typescript
const name = getMyWorkoutsRef.operationName;
console.log(name);
```

### Variables
The `GetMyWorkouts` query has no variables.
### Return Type
Recall that executing the `GetMyWorkouts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyWorkoutsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMyWorkoutsData {
  workoutRoutines: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    isPublic?: boolean | null;
  } & WorkoutRoutine_Key)[];
}
```
### Using `GetMyWorkouts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyWorkouts } from '@dataconnect/generated';


// Call the `getMyWorkouts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyWorkouts();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyWorkouts(dataConnect);

console.log(data.workoutRoutines);

// Or, you can use the `Promise` API.
getMyWorkouts().then((response) => {
  const data = response.data;
  console.log(data.workoutRoutines);
});
```

### Using `GetMyWorkouts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyWorkoutsRef } from '@dataconnect/generated';


// Call the `getMyWorkoutsRef()` function to get a reference to the query.
const ref = getMyWorkoutsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyWorkoutsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.workoutRoutines);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.workoutRoutines);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation has no variables.
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser } from '@dataconnect/generated';


// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef } from '@dataconnect/generated';


// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## LogWorkout
You can execute the `LogWorkout` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
logWorkout(vars: LogWorkoutVariables): MutationPromise<LogWorkoutData, LogWorkoutVariables>;

interface LogWorkoutRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: LogWorkoutVariables): MutationRef<LogWorkoutData, LogWorkoutVariables>;
}
export const logWorkoutRef: LogWorkoutRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
logWorkout(dc: DataConnect, vars: LogWorkoutVariables): MutationPromise<LogWorkoutData, LogWorkoutVariables>;

interface LogWorkoutRef {
  ...
  (dc: DataConnect, vars: LogWorkoutVariables): MutationRef<LogWorkoutData, LogWorkoutVariables>;
}
export const logWorkoutRef: LogWorkoutRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the logWorkoutRef:
```typescript
const name = logWorkoutRef.operationName;
console.log(name);
```

### Variables
The `LogWorkout` mutation requires an argument of type `LogWorkoutVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface LogWorkoutVariables {
  workoutRoutineId: UUIDString;
  date: DateString;
  durationMinutes?: number | null;
  notes?: string | null;
}
```
### Return Type
Recall that executing the `LogWorkout` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `LogWorkoutData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface LogWorkoutData {
  loggedWorkout_insert: LoggedWorkout_Key;
}
```
### Using `LogWorkout`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, logWorkout, LogWorkoutVariables } from '@dataconnect/generated';

// The `LogWorkout` mutation requires an argument of type `LogWorkoutVariables`:
const logWorkoutVars: LogWorkoutVariables = {
  workoutRoutineId: ..., 
  date: ..., 
  durationMinutes: ..., // optional
  notes: ..., // optional
};

// Call the `logWorkout()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await logWorkout(logWorkoutVars);
// Variables can be defined inline as well.
const { data } = await logWorkout({ workoutRoutineId: ..., date: ..., durationMinutes: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await logWorkout(dataConnect, logWorkoutVars);

console.log(data.loggedWorkout_insert);

// Or, you can use the `Promise` API.
logWorkout(logWorkoutVars).then((response) => {
  const data = response.data;
  console.log(data.loggedWorkout_insert);
});
```

### Using `LogWorkout`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, logWorkoutRef, LogWorkoutVariables } from '@dataconnect/generated';

// The `LogWorkout` mutation requires an argument of type `LogWorkoutVariables`:
const logWorkoutVars: LogWorkoutVariables = {
  workoutRoutineId: ..., 
  date: ..., 
  durationMinutes: ..., // optional
  notes: ..., // optional
};

// Call the `logWorkoutRef()` function to get a reference to the mutation.
const ref = logWorkoutRef(logWorkoutVars);
// Variables can be defined inline as well.
const ref = logWorkoutRef({ workoutRoutineId: ..., date: ..., durationMinutes: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = logWorkoutRef(dataConnect, logWorkoutVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.loggedWorkout_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.loggedWorkout_insert);
});
```

