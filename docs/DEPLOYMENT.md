# النشر — دار الطين

## الرابط النهائي

**https://mohamedkhaled627.github.io/dar-alteen/**

لوحة الإدارة: `https://mohamedkhaled627.github.io/dar-alteen/admin.html` (مقفولة بكلمة سر تفرضها أول مرة تفتحها — الحماية client-side، حدودها موثقة في `docs/ARCHITECTURE.md`).

## البيانات

- الاستضافة: **GitHub Pages** من branch `main` على root — مجانية 100% (repo عام هو الثمن الصفري للـ Pages على الخطة المجانية).
- مفيش رسوم ولا حدود زيارة تهم لتاجر صغير، وHTTPS مفعّل إجباري.
- `robots.txt` بيمنع فهرسة `admin.html`، وكمان فيه meta `noindex` على الصفحة نفسها.

## تحديث الموقع مستقبلًا

```bash
git add -A && git commit -m "وصف التعديل" && git push
```

النشر تلقائي — كل push على `main` بيعيد بناء الموقع (دقيقة تقريبًا).

## الرجوع لنسخة أقدم

كل نسخة موجودة في تاريخ git. عشان ترجع الموقع لحد ما:

```bash
git log --oneline        # اختار الـ commit الده فيه النسخة المستقرة
git revert --no-commit <hash> && git commit -m "revert: رجوع لـ <وصف النسخة>" && git push
```

(revert مش reset — عشان ما تمسحش تاريخ).

## ملاحظات

- ملف `حازم برايز.rar` متجاهَل بالـ .gitignore — مش بيترفع عمدًا.
- كتالوج المنتجات اللي بتعدله بـ admin محفوظ في `localStorage` جهازك — مش بيتنشر على الموقع (قرار بيزنس وثّقه إجابة "جهاز واحد كفاية"). الزوار شايفين الـ 17 منتج الافتراضي في `store-data.js`.
