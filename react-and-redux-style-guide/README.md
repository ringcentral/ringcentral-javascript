# RingCentral React and Redux Style Guide

## Introduction

This is a set of recommended patterns and best practices for writing applications using React+Redux.

## 1. Put all Redux codes in `redux` directory inside your module 
> Reason: this helps to keep module isolated
## 2. Use selectors to get data from the Redux state
> Reason: selectors allow hiding data structure and manipulation logic from a component. A selector is not recomputed unless one of its arguments changes.
```typescript
//Good
// /redux/selectors/selectors.ts
import {addBrand} from './selectorHelpers';
export const brandedItemNameSelector = createSelector<ReduxStore, ExampleStore, string>(
    exampleStoreSelector,
    ({currentItemName, brandId}) => addBrand(currentItemName, brandId),
);
...
// /containers/SomeContainer.tsx
const mapStateToProps = (state) => ({
    brandedItemName: brandedItemNameSelector(state),
    someProp: somePropSelector(state),
});
```
```typescript
//Bad
// /containers/SomeContainer.tsx
import {addBrand} from './allHelpers';
const mapStateToProps = ({exampleStore, oneMoreStore}) => ({
    brandedItemName: addBrand(exampleStore.currentItemName, exampleStore.brandId),
    someProp: oneMoreStore.someProp
});
```
## 3. Use `createAction`, `createDataRequestAction` and other similar functions to reduce duplication of boilerplate code
## 4. Use string constants instead of inline strings for action types
> Reason: It helps keep the naming consistent and allows to gather all action types in one place
```typescript
//Good
const UPDATE_ACTIVE_ITEM_SETTINGS = 'policies/update_active_item_settings';
...
createAction(UPDATE_ACTIVE_ITEM_SETTINGS, {nextSettings})
```
```typescript
//Bad
createAction('update_active_policies_item_settings', {nextSettings})
```
## 5. Keep reducers clean by moving logic to helpers
> Reason: a lot of logic inside the reducer complicates an understanding of data changes produced by the action
```typescript
//Good
export const someReducer: Reducer<SomeStore> = (state: SomeStore = initialState, action: ActionTypes) => {
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
```typescript
//Bad
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
## 6. Put Redux connection logic to Containers
> Reason: this makes the connection between a React component and Redux storage more transparent and isolated.
```typescript
//Example
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
## 7. Add typings for actions
```typescript
//Example
// /redux/types/typesOfActions.ts
export interface UpdateAction {
    type: typeof UPDATE;
    payload: {
        id: number;
        value: string
    }   
}

export interface RemoveAction {
    type: typeof REMOVE;
    payload: number;
}

// /redux/reducer.ts
type ActionTypes = UpdateAction | RemoveAction;
export const someReducer: Reducer<Store> = (
    state: Store = initialState,
    action: ActionTypes,
) => { ... };
```
## 8. Minimize the use of "blind spreads/returns" 
> Reason: this improves readability of a reducer
```typescript
//Good
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
//Bad
...
    case ACTION: {
        return {...state, ...action.payload}
    }
... 
//Bad
...
    case ACTION: {
        return action.payload
    }
...  
``` 
## 9. Always write unit tests for reducers
> Reason: a reducer is one of the most sensitive places of the redux code, a modification can have a lot of impact on the application. On the other hand, this code is relatively easy to test, so writing unit tests is a convenient way to be sure the reducer works as expected, and some changes don't affect it. 
```typescript
//Example
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
## 10. Write Action Types as "domain/eventName"
> Reason: this is consistent with [Official Redux Style Guide](https://redux.js.org/style-guide/style-guide#write-action-types-as-domaineventname)
```typescript
//Example
export const UPDATE = 'callQueue/update';
```
## 11. Avoid having one reducer
> Reason: this principle allows to increase readability of reducers due to their limited scope, and facilitate the testing
```typescript
//Example
// reducer.ts
import {combineReducers} from 'redux';
import {entity1Reducer} from './entyty1/reducer';
import {entity2Reducer} from './entyty2/reducer';
import {entity3Reducer} from './entyty3/reducer';

let entitiesReducersMap = {
    entity1: entity1Reducer,
    entity2: entity2Reducer,
    entity3: entity3Reducer,
};

export const entitiesStore = combineReducers(entitiesReducersMap);
```

