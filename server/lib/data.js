function convertToSlug(string) {
  const a =
    "àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;";
  const b =
    "aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");
  return string
    .toString()
    .toLowerCase()
    .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a")
    .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e")
    .replace(/i|í|ì|ỉ|ĩ|ị/gi, "i")
    .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o")
    .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u")
    .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y")
    .replace(/đ/gi, "d")
    .replace(/\s+/g, "-")
    .replace(p, (c) => b.charAt(a.indexOf(c)))
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}
const datablog = [
  {
    // distance: 70,
    Gioitinh: "Nữ",
    phone: "0886506122",
    timeStart: "03:50",
    timeEnd: "05:50",
    date: "2024/04/29",
    slotCustomer: 30,
    title: "Giao lưu vui vẻ 1",
    stadium: "Quy Nhơn",
    content:
      "Hoạt động giao lưu cầu lông không chỉ giúp cải thiện kỹ năng chơi cầu lông của người tham gia mà còn tạo ra một môi trường thú vị và hứng khởi để tương tác với những người cùng sở thích. Nó cũng có thể là cơ hội tuyệt vời để xây dựng mối quan hệ xã hội và giao lưu với những người mới.",
    image: "https://www.completesports.com/wp-content/uploads/Badminton.jpg",
    location: "Sân 286 Nguyễn Xiển (1991), P. Thanh Xuân Nam, Q. Thanh Xuân, ",
    city: "Hà Nội",
    time: "Thứ 5, 11/04/2024, 15:00 - 17:00",
    rank: "Khá - TB",
    pricemin: 50000,
    pricemax: 90000,
  },
  {
    // distance: 22,
    Gioitinh: "Nữ",
    phone: "0886506122",
    timeStart: "03:50",
    timeEnd: "05:50",
    date: "2024/04/29",
    slotCustomer: 30,
    title: "Giao lưu vui vẻ 2",
    stadium: "Mỹ Đình",
    content:
      "Giao lưu cầu lông là một hoạt động thể thao và giải trí mà người chơi cầu lông tham gia để tương tác và rèn luyện kỹ năng. Trong giao lưu cầu lông, các vận động viên thường chia nhóm và thi đấu với nhau trong các trận đấu ngắn, thường là đấu đơn hoặc đôi.",
    image:
      "https://www.shutterstock.com/image-photo/badminton-rackets-white-cream-shuttlecocks-600nw-2291468727.jpg",
    location: "Sân 286 Nguyễn Xiển (1991), P. Thanh Xuân Nam, Q. Thanh Xuân, ",
    city: "Hà Nội",
    time: "Thứ 5, 11/04/2024, 15:00 - 17:00",
    rank: "Thấp - Khá",
    pricemin: 100000,
    pricemax: 200000,
  },
  {
    // distance: 50,
    Gioitinh: "Nữ",
    phone: "0886506122",
    timeStart: "03:50",
    timeEnd: "05:50",
    date: "2024/04/29",
    slotCustomer: 30,
    title: "Giao lưu vui vẻ 3",
    stadium: "Lào cai",
    content:
      "Hoạt động giao lưu cầu lông không chỉ giúp cải thiện kỹ năng chơi cầu lông của người tham gia mà còn tạo ra một môi trường thú vị và hứng khởi để tương tác với những người cùng sở thích. Nó cũng có thể là cơ hội tuyệt vời để xây dựng mối quan hệ xã hội và giao lưu với những người mới.",
    image:
      "https://vcdn1-english.vnecdn.net/2023/03/12/badmin-1678608765-5266-1678608789.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=JC9QK25luh3E3Zqf2uxorg",
    location: "Sân 286 Nguyễn Xiển (1991), P. Thanh Xuân Nam, Q. Thanh Xuân, ",
    city: "Hà Nội",
    time: "Thứ 5, 11/04/2024, 15:00 - 17:00",
    rank: "Khá - Tốt",
    pricemin: 100000,
    pricemax: 200000,
  },
  {
    // distance: 25,
    Gioitinh: "Nữ",
    phone: "0886506122",
    timeStart: "03:50",
    timeEnd: "05:50",
    date: "2024/04/29",
    slotCustomer: 30,
    title: "Giao lưu vui vẻ 4",
    stadium: "Lạng Sơn",
    content:
      "Giao lưu cầu lông là một hoạt động thể thao và giải trí mà người chơi cầu lông tham gia để tương tác và rèn luyện kỹ năng. Trong giao lưu cầu lông, các vận động viên thường chia nhóm và thi đấu với nhau trong các trận đấu ngắn, thường là đấu đơn hoặc đôi.",
    image:
      "https://toc.h-cdn.co/assets/16/30/2560x1920/sd-aspect-1469562775-gettyimages-452846870.jpg",
    location: "Sân 286 Nguyễn Xiển (1991), P. Thanh Xuân Nam, Q. Thanh Xuân, ",
    city: "Hà Nội",
    time: "Thứ 5, 11/04/2024, 15:00 - 17:00",
    rank: "Khá - TB",
    pricemin: 50000,
    pricemax: 200000,
  },
  {
    // distance: 26,
    Gioitinh: "Nữ",
    phone: "0886506122",
    timeStart: "03:50",
    timeEnd: "05:50",
    date: "2024/04/29",
    slotCustomer: 30,
    title: "Giao lưu vui vẻ 5",
    stadium: "Nha Trang",
    content:
      "Giao lưu cầu lông là một hoạt động thể thao và giải trí mà người chơi cầu lông tham gia để tương tác và rèn luyện kỹ năng. Trong giao lưu cầu lông, các vận động viên thường chia nhóm và thi đấu với nhau trong các trận đấu ngắn, thường là đấu đơn hoặc đôi.",
    image: "https://www.completesports.com/wp-content/uploads/Badminton.jpg",
    location: "Sân 286 Nguyễn Xiển (1991), P. Thanh Xuân Nam, Q. Thanh Xuân, ",
    city: "Hà Nội",
    time: "Thứ 5, 11/04/2024, 15:00 - 17:00",
    rank: "Khá - TB",
    pricemin: 50000,
    pricemax: 200000,
  },
  {
    // distance: 30,
    Gioitinh: "Nữ",
    phone: "0886506122",
    timeStart: "03:50",
    timeEnd: "05:50",
    date: "2024/04/29",
    slotCustomer: 30,
    title: "Giao lưu vui vẻ khu vực hcm",
    stadium: "Mỹ Sơn",
    content:
      "Hoạt động giao lưu cầu lông không chỉ giúp cải thiện kỹ năng chơi cầu lông của người tham gia mà còn tạo ra một môi trường thú vị và hứng khởi để tương tác với những người cùng sở thích. Nó cũng có thể là cơ hội tuyệt vời để xây dựng mối quan hệ xã hội và giao lưu với những người mới.",
    image:
      "https://www.lta.org.uk/491dd5/siteassets/news/2023/february/badminton-court.jpg?w=1200",
    location: " P. Thanh Xuân Nam, Q. Thanh Xuân, ",
    city: "Hà Nội",
    time: "Thứ 5, 11/04/2024, 15:00 - 17:00",
    rank: "Khá - TB",
    pricemin: 50000,
    pricemax: 200000,
  },
  {
    // distance: 40,
    Gioitinh: "Nữ",
    phone: "0886506122",
    timeStart: "03:50",
    timeEnd: "05:50",
    date: "2024/04/29",
    slotCustomer: 30,
    title: "Giao lưu vui vẻ 6",
    stadium: "Mỹ Sơn",
    content:
      "Hoạt động giao lưu cầu lông không chỉ giúp cải thiện kỹ năng chơi cầu lông của người tham gia mà còn tạo ra một môi trường thú vị và hứng khởi để tương tác với những người cùng sở thích. Nó cũng có thể là cơ hội tuyệt vời để xây dựng mối quan hệ xã hội và giao lưu với những người mới.",
    image: "https://www.completesports.com/wp-content/uploads/Badminton.jpg",
    location: " P. Thanh Xuân Nam, Q. Thanh Xuân, ",
    city: "TP.Hồ Chí Minh",
    time: "Thứ 5, 11/04/2024, 15:00 - 17:00",
    rank: "Khá - Tôt",
    pricemin: 50000,
    pricemax: 100000,
  },
];
const datablogWithUrl = datablog.map((post) => ({
  ...post,
  url: convertToSlug(post.title),
}));
module.exports = { datablog: datablogWithUrl };
