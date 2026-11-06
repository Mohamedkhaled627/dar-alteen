const CATEGORIES = StoreData.CATEGORIES;

const ICONS = {
  pencil: '<path d="M4 20h4l10-10a2.8 2.8 0 0 0-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/>',
  trash: '<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="m6 7 1 13h10l1-13"/><path d="M10 11v5M14 11v5"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>'
};

const FIELD_LABELS = {
  name: "اسم المنتج",
  category: "التصنيف",
  price: "السعر",
  desc: "وصف المنتج",
  specs: "المواصفات",
  image: "صورة المنتج"
};

const FIELD_MESSAGES = {
  name: "اكتب اسم المنتج (حرفين على الأقل).",
  category: "اختار تصنيف من القائمة.",
  price: "اكتب سعرًا بين 1 و1,000,000 جنيه.",
  desc: "اكتب وصفًا من 10 أحرف على الأقل.",
  specs: "كمّل اسم المواصفة وقيمتها، أو سيب الصف فاضي.",
  image: "اختار صورة من الجهاز أو اكتب رابط صورة."
};

const MAX_SPECS = 5;
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const SAVE_LABEL = "حفظ المنتج";

const listEl = document.getElementById("admin-list");
const emptyEl = document.getElementById("admin-empty");
const emptyTitle = document.getElementById("admin-empty-title");
const emptyText = document.getElementById("admin-empty-text");
const emptyAdd = document.getElementById("empty-add");
const emptyClear = document.getElementById("empty-clear");
const countEl = document.getElementById("admin-count");
const searchEl = document.getElementById("admin-search");
const categoryFilterEl = document.getElementById("admin-category");
const addButton = document.getElementById("add-product");
const resetButton = document.getElementById("reset-catalog");
const exportButton = document.getElementById("export-catalog");
const storageBanner = document.getElementById("storage-banner");

const statCount = document.getElementById("stat-count");
const statCategories = document.getElementById("stat-categories");
const statAverage = document.getElementById("stat-average");
const statFeatured = document.getElementById("stat-featured");

const dialog = document.getElementById("product-dialog");
const form = document.getElementById("product-form");
const dialogEyebrow = document.getElementById("dialog-eyebrow");
const dialogTitle = document.getElementById("dialog-title");
const closeButtons = Array.from(dialog.querySelectorAll("[data-close-dialog]"));

const errorsBox = document.getElementById("form-errors");
const errorsList = document.getElementById("form-errors-list");

const nameInput = document.getElementById("field-name");
const nameError = document.getElementById("error-name");
const categoryInput = document.getElementById("field-category");
const categoryError = document.getElementById("error-category");
const priceInput = document.getElementById("field-price");
const priceError = document.getElementById("error-price");
const descInput = document.getElementById("field-desc");
const descError = document.getElementById("error-desc");

const fileInput = document.getElementById("image-file");
const removeImageButton = document.getElementById("remove-image");
const imageUrlInput = document.getElementById("image-url");
const imageError = document.getElementById("error-image");
const formImage = document.getElementById("form-image");
const formImageEmpty = document.getElementById("form-image-empty");

const specsEditor = document.getElementById("specs-editor");
const addSpecButton = document.getElementById("add-spec");
const specsError = document.getElementById("error-specs");

const featuredInput = document.getElementById("field-featured");

const previewCardImage = document.getElementById("preview-card-image");
const previewCardEmpty = document.getElementById("preview-card-empty");
const previewCat = document.getElementById("preview-cat");
const previewName = document.getElementById("preview-name");
const previewPrice = document.getElementById("preview-price");

const saveButton = document.getElementById("save-product");

const confirmDialog = document.getElementById("confirm-dialog");
const confirmTitle = document.getElementById("confirm-title");
const confirmMessage = document.getElementById("confirm-message");
const confirmCancel = document.getElementById("confirm-cancel");
const confirmOk = document.getElementById("confirm-ok");

const toastRegion = document.getElementById("toast-region");

const fieldMap = {
  name: nameInput,
  category: categoryInput,
  price: priceInput,
  desc: descInput,
  specs: specsEditor,
  image: imageUrlInput
};

const errorMap = {
  name: nameError,
  category: categoryError,
  price: priceError,
  desc: descError,
  specs: specsError,
  image: imageError
};

const numberFormat = new Intl.NumberFormat("en-US");

let catalog = StoreData.loadProducts();
let ui = { query: "", category: "all" };
let editingId = null;
let draftImage = null;
let pendingConfirm = null;

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

// escapeHtml مسماة ومشتركة من store-data.js (نفس دالة escaping لكل الموقع)
const escapeHtml = StoreData.escapeHtml;
const isSafeImageSrc = StoreData.isSafeImageSrc;

function icon(name) {
  return '<svg class="od-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + ICONS[name] + "</svg>";
}

function countLabel(count) {
  if (count === 0) return "مفيش منتجات";
  if (count === 1) return "منتج واحد";
  if (count === 2) return "منتجان";
  if (count <= 10) return count + " منتجات";
  return count + " منتجًا";
}

function specsLabel(count) {
  if (count === 0) return "بدون مواصفات";
  if (count === 1) return "مواصفة واحدة";
  if (count === 2) return "مواصفتان";
  return count + " مواصفات";
}

function visibleProducts() {
  const query = normalize(ui.query.trim());
  return catalog.filter(function (product) {
    const inCategory = ui.category === "all" || product.cat === ui.category;
    const matches = !query || normalize(product.name + " " + product.desc + " " + CATEGORIES[product.cat]).indexOf(query) !== -1;
    return inCategory && matches;
  });
}

function rowMarkup(product) {
  return (
    '<li class="admin-row">' +
      '<div class="row-thumb"><img src="' + escapeHtml(product.img) + '" alt="" width="' + product.w + '" height="' + product.h + '" loading="lazy" decoding="async"></div>' +
      '<div class="row-main">' +
        '<div class="row-head">' +
          "<h3>" + escapeHtml(product.name) + "</h3>" +
          (product.featured ? '<span class="row-flag">مميز</span>' : "") +
        "</div>" +
        '<p class="row-meta">' + escapeHtml(CATEGORIES[product.cat]) + " · " + specsLabel(product.specs.length) + "</p>" +
        '<p class="row-desc">' + escapeHtml(product.desc) + "</p>" +
      "</div>" +
      '<div class="row-price"><span>السعر</span><strong class="od-nowrap">' + formatNumber(product.price) + " ج.م</strong></div>" +
      '<div class="row-actions">' +
        '<button type="button" class="icon-btn" data-edit="' + escapeHtml(product.id) + '" aria-label="تعديل ' + escapeHtml(product.name) + '">' + icon("pencil") + "</button>" +
        '<button type="button" class="icon-btn icon-btn-danger" data-delete="' + escapeHtml(product.id) + '" aria-label="حذف ' + escapeHtml(product.name) + '">' + icon("trash") + "</button>" +
      "</div>" +
    "</li>"
  );
}

function renderStats() {
  const count = catalog.length;
  const usedCategories = new Set(catalog.map(function (product) { return product.cat; })).size;
  const total = catalog.reduce(function (sum, product) { return sum + product.price; }, 0);
  const featured = catalog.filter(function (product) { return product.featured; }).length;

  statCount.textContent = String(count);
  statCategories.textContent = String(usedCategories);
  statAverage.textContent = count ? formatNumber(Math.round(total / count)) + " ج.م" : "—";
  statFeatured.textContent = String(featured);
}

function render() {
  const visible = visibleProducts();

  listEl.innerHTML = visible.map(rowMarkup).join("");
  listEl.hidden = visible.length === 0;
  emptyEl.hidden = visible.length !== 0;
  countEl.hidden = visible.length === 0;
  countEl.textContent = "الظاهر: " + countLabel(visible.length);

  if (catalog.length === 0) {
    emptyTitle.textContent = "لسه مفيش منتجات";
    emptyText.textContent = "ابدأ بإضافة أول منتج وهتظهر بطاقته هنا وفي المتجر.";
    emptyClear.hidden = true;
  } else {
    emptyTitle.textContent = "مفيش نتائج مطابقة";
    emptyText.textContent = "جرّب كلمة تانية أو اعرض كل الأقسام.";
    emptyClear.hidden = false;
  }

  renderStats();
}

function clearError(key) {
  const errorEl = errorMap[key];
  const fieldEl = fieldMap[key];
  if (errorEl) {
    errorEl.textContent = "";
    errorEl.hidden = true;
  }
  if (fieldEl) fieldEl.removeAttribute("aria-invalid");
}

function setError(key, message) {
  const errorEl = errorMap[key];
  const fieldEl = fieldMap[key];
  if (errorEl) {
    errorEl.textContent = message || FIELD_MESSAGES[key];
    errorEl.hidden = false;
  }
  if (fieldEl) fieldEl.setAttribute("aria-invalid", "true");
}

function clearAllErrors() {
  Object.keys(errorMap).forEach(clearError);
  errorsBox.hidden = true;
  errorsList.innerHTML = "";
}

function renderErrorSummary(keys) {
  errorsList.innerHTML = keys.map(function (key) {
    return '<li><button type="button" class="link-btn" data-goto="' + key + '">' + FIELD_LABELS[key] + "</button></li>";
  }).join("");
  errorsBox.hidden = false;
  errorsBox.focus();
}

function addSpecRow(label, value) {
  if (specsEditor.querySelectorAll(".spec-edit-row").length >= MAX_SPECS) return;

  const row = document.createElement("div");
  row.className = "spec-edit-row";
  row.innerHTML =
    '<label class="spec-field"><span>اسم المواصفة</span><input type="text" class="spec-label" maxlength="30" placeholder="مثال: المقاس" value="' + escapeHtml(label || "") + '"></label>' +
    '<label class="spec-field"><span>القيمة</span><input type="text" class="spec-value" maxlength="60" placeholder="مثال: 30 سم" value="' + escapeHtml(value || "") + '"></label>' +
    '<button type="button" class="icon-btn icon-btn-danger" data-remove-spec aria-label="حذف المواصفة">' + icon("close") + "</button>";

  row.querySelector("[data-remove-spec]").addEventListener("click", function () {
    row.remove();
    syncSpecControls();
  });

  specsEditor.appendChild(row);
  syncSpecControls();
}

function syncSpecControls() {
  const count = specsEditor.querySelectorAll(".spec-edit-row").length;
  addSpecButton.disabled = count >= MAX_SPECS;
}

function collectSpecs() {
  const rows = Array.from(specsEditor.querySelectorAll(".spec-edit-row"));
  const specs = [];
  let incomplete = false;

  rows.forEach(function (row) {
    const label = row.querySelector(".spec-label").value.trim();
    const value = row.querySelector(".spec-value").value.trim();

    if (!label && !value) return;
    if (!label || !value) {
      incomplete = true;
      return;
    }

    specs.push({ label: label, value: value });
  });

  return { specs: specs, incomplete: incomplete };
}

function updatePreview() {
  const name = nameInput.value.trim();
  const price = Number(priceInput.value);

  previewCat.textContent = CATEGORIES[categoryInput.value] || "التصنيف";
  previewName.textContent = name || "اسم المنتج";
  previewPrice.textContent = Number.isFinite(price) && price > 0
    ? formatNumber(Math.round(price)) + " ج.م"
    : "— ج.م";
}

function renderImagePreview() {
  const hasImage = draftImage && draftImage.src;

  if (hasImage) {
    formImage.src = draftImage.src;
    formImage.hidden = false;
    formImageEmpty.hidden = true;
    previewCardImage.src = draftImage.src;
    previewCardImage.hidden = false;
    previewCardEmpty.hidden = true;
  } else {
    formImage.removeAttribute("src");
    formImage.hidden = true;
    formImageEmpty.hidden = false;
    previewCardImage.removeAttribute("src");
    previewCardImage.hidden = true;
    previewCardEmpty.hidden = false;
  }

  removeImageButton.disabled = !hasImage;
  updatePreview();
}

function loadImageMeta(src) {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.onload = function () {
      resolve({
        w: image.naturalWidth || 1200,
        h: image.naturalHeight || 1200
      });
    };
    image.onerror = function () {
      reject(new Error("image"));
    };
    image.src = src;
  });
}

function compressImage(file) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();

    reader.onerror = function () {
      reject(new Error("read"));
    };

    reader.onload = function () {
      const image = new Image();

      image.onerror = function () {
        reject(new Error("decode"));
      };

      image.onload = function () {
        try {
          const maxEdge = 1400;
          const scale = Math.min(1, maxEdge / Math.max(image.naturalWidth, image.naturalHeight));
          const width = Math.max(1, Math.round(image.naturalWidth * scale));
          const height = Math.max(1, Math.round(image.naturalHeight * scale));
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const context = canvas.getContext("2d");
          context.fillStyle = "#F1F2EE";
          context.fillRect(0, 0, width, height);
          context.drawImage(image, 0, 0, width, height);

          resolve({
            src: canvas.toDataURL("image/jpeg", 0.82),
            w: width,
            h: height
          });
        } catch (error) {
          reject(error);
        }
      };

      image.src = reader.result;
    };

    reader.readAsDataURL(file);
  });
}

function imageUrlAllowed(value) {
  return isSafeImageSrc(value);
}

function openDialog(product) {
  editingId = product ? product.id : null;
  draftImage = product ? { src: product.img, w: product.w, h: product.h } : null;

  form.reset();
  clearAllErrors();

  dialogEyebrow.textContent = product ? "تعديل منتج" : "منتج جديد";
  dialogTitle.textContent = product ? "تعديل بيانات المنتج" : "إضافة منتج";

  nameInput.value = product ? product.name : "";
  categoryInput.value = product ? product.cat : "mugs";
  priceInput.value = product ? String(product.price) : "";
  descInput.value = product ? product.desc : "";
  featuredInput.checked = product ? Boolean(product.featured) : false;

  specsEditor.innerHTML = "";
  if (product && product.specs.length) {
    product.specs.forEach(function (spec) { addSpecRow(spec.label, spec.value); });
  }
  if (!specsEditor.children.length) addSpecRow("", "");
  syncSpecControls();

  // رابط http مش ممكن يعدي normalizeProduct/isSafeImageSrc أصلاً — فل حقول الرابط ديمًا فارغة عند فتح الديالوج
  imageUrlInput.value = "";
  renderImagePreview();

  if (!dialog.open) dialog.showModal();
  nameInput.focus();
}

function focusRowAction(id) {
  requestAnimationFrame(function () {
    const button = listEl.querySelector('[data-edit="' + id + '"]');
    if (button) button.focus();
    else addButton.focus();
  });
}

function validateForm() {
  clearAllErrors();

  const name = nameInput.value.trim();
  const category = categoryInput.value;
  const price = Number(priceInput.value);
  const desc = descInput.value.trim();
  const collected = collectSpecs();
  const invalid = [];

  if (name.length < 2) invalid.push("name");
  if (!CATEGORIES[category]) invalid.push("category");
  if (!Number.isFinite(price) || price < 1 || price > 1000000) invalid.push("price");
  if (desc.length < 10) invalid.push("desc");
  if (collected.incomplete) invalid.push("specs");
  if (!draftImage || !draftImage.src) invalid.push("image");

  if (!invalid.length) {
    return {
      name: name,
      cat: category,
      price: Math.round(price),
      desc: desc,
      specs: collected.specs
    };
  }

  invalid.forEach(function (key) { setError(key); });
  renderErrorSummary(invalid);

  const firstField = fieldMap[invalid[0]];
  if (firstField) firstField.focus();

  return null;
}

function saveProduct(values) {
  // gate واحد للدخل: كل منتج بيمر على StoreData.normalizeProduct قبل الحفظ
  const base = StoreData.normalizeProduct({
    id: editingId || "p-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name: values.name,
    cat: values.cat,
    price: values.price,
    img: draftImage.src,
    alt: "صورة " + values.name,
    w: draftImage.w,
    h: draftImage.h,
    desc: values.desc,
    specs: values.specs,
    featured: featuredInput.checked
  });

  if (!base) return;

  let next;
  if (editingId) {
    next = catalog.map(function (product) {
      return product.id === editingId ? base : product;
    });
  } else {
    next = [base].concat(catalog);
  }

  const persisted = StoreData.saveProducts(next);
  const wasEditing = Boolean(editingId);

  catalog = next;
  dialog.close();
  render();
  focusRowAction(base.id);

  if (persisted) {
    showToast(wasEditing ? "تم تحديث المنتج." : "تمت إضافة المنتج.");
  } else {
    showStorageBanner();
    showToast("تم الحفظ لهذه الجلسة فقط — التخزين المحلي مش متاح.");
  }
}

function showToast(message, isError) {
  const toast = document.createElement("div");
  toast.className = "toast" + (isError ? " is-error" : "");
  toast.textContent = message;
  toastRegion.appendChild(toast);

  requestAnimationFrame(function () { toast.classList.add("is-visible"); });

  window.setTimeout(function () {
    toast.classList.remove("is-visible");
    window.setTimeout(function () { toast.remove(); }, 250);
  }, 3800);
}

function showStorageBanner() {
  storageBanner.hidden = false;
}

function askConfirm(title, message, confirmLabel, action) {
  confirmTitle.textContent = title;
  confirmMessage.textContent = message;
  confirmOk.textContent = confirmLabel;
  pendingConfirm = action;
  if (!confirmDialog.open) confirmDialog.showModal();
}

function closeConfirm() {
  pendingConfirm = null;
  if (confirmDialog.open) confirmDialog.close();
}

function deleteProduct(id) {
  const next = catalog.filter(function (product) { return product.id !== id; });
  const persisted = StoreData.saveProducts(next);

  catalog = next;
  render();

  if (persisted) showToast("تم حذف المنتج.");
  else {
    showStorageBanner();
    showToast("تم الحذف لهذه الجلسة فقط — التخزين المحلي مش متاح.");
  }

  addButton.focus();
}

/* ---------- قفل اللوحة بكلمة سر محلية (حماية UX مش سياسة سيرفر) ---------- */

const AUTH_PW_KEY = "dar-alteen-admin-pw";
const AUTH_UNLOCK_KEY = "dar-alteen-admin-unlocked";
const MIN_PW_LENGTH = 6;

const authDialog = document.getElementById("auth-dialog");
const authTitle = document.getElementById("auth-title");
const authError = document.getElementById("auth-error");
const authSetup = document.getElementById("auth-setup");
const authLogin = document.getElementById("auth-login");
const authChange = document.getElementById("auth-change");

const setupFirst = document.getElementById("auth-setup-first");
const setupSecond = document.getElementById("auth-setup-second");
const loginPassword = document.getElementById("auth-login-password");
const changeCurrent = document.getElementById("auth-change-current");
const changeFirst = document.getElementById("auth-change-first");
const changeSecond = document.getElementById("auth-change-second");
const changeCancel = document.getElementById("auth-change-cancel");

const lockButton = document.getElementById("lock-admin");
const changePasswordButton = document.getElementById("change-password");

let authUnlocked = false;
let adminStarted = false;

function pwStore() {
  try {
    window.localStorage.setItem("__dar_probe__", "1");
    window.localStorage.removeItem("__dar_probe__");
    return window.localStorage;
  } catch (error) {
    // private mode → زى الكتالوج: الدخول session-only بس
    return window.sessionStorage;
  }
}

// الكلمة مش بتتخزن نص — hash SHA-256 بس
function getPwHash() {
  return pwStore().getItem(AUTH_PW_KEY);
}

function setPwHash(hash) {
  pwStore().setItem(AUTH_PW_KEY, hash);
}

function sha256Hex(text) {
  if (!window.crypto || !crypto.subtle) return Promise.reject(new Error("subtle"));
  return crypto.subtle.digest("SHA-256", new TextEncoder().encode(text)).then(function (buffer) {
    return Array.from(new Uint8Array(buffer)).map(function (byte) {
      return ("0" + byte.toString(16)).slice(-2);
    }).join("");
  });
}

function showAuthError(message) {
  authError.textContent = message;
  authError.hidden = false;
}

function showAuthMode(mode) {
  authSetup.hidden = mode !== "setup";
  authLogin.hidden = mode !== "login";
  authChange.hidden = mode !== "change";
  authTitle.textContent =
    mode === "setup" ? "فرض كلمة السر" :
    mode === "change" ? "تغيير كلمة السر" :
    "دخول لوحة التحكم";
  authError.hidden = true;

  const first = mode === "setup" ? setupFirst : mode === "change" ? changeCurrent : loginPassword;
  [setupFirst, setupSecond, loginPassword, changeCurrent, changeFirst, changeSecond].forEach(function (input) {
    input.value = "";
  });
  if (first) first.focus();
}

function openAuth(mode) {
  showAuthMode(mode);
  if (!authDialog.open) authDialog.showModal();
}

function unlockAdmin() {
  authUnlocked = true;
  window.sessionStorage.setItem(AUTH_UNLOCK_KEY, "1");
  if (authDialog.open) authDialog.close();
  lockButton.hidden = false;
  changePasswordButton.hidden = false;
  startAdmin();
}

function lockAdmin() {
  authUnlocked = false;
  lockButton.hidden = true;
  changePasswordButton.hidden = true;
  openAuth("login");
}

authDialog.addEventListener("cancel", function (event) {
  // ESC ميقفلش اللوحة والاحاية مقفولة
  if (!authUnlocked) event.preventDefault();
});

authDialog.addEventListener("close", function () {
  // قفل بالـ dialog.close() البرمجي تحت قفل → نعيد الفتح فورًا
  if (!authUnlocked) window.setTimeout(function () { openAuth("login"); }, 50);
});

authSetup.addEventListener("submit", function (event) {
  event.preventDefault();

  const first = setupFirst.value;
  const second = setupSecond.value;

  if (first.length < MIN_PW_LENGTH) { showAuthError("كلمة السر لازم تكون 6 حروف على الأقل."); return; }
  if (first !== second) { showAuthError("التأكيد مش مطابق للكلمة الأصلية."); return; }
  if (getPwHash()) { showAuthError("فيه كلمة سر محفوظة بالفعل — ادخل بيها أو غيّرها من جوّه."); return; }

  sha256Hex(first).then(function (hash) {
    setPwHash(hash);
    unlockAdmin();
    showToast("تم فرض كلمة السر. مش هيتسأل عنها تاني طول التاب.");
  }, function () {
    showAuthError("المتصفح مش بيدعم التشفير المطلوب. جرّب متصفح حديث أو افتح الصفحة على https.");
  });
});

authLogin.addEventListener("submit", function (event) {
  event.preventDefault();
  const stored = getPwHash();

  if (!stored) { showAuthError("حصل خطأ — جرّب تحمّل الصفحة تاني."); return; }

  sha256Hex(loginPassword.value).then(function (hash) {
    if (hash !== stored) {
      showAuthError("كلمة السر مش صحيحة.");
      loginPassword.select();
      return;
    }
    unlockAdmin();
  }, function () {
    showAuthError("المتصفح مش بيدعم التشفير المطلوب. جرّب متصفح حديث أو افتح الصفحة على https.");
  });
});

authChange.addEventListener("submit", async function (event) {
  event.preventDefault();
  const current = changeCurrent.value;
  const first = changeFirst.value;
  const second = changeSecond.value;

  const currentHash = await sha256Hex(current).catch(function () { return null; });

  if (!currentHash || currentHash !== String(getPwHash() || "")) {
    showAuthError("كلمة السر الحالية مش صحيحة.");
    changeCurrent.select();
    return;
  }
  if (first.length < MIN_PW_LENGTH) { showAuthError("كلمة السر الجديدة لازم تكون 6 حروف على الأقل."); return; }
  if (first !== second) { showAuthError("التأكيد مش مطابق للكلمة الجديدة."); return; }

  const newHash = await sha256Hex(first).catch(function () { return null; });
  if (!newHash) { showAuthError("المتصفح مش بيدعم التشفير المطلوب."); return; }

  setPwHash(newHash);
  authDialog.close();
  showToast("تم تغيير كلمة السر.");
});

changeCancel.addEventListener("click", function () {
  authDialog.close();
});

lockButton.addEventListener("click", lockAdmin);

changePasswordButton.addEventListener("click", function () {
  openAuth("change");
});

function startAdmin() {
  if (adminStarted) return; // امنع البدء المزدوج
  adminStarted = true;
  if (!StoreData.storageAvailable()) showStorageBanner();
  render();
}

function initAuth() {
  const stored = getPwHash();

  if (stored && window.sessionStorage.getItem(AUTH_UNLOCK_KEY) === "1") {
    authUnlocked = true;
    lockButton.hidden = false;
    changePasswordButton.hidden = false;
    startAdmin();
    return;
  }

  openAuth(stored ? "login" : "setup");
}

initAuth();

function resetFilters() {
  ui.query = "";
  ui.category = "all";
  searchEl.value = "";
  categoryFilterEl.value = "all";
  render();
}

/* ---------- events ---------- */

addButton.addEventListener("click", function () { openDialog(null); });
emptyAdd.addEventListener("click", function () { openDialog(null); });

emptyClear.addEventListener("click", function () {
  resetFilters();
  searchEl.focus();
});

searchEl.addEventListener("input", function (event) {
  ui.query = event.target.value;
  render();
});

categoryFilterEl.addEventListener("change", function (event) {
  ui.category = event.target.value;
  render();
});

listEl.addEventListener("click", function (event) {
  const editButton = event.target.closest("[data-edit]");
  if (editButton) {
    const product = catalog.find(function (item) { return item.id === editButton.dataset.edit; });
    if (product) openDialog(product);
    return;
  }

  const deleteButton = event.target.closest("[data-delete]");
  if (deleteButton) {
    const product = catalog.find(function (item) { return item.id === deleteButton.dataset.delete; });
    if (!product) return;
    askConfirm(
      "حذف المنتج",
      'هتحذف "' + product.name + '" نهائيًا من المتجر. مش هينفع ترجعه إلا لو أضفته تاني.',
      "احذف المنتج",
      function () { deleteProduct(product.id); }
    );
  }
});

closeButtons.forEach(function (button) {
  button.addEventListener("click", function () { dialog.close(); });
});

dialog.addEventListener("click", function (event) {
  if (event.target === dialog) dialog.close();
});

confirmCancel.addEventListener("click", closeConfirm);

confirmOk.addEventListener("click", function () {
  const action = pendingConfirm;
  closeConfirm();
  if (action) action();
});

confirmDialog.addEventListener("click", function (event) {
  if (event.target === confirmDialog) closeConfirm();
});

confirmDialog.addEventListener("close", function () {
  pendingConfirm = null;
});

nameInput.addEventListener("input", function () {
  clearError("name");
  updatePreview();
});

nameInput.addEventListener("blur", function () {
  const value = nameInput.value.trim();
  if (value && value.length < 2) setError("name");
});

categoryInput.addEventListener("change", function () {
  clearError("category");
  updatePreview();
});

priceInput.addEventListener("input", function () {
  clearError("price");
  updatePreview();
});

priceInput.addEventListener("blur", function () {
  const value = Number(priceInput.value);
  if (priceInput.value !== "" && (!Number.isFinite(value) || value < 1 || value > 1000000)) {
    setError("price");
  }
});

descInput.addEventListener("input", function () {
  clearError("desc");
});

descInput.addEventListener("blur", function () {
  const value = descInput.value.trim();
  if (value && value.length < 10) setError("desc");
});

errorsList.addEventListener("click", function (event) {
  const button = event.target.closest("[data-goto]");
  if (!button) return;
  const field = fieldMap[button.dataset.goto];
  if (field) field.focus();
});

addSpecButton.addEventListener("click", function () {
  addSpecRow("", "");
  const rows = specsEditor.querySelectorAll(".spec-edit-row");
  const lastRow = rows[rows.length - 1];
  if (lastRow) lastRow.querySelector(".spec-label").focus();
});

specsEditor.addEventListener("input", function () {
  clearError("specs");
});

fileInput.addEventListener("change", async function () {
  const file = fileInput.files && fileInput.files[0];
  if (!file) return;

  if (file.type.indexOf("image/") !== 0) {
    setError("image", "اختار ملف صورة (JPG أو PNG أو WebP).");
    fileInput.value = "";
    return;
  }

  if (file.size > MAX_IMAGE_BYTES) {
    setError("image", "الصورة أكبر من 8 ميجا. اختار صورة أصغر.");
    fileInput.value = "";
    return;
  }

  try {
    const result = await compressImage(file);
    draftImage = result;
    imageUrlInput.value = "";
    clearError("image");
    renderImagePreview();
  } catch (error) {
    setError("image", "مش قادر أقرأ الصورة. جرّب ملف تاني.");
  }

  fileInput.value = "";
});

removeImageButton.addEventListener("click", function () {
  draftImage = null;
  imageUrlInput.value = "";
  fileInput.value = "";
  renderImagePreview();
  clearError("image");
});

imageUrlInput.addEventListener("change", async function () {
  const value = imageUrlInput.value.trim();
  if (!value) return;

  if (!imageUrlAllowed(value)) {
    setError("image", "الرابط مرفوض. استخدم مسار صورة داخل المشروع (زي assets/stock/...) أو ارفع صورة من الجهاز.");
    return;
  }

  const meta = await loadImageMeta(value).catch(function () { return null; });

  if (!meta) {
    setError("image", "الرابط مش بيفتح صورة. راجع الرابط أو ارفع صورة من الجهاز.");
    return;
  }

  draftImage = { src: value, w: meta.w, h: meta.h };
  fileInput.value = "";
  clearError("image");
  renderImagePreview();
});

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const typedUrl = imageUrlInput.value.trim();
  if (typedUrl && (!draftImage || draftImage.src !== typedUrl) && imageUrlAllowed(typedUrl)) {
    const meta = await loadImageMeta(typedUrl).catch(function () { return null; });
    if (meta) {
      draftImage = { src: typedUrl, w: meta.w, h: meta.h };
      clearError("image");
      renderImagePreview();
    }
  }

  const values = validateForm();
  if (!values) return;

  saveButton.disabled = true;
  saveButton.textContent = "جارٍ الحفظ…";

  try {
    const meta = await loadImageMeta(draftImage.src);
    draftImage = { src: draftImage.src, w: meta.w, h: meta.h };
    saveProduct(values);
  } catch (error) {
    setError("image", "الصورة مش ظاهرة. راجع الصورة وحاول تاني.");
    showToast("مش قادر أحفظ المنتج. راجع الصورة وحاول تاني.", true);
  } finally {
    saveButton.disabled = false;
    saveButton.textContent = SAVE_LABEL;
  }
});

// نشر للزوار: تنزيل catalog.json بآخر نسخة الكتالوج — المستخدم يحطه في فولدر الموقع ويعمل نشر
exportButton.addEventListener("click", function () {
  var payload = {
    version: Date.now(),
    generated: new Date().toISOString(),
    products: catalog
  };
  var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  var url = URL.createObjectURL(blob);
  var link = document.createElement("a");
  link.href = url;
  link.download = "catalog.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("نزّلت catalog.json — حطه في فولدر الموقع وشغّل publish.ps1 (أو اطلب النشر).");
});

resetButton.addEventListener("click", function () {
  askConfirm(
    "استرجاع المنتجات الأصلية",
    "هتستبدل كل التعديلات والمنتجات المضافة بالمنتجات الأصلية الـ17.",
    "استرجع الأصلي",
    function () {
      StoreData.resetProducts();
      catalog = JSON.parse(JSON.stringify(StoreData.DEFAULT_PRODUCTS));
      const persisted = StoreData.saveProducts(catalog);

      render();
      addButton.focus();

      if (persisted) {
        showToast("تم استرجاع المنتجات الأصلية.");
      } else {
        showStorageBanner();
        showToast("تم الاسترجاع لهذه الجلسة فقط — التخزين المحلي مش متاح.");
      }
    }
  );
});

