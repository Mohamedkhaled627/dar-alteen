(function () {
  "use strict";

  var STORAGE_KEY = "dar-alteen-catalog-v1";

  var CATEGORIES = {
    mugs: "أكواب ومجات",
    art: "تابلوهات",
    trays: "صواني",
    frames: "براويز",
    weddings: "أفراح",
    birthdays: "أعياد الميلاد"
  };

  var DEFAULT_PRODUCTS = [
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
      id: "wed-favors",
      name: "طقم هدايا فرح خزفية — 6 قطع",
      cat: "weddings",
      price: 540,
      img: "assets/stock/wed-favors.svg",
      alt: "جرار خزف صغيرة بحافة ذهبية مخصصة كهدايا فرح",
      w: 1200,
      h: 1500,
      featured: true,
      desc: "ست جَرار خزف صغيرة بحافة ذهبية، جاهزة للتعبئة بالشوكولاتة أو العسل أو اللوز كهدية ضيوف الفرح. تعالي معناها باكجينج أنيق جاهز للتوزيع.",
      specs: [
        { label: "المحتوى", value: "6 قطع متطابقة" },
        { label: "الخامة", value: "خزف بحافة ذهبية" },
        { label: "التحضير", value: "اطلب قبل الحدث بأسبوع" }
      ]
    },
    {
      id: "wed-calligraphy",
      name: "تابلوه ورود بإطار ذهبي — أفراح",
      cat: "weddings",
      price: 1150,
      img: "assets/stock/wed-calligraphy.svg",
      alt: "تابلوه ورود ناعمة داخل إطار ذهبي مزخرف لاستقبال الأفراح",
      w: 1200,
      h: 1500,
      desc: "لوحة ورود بألوان هادية داخل إطار ذهبي مزخرف، بتليق بحجرة الاستقبال أو مدخل القاعة. وبتفضل قطعة مميزة على جدار البيت بعد الحدث.",
      specs: [
        { label: "المقاس", value: "50 × 70 سم" },
        { label: "الإطار", value: "ذهبي مزخرف" },
        { label: "الخامة", value: "طبعة فنية على قماش" }
      ]
    },
    {
      id: "bday-cake-stand",
      name: "قاعدة كيك خزفية بحافة ذهبية",
      cat: "birthdays",
      price: 480,
      img: "assets/stock/bday-cake-stand.svg",
      alt: "قاعدة كيك خزفية فاتحة بحافة ذهبية عليها كيك مغطى كريم",
      w: 1200,
      h: 1500,
      featured: true,
      desc: "قاعدة كيك خزفية بارتفاع معقول وحافة ذهبية هادية. بتخلي طاولة عيد الميلاد أو أي مناسبة شكلها مرتب وثمين، وبتنفع للتقديم يوم بعد يوم.",
      specs: [
        { label: "القطر", value: "28 سم" },
        { label: "الخامة", value: "خزف مطلي" },
        { label: "العناية", value: "غسيل يدوي" }
      ]
    },
    {
      id: "bday-mugs",
      name: "طقم مجات مناسبات — 4 قطع",
      cat: "birthdays",
      price: 590,
      img: "assets/stock/bday-mugs.svg",
      alt: "أربع مجات خزف ملونة بلمسات احتفالية على طاولة",
      w: 1200,
      h: 1500,
      desc: "أربع مجات خزف بألوان احتفالية دافئة وشكل مختلف لكل واحدة. هدية بسيطة وفخمة لصاحبك في عيد ميلاده، أو جزء لطيف من طاولة الحفلة.",
      specs: [
        { label: "المحتوى", value: "4 مجات" },
        { label: "السعة", value: "300 مل للمج" },
        { label: "العناية", value: "غسيل يدوي" }
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

  // دالة escape مشتركة — كل innerHTML بيمر عليها قبل ما يتكتب
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
    });
  }

  // قائمة آمنة لمصادر الصور: data:image (jpeg/png/webp فقط) أو مسار محلي (مشتري scheme)
  // أي scheme تاني (http: و javascript: و data:image/svg+xml...) مرفوض
  function isSafeImageSrc(value) {
    var src = String(value || "").trim();
    if (!src) return false;
    if (/^data:image\/(jpeg|png|webp);base64,/i.test(src)) return true;
    if (/^[a-z][a-z0-9+.-]*:/i.test(src)) return false; // أي scheme آخر مرفوض
    return true; // مسار نسبي (assets/stock/...)
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function normalizeProduct(product) {
    if (!product || typeof product !== "object") return null;

    var name = String(product.name || "").trim();
    var price = Number(product.price);
    var img = String(product.img || "").trim();

    if (!name || !img || !Number.isFinite(price) || price <= 0) return null;

    // gate أمان: مصدر الصورة لازم يبقى من القائمة الآمنة
    if (!isSafeImageSrc(img)) return null;

    var cat = CATEGORIES[product.cat] ? product.cat : "mugs";

    var specs = Array.isArray(product.specs)
      ? product.specs
          .filter(function (spec) {
            return spec && String(spec.label || "").trim() && String(spec.value || "").trim();
          })
          .map(function (spec) {
            return { label: String(spec.label).trim(), value: String(spec.value).trim() };
          })
      : [];

    return {
      id: String(product.id || "p-" + Math.random().toString(36).slice(2, 9)),
      name: name.slice(0, 60),
      cat: cat,
      price: Math.round(price),
      img: img,
      alt: String(product.alt || "صورة " + name),
      w: Number(product.w) > 0 ? Number(product.w) : 1200,
      h: Number(product.h) > 0 ? Number(product.h) : 1200,
      desc: String(product.desc || "").slice(0, 400),
      specs: specs.slice(0, 5),
      featured: Boolean(product.featured)
    };
  }

  var VERSION_KEY = STORAGE_KEY.replace(/-v\d+$/, "-published-version");

  function readVersion() {
    try { return Number(window.localStorage.getItem(VERSION_KEY)) || 0; } catch (error) { return 0; }
  }

  function writeVersion(value) {
    try { window.localStorage.setItem(VERSION_KEY, String(value)); } catch (error) { /* تجاهَل — الحفظ الافتراضي كفاية */ }
  }

  // المكتالوج المنشور readPublished: XHR متزامن على ملف صغير محلي أثناء فتح الصفحة
  // عشان يفضل loadProducts متزامن بلا رفع دولة الرندر — shortcut: يفشل على file:// وقايم الخدمة محلية.
  function readPublished() {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "catalog.json", false);
      xhr.send(null);
      if (xhr.status !== 200) return null;
      var parsed = JSON.parse(xhr.responseText);
      var raw = Array.isArray(parsed) ? parsed : parsed && Array.isArray(parsed.products) ? parsed.products : null;
      if (!raw) return null;
      var list = raw
        .map(normalizeProduct)
        .filter(function (product) { return product !== null; });
      if (!list.length) return null;
      return { version: Number(parsed.version) || 0, products: list };
    } catch (error) {
      return null; // file:// أو مفيش ملف — fallback طبيعي لتحت
    }
  }

  function readSaved() {
      try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return null;
      return parsed
        .map(normalizeProduct)
        .filter(function (product) { return product !== null; });
    } catch (error) {
      return null;
    }
  }

  function loadProducts() {
    var saved = readSaved();
    var published = readPublished();
    // المكتالوج المنشور يفوز لو أحدث — فرضا والمكة حق لـ نسخة أقدم زيارات مش يفسد شرايين الكتالوج الاسمي للمتسوقعون
    if (published && published.version > readVersion()) {
      writeVersion(published.version);
      saveProducts(published.products);
      return published.products;
    }
    return saved !== null ? saved : clone(DEFAULT_PRODUCTS);
  }

  function saveProducts(list) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      return true;
    } catch (error) {
      return false;
    }
  }

  function resetProducts() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      return false;
    }
  }

  function storageAvailable() {
    try {
      var probe = "__dar_alteen_probe__";
      window.localStorage.setItem(probe, "1");
      window.localStorage.removeItem(probe);
      return true;
    } catch (error) {
      return false;
    }
  }

  window.StoreData = {
    CATEGORIES: CATEGORIES,
    DEFAULT_PRODUCTS: DEFAULT_PRODUCTS,
    normalizeProduct: normalizeProduct,
    escapeHtml: escapeHtml,
    isSafeImageSrc: isSafeImageSrc,
    loadProducts: loadProducts,
    saveProducts: saveProducts,
    resetProducts: resetProducts,
    storageAvailable: storageAvailable,
    readPublished: readPublished
  };
})();
