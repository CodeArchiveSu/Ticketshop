import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

export type UserState = UserItem[];

export interface UserItem {
  name: string;
  id: string;
  preis: string;
  count: number;
}

export interface Users {
  id: string;
  email: string;
  // password: any;
  name?: string;
}

const initialState: UserState = [];
const initialState2: Users | null = null;

const userSlice = createSlice({
  name: "User",
  initialState: initialState2,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    userLogout(state, action) {
      return null;
    },
  },
});

const Cart = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<UserItem>) {
      const 중복찾기 = state.find((item) => item.name === action.payload.name);
      const 번호 = state.findIndex((item, index) => {
        return item.id == action.payload.id;
      });

      if (!중복찾기) {
        state.push(action.payload);
      } else {
        state[번호].count += 1;
      }
    },
    minusItem(state, action: PayloadAction<string>) {
      const 번호 = state.findIndex((item, index) => {
        return item.id == action.payload;
      });
      //장바구니 카운트 0 되면 그냥 슬라이스해버리기

      state[번호].count -= 1;
      if (state[번호].count == 0) {
        state.splice(번호, 1);
      } else {
        state[번호].preis = (
          Number(state[번호].preis) /
          (state[번호].count + 1)
        ).toString();
      }
    },
    plusItem(state, action: PayloadAction<UserItem>) {
      const 번호 = state.findIndex((item, index) => {
        return item.id == action.payload.id;
      });
      state[번호].count += 1;
      state[번호].preis = (
        Number(state[번호].preis) * state[번호].count
      ).toString();
    },
    removeItem(state, action: PayloadAction<string>) {
      const 번호 = state.findIndex((item, index) => {
        return item.id == action.payload;
      });

      state.splice(번호, 1);
    },
  },
});

export const { removeItem, addItem, minusItem, plusItem } = Cart.actions;

export const { setUser, userLogout } = userSlice.actions;

export default configureStore({
  reducer: {
    Cart: Cart.reducer,
    userSlice: userSlice.reducer,
  },
});
