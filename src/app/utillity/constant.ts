import { defaultIfEmpty } from "rxjs/operators";

export const baseUrl = "https://localhost:44318";

export const bloodGroupItems = [
  {
      id: 0,
      name: "A+"
  },
  {
      id: 1,
      name: "B+"
  },
  {
      id: 2,
      name: "AB+"
  },
  {
      id: 3,
      name: "O+"
  },
  {
      id: 4,
      name: "A-"
  },
  {
      id: 5,
      name: "B-"
  },
  {
      id: 6,
      name: "AB-"
  },
  {
      id: 7,
      name: "O-"
  },
  ]

export const getBloodGroupFromId = (id: number): string => {
  let p = "";
  switch (id) {
    case 0:
      p = "A+";
      break;
    case 1:
      p = "B+";
      break;
    case 2:
      p = "AB+";
      break;
    case 3:
      p = "O+";
      break;
    case 4:
      p = "A-";
      break;
    case 5:
      p = "B-";
      break;
    case 6:
      p = "AB-";
      break;
    case 7:
      p = "O-";
      break;
    }
    return p;
  }
