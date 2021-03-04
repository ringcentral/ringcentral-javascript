# RingCentral React and Redux Style Guide

- [Introduction](#introduction)
- [Code structure](#code-structure)
- [Naming](#naming)
- [Good practices](#good-practices)

# Introduction

This is a set of recommended patterns and best practices for writing applications using React+Redux.

# Code structure

## # Put all Redux codes in `redux` directory inside your module 
> Reason: this helps to keep module isolated

## # Keep reducers clean by moving logic to helpers
> Reason: a lot of logic inside the reducer complicates an understanding of data changes produced by the action
```typescript
// BAD
export const someReducer: Reducer<SomeStore> = (state: SomeStore = initialState, action: ActionTypes) => {
    switch (action.type) {
            case UPDATE: {
                let oldItems = state.items;
                let someData = getSomeDraftData(oldItems).map(() => {
                    ...
                });       
                ...
                let items = someData.reduce((acc, item) => {
                    ...
                }, {});
                return {
                    ...state,
                    items,
                };
            }
            default: {
                return state;
            }
    }
};
```
```typescript
// GOOD
export const someReducer: Reducer<SomeStore, ActionTypes> = (state = initialState, action) => {
    switch (action.type) {
            case UPDATE: {
                return {
                    ...state,
                    items: calculateItemsUpdates(state.items),
                };
            }
            default: {
                return state;
            }
    }
};
``` 
 
## # Put Redux connection logic to Containers
> Reason: this makes the connection between a React component and Redux storage more transparent and isolated.
```typescript
// EXAMPLE
// /someModule/containers/FilterContainer.tsx
import {Filter} from '../components/settings/Filter';
import {itemsSelector} from '../redux/selectors';
import {updateFilter} from '../redux/actions';

const mapStateToProps = (state) => ({
    items: itemsSelector(state),
});

const mapDispatchToProps = {
    onChange: updateFilter,
};

export const FilterContainer: React.FC<{}> = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Filter);
```

## # All connected components should be defined in a separate files
```typescript
// BAD
...
const Component = () => { ... };
connect(mapStateToProps, mapDispatchToProps)(Component);
```
```typescript
// GOOD
//component.tsx
export const Component = () => { ... };
// container.ts
import Component from './component';
...
connect(mapStateToProps, mapDispatchToProps)(Component)
```

## # Keep only action names in `/moduleName/redux/constants.ts` file.
```typescript
// BAD
// src/app/modules/extensions/redux/constants.ts
export const FETCH_EXTENSIONS = 'extensions/fetch';
export const EXTENSIONS_MAIN_CONSTANT_VALUE = 42;
...
```
```typescript
// GOOD
// src/app/modules/extensions/redux/constants.ts
export const FETCH_EXTENSIONS = 'extensions/fetch';

// src/app/modules/extensions/constants.ts
export const EXTENSIONS_MAIN_CONSTANT_VALUE = 42;
```

## # Avoid having one reducer
> Reason: this principle allows to increase readability of reducers due to their limited scope, and facilitate the testing
```typescript
// EXAMPLE
// reducer.ts
import {combineReducers} from 'redux';
import {usersReducer} from './users/reducer';
import {commentsReducer} from './comments/reducer';
import {postsReducer} from './posts/reducer';

let appReducersMap = {
    users: usersReducer,
    comments: commentsReducer,
    posts: postsReducer,
};

export const appStore = combineReducers(appReducersMap);
```

## # Action creators and actions should be put into separate `actions` file (ex.`redux/actions.ts`). `mapDispatchToProps` uses a shorthand to wrap actions in dispatch calls
```typescript
// BAD
const mapDispatchToProps = (dispatch) => ({
  getData: async (id) => {const data = await fetchData(id); dispatch(createAction(FETCH_DATA, {data}))},
})
```
```typescript
// GOOD
// actions.ts
...
const getData = (id) => async (dispatch, getState) => {
    const data = await fetchData(id); 
    dispatch(createAction(FETCH_DATA, {data}));
}
...

// container.ts
import {getData} from 'actions.ts';
...
const mapDispatchToProps = {
    getData,
}
...
```

# Naming

## # Use string constants instead of inline strings for action types
> Reason: It helps keep the naming consistent and allows to gather all action types in one place
```typescript
// BAD
createAction('update_active_policies_item_settings', {nextSettings})
```
```typescript
// GOOD
const UPDATE_ACTIVE_ITEM_SETTINGS = 'policies/update_active_item_settings';
...
createAction(UPDATE_ACTIVE_ITEM_SETTINGS, {nextSettings})
```

## # Write action types as "domain/eventName"
> Reason: this is consistent with [Official Redux Style Guide](https://redux.js.org/style-guide/style-guide#write-action-types-as-domaineventname)
```typescript
// EXAMPLE
// src/app/modules/callQueues/redux/constants.ts
export const UPDATE_NAME = 'callQueue/updateName';
export const LOAD_FAILURE = 'callQueue/load/failure';
```

## # The name of reducer should be equal to a folder name containing it and to a namespace key in 'actions' 
```typescript
// EXAMPLE
// src/app/modules/extensions/redux/reducer.ts
import {callQueuesReducer} from './callQueues/reducer';

const extensionsReducersMap = {
    callQueues: callQueuesReducer,
    ...
}
export const extensionsReducer = combineReducers(extensionsReducersMap);

// src/app/modules/extensions/redux/constants.ts
export const FETCH_EXTENSIONS = 'extensions/fetch';

// src/app/modules/extensions/redux/callQueues/constants.ts
export const UPDATE_CALL_QUEUE_NAME = 'callQueues/updateName';
...
```

## # `connect` arguments should have recommended names: `mapStateToProps, mapDispatchToProps, mergeProps, options`
```typescript
// BAD 
connect(mapStateToProps, actionCreators)(App)
```
```typescript
// GOOD
connect(mapStateToProps, mapDispatchToProps, mergeProps)(App)
```

## # Middleware parameters have specific names: `dispatch` and `getState`
```typescript
// BAD
// actions.ts
const updateUser = (id, userData) => (forward, state) => { ... }
```
```typescript
// GOOD
// actions.ts
const updateUser = (id, userData) => (dispatch, getState) => { ... }
```

## # `mapStateToProps` parameters have specific names: `state`, `ownProps`
```typescript
// BAD
const mapStateToProps = (store) => {}
```
```typescript
// GOOD
const mapStateToProps = (state) => {}
```

# Good practices

## # Use selectors to get data from the Redux state
> Reason: selectors allow hiding data structure and manipulation logic from a component. A selector is not recomputed unless one of its arguments changes.
```typescript
// BAD
// /containers/SomeContainer.tsx
const mapStateToProps = ({exampleStore, oneMoreStore}) => ({
    currentItem: exampleStore.items.filter((item) => {item.isCurrent}),
    someProp: oneMoreStore.someProp
});
```
```typescript
// GOOD
// /redux/selectors/selectors.ts
export const currentItemSelector = createSelector<ReduxStore, ExampleStore, string>(
    exampleStore => exampleStore.items,
    (items) => items.filter((item) => {item.isCurrent}),
);
...
// /containers/SomeContainer.tsx
const mapStateToProps = (state) => ({
    currentItem: currentItemSelector(state),
    someProp: somePropSelector(state),
});
```

## # Do not use `createSelector` to create selectors for frequently changed data or to access big parts of the state
> Reason: `createSelector` uses memoization to keep selector results. If you access big parts of the state, these parts are very likely to change on every action, in this case `createSelector` may lead to performance issues due to lots of useless caching operations.     
```typescript
// BAD
export const settingsStoreSelector = createSelector(
    ({settingsStore}) => settingsStore,
    (settingsStore) => settingsStore,
);
export const currentUserSettingsSelector = createSelector(
    settingsStoreSelector,
    ({usersSettings}) => usersSettings.filter((userSettings) => userSettings.userId === getCurrentUserId()),
);
```
```typescript
// GOOD
const usersSettingsSelector = (state) => state.settingsStore.usersSettings;
export const currentUserSettingsSelector = createSelector(
    usersSettingsSelector,
    (usersSettings) => usersSettings.filter((userSettings) => userSettings.userId === getCurrentUserId()),
);
```

## # Use `createAction`, `createDataRequestAction` and other similar functions to reduce duplication of boilerplate code

## # Add typings for actions
```typescript
// EXAMPLE
const UPDATE_USER = 'users/updateUser';
const REMOVE_USER = 'users/removeUser';

export interface Action<Type = string, Payload = any> {
    type: Type;
    payload?: Payload;
}

export type UpdateUserAction = Action<
    typeof UPDATE_USER, 
    {
        id: number;
        name: string;
    }
>;  

export type RemoveUserAction = Action<typeof REMOVE_USER, number>;

export const someReducer: Reducer<UsersStore, UpdateAction | RemoveAction> = (
    state = initialState,
    action,
) => { ... };
```

## # Minimize the use of "blind spreads/returns" 
> Reason: this improves readability of a reducer
```typescript
// BAD
...
    case ACTION: {
        return {...state, ...action.payload}
    }
... 
// BAD
...
    case ACTION: {
        return action.payload
    }
...  
```
```typescript
// GOOD
...
    case ACTION: {
        let {id, item} = action.payload;
        return {
            ...state,
            id,
            item,
        }
    }
... 
``` 

## # Always write unit tests for reducers
> Reason: a reducer is one of the most sensitive places of the redux code, a modification can have a lot of impact on the application. On the other hand, this code is relatively easy to test, so writing unit tests is a convenient way to be sure the reducer works as expected, and some changes don't affect it. 
```typescript
// EXAMPLE
import {rolesReducer} from '../rolesReducer';
const ROLES: SomeRole[] = [{ ... }, ...]; 
...
    it('should handle FETCH_ACTIVE_ROLES by replacing roles', () => {
        const actualState = rolesReducer(INITIAL_STATE, {
            type: FETCH_ACTIVE_ROLES,
            payload: ROLES,
        });
        expect(actualState.roles).toEqual(ROLES);
    });
```

## # Add typings for dispatching functions in action creators
```typescript
// BAD
export const deleteUser = (id: Identifier) => (dispatch, getState) => {
    ...
    dispatch(createAction(DELETE_USER, id))
}
```
```typescript
// GOOD
import {Dispatch} from 'redux';
export const deleteUser = (id: Identifier) => (dispatch: Dispatch, getState: RootState) => {
    ...
    dispatch<DeleteUserAction>(createAction(DELETE_USER, id))
}
```

## # Do not overuse Redux, but prefer it to other approaches when possible.
React allows us to store everything inside components, no matter if we deal with functional or class components. But this approach may lead to readability and maintainability problems when an application becomes bigger. Redux is a good place to keep an application state and updating logic in isolation from UI components. 

Here are some hints when we better prefer Redux and when not.
#### ## Use prop passing when we have up to 3 levels of children components.
```typescript
// EXAMPLE
const Parent = () => {
  const [value, setValue] = useState(1);
  return (
    <>
      <Child value={value} onUpdateValue={setValue} />
    </>
  );
};

const Child = ({ value, onUpdateValue }) => (
  <>
    <GrandChild value={value} onUpdateValue={onUpdateValue} />
  </>
);

const GrandChild = ({ value, onUpdateValue }) => (
  ...
);
```  
#### ## Prefer context when: 
- we should pass values deeper than 3 levels down
- there is no need to have centralized storage of state and logic
- the size of state seems to keep small
- state updates are infrequent 
```typescript
// EXAMPLE
export const UnsavedChangesContext = createContext(null);

const GroupDataContainer = (props) => {
    let [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const createUnsavedChangesContext = () => ({
        getHasUnsavedChanges: () => hasUnsavedChanges,
        setHasUnsavedChanges: (isChanged) => setHasUnsavedChanges(isChanged),
    });

    return (
        <UnsavedChangesContext.Provider value={createUnsavedChangesContext()}>
            <GroupData />
        </HasUnsavedChangesContext.Provider>
    );
}
const GroupData = () => (
    <>
        <HeaderLayout />
        <GroupDataLayout />
        <FooterLayout />
    </>
)
const GroupDataLayout = () => (
    <Block>
        <GroupDataGrid />
        <GridButtons />
    </Block>
)
const GroupDataGrid = () => (
    <GridLayout />
)
const GridLayout = () => (
    <Block>
        <GridHeader />
        <GridBody />
        <GridFooter />
    </Block>
)
const GridBody = () => (
    const {setHasUnsavedChanges} = useContext(UnsavedChangesContext);
    
    return (
        <Grid onChange={setHasUnsavedChanges} />
    );
)
``` 
#### ## Redux should be used in all other cases.

## # `mapStateToProps` should not bind complete store to a component
> Reason: Passing whole state to a component is a bad practice, triggering unnecessary re-renders.
```typescript
// BAD
const mapStateToProps = (state) => state
```
```typescript
// GOOD
const mapStateToProps = (state) => ({activeItem: activeItemSelector(state)});
```

## # One action may cause multiple reducers to change state
> Actions do not match reducers 1-to-1, one action may cause a ripple effect in sub-states. Use this technique to make
  linked changes in many states based on user interactions.
```typescript
function perPageReducer(state = DEFAULT_ITEMS_PER_PAGE, action) {
    switch (action.type) {
        case 'SET_PER_PAGE':
            return action.payload;
        default:
            return state;
    }
}

function pageReducer(state = DEFAULT_PAGE, action) {
    switch (action.type) {
        case 'SET_PAGE':
            return action.payload;
        case 'SET_PER_PAGE': // handled also by another reducer
            return DEFAULT_PAGE; // you can have calculation logic to move user to correct page instead of page 1
        default:
            return state;
    }
}
```

## # Only show as much of the redux state to a component as it needs by slicing exact parts of state
> Keep all components as stupid as possible: React pure render optimizations allows to re-render components ONLY if
  something visible data changes, so never supply a whole chunk of state to a component, first, break it to simpler
  things or even to primitives.

