import {useNavigate} from "react-router-dom";
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import {useState} from "react";
import EmotionItem from "./EmotionItem";

export const getStringDate = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
};

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion1.png`,
    emotion_descript: "완전 좋음"
  }, {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion2.png`,
    emotion_descript: "좋음"
  }, {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion3.png`,
    emotion_descript: "그럭저럭"
  }, {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion4.png`,
    emotion_descript: "나쁨"
  }, {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion5.png`,
    emotion_descript: "끔찍함"
  }
]

const DiaryEditor = () => {
  const [emotion, setEmotion] = useState(3)
  const [date, setDate] = useState(getStringDate(new Date))
  const handleClickEmote = (emotion) => {
    setEmotion(emotion)
  }
  const navigate = useNavigate()
  return (
    <div className={"DiaryEditor"}>
      <MyHeader headText={"새 일기 쓰기"} leftChild={<MyButton text={"뒤로가기"} onClick={() => navigate(-1)}/>}/>
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input className={"input_date"}
                   type="date"
                   value={date}
                   onChange={(e) => setDate(e.target.value)}/>
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
              isSelected={it.emotion_id === emotion}/>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default DiaryEditor