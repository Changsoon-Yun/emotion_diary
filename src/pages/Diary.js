import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {DiaryStateContext} from "../App";
import {getStringDate} from "../util/date";
import MyHeader from "../Components/MyHeader";
import MyButton from "../Components/MyButton";
import {emotionList} from "../util/emotion";


const Diary = () => {

  const {id} = useParams()
  const diaryList = useContext(DiaryStateContext)
  const navigate = useNavigate()
  const [data, setData] = useState()
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id))
      console.log(targetDiary)
      if (targetDiary) {
        setData(targetDiary)
      } else {
        alert('없는 일기 입니다')
        navigate('/', {replace: true})
      }
    }
  }, [id, diaryList])

  if (!data) {
    return (
      <div className="diaryPage">
        로딩중입니다...
      </div>
    )
  } else {

    const curEmotionData = emotionList.find((it)=>parseInt(it.emotion_id)===parseInt(data.emotion))
    console.log(curEmotionData)

    return (
      <div className={"DiaryPage"}>
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={<MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)}/>}
          rightChild={<MyButton text={"수정하기"} onClick={() => navigate(`/edit/${data.id}`)}/>}/>
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div className={["diary_img_wrapper", `diary_img_wrapper_${data.emotion}`].join(" ")}>
              <img src={(curEmotionData.emotion_img)} alt=""/>
              <div className={"emotion_descript"} >
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    )
  }
}

export default Diary