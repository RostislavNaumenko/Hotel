export const dataUser = [
  {
    _id: "63701cc1f03239c72c00017f",
    name: "Konstantine",
    surname: "Krasovski",
    email: "kranstead0@narod.ru",
    password: "omMDCh",
    occupation: "Computer Systems Analyst",
    phoneNumber: "8346315874",
    role: "user",
  },
  {
    _id: "63701cc1f03239c72c000180",
    name: "Rostyslav",
    surname: "Naumenko",
    email: "ros@gmail.com",
    password: "12345",
    occupation: "Director",
    phoneNumber: "+380974286321",
    role: "admin",
  },
  {
    _id: "63701cc1f03239c72c000181",
    name: "Olly",
    surname: "Abramov",
    email: "oveneur2@marketwatch.com",
    password: "55555",
    occupation: "Staff Scientist",
    phoneNumber: "3868813669",
    role: "user",
  },
  {
    _id: "63701cc1f03239c72c000182",
    name: "Hale",
    surname: "Smit",
    email: "ufgerfr@gmail.com",
    password: "44444",
    occupation: "Associate Professor",
    phoneNumber: "8535391908",
    role: "admin",
  },
  {
    _id: "63701cc1f03239c72c000183",
    name: "Anna",
    surname: "Derk",
    email: "hpyrah3@bbc.co.uk",
    password: "44444",
    occupation: "API",
    phoneNumber: "2312334",
    role: "user",
  }
]
export const dataDailyPlan = [
  {
    _id: "63701d24f03239c72c000001",
    userId: "63701cc1f03239c72c000182",
    rooms: [{
      roomId: "63701d24f03239c72c00018e",
    }],

  },
  {
    _id: "63701d24f03239c72c000002",
    userId: "63701cc1f03239c72c000182",
    rooms: [{
      roomId: "63701d24f03239c72c000190"
    }]
  },

]
export const dataRoom = [
  {
    _id: "63701d24f03239c72c00018e",
    roomNumber: 101,
    floor: 1,
    countOfVisitors: 1,
  },
  {
    _id: "63701d24f03239c72c000190",
    roomNumber: 102,
    floor: 1,
    countOfVisitors: 2,
  },
  {
    _id: "63701d24f03239c72c000191",
    roomNumber: 103,
    floor: 1,
    countOfVisitors: 2,
  },
  {
    _id: "63701d24f03239c72c000192",
    roomNumber: 104,
    floor: 1,
    countOfVisitors: 2,
  },
  {
    _id: "63701d24f03239c72c000193",
    roomNumber: 105,
    floor: 1,
    countOfVisitors: 2,
  }, {
    _id: "63701d24f03239c72c000194",
    roomNumber: 106,
    floor: 1,
    countOfVisitors: 2,
  },
  {
    _id: "63701d24f03239c72c000195",
    roomNumber: 107,
    floor: 1,
    countOfVisitors: 2,
  },
  {
    _id: "63701d24f03239c72c000196",
    roomNumber: 108,
    floor: 1,
    countOfVisitors: 2,
  },

  {
    _id: "63701d24f03239c72c000197",
    roomNumber: 109,
    floor: 1,
    countOfVisitors: 3,
  },
  {
    _id: "63701d24f03239c72c000198",
    roomNumber: 110,
    floor: 1,
    countOfVisitors: 4,
  },
  {
    _id: "63701d24f03239c72c000199",
    roomNumber: 201,
    floor: 2,
    countOfVisitors: 1,
  },
  {
    _id: "63701d24f03239c72c000200",
    roomNumber: 202,
    floor: 2,
    countOfVisitors: 2,
  },
  {
    _id: "63701d24f03239c72c000201",
    roomNumber: 203,
    floor: 2,
    countOfVisitors: 2,
  },
  {
    _id: "63701d24f03239c72c000202",
    roomNumber: 204,
    floor: 2,
    countOfVisitors: 2,
  },
]

export const dataRoomStat = [
  {
    _id: "6371259df03239e680000001",
    userId: "63701cc1f03239c72c000182",
    roomId: "63701d24f03239c72c00018e",
    typeOfWork: "AB",
    cost: 14,
    date: "2023-04-03",
    descriptions: "Make bed well!",
    status: "Done"
  },
  {
    _id: "6371259df03239e680000002",
    userId: "63701cc1f03239c72c000182",
    roomId: "63701d24f03239c72c00018e",
    typeOfWork: "BL",
    descriptions: "Make bed well!",
    cost: 10,
    date: "2023-04-02",
    status: "Done"
  },
  {
    _id: "6371259df03239e680000003",
    userId: "63701cc1f03239c72c000181",
    roomId: "63701d24f03239c72c000190",
    typeOfWork: "AB",
    descriptions: "Make bed well!",
    cost: 10,
    date: "2023-04-02",
    status: "Done"
  },
  {
    _id: "6371259df03239e680000004",
    userId: "63701cc1f03239c72c000181",
    roomId: "63701d24f03239c72c000190",
    typeOfWork: "AB",
    descriptions: "Make bed well!",
    cost: 14,
    date: "2023-04-03",
    status: "Done"
  },
  {
    _id: "6371259df03239e680000005",
    userId: "63701cc1f03239c72c000181",
    roomId: "63701d24f03239c72c000191",
    typeOfWork: "AB",
    descriptions: "Make bed well!",
    cost: 14,
    date: "2023-04-02",
    status: "Done"
  },
  {
    _id: "6371259df03239e680000006",
    userId: "63701cc1f03239c72c000181",
    roomId: "63701d24f03239c72c000192",
    typeOfWork: "AB",
    descriptions: "Make bed well!",
    cost: 14,
    date: "2023-04-02", 
    status: "Done"
  },
  {
    _id: "6371259df03239e680000007",
    userId: "63701cc1f03239c72c000181",
    roomId: "63701d24f03239c72c000193",
    typeOfWork: "AB",
    descriptions: "Make bed well!",
    cost: 14,
    date: "2023-04-02",
    status: "Done"
  },
  {
    _id: "6371259df03239e680000008",
    userId: "63701cc1f03239c72c000180",
    roomId: "63701d24f03239c72c000194",
    typeOfWork: "AB",
    descriptions: "Make bed well!",
    cost: 14,
    date: "2023-04-02", 
    status: "Done"
  },
  {
    _id: "6371259df03239e680000017",
    userId: "63701cc1f03239c72c000180",
    roomId: "63701d24f03239c72c000195",
    typeOfWork: "AB",
    descriptions: "Make bed well!",
    cost: 14,
    date: "2023-04-02",
    status: "Done"
  },
  {
    _id: "6371259df03239e680000016",
    userId: "63701cc1f03239c72c000180",
    roomId: "63701d24f03239c72c000196",
    typeOfWork: "AB",
    descriptions: "Make bed well!",
    cost: 14,
    date: "2023-04-02",
    status: "Done"
  },
  {
    _id: "6371259df03239e680000009",
    userId: "63701cc1f03239c72c000180",
    roomId: "63701d24f03239c72c000197",
    typeOfWork: "AB",
    descriptions: "Make bed well!",
    cost: 14,
    date: "2023-04-02",
    status: "Done"
  },
  {
    _id: "6371259df03239e680000010",
    userId: "63701cc1f03239c72c000180",
    roomId: "63701d24f03239c72c000198",
    typeOfWork: "AB",
    descriptions: "Make bed well!",
    cost: 14,
    date: "2023-04-02",
    status: "Done"
  },
  {
    _id: "6371259df03239e680000011",
    userId: "63701cc1f03239c72c00017f",
    roomId: "63701d24f03239c72c000199",
    typeOfWork: "AB",
    descriptions: "Make bed well!",
    cost: 14,
    date: "2023-04-02",
    status: "Done"
  },
  {
    _id: "6371259df03239e680000012",
    userId: "63701cc1f03239c72c00017f",
    roomId: "63701d24f03239c72c000200",
    typeOfWork: "AB",
    descriptions: "Make bed well!",
    cost: 14,
    date: "2023-04-02",
    status: "Done"
  },
  {
    _id: "6371259df03239e680000013",
    userId: "63701cc1f03239c72c00017f",
    roomId: "63701d24f03239c72c000201",
    typeOfWork: "AB",
    descriptions: "Make bed well!",
    cost: 14,
    date: "2023-04-02",
    status: "Done"
  },
  {
    _id: "6371259df03239e680000015",
    userId: "63701cc1f03239c72c000183",
    roomId: "63701d24f03239c72c000202",
    typeOfWork: "AB",
    descriptions: "Make bed well!",
    cost: 14,
    date: "2023-04-02",
    status: "Done"
  },
]