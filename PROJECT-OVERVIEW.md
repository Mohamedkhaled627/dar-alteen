# دار الطين (Dar Al-Teen) — نظرة عامة على المشروع (Handoff لـ Agent)

> آخر تحديث: 2026-11-04 — مكتوب كمرجع كامل للمشروع بحيث أي agent يقدر يكمل عليه من غير إعادة استكشاف.

---

## 1. المشروع ده إيه؟

موقع **متجر إلكتروني (catalog shop)** لبيزنس خزف وديكور منزلي مصري اسمه **"دار الطين"**.

- **الغرض:** عرض منتجات (أكواب، مجات، تابلوهات، صواني، براويز، قطع أفراح وأعياد ميلاد) بصور وسعر ومواصفات، والعميل **يطلب عبر واتساب مباشرة** — **مفيش سلة شراء ولا دفع إلكتروني ولا حسابات**. الموقع كتالوج + قناة بيع على واتساب.
- **الجمهور:** عربي مصري. الموقع كله `lang="ar" dir="rtl"` والأسلوب عصري بلمسة حرفية.
- **النوع:** موقع **static frontend بالكامل** — HTML + CSS + Vanilla JS، من غير أي build tools ولا framework ولا سيرفر ولا backend.

## 2. التقنيات

| التقنية | الاستخدام |
|---|---|
| HTML5 (RTL) | صفحتان: `index.html` (المتجر) و `admin.html` (لوحة تحكم البائع) |
| CSS3 vanilla | `styles.css` + `admin.css`. فيه نظام layout primitives باسم **OD-LAYOUT-PRIMITIVES v1** جوه `@layer od-layout` مكرر في الـ HTML نفسه (inline `<style>`) — طبقة structure فقط (flex/grid/overflow/ratio) |
| Vanilla JS (ES5-style IIFE + const/let) | بدون frameworks ولا bundler ولا npm — صفحة تCDATA عادية تشتغل بفتح الملف في المتصفح |
| Google Fonts | `IBM Plex Sans Arabic` (body) + `Noto Kufi Arabic` (display) |
| localStorage | **قاعدة البيانات الوحيدة** — كتالوج المنتجات يُخزَّن في `localStorage` بمفتاح `dar-alteen-catalog-v1` |
| WhatsApp | كل عمليات الطلب والتواصل عبر روابط `https://wa.me/<number>?text=...` |

**مفيش:** package.json، node_modules، bundler، backend، analytics، database حقيقية.

## 3. هيكل الملفات

```
website/
├── index.html        # الموقع — SPA بسيط (4 views بـ hidden/تoggles مش routing)
├── admin.html        # لوحة تحكم البائع — صفحة مستقلة
├── app.js            # منطق المتجر بالكامل (~800 سطر)
├── admin.js          # منطق لوحة التحكم بالكامل (CRUD + validation + ضغط صور)
├── store-data.js     # طبقة البيانات: DEFAULT_PRODUCTS + CATEGORIES + localStorage API
├── styles.css        # ثيم المتجر — ألوان/typography/مكونات
├── admin.css         # ثيم لوحة التحكم
├── DESIGN-HANDOFF.md # عقد تصميم من أداة OpenDesign (صفحة بصرية شكلية — مش مرجع كود runtime)
├── DESIGN-MANIFEST.json # خريطة machine-readable للتصميم (tokens/screens) — مرجع التصميم فقط
├── assets/
│   ├── favicon.svg
│   └── stock/       # صور المنتجات (عينات، بعضها .jpg وبعضها .svg)
└── حازم برايز.rar    # أرشيف خام (يبدو نسخة قديمة/مصدر) — استخدم الملفات المفردة فوق
```

## 4. الـ Architecture بالتفصيل

### 4.1 المتجر (`index.html` + `app.js`)
- **SPA-Simple:** كل الـ views موجودة في الـ HTML نفسه وبتتظهر/تتخفي بالـ `hidden` attribute:
  - `#view-home` — Hero + 6 خانات تصنيفات + منتجات مميزة (featured) + خطوات الطلب + شريط حفاف
  - `#view-shop` — كتالوج كامل: بحث + sort (featured/سعر تصاعدي/تنازلي) + filter chips
  - `#view-product` — صفحة تفاصيل منتج: صورة رئيسية + thumbnails + specs + زيادة/تقليل كمية (1–10) + إجمالي سعر + زر واتساب بخالة الطلب
  - `#view-about` — صفحة "من نحن" + بطاقة تواصل
- **التنقل:** المجال `data-nav` (home/shop/about) على أزرار — click delegation جوه `app.js`.
- **البيانات:** `app.js` بيطالب بالـ `window.StoreData.loadProducts()` الذي:
  1. يحاول يقرأ `localStorage["dar-alteen-catalog-v1"]`
  2. لو فاضي/بيانات مش سليمة، يجيب نسخة من `DEFAULT_PRODUCTS`
- **Settings ثابتة** جوه `app.js` → `STORE`:
  - `STORE.waNumber = "201000000000"` ← **placeholder — لسه مُظبوطش' للرقم الحقيقي**
  - `phoneDisplay = "0100 000 0000"` ← placeholder برضه
- رسالة الواتساب بتتر coalition تلقائيًا: `مرحبًا دار الطين، عايز أطلب: <اسم المنتج> — الكمية N — السعر X ج.م. هل متوفر؟`
- **إمكانية الوصول:** skip-link، aria-current، aria-pressed للفلاتر، aria-live للنتائج والإجمالي، min 44px للمس، focus move للـ h1 في كل view.
- **State:** `state = { view, category, query, sort, current, qty, shopScroll }` — يوجد زر رجوع من صفحة المنتج يرجع لصفحة المتجر **بموضع scroll محفوظ** (`restoreScroll`).

### 4.2 طبقة البيانات (`store-data.js`)
- مصدر واحد للحقيقة (single source of truth) للـ إعدادات:
  - `window.StoreData.CATEGORIES` — 6 تصنيفات ثابتة (mugs, art, trays, frames, weddings, birthdays)
  - `window.StoreData.DEFAULT_PRODUCTS` — 14 منتج (بعض featured)
  - `loadProducts()` / `saveProducts(list)` / `resetProducts()` / `storageAvailable()`
- `normalizeProduct()` هو **gate** للدخل (validation عند trust boundary):
  - الاسم مطلوب (≤60 حرف)، السعر رقم موجب، الصورة مطلوبة
  - cat غير معروف → fallback `"mugs"`
  - specs مطلوبة كـ `{label, value}` صحيحة، ≤ 5
  - desc ≤ 400 حرف، مُعرّف id تلقائي `"p-" + random` لو مفقود

### 4.3 لوحة التحكم (`admin.html` + `admin.js`)
- صفحة مستقلة للبائع: تعرض stats (عدد المنتجات، الأقسام، متوسط السعر، منتجات مميزة)
- CRUD كامل عبر `<dialog>` — form: اسم (≤60) + تصنيف + سعر + وصف (10–400 حرف) + صورة + specs (حتى 5) + `featured` checkbox
- **upload صورة من الجهاز:** `compressImage(file)`:
  - FileReader → Image → canvas resize (بنسبة scale) → `canvas.toDataURL("image/jpeg", 0.82)`
  - الحد الأقصى للفايل 8MB — الناتج يُحفظ كـ data:URL جوه الـ localStorage معifa باقي حقل كتالوج
- form validation مركزية (مفاتيح errors) + مؤشر معاينة بطاقة المنتج live
- تنبيه لو `storageAvailable() === false` (private mode إلخ) — التعديلات تبقى session-only
- زر "استرجاع الأصلي" (`resetCatalog`) يمحا localStorage ويحوّل إلى defaults (مع confirm dialog)
- حالة `isFresh`/لائحة المنتجات: كل تسجيل يُحفظ فوريًا بعد كل تعديل (save-on-change)

---

## 5. ملاحظات التصميم مهمة

- **Color tokens** موجودة في `styles.css :root` — copy/paste كصح:
  - dark "kiln-night": `--bg: #161210`, `--surface: #201A13`, `--ink: #F1EAE0`, `--ink-soft: #CDC2B2`, `--muted: #9C8F7D`, `--line: #352C20`, `--line-strong: #4A3D2B`, `--brand: #C9A45C`, `--brand-deep: #B08E4A`, `--brand-tint: #2B2317`
  - radii: `sm` 10px / 16px / `lg` 22px
  - fonts: `--font-display: "Noto Kufi Arabic"`, `--font-body: "IBM Plex Sans Arabic"`
- **OD-LAYOUT-PRIMITIVES v1** هي نظام layout خفيف inline مش `@layer od-layout` في بداية كل صفحة — **ده عمدًا inline مش في styles.css**. مجموعات أساسية: `.od-stack`, `.od-row`, `.od-cluster`, `.od-grid`, `.od-stat/.od-field/.od-cell`, `.od-media/.od-media-cover`, `.od-icon`, `.od-clamp-2/.od-clamp-3`, `.od-rail`, `.od-touch` — من الاختصارات المعتمدة. من أمثلتها المش تفسيرها: `.od-stack`, `.od-row`, `.od-grid`...

## 6. النقاط الحرجة والفراغات (اللي أي agent لازم يعرفها قبل ما يلمس الكود)

| # | الملاحظة | التأثير / ماذا يُجب أن يفعله المطور القادم |
|---|---|---|
| 1 | **رقم واتساب placeholder** في `app.js` → `waNumber: "201000000000"` والهاتف `0100 000 0000` | قبل النشر لازم رقم حقيقي — **نقطة الدفع/الطلب كلها بتشتغل على الرقم ده** |
| 2 | **الكتالوج في localStorage على المتصفح مش على سيرفر** | مش مشكلة لبيزنس واتساب، لكن المنتجات المضافة من البائع **مش بتتشاف لزيارات من جهاز تاني**. لو عايز مشترك عالمي، أرشح نيرك store-data لـ JSON ثابت مرفوع مع الموقع، أو Supabase/Firebase لاحقًا |
| 3 | **Duplicated product list:** `fallbackProducts` في `app.js` (نسخة قديمة/مقصوصة بـ 13 منتج) مكررة من `DEFAULT_PRODUCTS` في `store-data.js` (14 منتج) | مصدر الخطر الأول للـ drift. التعديل لازم يحصل في `store-data.js` — `fallbackProducts` كتالوج احتياطي لو StoreData مش موجود، وينبغي توسيه أو تخفيضه لـ `[]` |
| 4 | **الصور:** إضافة منتج يحمّلها كـ base64 JPEG داخل localStorage | لو الـ quota (5–10MB فأعلى) يتملي، الصور الجديدة فشل — الـ compression هي سقف واحد (المشروع يفهم هذا) |
| 5 | **`DESIGN-HANDOFF.md` هو عقد تصميم** من أداة OpenDesign (صفحات بصرية شكلية) — كتبته الأداة للـ "تحويل للمنتج". ده مش مرجعিগ runtime، لكن تبقّي قيم فيه تنفع تسأل قبل تغيير تصميم (viewport matrix, notes) |
| 6 | حزمة `.rar` باسم "حازم برايز" — أرشيف خام مقيد | مش ضروري للـ runtime. لو هدفك نشر نظيف، اتركها برّه التوزيع |
| 7 | **مش git repo** حاليًا | قبل أي تعديل شرب: عمل `git init` + commit inicial، لأن العمل بدون versioning خطير |
| 8 | `heroCaption` فاضي في STORE (`""`) والـ `hero-caption` يهيأ hidden | فايتور اختياري — مش bug |
| 9 | منتجات مثله `.svg` (wed-favors, wed-calligraphy, bday-*) مُلقاة في assets/stock | مش هي صور مرجعية حقيقية. لو عايز الاستايل ييجي حقيقي، حوِّلهم لـ .jpg حقيقي من ماما مورّد |

## 7. الـ UX الحالي (ولا ننسى)
- **مفيش سلة ولا checkout** — تصميم مقصود: الطلب يصبح رسالة واتساب مليئة بالتفاصيل
- **header sticky** + زر واتساب sidebar لنا environment دائيًا في المتجر
- أسلوب "تجربة صفحة استعراض" — بيدعم عربي بالكامل (RTL، الأسطر، الـ تنسيق الأرقام بالإنجليزية للـ أرقام: `Intl.NumberFormat("en-US")`)
- البحث بتطارية تسوية نصوص عربية (يتخلص من التشكيل ↔ `normalize()`)

---

## 8. الخريطة التنفيذية (المهام بلغة واضحة)
- **أولوية عالية:** تعويض `waNumber` والهاتف بالقيم الحقيقية في `app.js`
- **أولوية عالية:** عمل init لـ git + أول commit
- **متوسط:** استبدال الصور النائب (.svg) بصور حقيقية للمورد
- **متوسط:** توحيد fallbackProducts مع DEFAULT_PRODUCTS (أو إزالة duplicate)
- **خساري:** لو محتاج كتالوج مُشترك عبر الأجهزة، ابدأ بإضافة `catalog.json` ثابت يواجه fetch() قبل readState من localStorage
- أمكن إضافته لاحقًا بلا مزاح: meta tags للبيزنس في sitemap/robots و Schema.org للـ SEO المحلي
