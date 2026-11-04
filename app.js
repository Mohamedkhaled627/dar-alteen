const STORE = {
  name: "دار الطين",
  phoneDisplay: "0100 000 0000",
  waNumber: "201000000000",
  heroCaption: "",
  trust: [
    { icon: "truck", title: "الشحن", text: "التفاصيل النهائية على واتساب" },
    { icon: "box", title: "التغليف", text: "تغليف يحمي القطع من الكسر" },
    { icon: "chat", title: "الرد", text: "بنرد على واتساب في مواعيد العمل" }
  ]
};

const CATEGORIES = window.StoreData ? window.StoreData.CATEGORIES : {
  mugs: "أكواب ومجات",
  art: "تابلوهات",
  trays: "صواني",
  frames: "براويز",
  weddings: "أفراح",
  birthdays: "أعياد الميلاد"
};

const TITLES = {
  home: "دار الطين — خزف وديكور منزلي",
  shop: "المتجر — دار الطين",
  about: "من نحن — دار الطين",
  product: "تفاصيل المنتج — دار الطين"
};

const MAX_QTY = 10;

const fallbackProducts = [
  {
    id: "mug-speckled",
    name: "مج فخار مرقّط",
    cat: "mugs",
    price: 240,
    img: "assets/stock/mug-speckled.jpg",
    alt: "مج فخار مرقّط مملوء بالقهوة على فراش ناعم",
    w: 1200,
    h: 1800,
    featured: true,
    desc: "مج من الفخار المرقّط بلمسة طبيعية دافئة، مناسب للقهوة الصباحية أو كوب الشاي في نص اليوم. المقبض مريح والجسم متوازن في اليد.",
    specs: [
      { label: "الخامة", value: "فخار مصقول" },
      { label: "السعة", value: "350 مل" },
      { label: "العناية", value: "غسيل يدوي بماء فاتر" }
    ]
  },
  {
    id: "mug-black",
    name: "مج سيراميك أسود مطفي",
    cat: "mugs",
    price: 210,
    img: "assets/stock/mug-black.jpg",
    alt: "مج سيراميك أسود مطفي على طاولة خشبية في مطبخ مضيء",
    w: 1200,
    h: 1800,
    desc: "سيراميك أسود بلمسة مطفية ومقبض مريح، يليق بقهوة الصباح أو مشروب دافئ في المسا. لونه الحيادي يمشي مع أي طاولة.",
    specs: [
      { label: "الخامة", value: "سيراميك مطفي" },
      { label: "السعة", value: "300 مل" },
      { label: "العناية", value: "آمن لغسالة الأطباق" }
    ]
  },
  {
    id: "mug-set",
    name: "طقم تزيين المجات — 4 قطع",
    cat: "mugs",
    price: 680,
    img: "assets/stock/mug-set.jpg",
    alt: "مجات خزفية خام مع أدوات وألوان تزيين على طاولة بيضاء",
    w: 1200,
    h: 800,
    desc: "أربع مجات خزفية خام مع أدوات تلوين، لتجربة ممتعة تصنع فيها قطعتك بنفسك أو تشاركها مع العيلة والأصحاب.",
    specs: [
      { label: "المحتوى", value: "4 مجات + فرش وألوان" },
      { label: "السعة", value: "350 مل للمج" },
      { label: "العناية", value: "غسيل يدوي بعد التلوين" }
    ]
  },
  {
    id: "cup-printed",
    name: "مج بزخرفة نباتية عتيقة",
    cat: "mugs",
    price: 265,
    img: "assets/stock/cup-printed.jpg",
    alt: "مجات ومزهريات خزفية بزخارف نباتية على قماش مطبوع",
    w: 1200,
    h: 800,
    desc: "مج بطبعة نباتية هادئة مستوحاة من القطع العتيقة، يضيف دفء لطاولة القهوة من غير ما يزحم المكان.",
    specs: [
      { label: "الخامة", value: "سيراميك" },
      { label: "السعة", value: "300 مل" },
      { label: "العناية", value: "غسيل يدوي" }
    ]
  },
  {
    id: "cup-tea",
    name: "طقم كوبين شاي بورسلين",
    cat: "mugs",
    price: 320,
    img: "assets/stock/cup-tea.jpg",
    alt: "كوبان من البورسلين الأبيض على صحنين زجاجيين",
    w: 1200,
    h: 1800,
    desc: "كوبان من البورسلين الأبيض بقاعدة أنيقة، للشاي والضيافة اليومية. خفيفين في الإيد وسهلين في التقديم.",
    specs: [
      { label: "المحتوى", value: "كوبان + صحنان" },
      { label: "السعة", value: "200 مل للكوب" },
      { label: "الخامة", value: "بورسلين" }
    ]
  },
  {
    id: "cup-turkish",
    name: "فنجان قهوة تركية",
    cat: "mugs",
    price: 185,
    img: "assets/stock/cup-turkish.jpg",
    alt: "فنجان قهوة تركية من البورسلين على طاولة",
    w: 1280,
    h: 854,
    desc: "فنجان بورسلين كلاسيكي بخطوط بسيطة، للقهوة التركية على أصولها. حجم صغير مناسب للضيافة السريعة.",
    specs: [
      { label: "الخامة", value: "بورسلين" },
      { label: "السعة", value: "90 مل" },
      { label: "العناية", value: "آمن لغسالة الأطباق" }
    ]
  },
  {
    id: "art-abstract",
    name: "تابلوه طبعة نباتية مائية",
    cat: "art",
    price: 950,
    img: "assets/stock/art-abstract.jpg",
    alt: "لوحات بألوان مائية معلقة على حائط أبيض",
    w: 1200,
    h: 1797,
    featured: true,
    desc: "طبعة بألوان مائية ناعمة داخل إطار خشبي، مناسبة لغرفة المعيشة أو المدخل. ألوانها بتفتح المكان من غير ما تشد العين.",
    specs: [
      { label: "المقاس", value: "40 × 50 سم" },
      { label: "الإطار", value: "خشب طبيعي" },
      { label: "الخامة", value: "ورق فني مطبوع" }
    ]
  },
  {
    id: "art-botanical",
    name: "تابلوه نباتي بإطار أخضر",
    cat: "art",
    price: 780,
    img: "assets/stock/art-botanical.jpg",
    alt: "طبعات نباتية مؤطرة بإطار أخضر على حائط أخضر",
    w: 1200,
    h: 1540,
    desc: "طبعة نباتية بإطار أخضر هادئ، تليق بالمساحات الفاتحة أو الجدران الجريئة. شكلها بسيط ومتوازن.",
    specs: [
      { label: "المقاس", value: "30 × 40 سم" },
      { label: "الإطار", value: "خشب مطلي" },
      { label: "الخامة", value: "ورق فني مطبوع" }
    ]
  },
  {
    id: "art-calligraphy",
    name: "تابلوه خط عربي بإطار ذهبي",
    cat: "art",
    price: 1250,
    img: "assets/stock/art-calligraphy.jpg",
    alt: "لوحة بخط عربي مزخرف داخل إطار ذهبي",
    w: 1200,
    h: 1799,
    featured: true,
    desc: "لوحة بخط عربي بزخارف نباتية وإطار ذهبي، قطعة مميزة لجدار الاستقبال أو المكتب. تفاصيلها بتلفت النظر من غير ضوضاء.",
    specs: [
      { label: "المقاس", value: "50 × 70 سم" },
      { label: "الإطار", value: "ذهبي مزخرف" },
      { label: "الخامة", value: "طبعة فنية على قماش" }
    ]
  },
  {
    id: "tray-round",
    name: "صينية تقديم خزف بأطباق ملونة",
    cat: "trays",
    price: 640,
    img: "assets/stock/tray-round.jpg",
    alt: "أطباق خزفية بألوان دافئة عليها فاكهة وحلوى",
    w: 1200,
    h: 800,
    featured: true,
    desc: "صينية تقديم بأطباق خزفية بألوان دافئة، للفاكهة والحلويات وضيافة العصر. ألوانها بتضيف حركة لطيفة للسفرة.",
    specs: [
      { label: "الخامة", value: "خزف" },
      { label: "المقاس", value: "35 سم" },
      { label: "العناية", value: "غسيل يدوي" }
    ]
  },
  {
    id: "tray-wood",
    name: "صينية تقديم خشبية",
    cat: "trays",
    price: 890,
    img: "assets/stock/tray-wood.jpg",
    alt: "كوبان على صينية خشبية مع زهور بيضاء",
    w: 1200,
    h: 1600,
    featured: true,
    desc: "صينية من الخشب الطبيعي بمقاس مناسب للضيافة، فيها مساحة مريحة للأكواب والحلويات. خامة دافئة بتكمل أي طاولة.",
    specs: [
      { label: "الخامة", value: "خشب طبيعي" },
      { label: "المقاس", value: "40 × 25 سم" },
      { label: "العناية", value: "مسح بقطعة مبللة" }
    ]
  },
  {
    id: "frame-gold",
    name: "برواز ذهبي كلاسيكي",
    cat: "frames",
    price: 720,
    img: "assets/stock/frame-gold.jpg",
    alt: "براويز ذهبية مزخرفة معلقة على حائط مع مزهرية",
    w: 1200,
    h: 1600,
    desc: "برواز بزخارف ذهبية كلاسيكية، يبرز الصور العائلية واللوحات الصغيرة. تفاصيله غنية من غير ما تبقى ثقيلة.",
    specs: [
      { label: "المقاس", value: "20 × 30 سم" },
      { label: "اللون", value: "ذهبي" },
      { label: "الخامة", value: "خشب مطلي" }
    ]
  },
  {
    id: "frame-wood",
    name: "برواز خشب عتيق",
    cat: "frames",
    price: 560,
    img: "assets/stock/frame-wood.jpg",
    alt: "برواز خشبي بمظهر عتيق بخلفية فاتحة",
    w: 900,
    h: 1033,
    featured: true,
    desc: "برواز بخشب بمظهر عتيق، مناسب لصور الذكريات والطبعات الفنية الصغيرة. لونه الدافئ بيمشي مع أي ديكور.",
    specs: [
      { label: "المقاس", value: "15 × 20 سم" },
      { label: "اللون", value: "ذهبي عتيق" },
      { label: "الخامة", value: "خشب" }
    ]
  }
];

const products = window.StoreData ? window.StoreData.loadProducts() : fallbackProducts;

const ICONS = {
  arrow: '<path d="M19 12H5"/><path d="m11 18-6-6 6-6"/>',
  minus: '<path d="M5 12h14"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  truck: '<path d="M3 7h10v9H3z"/><path d="M13 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.7"/><circle cx="17.6" cy="18" r="1.7"/>',
  box: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z"/><path d="m4 7.5 8 4.5 8-4.5"/><path d="M12 12v9"/>',
  chat: '<path d="M20 12a7.5 7.5 0 0 1-11 6.6L4 20l1.4-4.4A7.5 7.5 0 1 1 20 12Z"/>'
};

const state = {
  view: "home",
  category: "all",
  query: "",
  sort: "featured",
  current: null,
  qty: 1,
  shopScroll: 0
};

const featuredGrid = document.getElementById("featured-grid");
const shopGrid = document.getElementById("shop-grid");
const similarGrid = document.getElementById("similar-grid");
const similarSection = document.getElementById("similar-section");
const shopEmpty = document.getElementById("shop-empty");
const emptyTitle = document.getElementById("empty-title");
const emptyText = document.getElementById("empty-text");
const resetFiltersButton = document.getElementById("reset-filters");
const resultsCount = document.getElementById("results-count");
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
const chips = Array.from(document.querySelectorAll("[data-cat-filter]"));

const detailImg = document.getElementById("detail-img");
const detailCat = document.getElementById("detail-cat");
const detailName = document.getElementById("detail-name");
const detailPrice = document.getElementById("detail-price");
const detailDesc = document.getElementById("detail-desc");
const detailSpecs = document.getElementById("detail-specs");
const detailWa = document.getElementById("detail-wa");
const detailTotal = document.getElementById("detail-total");
const qtyValue = document.getElementById("qty-value");
const qtyMinus = document.getElementById("qty-minus");
const qtyPlus = document.getElementById("qty-plus");
const detailBack = document.getElementById("detail-back");
const detailThumbs = document.getElementById("detail-thumbs");
const detailTrust = document.getElementById("detail-trust");
const heroCaption = document.getElementById("hero-caption");

const mobileBuy = document.getElementById("mobile-buy");
const mobileBuyPrice = document.getElementById("mobile-buy-price");
const mobileBuyWa = document.getElementById("mobile-buy-wa");

let gallery = [];
let galleryIndex = 0;

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

const contactPhone = document.getElementById("contact-phone");
const footerPhone = document.getElementById("footer-phone");
const contactWa = document.getElementById("contact-wa");

const numberFormat = new Intl.NumberFormat("en-US");

function formatNumber(value) {
  return numberFormat.format(value);
}

function normalize(text) {
  return text
    .replace(/[\u064B-\u0652\u0670\u0640]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .toLowerCase();
}

function icon(name, size) {
  return '<svg class="od-icon" viewBox="0 0 24 24" style="--od-icon-size:' + (size || "1.1em") +
    '" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
    ICONS[name] + "</svg>";
}

function waLink(message) {
  return "https://wa.me/" + STORE.waNumber + "?text=" + encodeURIComponent(message);
}

function genericMessage() {
  return "مرحبًا " + STORE.name + "، عندي استفسار عن المنتجات المعروضة.";
}

function orderMessage(product, qty) {
  const qtyPart = qty > 1 ? " — الكمية " + qty : "";
  return "مرحبًا " + STORE.name + "، عايز أطلب: " + product.name + qtyPart +
    " — السعر " + formatNumber(product.price * qty) + " ج.م. هل متوفر؟";
}

function cardMarkup(product) {
  return (
    '<a class="product-card" href="#" data-product="' + product.id + '">' +
      '<span class="product-media">' +
        '<img class="card-img" src="' + product.img + '" alt="' + product.alt + '" width="' + product.w +
        '" height="' + product.h + '" loading="lazy" decoding="async">' +
      "</span>" +
      '<span class="product-body">' +
        '<span class="product-cat">' + CATEGORIES[product.cat] + "</span>" +
        '<span class="product-name">' + product.name + "</span>" +
        '<span class="product-foot">' +
          '<span class="price"><span class="od-nowrap">' + formatNumber(product.price) +
          ' <span class="currency">ج.م</span></span></span>' +
          '<span class="card-arrow" aria-hidden="true">' + icon("arrow", "0.95em") + "</span>" +
        "</span>" +
      "</span>" +
    "</a>"
  );
}

function renderFeatured() {
  let list = products
    .filter(function (product) { return product.featured; })
    .slice(0, 6);

  if (!list.length) list = products.slice(0, 6);

  if (!list.length) {
    featuredGrid.innerHTML = '<p class="grid-empty">مفيش منتجات معروضة حاليًا. أضف منتجاتك من لوحة التحكم وهتظهر هنا.</p>';
    return;
  }

  featuredGrid.innerHTML = list.map(cardMarkup).join("");
}

function initCategoryMedia() {
  document.querySelectorAll("[data-cat-media]").forEach(function (media) {
    const tile = media.closest(".category-tile");
    const img = media.querySelector("img");
    const fallback = media.querySelector(".category-fallback");
    const first = products.find(function (product) {
      return product.cat === media.dataset.catMedia;
    });

    if (first && img) {
      img.src = first.img;
      img.alt = "";
      img.hidden = false;
      if (fallback) fallback.hidden = true;
      if (tile) tile.classList.remove("is-empty");
    } else {
      if (img) {
        img.removeAttribute("src");
        img.hidden = true;
      }
      if (fallback) fallback.hidden = false;
      if (tile) tile.classList.add("is-empty");
    }
  });
}

function initHeroCaption() {
  if (!heroCaption) return;
  const text = String(STORE.heroCaption || "").trim();
  heroCaption.textContent = text;
  heroCaption.hidden = !text;
}

function renderTrust() {
  if (!detailTrust) return;
  const items = Array.isArray(STORE.trust) ? STORE.trust : [];
  if (!items.length) {
    detailTrust.hidden = true;
    detailTrust.innerHTML = "";
    return;
  }

  detailTrust.hidden = false;
  detailTrust.innerHTML = items.map(function (item) {
    return '<li>' +
      '<span class="trust-icon" aria-hidden="true">' + icon(item.icon, "1.15em") + "</span>" +
      '<span class="trust-text"><strong>' + item.title + "</strong><span>" + item.text + "</span></span>" +
    "</li>";
  }).join("");
}

function galleryImages(product) {
  const list = [];
  const raw = [product.img].concat(Array.isArray(product.images) ? product.images : []);

  raw.forEach(function (entry) {
    const src = typeof entry === "string" ? entry : entry && entry.src;
    const alt = typeof entry === "string" ? product.alt : (entry && entry.alt) || product.alt;
    if (!src) return;
    const exists = list.some(function (item) { return item.src === src; });
    if (!exists) list.push({ src: src, alt: alt });
  });

  return list;
}

function showGalleryImage(index) {
  const item = gallery[index];
  if (!item) return;

  galleryIndex = index;
  detailImg.src = item.src;
  detailImg.alt = item.alt;

  if (index === 0) {
    detailImg.width = state.current.w;
    detailImg.height = state.current.h;
  } else {
    detailImg.removeAttribute("width");
    detailImg.removeAttribute("height");
  }

  if (!detailThumbs) return;
  Array.prototype.forEach.call(detailThumbs.children, function (button) {
    button.setAttribute("aria-pressed", String(Number(button.dataset.thumb) === index));
  });
}

function renderThumbs(product) {
  if (!detailThumbs) return;
  gallery = galleryImages(product);
  galleryIndex = 0;

  if (gallery.length < 2) {
    detailThumbs.hidden = true;
    detailThumbs.innerHTML = "";
    return;
  }

  detailThumbs.hidden = false;
  detailThumbs.innerHTML = gallery.map(function (item, index) {
    return '<button class="thumb" type="button" data-thumb="' + index + '" aria-pressed="' +
      (index === 0) + '" aria-label="عرض الصورة ' + (index + 1) + ' من ' + gallery.length + '">' +
      '<img src="' + item.src + '" alt="" width="120" height="150" loading="lazy" decoding="async">' +
    "</button>";
  }).join("");
}


function countLabel(count) {
  if (count === 0) return "مفيش منتجات مطابقة";
  if (count === 1) return "منتج واحد";
  if (count === 2) return "منتجان";
  if (count <= 10) return count + " منتجات";
  return count + " منتجًا";
}

function applyFilters() {
  const query = normalize(state.query.trim());
  let list = products.filter(function (product) {
    return state.category === "all" || product.cat === state.category;
  });

  if (query) {
    list = list.filter(function (product) {
      return normalize(product.name + " " + product.desc + " " + CATEGORIES[product.cat]).indexOf(query) !== -1;
    });
  }

  if (state.sort === "price-asc") {
    list = list.slice().sort(function (a, b) { return a.price - b.price; });
  } else if (state.sort === "price-desc") {
    list = list.slice().sort(function (a, b) { return b.price - a.price; });
  }

  shopGrid.innerHTML = list.map(cardMarkup).join("");

  const isEmpty = list.length === 0;
  shopGrid.hidden = isEmpty;
  shopEmpty.hidden = !isEmpty;
  resultsCount.hidden = isEmpty;
  resultsCount.textContent = "النتائج: " + countLabel(list.length);

  if (products.length === 0) {
    emptyTitle.textContent = "المتجر فاضي حاليًا";
    emptyText.textContent = "أضف منتجاتك من لوحة التحكم وهتظهر هنا.";
    resetFiltersButton.hidden = true;
  } else {
    emptyTitle.textContent = "مفيش نتائج مطابقة";
    emptyText.textContent = "جرّب كلمة تانية أو ارجع لكل المنتجات.";
    resetFiltersButton.hidden = false;
  }

  chips.forEach(function (chip) {
    chip.setAttribute("aria-pressed", String(chip.dataset.catFilter === state.category));
  });
}

function resetFilters() {
  state.category = "all";
  state.query = "";
  state.sort = "featured";
  searchInput.value = "";
  sortSelect.value = "featured";
  applyFilters();
  searchInput.focus();
}

function setView(name, options) {
  const settings = options || {};
  const view = document.getElementById("view-" + name);
  if (!view) return;

  if (name === "product" && state.view === "shop") {
    state.shopScroll = window.scrollY;
  }

  state.view = name;
  document.querySelectorAll(".view").forEach(function (section) {
    section.hidden = section !== view;
  });

  document.querySelectorAll(".nav-link[data-nav], .header-shop[data-nav]").forEach(function (button) {
    const isCurrent = button.dataset.nav === name || (name === "product" && button.dataset.nav === "shop");
    if (isCurrent) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  if (name === "product" && state.current) {
    document.title = state.current.name + " — " + STORE.name;
  } else {
    document.title = TITLES[name] || STORE.name;
  }
  closeMenu();

  const isProduct = name === "product";
  if (mobileBuy) mobileBuy.hidden = !isProduct;
  document.body.classList.toggle("has-mobile-buy", isProduct);


  if (settings.restoreScroll) {
    window.scrollTo(0, 0);
    requestAnimationFrame(function () {
      window.scrollTo(0, state.shopScroll);
    });
  } else {
    window.scrollTo(0, 0);
  }

  if (!settings.initial) {
    const heading = view.querySelector('h1[tabindex="-1"]');
    if (heading) heading.focus({ preventScroll: true });
  }
}

function openProduct(id) {
  const product = products.find(function (item) { return item.id === id; });
  if (!product) return;

  state.current = product;
  state.qty = 1;

  gallery = galleryImages(product);
  renderThumbs(product);
  showGalleryImage(0);

  detailCat.textContent = CATEGORIES[product.cat];
  detailName.textContent = product.name;
  detailPrice.innerHTML = formatNumber(product.price) + ' <span class="currency">ج.م</span>';
  detailDesc.textContent = product.desc;

  detailSpecs.innerHTML = product.specs.map(function (spec) {
    return '<div class="spec-row"><dt>' + spec.label + "</dt><dd>" + spec.value + "</dd></div>";
  }).join("");

  renderQty();
  renderSimilar(product);
  setView("product");
}

function renderQty() {
  const product = state.current;
  if (!product) return;

  qtyValue.textContent = String(state.qty);
  qtyMinus.disabled = state.qty <= 1;
  qtyPlus.disabled = state.qty >= MAX_QTY;

  detailTotal.innerHTML = formatNumber(product.price * state.qty) + ' <span class="currency">ج.م</span>';
  detailWa.href = waLink(orderMessage(product, state.qty));

  if (mobileBuyPrice) {
    mobileBuyPrice.innerHTML = formatNumber(product.price * state.qty) + ' <span class="currency">ج.م</span>';
  }
  if (mobileBuyWa) {
    mobileBuyWa.href = waLink(orderMessage(product, state.qty));
  }
}

function renderSimilar(product) {
  const similar = products.filter(function (item) {
    return item.cat === product.cat && item.id !== product.id;
  }).slice(0, 3);

  similarGrid.innerHTML = similar.map(cardMarkup).join("");
  similarSection.hidden = similar.length === 0;
}

function changeQty(delta) {
  const next = Math.min(MAX_QTY, Math.max(1, state.qty + delta));
  if (next === state.qty) return;
  state.qty = next;
  renderQty();
}

function openMenu() {
  mobileMenu.hidden = false;
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "إغلاق القائمة");
}

function closeMenu() {
  if (mobileMenu.hidden) return;
  mobileMenu.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "فتح القائمة");
}

function initContact() {
  const telHref = "tel:+" + STORE.waNumber;

  [contactPhone, footerPhone].forEach(function (link) {
    if (!link) return;
    link.textContent = STORE.phoneDisplay;
    link.href = telHref;
  });

  document.querySelectorAll("[data-wa-link]").forEach(function (link) {
    link.href = waLink(genericMessage());
  });

  if (contactWa) {
    contactWa.href = waLink(genericMessage());
  }
}

function initCounts() {
  document.querySelectorAll("[data-cat-count]").forEach(function (element) {
    const count = products.filter(function (product) {
      return product.cat === element.dataset.catCount;
    }).length;
    element.textContent = count + (count === 1 ? " قطعة" : " قطع");
  });
}

function initEvents() {
  document.addEventListener("click", function (event) {
    const navButton = event.target.closest("[data-nav]");
    if (navButton) {
      event.preventDefault();
      setView(navButton.dataset.nav);
      return;
    }

    const card = event.target.closest("[data-product]");
    if (card) {
      event.preventDefault();
      openProduct(card.dataset.product);
      return;
    }

    const thumbButton = event.target.closest("[data-thumb]");
    if (thumbButton) {
      event.preventDefault();
      showGalleryImage(Number(thumbButton.dataset.thumb));
      return;
    }

    const categoryLink = event.target.closest("[data-cat-goto]");    if (categoryLink) {
      state.category = categoryLink.dataset.catGoto;
      state.query = "";
      state.sort = "featured";
      searchInput.value = "";
      sortSelect.value = "featured";
      applyFilters();
      setView("shop");
      return;
    }

    const chip = event.target.closest("[data-cat-filter]");
    if (chip) {
      state.category = chip.dataset.catFilter;
      applyFilters();
      return;
    }

    if (event.target.closest("#reset-filters")) {
      resetFilters();
    }
  });

  searchInput.addEventListener("input", function (event) {
    state.query = event.target.value;
    applyFilters();
  });

  sortSelect.addEventListener("change", function (event) {
    state.sort = event.target.value;
    applyFilters();
  });

  qtyMinus.addEventListener("click", function () { changeQty(-1); });
  qtyPlus.addEventListener("click", function () { changeQty(1); });

  detailBack.addEventListener("click", function () {
    setView("shop", { restoreScroll: true });
  });

  menuToggle.addEventListener("click", function () {
    if (mobileMenu.hidden) openMenu();
    else closeMenu();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !mobileMenu.hidden) {
      closeMenu();
      menuToggle.focus();
    }
  });

  document.addEventListener("click", function (event) {
    if (!mobileMenu.hidden && !event.target.closest(".site-header")) {
      closeMenu();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 1024) closeMenu();
  });
}

document.getElementById("year").textContent = String(new Date().getFullYear());

initCounts();
initContact();
initCategoryMedia();
initHeroCaption();
renderTrust();
renderFeatured();
applyFilters();
initEvents();
setView("home", { initial: true });
