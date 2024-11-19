import { combineReducers } from 'redux';
import AdminReducer from './admin/adminslice/AdminSlice';
import UserReducer from './user/userSlice';
const rootReducer = combineReducers({
  UserReducer: UserReducer,
  AdminReducer:AdminReducer
});

export default rootReducer;
