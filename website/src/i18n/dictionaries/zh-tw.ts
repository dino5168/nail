// 繁體中文字典。此檔的結構即為所有語系必須遵守的 Dictionary 型別。
const zhTw = {
  meta: {
    siteName: "嬌仙美甲 Kieu Tien Nail",
    description:
      "嬌仙美甲 — 位於新北市三峽的精緻美甲沙龍，提供凝膠指甲、手繪造型、延甲、足部保養與石蠟護理。",
  },
  brand: {
    name: "嬌仙美甲",
    sub: "Kieu Tien Nail",
  },
  nav: {
    home: "首頁",
    about: "關於我們",
    services: "服務項目",
    gallery: "作品集",
    contact: "聯絡我們",
    faq: "常見問題",
    appointment: "立即預約",
    openMenu: "開啟選單",
    closeMenu: "關閉選單",
    language: "語言",
  },
  chat: {
    label: "LINE 線上諮詢",
  },
  common: {
    viewServices: "查看服務",
    bookNow: "立即預約",
    learnMore: "了解更多",
    viewGallery: "瀏覽作品集",
    allServices: "完整價目表",
    minutes: "{n} 分鐘",
    fromSuffix: "起",
    placeholderNote: "示意圖",
  },
  home: {
    hero: {
      titleLines: ["沉浸於", "極致奢華的", "美甲與手足保養"],
      subtitle: "@ 嬌仙美甲 Kieu Tien Nail",
      cta: "查看服務",
      imageAlt: "深藍色長方形美甲，搭配白色手繪花朵與水鑽線條",
    },
    why: {
      title: "為什麼選擇我們？",
      items: [
        {
          title: "奢華療程",
          text: "從石蠟護理、精油保養到精緻凝膠，每一個步驟都為您帶來無與倫比的享受。",
        },
        {
          title: "頂級產品",
          text: "只選用通過檢驗的優質品牌凝膠與保養品，持色更久、對指甲更溫和。",
        },
        {
          title: "專業認證",
          text: "美甲師皆具專業證照與多年經驗，細心、精準，為您打造理想的指尖風格。",
        },
        {
          title: "放鬆氛圍",
          text: "柔和燈光、舒適座椅與香氛環境，讓您在美麗的同時徹底放鬆身心。",
        },
      ],
    },
    intro: {
      eyebrow: "嬌仙美甲 Kieu Tien Nail",
      strong: "專注手足美甲與保養的精品沙龍，以奢華療程呵護每一雙手，",
      faded: "提供石蠟與精油護理、凝膠與水晶延甲、加厚補強，以及各式手繪凝膠造型。",
    },
    services: {
      title: "熱門服務",
      subtitle: "最受顧客喜愛的療程，價格透明、不另收隱藏費用。",
    },
    gallery: {
      title: "作品精選",
      subtitle: "每一組指甲都是為客人量身設計的作品。",
    },
    cta: {
      title: "準備好讓指尖綻放了嗎？",
      text: "採預約制，透過 LINE 或電話預約，我們會為您保留專屬時段。",
      button: "立即預約",
    },
  },
  about: {
    title: "關於我們",
    lead: "讓每一次美甲，都是一段寵愛自己的時光。",
    storyTitle: "我們的故事",
    storyImageAlt: "美甲師正在為客人進行手部保養",
    story: [
      "嬌仙美甲於 2018 年在新北三峽成立，創辦人 Kieu Tien 擁有十年以上的美甲經驗。她相信美甲不只是裝飾，更是一種照顧自己的方式。",
      "我們的團隊來自台灣與越南，擅長日系細緻手繪與越南流行的華麗造型，結合兩地美學，為客人打造獨一無二的設計。",
      "從工具消毒、產品選擇到服務流程，我們堅持每一個細節，只為讓您安心、放鬆地享受美麗。",
    ],
    valuesTitle: "我們的堅持",
    values: [
      { title: "衛生安全", text: "金屬工具高溫消毒、銼刀一客一換，打造安心的美甲環境。" },
      { title: "細膩設計", text: "依照手型、膚色與喜好給予建議，設計最適合您的款式。" },
      { title: "溫柔服務", text: "不推銷、不趕時間，用心聆聽每位客人的需求。" },
    ],
    teamTitle: "美甲團隊",
    team: [
      { name: "Kieu Tien", role: "創辦人／首席美甲師", bio: "十年以上經驗，擅長手繪花卉與漸層設計。" },
      { name: "Linh", role: "資深美甲師", bio: "來自胡志明市，專精水晶延甲與立體飾品造型。" },
      { name: "Yuki", role: "美甲師", bio: "日系簡約風格愛好者，擅長法式與貓眼凝膠。" },
    ],
  },
  services: {
    title: "服務項目",
    lead: "以下為參考價格，實際費用依設計複雜度與指甲狀況而定，歡迎事先諮詢。",
    note: "※ 價格皆含基礎修型與甘皮整理；卸除他店凝膠另計。",
    categories: {
      hand: { name: "手部凝膠", desc: "持色 3–4 週，光澤亮麗。" },
      foot: { name: "足部美甲", desc: "夏日必備，搭配足部保養更完美。" },
      extension: { name: "延甲與加厚", desc: "改善指甲形狀，打造修長手指。" },
      care: { name: "保養護理", desc: "給雙手最溫柔的呵護。" },
    },
    items: {
      gelSolid: { name: "單色凝膠", desc: "百色可選，簡約耐看。" },
      gelArt: { name: "造型凝膠", desc: "手繪、暈染、飾品等客製設計。" },
      french: { name: "法式凝膠", desc: "經典優雅的法式線條。" },
      catEye: { name: "貓眼凝膠", desc: "磁吸光澤，隨角度流動閃耀。" },
      footGel: { name: "足部單色凝膠", desc: "含足部修型與甘皮整理。" },
      footArt: { name: "足部造型凝膠", desc: "依喜好加入彩繪或飾品。" },
      footSpa: { name: "足部 SPA 保養", desc: "浸泡、去角質、按摩與保濕。" },
      extGel: { name: "凝膠延甲", desc: "輕盈自然，含單色凝膠。" },
      extAcrylic: { name: "水晶延甲", desc: "堅固耐用，適合長甲造型。" },
      overlay: { name: "指甲加厚補強", desc: "改善薄軟易斷的指甲。" },
      paraffin: { name: "手部石蠟護理", desc: "深層滋潤，改善乾燥粗糙。" },
      cuticle: { name: "基礎手部保養", desc: "修型、甘皮整理與護甲油。" },
      removal: { name: "卸甲", desc: "溫和卸除，不傷甲面。" },
    },
    table: {
      service: "項目",
      duration: "時間",
      price: "價格",
    },
  },
  gallery: {
    title: "作品集",
    lead: "收錄店內近期作品，可作為預約時的設計參考。",
    all: "全部",
    categories: {
      gel: "單色凝膠",
      art: "手繪造型",
      french: "法式",
      extension: "延甲",
      foot: "足部",
    },
  },
  contact: {
    title: "聯絡我們",
    lead: "歡迎透過 LINE、電話預約或諮詢，我們會盡快回覆您。",
    addressLabel: "地址",
    address: "新北市三峽區忠孝街 25 號",
    phoneLabel: "電話",
    emailLabel: "Email",
    hoursLabel: "營業時間",
    hours: [
      { days: "週二至週五", time: "11:00 – 21:00" },
      { days: "週六、週日", time: "10:00 – 19:00" },
      { days: "週一", time: "公休" },
    ],
    bookingTitle: "預約方式",
    bookingText: "本店採預約制。請告知希望的日期、時段與服務項目，若有參考圖片也歡迎一併提供。",
    lineButton: "LINE 預約",
    callButton: "電話預約",
    mapButton: "在 Google 地圖開啟",
    followTitle: "追蹤我們",
  },
  faq: {
    title: "常見問題",
    lead: "預約前想了解的事，都整理在這裡。",
    items: [
      {
        q: "一定要預約嗎？",
        a: "本店採預約制，建議提前 2–3 天預約。若當天有空檔也可接受現場客人，歡迎先來電詢問。",
      },
      {
        q: "凝膠指甲可以維持多久？",
        a: "一般約 3–4 週，實際時間依指甲生長速度與日常使用習慣而定。",
      },
      {
        q: "可以帶參考圖片嗎？",
        a: "非常歡迎！美甲師會依照您的手型與甲面狀況，給予最適合的調整建議。",
      },
      {
        q: "遲到或需要取消怎麼辦？",
        a: "遲到 15 分鐘以上可能需調整服務內容；若需取消或改期，請於前一天告知。",
      },
      {
        q: "保固怎麼計算？",
        a: "完成後 7 天內若有非人為因素的掉甲或翹起，可免費修補。",
      },
      {
        q: "有提供越南語服務嗎？",
        a: "有的，我們有越南籍美甲師，可以使用越南語溝通。",
      },
      {
        q: "可以使用哪些付款方式？",
        a: "接受現金、信用卡與 LINE Pay。",
      },
    ],
    moreTitle: "還有其他問題？",
    moreText: "歡迎透過 LINE 或電話與我們聯繫。",
  },
  footer: {
    tagline: "讓每一次美甲，都是寵愛自己的時光。",
    quickLinks: "快速連結",
    contactTitle: "聯絡資訊",
    follow: "追蹤我們",
    rights: "版權所有",
  },
};

export default zhTw;
export type Dictionary = typeof zhTw;
