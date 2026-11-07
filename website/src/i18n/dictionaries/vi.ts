import type { Dictionary } from "./zh-tw";

// Tiếng Việt. Phải có cấu trúc giống hệt zh-tw.ts（漏翻譯會在編譯時報錯）。
const vi: Dictionary = {
  meta: {
    siteName: "Kiều Tiên Nail",
    description:
      "Kiều Tiên Nail — tiệm nail cao cấp tại Tam Hiệp, Tân Bắc: sơn gel, vẽ móng nghệ thuật, nối móng, chăm sóc chân và dưỡng tay bằng sáp paraffin.",
  },
  brand: {
    name: "Kiều Tiên",
    sub: "Nail",
  },
  nav: {
    home: "Trang chủ",
    about: "Giới thiệu",
    services: "Dịch vụ",
    gallery: "Mẫu nail",
    contact: "Liên hệ",
    faq: "Hỏi đáp",
    appointment: "Đặt lịch",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
    language: "Ngôn ngữ",
  },
  chat: {
    label: "Chat với chúng tôi qua Zalo",
    channel: "zalo",
  },
  common: {
    viewServices: "Xem dịch vụ",
    bookNow: "Đặt lịch ngay",
    learnMore: "Tìm hiểu thêm",
    viewGallery: "Xem mẫu nail",
    allServices: "Bảng giá đầy đủ",
    minutes: "{n} phút",
    fromSuffix: "trở lên",
    placeholderNote: "Ảnh minh họa",
  },
  home: {
    hero: {
      titleLines: ["Tận hưởng", "dịch vụ nail", "và chăm sóc cao cấp"],
      subtitle: "@ Kiều Tiên Nail",
      cta: "Xem dịch vụ",
      imageAlt: "Bộ móng dài màu xanh navy với hoa trắng vẽ tay và đường đá lấp lánh",
    },
    why: {
      title: "Vì sao chọn chúng tôi?",
      items: [
        {
          title: "Liệu trình sang trọng",
          text: "Từ dưỡng sáp paraffin, tinh dầu đến sơn gel tinh tế — mỗi bước đều mang lại trải nghiệm tuyệt vời.",
        },
        {
          title: "Sản phẩm cao cấp",
          text: "Chỉ sử dụng gel và sản phẩm dưỡng chất lượng cao, bền màu lâu và dịu nhẹ cho móng.",
        },
        {
          title: "Thợ có chứng chỉ",
          text: "Đội ngũ có chứng chỉ chuyên môn và nhiều năm kinh nghiệm, tỉ mỉ và chính xác.",
        },
        {
          title: "Không gian thư giãn",
          text: "Ánh sáng dịu, ghế êm và hương thơm nhẹ nhàng giúp bạn hoàn toàn thư giãn.",
        },
      ],
    },
    intro: {
      eyebrow: "Kiều Tiên Nail",
      strong: "Tiệm nail chuyên làm móng tay, móng chân với các liệu trình chăm sóc cao cấp, ",
      faded: "bao gồm dưỡng sáp paraffin và tinh dầu, nối móng gel và bột, đắp móng, cùng nhiều mẫu vẽ gel nghệ thuật.",
    },
    services: {
      title: "Dịch vụ nổi bật",
      subtitle: "Những liệu trình được yêu thích nhất, giá minh bạch, không phụ phí ẩn.",
    },
    gallery: {
      title: "Mẫu nail tiêu biểu",
      subtitle: "Mỗi bộ móng đều được thiết kế riêng cho từng khách hàng.",
    },
    cta: {
      title: "Sẵn sàng làm đẹp đôi tay?",
      text: "Tiệm làm việc theo lịch hẹn. Hãy đặt lịch qua Zalo, LINE hoặc điện thoại để giữ chỗ.",
      button: "Đặt lịch ngay",
    },
  },
  about: {
    title: "Giới thiệu",
    lead: "Mỗi lần làm nail là một lần chiều chuộng bản thân.",
    storyTitle: "Câu chuyện của chúng tôi",
    storyImageAlt: "Thợ nail đang chăm sóc móng tay cho khách",
    story: [
      "Kiều Tiên Nail được thành lập tại Tam Hiệp, Tân Bắc năm 2018. Người sáng lập Kiều Tiên có hơn mười năm kinh nghiệm và tin rằng làm nail không chỉ là trang trí, mà còn là cách chăm sóc bản thân.",
      "Đội ngũ của chúng tôi đến từ Đài Loan và Việt Nam, kết hợp nét vẽ tinh tế kiểu Nhật với phong cách lộng lẫy đang thịnh hành tại Việt Nam để tạo nên những thiết kế độc đáo.",
      "Từ khử trùng dụng cụ, chọn sản phẩm đến quy trình phục vụ, chúng tôi chăm chút từng chi tiết để bạn yên tâm và thư giãn.",
    ],
    valuesTitle: "Cam kết của chúng tôi",
    values: [
      { title: "Vệ sinh an toàn", text: "Dụng cụ kim loại được hấp tiệt trùng, dũa móng dùng riêng cho từng khách." },
      { title: "Thiết kế tinh tế", text: "Tư vấn theo dáng tay, màu da và sở thích để chọn mẫu phù hợp nhất." },
      { title: "Phục vụ tận tâm", text: "Không ép mua, không vội vàng, luôn lắng nghe nhu cầu của bạn." },
    ],
    teamTitle: "Đội ngũ",
    team: [
      { name: "Kiều Tiên", role: "Người sáng lập / Thợ chính", bio: "Hơn 10 năm kinh nghiệm, giỏi vẽ hoa và hiệu ứng ombre." },
      { name: "Linh", role: "Thợ nail lâu năm", bio: "Đến từ TP. Hồ Chí Minh, chuyên nối móng bột và đính đá 3D." },
      { name: "Yuki", role: "Thợ nail", bio: "Yêu phong cách tối giản kiểu Nhật, giỏi French và mắt mèo." },
    ],
  },
  services: {
    title: "Dịch vụ",
    lead: "Giá dưới đây chỉ để tham khảo, chi phí thực tế tùy theo độ phức tạp của mẫu và tình trạng móng. Hãy liên hệ để được tư vấn.",
    note: "※ Giá đã bao gồm dũa form và làm khóe cơ bản; tháo gel từ tiệm khác tính phí riêng.",
    categories: {
      hand: { name: "Sơn gel tay", desc: "Bền màu 3–4 tuần, bóng đẹp." },
      foot: { name: "Nail chân", desc: "Không thể thiếu cho mùa hè, hoàn hảo hơn khi kết hợp chăm sóc chân." },
      extension: { name: "Nối & đắp móng", desc: "Cải thiện dáng móng, giúp ngón tay thon dài." },
      care: { name: "Chăm sóc", desc: "Nâng niu đôi tay của bạn." },
    },
    items: {
      gelSolid: { name: "Sơn gel trơn", desc: "Hàng trăm màu, đơn giản và thanh lịch." },
      gelArt: { name: "Sơn gel vẽ mẫu", desc: "Vẽ tay, loang màu, đính đá theo yêu cầu." },
      french: { name: "Gel French", desc: "Đường viền French cổ điển, sang trọng." },
      catEye: { name: "Gel mắt mèo", desc: "Hiệu ứng nam châm lấp lánh theo góc nhìn." },
      footGel: { name: "Sơn gel chân trơn", desc: "Gồm dũa form và làm khóe chân." },
      footArt: { name: "Sơn gel chân vẽ mẫu", desc: "Thêm họa tiết hoặc đính đá theo sở thích." },
      footSpa: { name: "Spa chân", desc: "Ngâm chân, tẩy tế bào chết, massage và dưỡng ẩm." },
      extGel: { name: "Nối móng gel", desc: "Nhẹ và tự nhiên, gồm sơn gel trơn." },
      extAcrylic: { name: "Nối móng bột", desc: "Chắc chắn, phù hợp với móng dài." },
      overlay: { name: "Đắp gel cứng móng", desc: "Giúp móng mỏng, yếu chắc khỏe hơn." },
      paraffin: { name: "Dưỡng tay bằng sáp paraffin", desc: "Dưỡng ẩm sâu, cải thiện da khô ráp." },
      cuticle: { name: "Chăm sóc tay cơ bản", desc: "Dũa form, làm khóe và dưỡng móng." },
      removal: { name: "Tháo gel", desc: "Tháo nhẹ nhàng, không hại móng." },
    },
    table: {
      service: "Dịch vụ",
      duration: "Thời gian",
      price: "Giá",
    },
  },
  gallery: {
    title: "Mẫu nail",
    lead: "Những mẫu nail gần đây tại tiệm, bạn có thể tham khảo khi đặt lịch.",
    all: "Tất cả",
    categories: {
      gel: "Gel trơn",
      art: "Vẽ mẫu",
      french: "French",
      extension: "Nối móng",
      foot: "Nail chân",
    },
  },
  contact: {
    title: "Liên hệ",
    lead: "Đặt lịch hoặc hỏi đáp qua Zalo, LINE hay điện thoại — chúng tôi sẽ phản hồi sớm nhất.",
    addressLabel: "Địa chỉ",
    address: "Số 25, đường Trung Hiếu, quận Tam Hiệp, Tân Bắc (新北市三峽區忠孝街25號)",
    phoneLabel: "Điện thoại",
    emailLabel: "Email",
    hoursLabel: "Giờ mở cửa",
    hours: [
      { days: "Thứ Ba – Thứ Sáu", time: "11:00 – 21:00" },
      { days: "Thứ Bảy, Chủ Nhật", time: "10:00 – 19:00" },
      { days: "Thứ Hai", time: "Nghỉ" },
    ],
    bookingTitle: "Cách đặt lịch",
    bookingText: "Tiệm làm việc theo lịch hẹn. Vui lòng cho biết ngày, giờ và dịch vụ mong muốn; nếu có ảnh mẫu tham khảo, hãy gửi kèm nhé.",
    lineButton: "Đặt lịch qua LINE",
    zaloButton: "Đặt lịch qua Zalo",
    callButton: "Gọi điện đặt lịch",
    mapButton: "Mở Google Maps",
    followTitle: "Theo dõi chúng tôi",
  },
  faq: {
    title: "Hỏi đáp",
    lead: "Những điều bạn muốn biết trước khi đặt lịch.",
    items: [
      {
        q: "Có bắt buộc đặt lịch trước không?",
        a: "Tiệm làm việc theo lịch hẹn, nên đặt trước 2–3 ngày. Nếu còn trống, chúng tôi vẫn nhận khách đến trực tiếp — hãy gọi điện hỏi trước nhé.",
      },
      {
        q: "Sơn gel giữ được bao lâu?",
        a: "Thông thường khoảng 3–4 tuần, tùy tốc độ mọc móng và thói quen sinh hoạt.",
      },
      {
        q: "Tôi có thể mang ảnh mẫu tham khảo không?",
        a: "Rất hoan nghênh! Thợ sẽ tư vấn điều chỉnh cho phù hợp với dáng tay và tình trạng móng của bạn.",
      },
      {
        q: "Nếu đến trễ hoặc muốn hủy lịch thì sao?",
        a: "Nếu trễ hơn 15 phút, dịch vụ có thể phải điều chỉnh; muốn hủy hoặc đổi lịch, vui lòng báo trước một ngày.",
      },
      {
        q: "Chế độ bảo hành thế nào?",
        a: "Trong vòng 7 ngày, nếu móng bị bong hoặc hở không do tác động bên ngoài, chúng tôi sẽ sửa miễn phí.",
      },
      {
        q: "Tiệm có phục vụ bằng tiếng Việt không?",
        a: "Có, chúng tôi có thợ người Việt, bạn có thể giao tiếp hoàn toàn bằng tiếng Việt.",
      },
      {
        q: "Tiệm nhận những hình thức thanh toán nào?",
        a: "Tiền mặt, thẻ tín dụng và LINE Pay.",
      },
    ],
    moreTitle: "Bạn còn câu hỏi khác?",
    moreText: "Hãy liên hệ với chúng tôi qua Zalo, LINE hoặc điện thoại.",
  },
  footer: {
    tagline: "Mỗi lần làm nail là một lần chiều chuộng bản thân.",
    quickLinks: "Liên kết nhanh",
    contactTitle: "Thông tin liên hệ",
    follow: "Theo dõi chúng tôi",
    rights: "Bảo lưu mọi quyền",
  },
};

export default vi;
