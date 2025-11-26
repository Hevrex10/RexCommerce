import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import "react-range-slider-input/dist/style.css"



interface UiState{
  selected:number | null,
  isColor: number| boolean,
  itemSize: string,
  category: string[],
   itemName: string,
   itemColor: string,
   itemPrice: number|null,
}


const initialState: UiState = {
   selected : null,
   isColor: false,
   itemSize: "",
   category: [],
    itemName: "",
    itemColor: "",
    itemPrice: null,
}



const uiSlice = createSlice({
  name:"ui",
  initialState,
  reducers:{
    setItemName(state,action:PayloadAction<string>){
      state.itemName = action.payload
    },
    setItemColor(state,action:PayloadAction<string>){
      state.itemColor = action.payload
    },
   setCategory(state, action: PayloadAction<string>) {
      if (!state.category.includes(action.payload)) {
        state.category.push(action.payload);
      }
    },
    removeCategory(state, action: PayloadAction<string>) {
      state.category = state.category.filter(
        (cat) => cat !== action.payload
      );
    },
    setSize(state,action:PayloadAction<string>) {
       state.itemSize = action.payload;
    },
    setSelected(state,action:PayloadAction<number|null>) {
       state.selected = action.payload;
    },
    setIsColor(state,action:PayloadAction<number|boolean>) {
       state.isColor = action.payload;
    },
    handleSelect(state,action:PayloadAction<number>) {
       state.selected = state.selected === action.payload ? null : action.payload;
    },
    handleColor(state, action: PayloadAction<number>) {
      state.isColor = action.payload;
    },
    setItemPrice(state,action:PayloadAction<number>){
       state.itemPrice = action.payload
    },
  
   
  }
})

export const {setItemColor,setItemPrice,setItemName,removeCategory,setCategory,setSize,setSelected,setIsColor,handleSelect,handleColor} = uiSlice.actions;
export default uiSlice.reducer