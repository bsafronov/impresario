import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INews, INewsItem, INewsItemForm } from "./news.interface";

const initialState: INews = {
  totalCreated: 0,
  news: [],
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setStateNews(state, action: PayloadAction<INews | null>) {
      if (action.payload) {
        state.totalCreated = action.payload.totalCreated;
        state.news = action.payload.news;
      } else {
        state.totalCreated = initialState.totalCreated;
        state.news = initialState.news;
      }
    },
    createNewsItem(state, action: PayloadAction<INewsItemForm>) {
      state.totalCreated += 1;

      const newsItem: INewsItem = {
        id: state.totalCreated,
        ...action.payload,
      };

      state.news = [newsItem, ...state.news];
    },
  },
});

export default newsSlice.reducer;
