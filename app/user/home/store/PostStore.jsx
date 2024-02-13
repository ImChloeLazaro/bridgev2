import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { atom } from "jotai";
import "../../../aws-auth";
import { restread } from "@/app/utils/amplify-rest";
let index = 0;

export const postAtom = atom([
  // {
  //   id: (index += 1),
  //   key: `post-${index}`,
  //   publisher: "Tatiana Philips",
  //   publishKey: `publish-${index}`,
  //   profileURL: "/Tatiana Philips.png",
  //   datetimePublished: "2024-01-14T23:00:00",
  //   datetimeScheduled: "2024-01-14T23:00:00",
  //   title: "Momentum /SEPTEMBER 2023",
  //   caption:
  //     "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! \n\n-Chris Kendall",
  //   type: "feedback",
  //   reactionList: ["star"],
  //   reacted: false,
  //   reactions: {
  //     star: 130,
  //     love: 30,
  //     birthday: 0,
  //     happy: 13,
  //   },
  //   comments: 115,
  //   media: [
  //     "/Tatiana Philips.png",
  //     "/Wilson Herwitz.png",
  //     "/Aspen Donin.png",
  //     "/Skylar Curtis.png",
  //     "/Madelyn Septimus.png",
  //     "/Kaylynn Bergson.png",
  //     "/Tatiana Philips.png",
  //     "/Wilson Herwitz.png",
  //     "/Aspen Donin.png",
  //     "/Skylar Curtis.png",
  //     "/Madelyn Septimus.png",
  //     "/Kaylynn Bergson.png",
  //     "/Tatiana Philips.png",
  //     "/Wilson Herwitz.png",
  //     "/Aspen Donin.png",
  //     "/Skylar Curtis.png",
  //     "/Madelyn Septimus.png",
  //     "/Kaylynn Bergson.png",
  //   ],
  // },
  // {
  //   id: (index += 1),
  //   key: `post-${index}`,
  //   publisher: "Wilson Herwitz",
  //   publishKey: `publish-${index}`,
  //   profileURL: "/Wilson Herwitz.png",
  //   datetimePublished: "2024-01-09T14:00:00",
  //   datetimeScheduled: "2024-01-09T14:00:00",
  //   title: "Activities for September",
  //   caption:
  //     "ARETEX has expanded its reach to Laoag City in Ilocos Norte. We have opened our second office as a core tenant in the new and very beautiful, modern Polandy Building. Thanks to a tremendous effort by everyone involved with the fotout, our new office was blessed by Rev. Msgr. Joel Bruno C. Barut, VG., the Team Ministry Moderator of St. William The Hermit Cathedral Parish on Friday 29 September. We will have a formal opening ceremony in December. We also met with senior academic staff at Mariano Marcos State University to meet the new interns from their program, and they are delighted with our support for their program and creating opportunities for the students. I am excited to watch the new chapter unfold as we continue to recruit new talent to join us on the A-Family journey. ",
  //   type: "news",
  //   reactionList: ["love"],
  //   reacted: false,
  //   reactions: {
  //     star: 0,
  //     love: 148,
  //     birthday: 0,
  //     happy: 0,
  //   },
  //   comments: 91,
  //   media: ["/Tatiana Philips.png", "/Wilson Herwitz.png", "/Aspen Donin.png"],
  // },
  // {
  //   id: (index += 1),
  //   key: `post-${index}`,
  //   publisher: "Kaylynn Bergson",
  //   publishKey: `publish-${index}`,
  //   profileURL: "/Kaylynn Bergson.png",
  //   datetimePublished: "2023-01-09T14:00:00",
  //   datetimeScheduled: "2023-01-09T14:00:00",
  //   title: "FAMILY DAY & MUSIC FEST",
  //   caption:
  //     "To commemorate ARETEX's September FOCUS theme, the committee for the said event implemented a Family day & Music fest last September 8, 2023 in Chatham House, Makati. Activities within the end-of-month event were the REX winner announcement and Quarter 3 ticket raffle draw; Family Fun Day; and Live Music. ",
  //   type: "event",
  //   reactionList: ["happy"],
  //   reacted: false,
  //   reactions: {
  //     star: 6,
  //     love: 135,
  //     birthday: 0,
  //     happy: 40,
  //   },
  //   comments: 41,
  //   media: [
  //     "/Tatiana Philips.png",
  //     "/Wilson Herwitz.png",
  //     "/Aspen Donin.png",
  //     "/Skylar Curtis.png",
  //   ],
  // },
  // {
  //   id: (index += 1),
  //   key: `post-${index}`,
  //   publisher: "Aspen Donin",
  //   publishKey: `publish-${index}`,
  //   profileURL: "/Aspen Donin.png",
  //   datetimePublished: "2024-01-01T12:00:00",
  //   datetimeScheduled: "2024-01-01T12:00:00",
  //   title: "NEW TEAM MEMBERS",
  //   caption:
  //     "We are delighted to welcome our new Team mates to the Aretex Family.",
  //   type: "team",
  //   reactionList: ["star"],
  //   reacted: false,
  //   reactions: {
  //     star: 122,
  //     love: 20,
  //     birthday: 0,
  //     happy: 4,
  //   },
  //   comments: 75,
  //   media: ["/Tatiana Philips.png", "/Wilson Herwitz.png"],
  // },
  // {
  //   id: (index += 1),
  //   key: `post-${index}`,
  //   publisher: "Skylar Curtis",
  //   publishKey: `publish-${index}`,
  //   profileURL: "/Skylar Curtis.png",
  //   datetimePublished: "2024-01-14T14:00:00",
  //   datetimeScheduled: "2024-01-14T14:00:00",
  //   title: "HAPPY BIRTHDAY!!!",
  //   caption:
  //     "“ Another adventure filled year awaits you. Welcome it by celebrating your birthday with pomp and splendor. Wishing you a very happy and fun-filled birthday!”",
  //   type: "birthday",
  //   reactionList: ["birthday"],
  //   reacted: false,
  //   reactions: {
  //     star: 0,
  //     love: 0,
  //     birthday: 134,
  //     happy: 0,
  //   },
  //   comments: 105,
  //   media: ["/Tatiana Philips.png"],
  // },
  // {
  //   id: (index += 1),
  //   key: `post-${index}`,
  //   publisher: "Madelyn Septimus",
  //   publishKey: `publish-${index}`,
  //   profileURL: "/Madelyn Septimus.png",
  //   datetimePublished: "2024-01-14T20:00:00",
  //   datetimeScheduled: "2024-01-14T20:00:00",
  //   title: "REX OCTOBER WINNER 2023",
  //   caption:
  //     "Jenny has received great feedback from several of her clients for her outstanding contribution to their business with a determined focus on quality. She has been exceeding their expectations daily, and they know they can rely on Jenny to handle the necessary tasks sp they can focus on running their business and serving their clients. To quote Dr. Kim's exact words, 'doing the grunt work of the business in the background', showing the trust that her clients place on Jenny to handle their needs when they're on vacation or doing other high level tasks for their business. Well done Jenny, a deserving winner of Rex for September. \n\n-Kamille Ferareza",
  //   type: "award",
  //   reactionList: ["star"],
  //   reacted: false,
  //   reactions: {
  //     star: 186,
  //     love: 0,
  //     birthday: 0,
  //     happy: 0,
  //   },
  //   comments: 101,
  //   media: [
  //     "/Tatiana Philips.png",
  //     "/Wilson Herwitz.png",
  //     "/Aspen Donin.png",
  //     "/Skylar Curtis.png",
  //     "/Madelyn Septimus.png",
  //   ],
  // },
]);

export const addPostAtom = atom(null, (get, set, update) => {
  set(postAtom, update);
  console.log("ADDED POST", get(postAtom));
});

export const postCountAtom = atom((get) => get(postAtom).length);

export const fetchedPostAtom = atom(null, async (get, set) => {
  const posts = await restread("/post");

  console.log("FETCHED POSTS FOR FEED");
  console.log("POSTS SUCCESS", posts.success);
  console.log("POSTS DATA", posts.data);

  // set(postAtom)
});
