import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './pages/Home'
import New from './pages/New'
import Edit from './pages/Edit'
import Diary from './pages/Diary'
import React, {useReducer, useRef} from "react";
import './App.css';

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data
    }
    case "CREATE" : {
      newState = [...action.data, ...state];
      break
    }
    case "REMOVE" : {
      newState = state.filter((it) => it.id !== action.targetId)
      break
    }
    case "EDIT" : {
      newState = state.map((it) => it.id === action.data.id ? {...action.data} : it)
      break
    }
    default:
      return state
  }
  return newState
}

export const DiaryStateContext = React.createContext()
export const DiaryDispatchContext = React.createContext()

const dummyData = [
  {
    id:1,
    emotion:1,
    content: "오늘의 일기1번",
    date :1659081265022
  },
  {
    id:2,
    emotion:2,
    content: "오늘의 일기2번",
    date :1659081265023
  },
  {
    id:3,
    emotion:3,
    content: "오늘의 일기3번",
    date :1659081265024
  },
  {
    id:4,
    emotion:4,
    content: "오늘의 일기4번",
    date :1659081265025
  },
  {
    id:5,
    emotion:5,
    content: "오늘의 일기5번",
    date :1659081265026
  },
]

function App() {

  const [data, dispatch] = useReducer(reducer, dummyData)

  const dataId = useRef(6)

  //Create
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: [{
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    ]})
    dataId.current += 1
  }

  //Remove
  const onRemove = (targetId) => {
    dispatch({type: "REMOVE", targetId})
  }

  //Edit
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    })
  }
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{onCreate, onEdit, onRemove}}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/new" element={<New/>}/>
              <Route path="/edit/:id" element={<Edit/>}/>
              <Route path="/diary/:id" element={<Diary/>}/>
              <Route path="/diary/" element={<Diary/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
