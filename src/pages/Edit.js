import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {DiaryStateContext} from "../App";
import DiaryEditor from "../Components/DiaryEditor";

const Edit = () => {
  const [originData,setOriginData]=useState()
  const diaryList =useContext(DiaryStateContext)
  const navigate = useNavigate()
  const {id} = useParams()
  useEffect(()=>{
    if(diaryList.length >=1) {
      const targetDiary = diaryList.find((it)=>parseInt(it.id)===parseInt(id))
      if(targetDiary) {
        setOriginData(targetDiary)
      }else {
        navigate('/',{replace:true})
      }
    }

  },[id,diaryList])

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  )
}

export default Edit