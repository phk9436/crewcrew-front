import { setDateFormat } from "../common.js"

export const postData = [
  {
    id: 10,
    endDate: setDateFormat(8),
    title: "함께 크루원 모집 플랫폼 작업하실 분 모십니다!",
    category: "Study",
    categoryName: "프로젝트",
    place: "온라인",
    nowPop: 9,
    fullPop: 10,
    read: 20,
    profile: "Profile4.png",
    profileBg: "#8d2bf5",
    nickname: "고슴도치",
    content: "고슴도치와 함께 크루원 모집 플랫폼 작업하실 분들 구합니다! \n디자이너 한분 자리 남았습니다. \n함께하실 분 신청주세요.",
    uid: 10,
    accept: [10, 2, 3, 4, 5, 6, 7, 8, 9],
    waiting: []
  },
  {
    id: 9,
    endDate: setDateFormat(6),
    title: "일본어 스터디 해요!",
    category: "Study",
    categoryName: "어학",
    place: "오프라인",
    nowPop: 7,
    fullPop: 8,
    read: 10,
    profile: "Profile1.png",
    profileBg: "#00b7ff",
    nickname: "일본어덕후",
    content: "일본어 좋아하는 일본어덕후와 함께하는 일본어 스터디! \n오후 8시에 시작합니다. \n장소는 홍대 카페입니다.",
    uid: 9,
    accept: [9, 3, 4, 5, 6, 8, 10],
    waiting: [2, 9]
  },
  {
    id: 8,
    endDate: setDateFormat(6),
    title: "요리 좋아하시는 분?",
    category: "Hobby",
    categoryName: "요리",
    place: "오프라인",
    nowPop: 1,
    fullPop: 4,
    read: 15,
    profile: "Profile2.png",
    profileBg: "#8ed819",
    nickname: "백종원",
    content: "요리 좋아하는 분들 모여봐유. \n고기 좋아하면 더 좋아유.",
    uid: 8,
    accept: [8],
    waiting: [1, 3, 7]
  },
  {
    id: 7,
    endDate: setDateFormat(7),
    title: "한강 러닝 뛰실분 모집합니다",
    category: "Hobby",
    categoryName: "운동",
    place: "오프라인",
    nowPop: 5,
    fullPop: 10,
    read: 19,
    profile: "Profile2.png",
    profileBg: "#8ed819",
    nickname: "러닝러버",
    content: "한강 뛰기 좋은 날씨인데 같이 뛰실분? \n천천히 뛸거니까 초보분들도 환영입니다. \n부담없이 신청해주세요.",
    uid: 7,
    accept: [7, 4, 5, 6, 10],
    waiting: [2, 9]
  },
  {
    id: 6,
    endDate: setDateFormat(9),
    title: "취준 스터디 하실분 구해요",
    category: "Study",
    categoryName: "취업",
    place: "오프라인",
    nowPop: 3,
    fullPop: 5,
    read: 21,
    profile: "Profile3.png",
    profileBg: "#ff0045",
    nickname: "취뽀하자",
    content: "취준 스터디 하실분 구합니다. \n각자 공부할거라 직무 상관 없습니다. \n성실하게 임해주실 분들 신청주세요.",
    uid: 6,
    accept: [6, 1, 3],
    waiting: [2, 10]
  },
  {
    id: 5,
    endDate: setDateFormat(9),
    title: "덕질 모임!",
    category: "Hobby",
    categoryName: "덕질",
    place: "온라인",
    nowPop: 4,
    fullPop: 5,
    read: 23,
    profile: "Profile4.png",
    profileBg: "#8d2bf5",
    nickname: "덕질최고",
    content: "같이 아이돌 덕질하실 분들 구해봐요! \n혼자 덕질하기 외로운 분들 환영!",
    uid: 5,
    accept: [5, 6, 7, 8],
    waiting: [3, 4, 9]
  },
  {
    id: 4,
    endDate: setDateFormat(10),
    title: "5인랭 하실분",
    category: "Hobby",
    categoryName: "게임",
    place: "온라인",
    nowPop: 3,
    fullPop: 5,
    read: 78,
    profile: "Profile3.png",
    profileBg: "#ff0045",
    nickname: "롤선생",
    content: "다이아-에메구간 5인랭 하실분들 구합니다. \n현재 봇듀오 자리 남았습니다. \n디스코드 필수입니다.",
    uid: 4,
    accept: [4, 5, 10],
    waiting: [8]
  },
  {
    id: 3,
    endDate: setDateFormat(7),
    title: "공무원 준비는 크루크루!",
    category: "Study",
    categoryName: "고시/공무원",
    place: "오프라인",
    nowPop: 4,
    fullPop: 10,
    read: 42,
    profile: "Profile5.png",
    profileBg: "#ffd458",
    nickname: "고시생1",
    content: "크루크루에서 공무원 준비하실 분들 모집합니다! \n힘든 공시준비 다함께 이겨내요!",
    uid: 3,
    accept: [3, 1, 6, 7],
    waiting: []
  },
  {
    id: 2,
    endDate: setDateFormat(14),
    title: "요즘 트렌드는 크루크루!",
    category: "Hobby",
    categoryName: "트렌드",
    place: "온라인",
    nowPop: 1,
    fullPop: 3,
    read: 33,
    profile: "Profile1.png",
    profileBg: "#00b7ff",
    nickname: "크루크루",
    content: "요즘 트렌드는 크루크루! \n크루크루에서 핫한 트렌드에 예민한 분들 모집합니다!",
    uid: 2,
    accept: [2],
    waiting: [9, 10]
  },
  {
    id: 1,
    endDate: setDateFormat(12),
    title: "맛집탐방해요!",
    category: "Hobby",
    categoryName: "기타취미",
    place: "오프라인",
    nowPop: 2,
    fullPop: 4,
    read: 1,
    profile: "Profile4.png",
    profileBg: "#8d2bf5",
    nickname: "먹는게최고야",
    content: "같이 연희동 맛집탐방하실 분들 구해요! \n먹부림 자신 있는 분들 환영합니다! \n20대 분들 환영!",
    uid: 1,
    accept: [1, 5],
    waiting: [2, 4]
  },
]