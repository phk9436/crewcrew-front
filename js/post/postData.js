const getDummyEndDate = (n) => {
  //임의로 n일 뒤에 마감되는 데이터 세팅하기 위함
  const date = new Date();
  const endDate = date;
  endDate.setDate(date.getDate() + n);
  const year = endDate.getFullYear();
  const month = `${endDate.getMonth() + 1}`.padStart(2, '0');
  const day = `${endDate.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export let postData = [
  {
    id: 10,
    dateDiff: '4',
    endDate: getDummyEndDate(4),
    title: "함께 크루원 모집 플랫폼 작업하실 분 모십니다!",
    category: "Study",
    categoryName: "프로젝트",
    place: "온라인",
    nowPop: 9,
    fullPop: 10,
    read: 20,
    profile: "Profile4.png",
    profileBg: "#8d2bf5",
    nickname: "고슴도치"
  },
  {
    id: 9,
    dateDiff: '6',
    endDate: getDummyEndDate(6),
    title: "일본어 스터디 해요!",
    category: "Study",
    categoryName: "어학",
    place: "오프라인",
    nowPop: 7,
    fullPop: 8,
    read: 10,
    profile: "Profile1.png",
    profileBg: "#00b7ff",
    nickname: "일본어덕후"
  },
  {
    id: 8,
    dateDiff: '3',
    endDate: getDummyEndDate(3),
    title: "요리 좋아하시는 분?",
    category: "Hobby",
    categoryName: "요리",
    place: "오프라인",
    nowPop: 1,
    fullPop: 4,
    read: 15,
    profile: "Profile2.png",
    profileBg: "#8ed819",
    nickname: "백종원"
  },
  {
    id: 7,
    dateDiff: '4',
    endDate: getDummyEndDate(4),
    title: "한강 러닝 뛰실분 모집합니다",
    category: "Hobby",
    categoryName: "운동",
    place: "오프라인",
    nowPop: 5,
    fullPop: 10,
    read: 19,
    profile: "Profile2.png",
    profileBg: "#8ed819",
    nickname: "러닝러버"
  },
  {
    id: 6,
    dateDiff: '2',
    endDate: getDummyEndDate(2),
    title: "취준 스터디 하실분 구해요",
    category: "Study",
    categoryName: "취업",
    place: "오프라인",
    nowPop: 3,
    fullPop: 5,
    read: 21,
    profile: "Profile3.png",
    profileBg: "#ff0045",
    nickname: "취뽀하자"
  },
  {
    id: 5,
    dateDiff: '1',
    endDate: getDummyEndDate(1),
    title: "덕질 모임!",
    category: "Hobby",
    categoryName: "덕질",
    place: "온라인",
    nowPop: 4,
    fullPop: 5,
    read: 23,
    profile: "Profile4.png",
    profileBg: "#8d2bf5",
    nickname: "덕질최고"
  },
  {
    id: 4,
    dateDiff: '2',
    endDate: getDummyEndDate(2),
    title: "5인랭 하실분",
    category: "Hobby",
    categoryName: "게임",
    place: "온라인",
    nowPop: 3,
    fullPop: 5,
    read: 78,
    profile: "Profile3.png",
    profileBg: "#ff0045",
    nickname: "롤선생"
  },
  {
    id: 3,
    dateDiff: '7',
    endDate: getDummyEndDate(7),
    title: "공무원 준비는 크루크루!",
    category: "Study",
    categoryName: "고시/공무원",
    place: "오프라인",
    nowPop: 4,
    fullPop: 10,
    read: 42,
    profile: "Profile5.png",
    profileBg: "#ffd458",
    nickname: "고시생1"
  },
  {
    id: 2,
    dateDiff: '5',
    endDate: getDummyEndDate(5),
    title: "요즘 트렌드는 크루크루!",
    category: "Hobby",
    categoryName: "트렌드",
    place: "온라인",
    nowPop: 1,
    fullPop: 3,
    read: 33,
    profile: "Profile1.png",
    profileBg: "#00b7ff",
    nickname: "크루크루"
  },
  {
    id: 1,
    dateDiff: '4',
    endDate: getDummyEndDate(4),
    title: "맛집탐방해요!",
    category: "Hobby",
    categoryName: "기타취미",
    place: "오프라인",
    nowPop: 2,
    fullPop: 4,
    read: 1,
    profile: "Profile4.png",
    profileBg: "#8d2bf5",
    nickname: "먹는게최고야"
  },
]